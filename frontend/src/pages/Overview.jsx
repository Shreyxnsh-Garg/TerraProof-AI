import React from 'react';
import { Link } from 'react-router-dom';
import {
  TreePine,
  ShieldCheck,
  Satellite,
  Coins,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Layers,
  TrendingUp,
  MapPin,
  Clock,
  Flame,
  FileText
} from 'lucide-react';

export default function Overview({
  analysisData,
  trustScore,
  canonicalHash,
  isFrozenSimulation,
  healthStatus,
  metrics,
  mintingStatus,
  txHash
}) {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Title & Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E2D9] pb-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#103528] font-normal tracking-tight">
            Climate Intelligence Overview
          </h1>
          <p className="text-[#69736B] text-sm mt-1">
            Real-time biometric surveillance, cryptographic parcel deduplication, and active carbon batch telemetry.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/app/auditor"
            className="px-4 py-2 rounded-lg bg-[#FFFFFF] hover:bg-[#EFEEE7] text-[#202822] border border-[#E2E2D9] text-xs font-medium transition-colors shadow-sm"
          >
            Audit New Parcel
          </Link>
          <Link
            to="/app/registry"
            className="px-4 py-2 rounded-lg bg-[#174B38] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#103528] transition-colors shadow-sm"
          >
            Manage Registry
          </Link>
        </div>
      </div>

      {/* Three Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Projects Monitored */}
        <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm hover:border-[#174B38]/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-mono tracking-wider text-[#69736B] font-medium">
              Projects Monitored
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] text-[#174B38] flex items-center justify-center">
              <TreePine className="w-4 h-4 stroke-[2]" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-[#202822]">248,500</span>
            <span className="text-xs font-mono text-[#69736B]">Hectares</span>
          </div>
          <p className="text-xs text-[#69736B] mt-2">
            1 Active Project: <strong className="text-[#202822]">Rio Branco Agroforestry</strong> (Acre, Brazil)
          </p>
          <div className="mt-4 pt-3 border-t border-[#E2E2D9] flex items-center justify-between text-[11px] font-mono text-[#174B38]">
            <span className="font-medium">Canopy: Sentinel-2B</span>
            <Link to="/app/watch" className="hover:underline flex items-center space-x-1 font-semibold">
              <span>View GIS Map</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 2: Active Credits */}
        <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm hover:border-[#174B38]/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-mono tracking-wider text-[#69736B] font-medium">
              Active Credits
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] text-[#174B38] flex items-center justify-center">
              <Coins className="w-4 h-4 stroke-[2]" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-[#202822]">50,000</span>
            <span className="text-xs font-mono text-[#69736B]">tCO2e</span>
          </div>
          <p className="text-xs text-[#69736B] mt-2">
            ERC-1155 Multi-Token Contract: <span className="font-mono text-[#202822]">Batch #1</span>
          </p>
          <div className="mt-4 pt-3 border-t border-[#E2E2D9] flex items-center justify-between text-[11px] font-mono text-[#69736B]">
            <span>Standard: Verra VCS-1422</span>
            <span className="text-[#174B38] font-semibold">{mintingStatus === 'success' ? 'MINTED ON-CHAIN' : 'AUDITED'}</span>
          </div>
        </div>

        {/* Card 3: Alerts */}
        <div className={`p-6 rounded-xl border transition-colors shadow-sm ${
          isFrozenSimulation
            ? 'border-[#FCA5A5] bg-[#FDF2F2]'
            : 'bg-[#FFFFFF] border-[#E2E2D9] hover:border-[#174B38]/30'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-mono tracking-wider text-[#69736B] font-medium">
              Integrity Alerts
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
              isFrozenSimulation ? 'bg-red-100 border-[#FCA5A5] text-[#991B1B]' : 'bg-[#EFEEE7] border-[#E2E2D9] text-[#174B38]'
            }`}>
              {isFrozenSimulation ? <Flame className="w-4 h-4 stroke-[2]" /> : <ShieldCheck className="w-4 h-4 stroke-[2]" />}
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className={`text-3xl font-bold font-mono ${isFrozenSimulation ? 'text-[#991B1B]' : 'text-[#174B38]'}`}>
              {isFrozenSimulation ? '1 CRITICAL' : '0 ACTIVE'}
            </span>
            <span className="text-xs font-mono text-[#69736B]">Breaches</span>
          </div>
          <p className="text-xs text-[#69736B] mt-2">
            {isFrozenSimulation
              ? 'Satellite pass detected rapid canopy loss (Health: 42 < 50).'
              : '3 double-mint permutation claims blocked by canonical geohash.'}
          </p>
          <div className="mt-4 pt-3 border-t border-[#E2E2D9] flex items-center justify-between text-[11px] font-mono">
            <span className={isFrozenSimulation ? 'text-[#991B1B] font-bold' : 'text-[#69736B]'}>
              {isFrozenSimulation ? 'CIRCUIT BREAKER FROZEN' : 'All Batches Healthy'}
            </span>
            <Link to="/app/registry" className="text-[#174B38] hover:underline flex items-center space-x-1 font-semibold">
              <span>Inspect</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Active Project Card & Telemetry Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Project Highlight */}
        <div className="lg:col-span-8 p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E2D9] pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] text-[#174B38] flex items-center justify-center">
                <Satellite className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-[#202822]">
                  Rio Branco Agroforestry & Canopy Preservation
                </h3>
                <p className="text-xs text-[#69736B] font-mono flex items-center space-x-2 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#174B38]" />
                  <span>Acre, Brazil (-9.9754° S, -67.8249° W)</span>
                </p>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${
              isFrozenSimulation
                ? 'bg-[#FDF2F2] text-[#991B1B] border-[#FCA5A5]'
                : 'bg-[#EFEEE7] text-[#174B38] border-[#E2E2D9]'
            }`}>
              {isFrozenSimulation ? 'STATUS: FROZEN' : trustScore !== null ? 'AUDIT PASSED' : 'ACTIVE CLAIM'}
            </span>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9]">
              <span className="text-[11px] text-[#69736B] block font-mono font-medium">Trust Score</span>
              <span className="text-xl font-bold font-mono text-[#202822] mt-1 block">
                {trustScore ? `${trustScore}/100` : '93/100'}
              </span>
              <span className="text-[10px] text-[#174B38] font-medium">Verified Grade A</span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9]">
              <span className="text-[11px] text-[#69736B] block font-mono font-medium">NDVI Mean</span>
              <span className="text-xl font-bold font-mono text-[#202822] mt-1 block">
                0.74
              </span>
              <span className="text-[10px] text-[#174B38] font-medium">Healthy Canopy</span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9]">
              <span className="text-[11px] text-[#69736B] block font-mono font-medium">Biomass Density</span>
              <span className="text-xl font-bold font-mono text-[#202822] mt-1 block">
                310 tC/ha
              </span>
              <span className="text-[10px] text-[#69736B]">GEDI LiDAR Match</span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9]">
              <span className="text-[11px] text-[#69736B] block font-mono font-medium">Duplicate Risk</span>
              <span className="text-xl font-bold font-mono text-[#174B38] mt-1 block">
                0.0%
              </span>
              <span className="text-[10px] text-[#69736B]">Geohash Invariant</span>
            </div>
          </div>

          {/* Canonical Parcel Hash summary */}
          <div className="p-4 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="overflow-hidden">
              <span className="text-xs uppercase font-mono text-[#69736B] block font-medium">
                On-Chain Canonical Parcel Hash (bytes32)
              </span>
              <p className="font-mono text-xs text-[#174B38] font-medium truncate mt-0.5">
                {canonicalHash || '0x2e8392847e9b2c13e626fc234d3663445eaf9fff4840e8ddb4e7124b093314e4'}
              </p>
            </div>
            <Link
              to="/app/auditor"
              className="shrink-0 px-3 py-1.5 rounded-md bg-[#FFFFFF] hover:bg-[#E2E2D9] text-xs text-[#202822] font-medium transition-colors border border-[#E2E2D9] shadow-sm"
            >
              Inspect Geohash
            </Link>
          </div>
        </div>

        {/* Quick Navigation Panel */}
        <div className="lg:col-span-4 p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-semibold text-xs text-[#202822] uppercase tracking-wider font-mono mb-4">
              Forensic Navigation
            </h3>
            <div className="space-y-3">
              <Link
                to="/app/auditor"
                className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] hover:bg-[#E2E2D9]/70 transition-colors block group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#174B38] stroke-[2]" />
                    <span className="text-xs font-semibold text-[#202822]">Claim Auditor</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#69736B] group-hover:text-[#174B38] transition-colors" />
                </div>
                <p className="text-[11px] text-[#69736B] mt-1">
                  Upload PDD documents & generate canonical Keccak-256 parcel proofs.
                </p>
              </Link>

              <Link
                to="/app/watch"
                className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] hover:bg-[#E2E2D9]/70 transition-colors block group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <Satellite className="w-4 h-4 text-[#174B38] stroke-[2]" />
                    <span className="text-xs font-semibold text-[#202822]">Forest Watch GIS</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#69736B] group-hover:text-[#174B38] transition-colors" />
                </div>
                <p className="text-[11px] text-[#69736B] mt-1">
                  Interactive satellite viewer with Rio Branco boundary polygon.
                </p>
              </Link>

              <Link
                to="/app/registry"
                className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] hover:bg-[#E2E2D9]/70 transition-colors block group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <Coins className="w-4 h-4 text-[#174B38] stroke-[2]" />
                    <span className="text-xs font-semibold text-[#202822]">Credit Registry</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#69736B] group-hover:text-[#174B38] transition-colors" />
                </div>
                <p className="text-[11px] text-[#69736B] mt-1">
                  Mint verified ERC-1155 tokens or test the automated EIP-712 freeze circuit breaker.
                </p>
              </Link>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] text-[11px] text-[#69736B] font-mono">
            <span className="text-[#174B38] font-semibold block mb-0.5">IEEE ClimateChain Verified</span>
            Smart contract: <span className="text-[#202822] font-medium">TerraProofRegistry.sol</span> on Sepolia.
          </div>
        </div>
      </div>
    </div>
  );
}
