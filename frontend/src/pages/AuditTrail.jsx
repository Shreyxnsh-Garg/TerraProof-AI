import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  ShieldCheck,
  Coins,
  Satellite,
  Flame,
  CheckCircle2,
  Clock,
  ExternalLink,
  Lock,
  ArrowRight,
  AlertTriangle,
  Copy,
  Layers,
  Database
} from 'lucide-react';

export default function AuditTrail({
  canonicalHash,
  trustScore,
  claimedCredits = '50000',
  projectName = 'Rio Branco Agroforestry Preservation',
  mintingStatus,
  txHash,
  isFrozenSimulation,
  healthStatus,
  evidenceCID
}) {
  const currentHealth = isFrozenSimulation ? 42 : trustScore || 93;

  const timelineEvents = [
    {
      step: 1,
      title: 'Project Registered & Boundary Ingested',
      timestamp: '2026-10-24 00:10:00 UTC',
      status: 'completed',
      description: 'Project Design Document (PDD) annex received and ingested into TerraProof AI forensic engine.',
      details: [
        { label: 'Project', value: projectName },
        { label: 'Registry Standard', value: 'Verra VCS (VCS-1422)' },
        { label: 'Jurisdiction', value: 'Acre, Brazil (-9.9754°, -67.8249°)' },
        { label: 'Claimed Volume', value: `${claimedCredits} tCO2e` }
      ]
    },
    {
      step: 2,
      title: 'AI Multi-Spectral Audit Passed',
      timestamp: '2026-10-24 00:15:30 UTC',
      status: trustScore !== null ? 'completed' : 'pending',
      description: 'Boundary vertices normalized to 4 decimals (~11m resolution) with canonical sequence proof. Historical reflectance verified.',
      details: [
        { label: 'Canonical Parcel Hash (bytes32)', value: canonicalHash || '0x2e8392847e9b2c13e626fc234d3663445eaf9fff4840e8ddb4e7124b093314e4' },
        { label: 'AI Trust Rating', value: `${trustScore || 93} / 100 (Grade A Approved)` },
        { label: 'Biometric Check', value: 'Canopy Density 96% • Deforestation Risk 10%' },
        { label: 'Deduplication Status', value: '0 Overlapping Claims Across Registries' }
      ]
    },
    {
      step: 3,
      title: 'Credits Issued on TerraProofRegistry.sol',
      timestamp: mintingStatus === 'success' ? '2026-10-24 00:18:45 UTC' : 'Ready for Issuance',
      status: mintingStatus === 'success' ? 'completed' : mintingStatus === 'minting' ? 'in_progress' : 'ready',
      description: 'ERC-1155 Multi-Token contract issued Batch #1 with immutable binding to the canonical parcel hash.',
      details: [
        { label: 'Smart Contract', value: 'TerraProofRegistry.sol (0x5FbDB2315678afecb367f032d93F642f64180aa3)' },
        { label: 'Batch ID', value: 'Token ID #1' },
        { label: 'Issued Quantity', value: `${claimedCredits} ERC-1155 Tokens` },
        { label: 'Transaction Hash', value: txHash || '0x4e8a1f73b6299d21c452e89645f7823b49e0c523ab6732cf7849e89d5203fa19' }
      ]
    },
    {
      step: 4,
      title: 'Oracle Sentinel-2 Surveillance Scan',
      timestamp: '2026-10-24 00:22:00 UTC',
      status: 'completed',
      description: 'Orbital satellite pass by Sentinel-2B MSI sensor verified canopy density and transmitted EIP-712 observation.',
      details: [
        { label: 'Satellite Constellation', value: 'Sentinel-2B MSI Level-2A (10m Resolution)' },
        { label: 'Mean NDVI Reflected', value: isFrozenSimulation ? '0.34 (Depleted)' : '0.74 (Healthy Canopy)' },
        { label: 'AI Oracle Signer', value: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8' },
        { label: 'EIP-712 Signature', value: '0x21d3a8d322b0fe1611907294236d77d697dadf...Verified' }
      ]
    },
    {
      step: 5,
      title: isFrozenSimulation ? 'Status: FROZEN (Breach Triggered)' : 'Status: ACTIVE (Eligible for Retirement)',
      timestamp: 'Continuous Active Surveillance',
      status: isFrozenSimulation ? 'alert' : 'active',
      description: isFrozenSimulation
        ? 'Automated circuit breaker activated: health score dropped to 42 (< 50). Token transfers and retirements frozen on-chain.'
        : 'Canopy health exceeds safe baseline (Health >= 50). Credits are verified active, liquid, and eligible for on-chain offset burn.',
      details: [
        { label: 'Current Health Score', value: `${currentHealth} / 100` },
        { label: 'Transferability', value: isFrozenSimulation ? 'LOCKED (safeTransferFrom reverts)' : 'UNLOCKED' },
        { label: 'Retirement Eligibility', value: isFrozenSimulation ? 'INELIGIBLE' : 'ELIGIBLE' },
        { label: 'Circuit Breaker State', value: isFrozenSimulation ? 'TRIGGERED (Health < 50)' : 'ARMED & HEALTHY' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E2D9] pb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#174B38] bg-[#EFEEE7] px-2.5 py-0.5 rounded border border-[#E2E2D9] font-medium">
              Lifecycle Provenance Ledger
            </span>
            <span className="text-[#69736B]">•</span>
            <span className="text-xs text-[#69736B] font-mono">Batch #1 Provenance</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#103528] font-normal tracking-tight">
            Carbon Batch Audit Trail
          </h1>
          <p className="text-[#69736B] text-sm mt-1">
            Chronological cryptographic lifecycle tracking from document ingestion to continuous satellite surveillance and smart contract circuit breaking.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/app/registry"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#FFFFFF] hover:bg-[#EFEEE7] text-[#202822] border border-[#E2E2D9] text-xs font-medium font-mono transition-colors shadow-sm"
          >
            <span>Inspect Smart Contract</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#174B38]" />
          </Link>
        </div>
      </div>

      {/* Batch Overview Card */}
      <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="font-semibold text-base text-[#202822]">
              Batch #1: {projectName}
            </h2>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${
              isFrozenSimulation
                ? 'bg-[#FDF2F2] text-[#991B1B] border-[#FCA5A5]'
                : 'bg-[#EFEEE7] text-[#174B38] border-[#E2E2D9]'
            }`}>
              {healthStatus}
            </span>
          </div>
          <p className="text-xs text-[#69736B] font-mono mt-1">
            Standard: Verra VCS-1422 • 50,000 tCO2e • Acre Reserve, Brazil
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <div className="p-2.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] text-center min-w-[100px]">
            <span className="text-[10px] text-[#69736B] block">Health Rating</span>
            <span className={`text-base font-bold ${isFrozenSimulation ? 'text-[#991B1B]' : 'text-[#174B38]'}`}>
              {currentHealth} / 100
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] text-center min-w-[100px]">
            <span className="text-[10px] text-[#69736B] block">Milestones</span>
            <span className="text-base font-bold text-[#202822]">5 / 5</span>
          </div>
        </div>
      </div>

      {/* Chronological Timeline Component - Restrained with Small Event Dots */}
      <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm space-y-8">
        <div className="flex items-center justify-between border-b border-[#E2E2D9] pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#202822] font-mono">
            Chronological Verification Milestones
          </span>
          <span className="text-[10px] font-mono text-[#69736B] flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-[#174B38]" />
            <span>Real-Time Invariant Feed</span>
          </span>
        </div>

        {/* Vertical timeline line */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E2E2D9]">
          {timelineEvents.map((item) => {
            const isAlert = item.status === 'alert';
            const isCompleted = item.status === 'completed' || item.status === 'active';

            return (
              <div key={item.step} className="relative group">
                {/* Small restrained event dot (no oversized colorful nodes) */}
                <div
                  className={`absolute -left-[19px] sm:-left-[25px] top-4 w-3.5 h-3.5 rounded-full border-2 border-white transition-colors ${
                    isAlert
                      ? 'bg-[#B91C1C]'
                      : isCompleted
                      ? 'bg-[#174B38]'
                      : 'bg-[#D6D5CB]'
                  }`}
                />

                {/* Milestone Card */}
                <div className={`p-5 rounded-lg border transition-colors ${
                  isAlert
                    ? 'bg-[#FDF2F2] border-[#FCA5A5]'
                    : 'bg-[#FFFFFF] border-[#E2E2D9] hover:border-[#174B38]/30 shadow-sm'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E2D9] pb-2.5 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EFEEE7] text-[#174B38] font-semibold">
                        Step {item.step}
                      </span>
                      <h3 className="font-semibold text-sm text-[#202822]">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-[#69736B]">
                      {item.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-[#69736B] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Metadata Chips Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-[#EFEEE7] p-3 rounded-lg border border-[#E2E2D9]">
                    {item.details.map((detail, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[#69736B] text-[11px]">
                        <span>{detail.label}:</span>
                        <span className="text-[#202822] font-medium truncate max-w-[200px]" title={detail.value}>
                          {detail.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
