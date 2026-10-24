import React from 'react';
import { Link } from 'react-router-dom';
import {
  Satellite,
  ShieldCheck,
  Flame,
  ArrowRight,
  Layers,
  Activity,
  Lock,
  Globe2,
  TreePine,
  CheckCircle2,
  MapPin
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#202822] flex flex-col font-sans selection:bg-[#174B38] selection:text-white">
      {/* Top Header */}
      <header className="border-b border-[#E2E2D9] bg-[#FFFFFF] px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] flex items-center justify-center text-[#174B38]">
              <TreePine className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="font-semibold text-lg tracking-tight text-[#202822]">
                TerraProof <span className="text-[#174B38]">AI</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider bg-[#EFEEE7] text-[#174B38] rounded border border-[#E2E2D9]">
                IEEE ClimateChain
              </span>
            </div>
          </div>

          {/* Connected Header Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm text-[#69736B]">
            <Link
              to="/app/auditor"
              className="hover:text-[#174B38] transition-colors font-medium"
            >
              Forensic Architecture
            </Link>
            <Link
              to="/app/watch"
              className="hover:text-[#174B38] transition-colors font-medium"
            >
              Sentinel-2 AI
            </Link>
            <Link
              to="/app/registry"
              className="hover:text-[#174B38] transition-colors font-medium"
            >
              EIP-712 Oracle
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              to="/app/overview"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#174B38] hover:bg-[#103528] text-white font-medium text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center max-w-6xl mx-auto px-6 pt-16 pb-20 text-center">
        {/* Sub-badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EFEEE7] border border-[#E2E2D9] text-xs text-[#174B38] mb-6 mx-auto font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#174B38]"></span>
          <span>Decentralized MRV Standard VCS-1422 • Climate Intelligence</span>
        </div>

        {/* Hero Headline in DM Serif Display */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#103528] leading-[1.06] mb-6 font-normal">
          Trust, traced <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#174B38]">to Earth.</span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[#69736B] font-normal leading-relaxed mb-10">
          AI-powered carbon integrity. Continuous multi-spectral satellite auditing meets cryptographic proofs to eliminate phantom credits and guarantee permanence.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/app/overview"
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#174B38] hover:bg-[#103528] text-white font-medium text-sm tracking-wide transition-colors flex items-center justify-center space-x-2 shadow-sm"
          >
            <span>Explore the Platform</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/app/auditor"
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#FFFFFF] hover:bg-[#EFEEE7] text-[#202822] border border-[#E2E2D9] font-medium text-sm transition-colors flex items-center justify-center space-x-2 shadow-sm"
          >
            <span>Run Forensic Parcel Audit</span>
          </Link>
        </div>

        {/* Editorial Daytime Aerial Forest Visual Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-[#E2E2D9] shadow-sm mb-16 h-72 sm:h-96 w-full">
          <img
            src="https://images.unsplash.com/photo-1511497584788-87676104235f?q=80&w=2000&auto=format&fit=crop"
            alt="Lush Amazon Forest Aerial Canopy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#202822]/80 via-[#202822]/20 to-transparent" />
          <div className="absolute bottom-5 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between text-left text-white">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#EFEEE7] bg-white/20 backdrop-blur-none px-2 py-0.5 rounded">
                Active Monitoring Sector
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal mt-1.5 text-white">
                Rio Branco Agroforestry Reserve, Acre, Brazil
              </h2>
              <p className="text-xs text-stone-200 mt-0.5 font-mono">
                Centroid: -9.9754° S, -67.8249° W • Sentinel-2 Level-2A Multi-Spectral
              </p>
            </div>
            <div className="mt-3 sm:mt-0 font-mono text-xs text-right bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
              <span className="block text-white font-semibold">NDVI Mean: 0.74</span>
              <span className="text-stone-300 text-[10px]">Healthy Tropical Canopy</span>
            </div>
          </div>
        </div>

        {/* Live Metrics Ribbon (Pure White, Thin 1px Border, Zero Neon) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm text-left">
          <div className="border-r border-[#E2E2D9] pr-4">
            <span className="text-xs uppercase font-mono text-[#69736B] block">Monitored Canopy</span>
            <span className="text-2xl font-bold font-mono text-[#202822] mt-1 block">248,500 ha</span>
            <span className="text-[11px] text-[#174B38] font-medium mt-0.5 block">Amazon Basin Core</span>
          </div>

          <div className="border-r border-[#E2E2D9] pr-4">
            <span className="text-xs uppercase font-mono text-[#69736B] block">Verified On-Chain</span>
            <span className="text-2xl font-bold font-mono text-[#202822] mt-1 block">14 Batches</span>
            <span className="text-[11px] text-[#69736B] mt-0.5 block">ERC-1155 Standard</span>
          </div>

          <div className="border-r border-[#E2E2D9] pr-4">
            <span className="text-xs uppercase font-mono text-[#69736B] block">Double-Mints Blocked</span>
            <span className="text-2xl font-bold font-mono text-[#174B38] mt-1 block">3 Intercepted</span>
            <span className="text-[11px] text-[#69736B] mt-0.5 block">Canonical Geohash Proof</span>
          </div>

          <div>
            <span className="text-xs uppercase font-mono text-[#69736B] block">Sentinel-2 AI Index</span>
            <span className="text-2xl font-bold font-mono text-[#202822] mt-1 block">91.4%</span>
            <span className="text-[11px] text-[#174B38] font-medium mt-0.5 block">Grade A Biomass Density</span>
          </div>
        </div>

        {/* Core Architecture Pillars */}
        <div id="architecture" className="mt-20 text-left">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#103528] font-normal">
              Forensic Infrastructure for the Voluntary Carbon Market
            </h2>
            <p className="text-[#69736B] text-sm mt-2 max-w-2xl font-normal">
              Eliminating the twin vulnerabilities of duplicate credit issuance and unmonitored post-issuance deforestation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm hover:border-[#174B38]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] text-[#174B38] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="text-base font-semibold text-[#202822] mb-2">Canonical Geohash Invariance</h3>
              <p className="text-xs text-[#69736B] leading-relaxed">
                Rounds boundary vertices to 4 decimals (~11m resolution) and normalizes sequence before computing Keccak-256 hashes, preventing duplicate registration variants across registries.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm hover:border-[#174B38]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] text-[#174B38] flex items-center justify-center mb-4">
                <Satellite className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="text-base font-semibold text-[#202822] mb-2">Multi-Spectral Computer Vision</h3>
              <p className="text-xs text-[#69736B] leading-relaxed">
                Sentinel-2 L2A and GEDI LiDAR fusion measures NDVI vegetation indices, historical forest loss, and biomass density before any credit token can be minted.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm hover:border-[#174B38]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] text-[#174B38] flex items-center justify-center mb-4">
                <Flame className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="text-base font-semibold text-[#202822] mb-2">Dynamic EIP-712 Freeze Breaker</h3>
              <p className="text-xs text-[#69736B] leading-relaxed">
                If wildfire or illegal logging drops parcel health score below 50, the AI Oracle submits a signed cryptographic observation that automatically freezes on-chain transfers.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E2D9] bg-[#FFFFFF] px-6 py-8 text-xs text-[#69736B]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-[#202822]">TerraProof AI</span>
            <span>—</span>
            <span>Built for the IEEE ClimateChain Hackathon</span>
          </div>
          <div className="flex items-center space-x-6 text-[#69736B] font-mono text-[11px]">
            <span>Solidity ^0.8.20</span>
            <span>FastAPI Geo-Engine</span>
            <span>Sentinel-2 Multispectral</span>
            <span>EIP-712 Oracle</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
