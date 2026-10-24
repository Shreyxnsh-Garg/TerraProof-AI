const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TerraProofRegistry", function () {
  let terraProof;
  let owner, oracle, recipient, other;

  // EIP-712 Domain & Types
  let domain;
  const types = {
    SatelliteObservation: [
      { name: "batchId", type: "uint256" },
      { name: "healthScore", type: "uint256" },
      { name: "timestamp", type: "uint256" },
      { name: "observationCID", type: "string" },
    ],
  };

  beforeEach(async function () {
    [owner, oracle, recipient, other] = await ethers.getSigners();

    const TerraProofRegistry = await ethers.getContractFactory("TerraProofRegistry");
    terraProof = await TerraProofRegistry.deploy("https://ipfs.io/ipfs/{id}.json", oracle.address);
    await terraProof.waitForDeployment();

    const contractAddress = await terraProof.getAddress();
    const network = await ethers.provider.getNetwork();

    domain = {
      name: "TerraProofRegistry",
      version: "1",
      chainId: network.chainId,
      verifyingContract: contractAddress,
    };
  });

  describe("Deployment", function () {
    it("Should set the correct oracle signer", async function () {
      expect(await terraProof.oracleSigner()).to.equal(oracle.address);
    });

    it("Should set the correct owner", async function () {
      expect(await terraProof.owner()).to.equal(owner.address);
    });
  });

  describe("Batch Issuance", function () {
    const parcelHash = ethers.keccak256(ethers.toUtf8Bytes("canonical-acre-brazil-parcel-001"));
    const evidenceCID = "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi";
    const amount = 50000;
    const initialHealth = 90;

    it("Should issue a valid batch and mint ERC1155 tokens", async function () {
      await expect(
        terraProof.issueBatch(recipient.address, amount, parcelHash, evidenceCID, initialHealth)
      )
        .to.emit(terraProof, "BatchIssued")
        .withArgs(1, recipient.address, parcelHash, amount, initialHealth, evidenceCID);

      expect(await terraProof.balanceOf(recipient.address, 1)).to.equal(amount);

      const batch = await terraProof.getBatch(1);
      expect(batch.parcelHash).to.equal(parcelHash);
      expect(batch.evidenceCID).to.equal(evidenceCID);
      expect(batch.healthScore).to.equal(initialHealth);
      expect(batch.status).to.equal(1); // Active
      expect(batch.retirementEligible).to.equal(true);
      expect(await terraProof.registeredParcels(parcelHash)).to.equal(true);
    });

    it("Should prevent duplicate parcelHash registrations", async function () {
      await terraProof.issueBatch(recipient.address, amount, parcelHash, evidenceCID, initialHealth);

      await expect(
        terraProof.issueBatch(other.address, 10000, parcelHash, "another-cid", 85)
      ).to.be.revertedWith("Parcel already registered");
    });
  });

  describe("Satellite Observation & EIP-712 Verification", function () {
    const parcelHash = ethers.keccak256(ethers.toUtf8Bytes("canonical-acre-brazil-parcel-002"));
    const evidenceCID = "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi";
    const amount = 10000;

    beforeEach(async function () {
      await terraProof.issueBatch(recipient.address, amount, parcelHash, evidenceCID, 88);
    });

    it("Should update health score upon valid signed observation", async function () {
      const timestamp = Math.floor(Date.now() / 1000) + 10;
      const observationCID = "ipfs://satellite-observation-pass-24";
      const healthScore = 82;

      const message = {
        batchId: 1,
        healthScore: healthScore,
        timestamp: timestamp,
        observationCID: observationCID,
      };

      const signature = await oracle.signTypedData(domain, types, message);

      await expect(
        terraProof.submitSatelliteObservation(1, healthScore, timestamp, observationCID, signature)
      )
        .to.emit(terraProof, "SatelliteObservationSubmitted")
        .withArgs(1, healthScore, 1, observationCID, timestamp);

      const batch = await terraProof.getBatch(1);
      expect(batch.healthScore).to.equal(82);
      expect(batch.status).to.equal(1); // Active
    });

    it("Should freeze batch if health score drops below 50", async function () {
      const timestamp = Math.floor(Date.now() / 1000) + 20;
      const observationCID = "ipfs://satellite-wildfire-alert-detected";
      const healthScore = 42; // Below 50!

      const message = {
        batchId: 1,
        healthScore: healthScore,
        timestamp: timestamp,
        observationCID: observationCID,
      };

      const signature = await oracle.signTypedData(domain, types, message);

      await expect(
        terraProof.submitSatelliteObservation(1, healthScore, timestamp, observationCID, signature)
      )
        .to.emit(terraProof, "BatchStatusUpdated")
        .withArgs(1, 1, 2); // Active (1) -> Frozen (2)

      const batch = await terraProof.getBatch(1);
      expect(batch.status).to.equal(2); // Frozen
      expect(batch.retirementEligible).to.equal(false);

      // Attempting to transfer frozen tokens should fail
      await expect(
        terraProof.connect(recipient).safeTransferFrom(recipient.address, other.address, 1, 100, "0x")
      ).to.be.revertedWith("Cannot transfer frozen credits");
    });

    it("Should reject observation with invalid signer", async function () {
      const timestamp = Math.floor(Date.now() / 1000) + 30;
      const observationCID = "ipfs://fake-observation";
      const healthScore = 75;

      const message = {
        batchId: 1,
        healthScore: healthScore,
        timestamp: timestamp,
        observationCID: observationCID,
      };

      // Signed by unauthorized `other` signer
      const rogueSignature = await other.signTypedData(domain, types, message);

      await expect(
        terraProof.submitSatelliteObservation(1, healthScore, timestamp, observationCID, rogueSignature)
      ).to.be.revertedWith("Invalid oracle signature");
    });
  });
});
