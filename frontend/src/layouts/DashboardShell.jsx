import React, { useState } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import {
  TreePine,
  LayoutDashboard,
  ShieldCheck,
  Satellite,
  Coins,
  Wallet,
  Menu,
  X,
  ExternalLink,
  Lock,
  Flame,
  ArrowLeft,
  CheckCircle2,
  Database,
  Clock
} from 'lucide-react';

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export default function DashboardShell({
  walletAddress,
  connectWallet,
  networkName = 'Sepolia (11155111)',
  isFrozenSimulation = false,
  trustScore = null
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      name: 'Overview',
      path: '/app/overview',
      icon: LayoutDashboard,
      description: 'Portfolio & Climate Metrics'
    },
    {
      name: 'Claim Auditor',
      path: '/app/auditor',
      icon: ShieldCheck,
      description: 'Pre-Issuance MRV & Geohash'
    },
    {
      name: 'Forest Watch',
      path: '/app/watch',
      icon: Satellite,
      description: 'Live Geospatial Telemetry'
    },
    {
      name: 'Credit Registry',
      path: '/app/registry',
      icon: Coins,
      description: 'ERC-1155 Mint & Risk Shock'
    },
    {
      name: 'Evidence Vault',
      path: '/app/vault',
      icon: Database,
      description: 'IPFS Anchored Records'
    },
    {
      name: 'Audit Trail',
      path: '/app/audit',
      icon: Clock,
      description: 'Lifecycle Provenance Feed'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#202822] flex flex-col font-sans selection:bg-[#174B38] selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E2E2D9] px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] text-[#69736B] hover:text-[#202822]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <Link to="/app/overview" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] flex items-center justify-center text-[#174B38]">
                <TreePine className="w-4 h-4 stroke-[2]" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-base tracking-tight text-[#202822]">
                  TerraProof <span className="text-[#174B38]">AI</span>
                </span>
                <span className="hidden lg:inline-block px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider bg-[#EFEEE7] text-[#174B38] rounded border border-[#E2E2D9]">
                  Climate Intelligence
                </span>
              </div>
            </Link>

            <Link
              to="/"
              className="hidden sm:flex items-center space-x-1 text-xs text-[#69736B] hover:text-[#174B38] transition-colors ml-2 pl-3 border-l border-[#E2E2D9]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Landing</span>
            </Link>
          </div>

          {/* Right Status Actions */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Environmental Status Banner */}
            {isFrozenSimulation ? (
              <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#FDF2F2] border border-[#FCA5A5] text-xs text-[#991B1B] font-mono">
                <Flame className="w-3.5 h-3.5 text-[#DC2626]" />
                <span className="font-semibold">STATUS: FROZEN</span>
              </div>
            ) : trustScore !== null ? (
              <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#EFEEE7] border border-[#E2E2D9] text-xs text-[#174B38] font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#174B38]"></span>
                <span>AUDIT: {trustScore}/100</span>
              </div>
            ) : null}

            {/* Network pill */}
            <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#EFEEE7] border border-[#E2E2D9] text-xs text-[#202822] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#174B38]"></span>
              <span className="text-[#69736B]">Net:</span>
              <span>{networkName}</span>
            </div>

            {/* Smart Contract Badge */}
            <div className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#EFEEE7] border border-[#E2E2D9] text-xs text-[#69736B] font-mono">
              <Lock className="w-3.5 h-3.5 text-[#69736B]" />
              <span className="text-[#69736B]">Registry:</span>
              <span title={CONTRACT_ADDRESS} className="text-[#202822]">0x5FbD...80aa3</span>
            </div>

            {/* Connect Wallet */}
            <button
              id="connect-wallet-btn"
              onClick={connectWallet}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                walletAddress
                  ? 'bg-[#EFEEE7] text-[#174B38] border border-[#E2E2D9] hover:bg-[#E2E2D9]'
                  : 'bg-[#174B38] hover:bg-[#103528] text-white font-medium shadow-sm'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>
                {walletAddress
                  ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
                  : 'Connect Wallet'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Desktop) in Muted Stone Palette */}
        <aside className="hidden md:flex md:w-64 flex-col justify-between border-r border-[#E2E2D9] bg-[#EFEEE7] p-4 shrink-0">
          <div className="space-y-6">
            <div>
              <p className="px-3 text-[10px] font-mono uppercase tracking-widest text-[#69736B] mb-2 font-semibold">
                Forensic Platform
              </p>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs transition-colors ${
                        isActive
                          ? 'bg-[#FFFFFF] text-[#174B38] font-semibold border border-[#E2E2D9] shadow-sm'
                          : 'text-[#69736B] hover:text-[#202822] hover:bg-[#E2E2D9]/60 font-medium'
                      }`}
                    >
                      <Icon className={`w-4 h-4 stroke-[1.8] ${isActive ? 'text-[#174B38]' : 'text-[#69736B]'}`} />
                      <div className="text-left">
                        <span className="block leading-tight">{item.name}</span>
                        <span className="block text-[10px] text-[#69736B] font-normal leading-tight mt-0.5">
                          {item.description}
                        </span>
                      </div>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* System Telemetry Widget */}
            <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] text-xs font-mono space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-[#69736B]">
                <span>Satellite Feed</span>
                <span className="text-[#174B38] font-semibold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#174B38]"></span>
                  <span>ONLINE</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-[#69736B]">
                <span>Oracle Sync</span>
                <span className="text-[#202822]">Sentinel-2B</span>
              </div>
              <div className="flex items-center justify-between text-[#69736B]">
                <span>API Gateway</span>
                <span className="text-[#202822]">port:8000</span>
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-4 border-t border-[#E2E2D9] text-[11px] text-[#69736B] font-mono">
            <p className="font-semibold text-[#202822]">TerraProof AI v2.4</p>
            <p className="text-[#69736B]">IEEE ClimateChain Finalist</p>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/40 flex">
            <div className="w-72 bg-[#EFEEE7] border-r border-[#E2E2D9] p-5 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E2D9] mb-4">
                  <div className="flex items-center space-x-2">
                    <TreePine className="w-5 h-5 text-[#174B38]" />
                    <span className="font-semibold text-sm text-[#202822]">Navigation</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded text-[#69736B] hover:text-[#202822]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-[#FFFFFF] text-[#174B38] font-semibold border border-[#E2E2D9] shadow-sm'
                            : 'text-[#69736B] hover:text-[#202822] hover:bg-[#E2E2D9]/60'
                        }`}
                      >
                        <Icon className="w-4 h-4 stroke-[1.8]" />
                        <span>{item.name}</span>
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-[#E2E2D9] text-xs text-[#69736B]">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-1.5 text-[#69736B] hover:text-[#174B38]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Public Landing</span>
                </Link>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-[#F7F6F0] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
