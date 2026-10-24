import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Database,
  Search,
  Filter,
  FileText,
  Satellite,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Lock,
  Layers,
  Sparkles,
  Flame,
  FileCheck,
  CheckCircle2
} from 'lucide-react';

export default function EvidenceVault({
  canonicalHash,
  evidenceCID,
  projectName = 'Rio Branco Agroforestry Preservation',
  trustScore
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [copiedCid, setCopiedCid] = useState(null);

  // Default IPFS evidence vault rows (labeled Demo Data / IPFS Anchored Records)
  const defaultRecords = [
    {
      id: 'EV-001',
      type: 'PDD Document (PDF)',
      icon: FileText,
      projectName: 'Rio Branco Agroforestry Preservation',
      date: '2026-10-24 00:15 UTC',
      cid: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi',
      oracleSigner: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      status: 'VERIFIED',
      sensor: 'Verra VCS-1422 Annex',
      fileSize: '4.2 MB'
    },
    {
      id: 'EV-002',
      type: 'Sentinel-2 L2A Multispectral',
      icon: Satellite,
      projectName: 'Rio Branco Agroforestry Preservation',
      date: '2026-10-23 18:40 UTC',
      cid: 'bafybeihdwdcefgh4dqkjv67uacm3m46e5gn7pq3vqol7zoxw4nynfcox74',
      oracleSigner: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      status: 'VERIFIED',
      sensor: 'Sentinel-2B MSI (10m)',
      fileSize: '184 MB'
    },
    {
      id: 'EV-003',
      type: 'GEDI LiDAR Canopy Height',
      icon: Layers,
      projectName: 'Rio Branco Agroforestry Preservation',
      date: '2026-10-22 14:10 UTC',
      cid: 'bafybeib7h7x6s7f6e3m6n2m5q2j4z5x8c9v0b1n2m3k4l5j6h7g8f9e0a',
      oracleSigner: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      status: 'VERIFIED',
      sensor: 'NASA GEDI L2B Beam 0110',
      fileSize: '52 MB'
    },
    {
      id: 'EV-004',
      type: 'Thermal Deforestation Anomaly',
      icon: Flame,
      projectName: 'Rio Branco Agroforestry Preservation',
      date: '2026-10-21 09:30 UTC',
      cid: 'bafybeic9x8w7v6u5t4s3r2q1p0o9n8m7l6k5j4i3h2g1f0e9d8c7b6a5z',
      oracleSigner: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      status: 'VERIFIED',
      sensor: 'VIIRS / MODIS Thermal Radar',
      fileSize: '28 MB'
    },
    {
      id: 'EV-005',
      type: 'EIP-712 Oracle Attestation',
      icon: ShieldCheck,
      projectName: 'Rio Branco Agroforestry Preservation',
      date: '2026-10-20 22:15 UTC',
      cid: 'bafybeie5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d',
      oracleSigner: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      status: 'VERIFIED',
      sensor: 'TerraProof AI Satellite Oracle',
      fileSize: '1.4 KB'
    }
  ];

  // If a live audit occurred, prepend the dynamically generated evidence CID
  const allRecords = evidenceCID
    ? [
        {
          id: 'LIVE-AUDIT',
          type: 'Live AI Multi-Spectral Audit',
          icon: Sparkles,
          projectName: projectName,
          date: 'Just now (Live Session)',
          cid: evidenceCID.replace('ipfs://', ''),
          oracleSigner: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          status: 'LIVE SESSION',
          sensor: 'Sentinel-2B Fusion',
          fileSize: 'Dynamic Pack',
          isLive: true
        },
        ...defaultRecords
      ]
    : defaultRecords;

  const handleCopy = (cid) => {
    navigator.clipboard.writeText(cid);
    setCopiedCid(cid);
    toast.success('IPFS Content Hash copied to clipboard!');
    setTimeout(() => setCopiedCid(null), 2000);
  };

  // Filter records
  const filteredRecords = allRecords.filter((rec) => {
    const matchesSearch =
      rec.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.cid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.sensor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === 'ALL' ||
      (selectedType === 'PDD' && rec.type.includes('PDD')) ||
      (selectedType === 'SATELLITE' && rec.type.includes('Sentinel')) ||
      (selectedType === 'LIDAR' && rec.type.includes('LiDAR')) ||
      (selectedType === 'ORACLE' && rec.type.includes('Oracle'));

    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E2D9] pb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#174B38] bg-[#EFEEE7] px-2.5 py-0.5 rounded border border-[#E2E2D9] font-medium">
              IPFS Decentralized Storage
            </span>
            <span className="text-[#69736B]">•</span>
            <span className="text-xs text-[#69736B] font-mono">Demo Data / IPFS Anchored Records</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#103528] font-normal tracking-tight">
            Evidence Vault & Telemetry Ledger
          </h1>
          <p className="text-[#69736B] text-sm mt-1">
            Searchable, cryptographically-anchored repository of MRV project documentation, raw multi-spectral satellite imagery, and EIP-712 oracle attestations.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#E2E2D9] text-xs font-mono text-[#69736B] flex items-center space-x-2 shadow-sm">
            <Database className="w-3.5 h-3.5 text-[#174B38] stroke-[2]" />
            <span>Gateway: ipfs.io</span>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm">
          <span className="text-[11px] font-mono text-[#69736B] block uppercase font-medium">Anchored Objects</span>
          <span className="text-2xl font-bold font-mono text-[#202822] mt-1 block">1,420</span>
          <span className="text-[10px] text-[#174B38] font-medium">IPFS Pinning Active</span>
        </div>

        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm">
          <span className="text-[11px] font-mono text-[#69736B] block uppercase font-medium">Total Forensic Data</span>
          <span className="text-2xl font-bold font-mono text-[#202822] mt-1 block">284.6 GB</span>
          <span className="text-[10px] text-[#69736B]">Filecoin Network</span>
        </div>

        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm">
          <span className="text-[11px] font-mono text-[#69736B] block uppercase font-medium">Cryptographic Hashes</span>
          <span className="text-2xl font-bold font-mono text-[#174B38] mt-1 block">100% Invariant</span>
          <span className="text-[10px] text-[#69736B]">SHA-256 / Keccak-256</span>
        </div>

        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm">
          <span className="text-[11px] font-mono text-[#69736B] block uppercase font-medium">Oracle Authority</span>
          <span className="text-2xl font-bold font-mono text-[#202822] mt-1 block">0x7099...</span>
          <span className="text-[10px] text-[#174B38] font-medium">EIP-712 Authorized</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#69736B] absolute left-3 top-1/2 -translate-y-1/2 stroke-[2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by CID, Project, or Type..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#E2E2D9] text-xs text-[#202822] placeholder-[#69736B] focus:outline-none focus:border-[#174B38]"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto font-mono text-xs">
          {[
            { id: 'ALL', label: 'All Evidence' },
            { id: 'PDD', label: 'PDD Docs' },
            { id: 'SATELLITE', label: 'Sentinel-2' },
            { id: 'LIDAR', label: 'LiDAR' },
            { id: 'ORACLE', label: 'Oracle EIP-712' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`px-3 py-1.5 rounded-md text-[11px] transition-colors ${
                selectedType === tab.id
                  ? 'bg-[#174B38] text-white shadow-sm font-medium'
                  : 'bg-[#EFEEE7] text-[#69736B] hover:text-[#202822]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Evidence Table - Clean & Searchable */}
      <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E2D9] pb-3">
          <span className="text-xs uppercase font-mono tracking-wider text-[#69736B] font-medium">
            Recorded Evidence Artifacts ({filteredRecords.length})
          </span>
          <span className="text-[10px] font-mono text-[#69736B]">
            Demonstration Dataset • Cryptographically Anchored
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#E2E2D9] text-[#69736B] text-[11px] uppercase tracking-wider bg-[#EFEEE7]/40">
                <th className="py-2.5 px-3 font-semibold">Evidence Type</th>
                <th className="py-2.5 px-3 font-semibold">Sensor / Source</th>
                <th className="py-2.5 px-3 font-semibold">Observation Date</th>
                <th className="py-2.5 px-3 font-semibold">Content Hash (IPFS CID)</th>
                <th className="py-2.5 px-3 font-semibold">Oracle Signer</th>
                <th className="py-2.5 px-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E2D9]">
              {filteredRecords.map((item) => {
                const Icon = item.icon;
                return (
                  <tr key={item.id} className="hover:bg-[#EFEEE7]/50 transition-colors group">
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          item.isLive ? 'bg-[#174B38] text-white' : 'bg-[#EFEEE7] text-[#174B38]'
                        }`}>
                          <Icon className="w-3.5 h-3.5 stroke-[2]" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="font-semibold text-[#202822] font-sans">{item.type}</span>
                            {item.isLive && (
                              <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-[#174B38] text-[9px] font-mono font-bold">
                                LIVE
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#69736B]">{item.projectName}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-[#202822]">
                      <span className="font-medium">{item.sensor}</span>
                      <span className="block text-[10px] text-[#69736B]">{item.fileSize}</span>
                    </td>

                    <td className="py-3 px-3 text-[#69736B]">
                      <span>{item.date}</span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2 bg-[#EFEEE7] px-2.5 py-1.5 rounded-md border border-[#E2E2D9] max-w-[240px]">
                        <span className="text-[#202822] truncate text-[11px]" title={item.cid}>
                          {item.cid}
                        </span>
                        <button
                          onClick={() => handleCopy(item.cid)}
                          className="text-[#69736B] hover:text-[#174B38] p-0.5 shrink-0 transition-colors"
                          title="Copy IPFS CID"
                        >
                          {copiedCid === item.cid ? (
                            <Check className="w-3.5 h-3.5 text-[#174B38] stroke-[2.5]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 stroke-[2]" />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-1.5 text-[#202822] text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#174B38] stroke-[2]" />
                        <span>{item.oracleSigner.substring(0, 8)}...</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleCopy(item.cid)}
                        className="px-2.5 py-1 rounded-md bg-[#EFEEE7] hover:bg-[#E2E2D9] border border-[#E2E2D9] text-[11px] text-[#174B38] font-medium transition-colors inline-flex items-center space-x-1"
                      >
                        <span>Copy Hash</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
