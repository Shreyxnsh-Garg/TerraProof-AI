import React from 'react';
import { Link } from 'react-router-dom';
import {
  Coins,
  ShieldCheck,
  Flame,
  CheckCircle2,
  AlertOctagon,
  RefreshCw,
  Lock,
  ExternalLink,
  ChevronRight,
  Database,
  Layers,
  ArrowRight
} from 'lucide-react';

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export default function CreditRegistry({
  walletAddress,
  connectWallet,
  claimedCredits,
  canonicalHash,
  evidenceCID,
  trustScore,
  activeTrustScore,
  healthStatus,
  isFrozenSimulation,
  mintingStatus,
  setMintingStatus,
  mintCredit,
  txHash,
  revertReason,
  handleSimulateShock,
  shockLoading,
  shockTxHash,
  showMintModal,
  setShowMintModal
}) {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E2D9] pb-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#103528] font-normal tracking-tight">
            On-Chain Credit Registry
          </h1>
          <p className="text-[#69736B] text-sm mt-1">
            ERC-1155 Multi-Token registry anchored to TerraProofRegistry.sol with automated EIP-712 circuit breakers.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            id="simulate-shock-btn"
            onClick={handleSimulateShock}
            disabled={shockLoading || trustScore === null}
            className={`px-4 py-2 rounded-lg text-xs font-medium font-mono border transition-colors flex items-center space-x-2 shadow-sm ${
              isFrozenSimulation
                ? 'bg-[#EFEEE7] text-[#174B38] border-[#E2E2D9] hover:bg-[#E2E2D9]'
                : 'bg-[#FFFFFF] text-[#991B1B] border-[#FCA5A5] hover:bg-[#FDF2F2]'
            }`}
          >
            <Flame className="w-4 h-4 stroke-[2]" />
            <span>
              {shockLoading
                ? 'Submitting Signed Observation...'
                : isFrozenSimulation
                ? 'Restore Baseline (Health 88)'
                : 'Simulate Satellite Shock (<50 Health)'}
            </span>
          </button>

          <button
            id="mint-credit-btn"
            disabled={activeTrustScore === null || isFrozenSimulation || mintingStatus === 'minting'}
            onClick={() => setShowMintModal(true)}
            className={`px-5 py-2 rounded-lg text-xs font-medium uppercase tracking-wider font-mono transition-colors flex items-center space-x-2 shadow-sm ${
              activeTrustScore === null || isFrozenSimulation
                ? 'bg-[#EFEEE7] text-[#69736B] cursor-not-allowed border border-[#E2E2D9]'
                : 'bg-[#174B38] hover:bg-[#103528] text-white'
            }`}
          >
            <Coins className="w-4 h-4 stroke-[2]" />
            <span>Mint Verified Credit</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Active Batch Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#E2E2D9] pb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-[#174B38] stroke-[2]" />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#202822] font-mono">
                  Batch #1 Registry State
                </h2>
              </div>
              <span className={`px-2.5 py-0.5 text-[10px] font-mono font-medium rounded border ${
                isFrozenSimulation
                  ? 'bg-[#FDF2F2] text-[#991B1B] border-[#FCA5A5]'
                  : 'bg-[#EFEEE7] text-[#174B38] border-[#E2E2D9]'
              }`}>
                {healthStatus}
              </span>
            </div>

            {/* Structured Batch Information */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9]">
                <span className="text-[#69736B] block text-[11px] font-medium">Issuance Quantity</span>
                <span className="text-base font-bold text-[#202822] mt-1 block">
                  {claimedCredits || '50,000'} tCO2e
                </span>
                <span className="text-[10px] text-[#69736B]">1 Token = 1 Metric Ton</span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9]">
                <span className="text-[#69736B] block text-[11px] font-medium">Health Rating</span>
                <span className={`text-base font-bold mt-1 block ${isFrozenSimulation ? 'text-[#991B1B]' : 'text-[#174B38]'}`}>
                  {activeTrustScore !== null ? `${activeTrustScore} / 100` : '-- / 100'}
                </span>
                <span className="text-[10px] text-[#69736B]">
                  {isFrozenSimulation ? 'Breach Triggered' : 'Retirement Eligible'}
                </span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] space-y-2">
                <div className="flex justify-between items-center text-[#69736B]">
                  <span>Smart Contract:</span>
                  <span className="text-[#202822] truncate max-w-[240px] font-medium">{CONTRACT_ADDRESS}</span>
                </div>
                <div className="flex justify-between items-center text-[#69736B]">
                  <span>Recipient Address:</span>
                  <span className="text-[#174B38] truncate max-w-[240px] font-medium">
                    {walletAddress || '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#69736B]">
                  <span>Canonical Parcel Hash:</span>
                  <span className="text-[#202822] truncate max-w-[240px] font-medium">
                    {canonicalHash || '0x2e8392847e9b2c13e626fc234d3663445eaf9fff4840e8ddb4e7124b093314e4'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#69736B]">
                  <span>Evidence IPFS CID:</span>
                  <span className="text-[#202822] truncate max-w-[240px] font-medium">
                    {evidenceCID || 'ipfs://bafybeigterraproofaudit'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#69736B]">
                  <span>EIP-712 AI Oracle Signer:</span>
                  <span className="text-[#174B38] font-medium">0x70997970C51812dc3A010C7d01b50e0d17dc79C8</span>
                </div>
              </div>
            </div>

            {/* Transaction & Revert Status Alerts */}
            {mintingStatus === 'reverted' && revertReason && (
              <div className="p-4 rounded-lg bg-[#FEF3C7] border border-[#FCD34D] text-[#92400E] text-xs flex items-start space-x-3 font-mono">
                <AlertOctagon className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5 stroke-[2]" />
                <div>
                  <p className="font-bold uppercase tracking-wider">
                    On-Chain Revert Protected
                  </p>
                  <p className="mt-1 leading-relaxed text-[#92400E]/90">{revertReason}</p>
                </div>
              </div>
            )}

            {mintingStatus === 'success' && (
              <div className="p-4 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-xs flex items-start space-x-3 font-mono text-[#065F46]">
                <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5 stroke-[2]" />
                <div>
                  <p className="font-bold uppercase tracking-wider">
                    ERC-1155 Batch Mint Confirmed
                  </p>
                  <p className="text-[#047857] truncate mt-1">Transaction Hash: {txHash}</p>
                </div>
              </div>
            )}

            {shockTxHash && (
              <div className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] text-xs font-mono flex items-center justify-between text-[#202822]">
                <span className="text-[#174B38] font-medium">Oracle Observation Recorded:</span>
                <span className="truncate max-w-[220px] text-[#69736B]">{shockTxHash}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Circuit Breaker Mechanics & Verification Ledger */}
        <div className="lg:col-span-5 space-y-6">
          {/* EIP-712 Circuit Breaker Explainer */}
          <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#E2E2D9] pb-3">
              <Lock className="w-4 h-4 text-[#174B38] stroke-[2]" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#202822] font-mono">
                Dynamic Circuit Breaker Architecture
              </h3>
            </div>

            <div className="space-y-3 text-xs text-[#69736B] leading-relaxed font-sans">
              <p>
                Unlike legacy static carbon registries that lock credits for 20 years without surveillance, <code className="text-[#174B38] font-mono font-medium">TerraProofRegistry.sol</code> dynamically links token transferability to continuous Sentinel-2 satellite passes.
              </p>
              <div className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] space-y-2 font-mono text-[11px]">
                <div className="flex items-center space-x-2 text-[#202822]">
                  <span className="w-2 h-2 rounded-full bg-[#174B38]"></span>
                  <span>Health &gt;= 50: Active & Transferable</span>
                </div>
                <div className="flex items-center space-x-2 text-[#991B1B]">
                  <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
                  <span>Health &lt; 50: Automated On-Chain Freeze</span>
                </div>
              </div>
              <p className="text-[11px] text-[#69736B]">
                Authorized AI Oracle signs observations using EIP-712 typed signatures, preventing replay and unauthorized telemetry injections.
              </p>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#202822] font-mono">
              Forensic Navigation
            </h3>
            <div className="space-y-2">
              <Link
                to="/app/auditor"
                className="p-3 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] hover:bg-[#E2E2D9]/70 flex items-center justify-between text-xs transition-colors group"
              >
                <span className="text-[#202822] font-medium">Audit Another Project Parcel</span>
                <ChevronRight className="w-4 h-4 text-[#69736B] group-hover:text-[#174B38]" />
              </Link>
              <Link
                to="/app/watch"
                className="p-3 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] hover:bg-[#E2E2D9]/70 flex items-center justify-between text-xs transition-colors group"
              >
                <span className="text-[#202822] font-medium">Inspect Rio Branco GIS Map</span>
                <ChevronRight className="w-4 h-4 text-[#69736B] group-hover:text-[#174B38]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Web3 Minting Execution Modal */}
      {showMintModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#E2E2D9] rounded-xl max-w-lg w-full p-6 text-[#202822] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E2E2D9] pb-3 mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] text-[#174B38] flex items-center justify-center">
                  <Coins className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#202822] text-sm">Issue ERC-1155 Carbon Credit Batch</h3>
                  <p className="text-[11px] text-[#69736B] font-mono">Contract: TerraProofRegistry.sol</p>
                </div>
              </div>
              <button
                onClick={() => setShowMintModal(false)}
                className="text-[#69736B] hover:text-[#202822] text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#EFEEE7] p-4 rounded-lg border border-[#E2E2D9] space-y-2 font-mono text-[11px]">
                <div className="text-[#69736B] flex justify-between">
                  <span>Method:</span>
                  <span className="text-[#174B38] font-semibold">issueBatch(...)</span>
                </div>
                <div className="text-[#69736B] flex justify-between">
                  <span>Recipient:</span>
                  <span className="text-[#202822] font-medium">{walletAddress || '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'}</span>
                </div>
                <div className="text-[#69736B] flex justify-between">
                  <span>Batch Volume:</span>
                  <span className="text-[#174B38] font-bold">{claimedCredits || 50000} Credits</span>
                </div>
                <div className="text-[#69736B] flex justify-between">
                  <span>Health Score:</span>
                  <span className="text-[#174B38] font-semibold">{activeTrustScore || 93} / 100</span>
                </div>
                <div className="text-[#69736B] flex justify-between">
                  <span>Parcel Hash (bytes32):</span>
                  <span className="text-[#202822] truncate max-w-[200px] font-medium" title={canonicalHash}>
                    {canonicalHash || '0x2e83...'}
                  </span>
                </div>
                <div className="text-[#69736B] flex justify-between">
                  <span>Evidence CID:</span>
                  <span className="text-[#202822] truncate max-w-[200px] font-medium" title={evidenceCID}>
                    {evidenceCID || 'ipfs://...'}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] text-[11px] text-[#69736B] leading-relaxed font-sans">
                <strong className="text-[#174B38] font-mono">Forensic Integrity Guarantee:</strong> Calling <code className="font-mono text-[#202822]">issueBatch()</code> marks this parcel hash as registered on-chain. If any applicant later attempts to re-register these coordinates, the transaction reverts with <code className="font-mono text-[#991B1B]">"Parcel already registered"</code>.
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowMintModal(false)}
                className="px-4 py-2 rounded-lg text-xs text-[#69736B] hover:text-[#202822] font-medium"
              >
                Cancel
              </button>

              <button
                id="confirm-mint-btn"
                onClick={mintCredit}
                disabled={mintingStatus === 'minting'}
                className="px-5 py-2.5 rounded-lg text-xs font-medium uppercase tracking-wider font-mono text-white bg-[#174B38] hover:bg-[#103528] transition-colors flex items-center space-x-1.5 shadow-sm"
              >
                {mintingStatus === 'minting' ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Signing On-Chain...</span>
                  </>
                ) : mintingStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>Batch Issued!</span>
                  </>
                ) : (
                  <>
                    <Coins className="w-3.5 h-3.5" />
                    <span>Confirm On-Chain Issuance</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
