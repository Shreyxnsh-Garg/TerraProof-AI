// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title TerraProofRegistry
 * @dev ERC-1155 Multi-Token registry for AI-verified carbon credit batches.
 * Features EIP-712 signed satellite verification feeds, duplicate parcel protection,
 * and automated health-score based freezing for high environmental risks.
 */
contract TerraProofRegistry is ERC1155, Ownable, EIP712 {
    using ECDSA for bytes32;

    enum BatchStatus {
        Pending,
        Active,
        Frozen,
        Retired
    }

    struct CarbonBatch {
        bytes32 parcelHash;
        string evidenceCID;
        uint256 healthScore;
        BatchStatus status;
        bool retirementEligible;
    }

    // TypeHash for EIP-712 Satellite Observation payload
    bytes32 public constant SATELLITE_OBSERVATION_TYPEHASH =
        keccak256(
            "SatelliteObservation(uint256 batchId,uint256 healthScore,uint256 timestamp,string observationCID)"
        );

    // Batch ID counter
    uint256 private _currentBatchId;

    // Address of the authorized Satellite AI Oracle
    address public oracleSigner;

    // Mapping from batchId to CarbonBatch details
    mapping(uint256 => CarbonBatch) public batches;

    // Prevent duplicate registrations of the same geographic parcel polygon
    mapping(bytes32 => bool) public registeredParcels;

    // Mapping from parcelHash to associated batchId
    mapping(bytes32 => uint256) public parcelToBatchId;

    // Track the latest observation timestamp per batch to avoid replay attacks
    mapping(uint256 => uint256) public lastObservationTimestamp;

    // Events
    event OracleSignerUpdated(address indexed previousSigner, address indexed newSigner);
    event BatchIssued(
        uint256 indexed batchId,
        address indexed recipient,
        bytes32 indexed parcelHash,
        uint256 amount,
        uint256 healthScore,
        string evidenceCID
    );
    event SatelliteObservationSubmitted(
        uint256 indexed batchId,
        uint256 healthScore,
        BatchStatus status,
        string observationCID,
        uint256 timestamp
    );
    event BatchStatusUpdated(uint256 indexed batchId, BatchStatus previousStatus, BatchStatus newStatus);
    event CreditsRetired(uint256 indexed batchId, address indexed account, uint256 amount);

    /**
     * @param uri_ Base metadata URI for ERC1155 tokens
     * @param initialOracle Address of the authorized AI Satellite Oracle signer
     */
    constructor(
        string memory uri_,
        address initialOracle
    ) ERC1155(uri_) Ownable(msg.sender) EIP712("TerraProofRegistry", "1") {
        require(initialOracle != address(0), "Invalid oracle address");
        oracleSigner = initialOracle;
        emit OracleSignerUpdated(address(0), initialOracle);
    }

    /**
     * @notice Updates the authorized Satellite AI Oracle address.
     * @param newSigner New oracle signer address.
     */
    function setOracleSigner(address newSigner) external onlyOwner {
        require(newSigner != address(0), "Invalid oracle address");
        address prev = oracleSigner;
        oracleSigner = newSigner;
        emit OracleSignerUpdated(prev, newSigner);
    }

    /**
     * @notice Issues a new AI-verified carbon credit batch and mints ERC-1155 tokens.
     * Enforces unique parcelHash verification to prevent double-spending/duplicate credits.
     * @param to Recipient address for the carbon credit tokens
     * @param amount Quantity of metric tons (tokens) in this batch
     * @param parcelHash Canonical Keccak256/SHA256 hash of the normalized parcel coordinates
     * @param evidenceCID IPFS CID containing MRV, satellite baseline & audit logs
     * @param initialHealthScore AI-calculated trust/health score (0-100)
     * @return batchId Newly generated batch identifier
     */
    function issueBatch(
        address to,
        uint256 amount,
        bytes32 parcelHash,
        string calldata evidenceCID,
        uint256 initialHealthScore
    ) external onlyOwner returns (uint256 batchId) {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than zero");
        require(parcelHash != bytes32(0), "Invalid parcel hash");
        require(!registeredParcels[parcelHash], "Parcel already registered");
        require(initialHealthScore <= 100, "Health score must be between 0 and 100");

        _currentBatchId += 1;
        batchId = _currentBatchId;

        registeredParcels[parcelHash] = true;
        parcelToBatchId[parcelHash] = batchId;

        BatchStatus initialStatus = initialHealthScore < 50
            ? BatchStatus.Frozen
            : BatchStatus.Active;
        bool retirementEligible = initialStatus == BatchStatus.Active;

        batches[batchId] = CarbonBatch({
            parcelHash: parcelHash,
            evidenceCID: evidenceCID,
            healthScore: initialHealthScore,
            status: initialStatus,
            retirementEligible: retirementEligible
        });

        _mint(to, batchId, amount, "");

        emit BatchIssued(batchId, to, parcelHash, amount, initialHealthScore, evidenceCID);
    }

    /**
     * @notice Submits an ongoing satellite observation with an EIP-712 oracle signature.
     * Automatically freezes the batch if the environmental health score drops below 50.
     * @param batchId Token/Batch ID to update
     * @param healthScore Latest satellite health score (0-100)
     * @param timestamp Timestamp of the satellite pass
     * @param observationCID IPFS CID containing multispectral imagery & NDVI evidence
     * @param signature EIP-712 signature from the authorized oracleSigner
     */
    function submitSatelliteObservation(
        uint256 batchId,
        uint256 healthScore,
        uint256 timestamp,
        string calldata observationCID,
        bytes calldata signature
    ) external {
        require(batchId > 0 && batchId <= _currentBatchId, "Batch does not exist");
        require(healthScore <= 100, "Invalid health score");
        require(timestamp > lastObservationTimestamp[batchId], "Observation timestamp must be newer");

        // Verify EIP-712 signature
        bytes32 structHash = keccak256(
            abi.encode(
                SATELLITE_OBSERVATION_TYPEHASH,
                batchId,
                healthScore,
                timestamp,
                keccak256(bytes(observationCID))
            )
        );

        bytes32 digest = _hashTypedDataV4(structHash);
        address recoveredSigner = ECDSA.recover(digest, signature);
        require(recoveredSigner == oracleSigner, "Invalid oracle signature");

        lastObservationTimestamp[batchId] = timestamp;
        CarbonBatch storage batch = batches[batchId];
        BatchStatus oldStatus = batch.status;

        batch.healthScore = healthScore;

        // Environmental risk trigger: freeze credits if health drops below 50
        if (healthScore < 50) {
            batch.status = BatchStatus.Frozen;
            batch.retirementEligible = false;
        } else if (batch.status == BatchStatus.Frozen) {
            // Restore active status if health recovers above 50
            batch.status = BatchStatus.Active;
            batch.retirementEligible = true;
        }

        if (oldStatus != batch.status) {
            emit BatchStatusUpdated(batchId, oldStatus, batch.status);
        }

        emit SatelliteObservationSubmitted(
            batchId,
            healthScore,
            batch.status,
            observationCID,
            timestamp
        );
    }

    /**
     * @notice Retires carbon credits by burning tokens, provided the batch is active and retirement eligible.
     * @param batchId The batch ID of tokens to retire
     * @param amount Metric tons to retire
     */
    function retireCredit(uint256 batchId, uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        CarbonBatch storage batch = batches[batchId];
        require(batch.status == BatchStatus.Active, "Batch is not active");
        require(batch.retirementEligible, "Batch not eligible for retirement");
        require(balanceOf(msg.sender, batchId) >= amount, "Insufficient credit balance");

        _burn(msg.sender, batchId, amount);

        // If total supply for this batch is completely burned, mark as Retired
        // Note: balanceOf msg.sender check ensures valid burn; custom tracking can flag full retirement
        emit CreditsRetired(batchId, msg.sender, amount);
    }

    /**
     * @notice Helper to fetch full batch information.
     */
    function getBatch(uint256 batchId) external view returns (CarbonBatch memory) {
        require(batchId > 0 && batchId <= _currentBatchId, "Batch does not exist");
        return batches[batchId];
    }

    /**
     * @notice Total number of batches issued.
     */
    function totalBatches() external view returns (uint256) {
        return _currentBatchId;
    }

    /**
     * @notice Override safeTransferFrom to prevent transferring frozen carbon credits.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes memory data
    ) public override {
        require(batches[id].status != BatchStatus.Frozen, "Cannot transfer frozen credits");
        super.safeTransferFrom(from, to, id, value, data);
    }

    /**
     * @notice Override safeBatchTransferFrom to prevent transferring frozen carbon credits.
     */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    ) public override {
        for (uint256 i = 0; i < ids.length; i++) {
            require(batches[ids[i]].status != BatchStatus.Frozen, "Cannot transfer frozen credits");
        }
        super.safeBatchTransferFrom(from, to, ids, values, data);
    }
}
