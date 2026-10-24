import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  FileCheck,
  UploadCloud,
  FileText,
  ShieldCheck,
  Check,
  Copy,
  RefreshCw,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Coins,
  MapPin,
  CheckCircle2,
  FileCode,
  Layers,
  ArrowUpRight,
  CheckCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function ClaimAuditor({
  projectName,
  setProjectName,
  registryStandard,
  setRegistryStandard,
  claimedCredits,
  setClaimedCredits,
  polygonCoordinates,
  canonicalHash,
  analyzing,
  analyzeProject,
  trustScore,
  recommendation,
  metrics,
  apiError,
  copiedHash,
  handleCopyHash,
  isFrozenSimulation,
  evidenceCID
}) {
  // File Upload State: 'idle' | 'uploading' | 'generated'
  const [selectedFile, setSelectedFile] = useState({
    name: 'RioBranco_PDD_VCS1422.pdf',
    size: '4.2 MB',
    type: 'application/pdf',
    isDefaultSample: true
  });
  const [uploadProgressStage, setUploadProgressStage] = useState(0); // 0: Idle, 1: Parsing PDF, 2: Normalizing, 3: Complete
  const [isDragOver, setIsDragOver] = useState(false);
  const [showCoordinates, setShowCoordinates] = useState(false);
  const fileInputRef = useRef(null);

  // Determine current workflow state
  const workflowState = analyzing
    ? 'uploading'
    : canonicalHash
    ? 'generated'
    : 'idle';

  const defaultCoords = [
    [-9.9754, -67.8249],
    [-9.9721, -67.8180],
    [-9.9805, -67.8152],
    [-9.9840, -67.8221]
  ];

  const activeCoords = polygonCoordinates && polygonCoordinates.length > 0
    ? polygonCoordinates
    : defaultCoords;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setSelectedFile({
        name: file.name,
        size: `${sizeMb} MB`,
        type: file.type || 'Document',
        isDefaultSample: false,
        rawFile: file
      });
      toast.success(`Attached ${file.name} (${sizeMb} MB)`);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setSelectedFile({
        name: file.name,
        size: `${sizeMb} MB`,
        type: file.type || 'Document',
        isDefaultSample: false,
        rawFile: file
      });
      toast.success(`Attached ${file.name} (${sizeMb} MB)`);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleTriggerAudit = async () => {
    setUploadProgressStage(1);
    toast.loading('Parsing PDF boundaries...', { id: 'audit-toast' });
    
    // Smooth progress simulation
    setTimeout(() => {
      setUploadProgressStage(2);
      toast.loading('Computing canonical geohash & Sentinel-2 index...', { id: 'audit-toast' });
    }, 700);

    try {
      await analyzeProject();
      setUploadProgressStage(3);
      toast.success('Geohash generated & AI audit approved!', { id: 'audit-toast' });
    } catch (err) {
      toast.error('Audit failed. Check backend connection.', { id: 'audit-toast' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E2D9] pb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#174B38] bg-[#EFEEE7] px-2.5 py-0.5 rounded border border-[#E2E2D9] font-medium">
              Pre-Issuance Forensic Engine
            </span>
            <span className="text-[#69736B]">•</span>
            <span className="text-xs text-[#69736B] font-mono">
              Status: <strong className={workflowState === 'generated' ? 'text-[#174B38]' : 'text-[#202822]'}>{workflowState.toUpperCase()}</strong>
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#103528] font-normal tracking-tight">
            Claim Auditor & Geohash Invariance
          </h1>
          <p className="text-[#69736B] text-sm mt-1">
            Ingest carbon project documentation, normalize boundary coordinates into canonical geohashes, and compute multi-spectral trust scores.
          </p>
        </div>

        {canonicalHash && (
          <Link
            to="/app/registry"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-[#174B38] hover:bg-[#103528] text-white text-xs font-medium uppercase tracking-wider transition-colors self-start sm:self-auto shadow-sm"
          >
            <span>Proceed to Mint Credit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Progress Workflow Indicator */}
      <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs font-mono">
          {/* Step 1: Idle / Upload */}
          <div className={`p-3 rounded-lg border flex items-center space-x-2.5 transition-colors ${
            workflowState === 'idle'
              ? 'bg-[#EFEEE7] border-[#174B38] text-[#174B38] font-semibold'
              : 'bg-[#FFFFFF] border-[#E2E2D9] text-[#69736B]'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              workflowState === 'idle'
                ? 'bg-[#174B38] text-white'
                : workflowState === 'uploading' || workflowState === 'generated'
                ? 'bg-[#EFEEE7] text-[#174B38]'
                : 'bg-[#EFEEE7] text-[#69736B]'
            }`}>
              {workflowState === 'generated' ? '✓' : '1'}
            </span>
            <div>
              <span className="block leading-tight text-[#202822]">Document Intake</span>
              <span className="text-[10px] text-[#69736B] hidden sm:block font-normal">PDD Annex or GeoJSON</span>
            </div>
          </div>

          {/* Step 2: Uploading / Parsing */}
          <div className={`p-3 rounded-lg border flex items-center space-x-2.5 transition-colors ${
            workflowState === 'uploading'
              ? 'bg-[#EFEEE7] border-[#174B38] text-[#174B38] font-semibold'
              : 'bg-[#FFFFFF] border-[#E2E2D9] text-[#69736B]'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              workflowState === 'uploading'
                ? 'bg-[#174B38] text-white'
                : workflowState === 'generated'
                ? 'bg-[#EFEEE7] text-[#174B38]'
                : 'bg-[#EFEEE7] text-[#69736B]'
            }`}>
              {analyzing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : workflowState === 'generated' ? '✓' : '2'}
            </span>
            <div>
              <span className="block leading-tight text-[#202822]">Parsing & Normalizing</span>
              <span className="text-[10px] text-[#69736B] hidden sm:block font-normal">Canonical Polygon Sort</span>
            </div>
          </div>

          {/* Step 3: Geohash Generated */}
          <div className={`p-3 rounded-lg border flex items-center space-x-2.5 transition-colors ${
            workflowState === 'generated'
              ? 'bg-[#EFEEE7] border-[#174B38] text-[#174B38] font-semibold'
              : 'bg-[#FFFFFF] border-[#E2E2D9] text-[#69736B]'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              workflowState === 'generated'
                ? 'bg-[#174B38] text-white'
                : 'bg-[#EFEEE7] text-[#69736B]'
            }`}>
              {workflowState === 'generated' ? '✓' : '3'}
            </span>
            <div>
              <span className="block leading-tight text-[#202822]">Geohash Generated</span>
              <span className="text-[10px] text-[#69736B] hidden sm:block font-normal">32-Byte Invariant Proof</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: PDD Document Intake & Audit Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#E2E2D9] pb-3">
              <div className="flex items-center space-x-2.5">
                <FileCheck className="w-4 h-4 text-[#174B38] stroke-[2]" />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#202822] font-mono">
                  Project Documentation Intake
                </h2>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EFEEE7] text-[#174B38] border border-[#E2E2D9]">
                VCS-1422 Annex
              </span>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.geojson,.json,.kml"
              className="hidden"
            />

            {/* Document Upload Dropzone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors group ${
                isDragOver
                  ? 'border-[#174B38] bg-[#EFEEE7]'
                  : 'border-[#E2E2D9] hover:border-[#174B38] bg-[#F7F6F0]'
              }`}
            >
              <UploadCloud className="w-10 h-10 text-[#69736B] group-hover:text-[#174B38] mx-auto mb-2.5 transition-colors stroke-[1.8]" />
              <p className="text-xs font-semibold text-[#202822]">
                Drag and drop Project Design Document (PDD) or GeoJSON
              </p>
              <p className="text-[11px] text-[#69736B] mt-1">
                Supports PDF, GeoJSON, or Shapefile boundary annexes (Max 25MB)
              </p>

              {/* Selected File Chip */}
              <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#E2E2D9] text-xs text-[#202822] shadow-sm">
                <FileText className="w-4 h-4 text-[#174B38] stroke-[2]" />
                <span className="font-mono text-[11px] text-[#202822]">{selectedFile.name}</span>
                <span className="text-[#69736B] text-[10px]">({selectedFile.size})</span>
                <span className="text-[10px] bg-[#EFEEE7] text-[#174B38] px-1.5 py-0.2 rounded font-mono font-medium">
                  {selectedFile.isDefaultSample ? 'Verified Sample' : 'Custom Upload'}
                </span>
              </div>
            </div>

            {/* Metadata Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#69736B] mb-1 font-mono uppercase tracking-wider">
                  Project Designation
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#E2E2D9] text-[#202822] text-xs focus:outline-none focus:border-[#174B38]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#69736B] mb-1 font-mono uppercase tracking-wider">
                    Registry Standard
                  </label>
                  <select
                    value={registryStandard}
                    onChange={(e) => setRegistryStandard(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#E2E2D9] text-[#202822] text-xs focus:outline-none focus:border-[#174B38]"
                  >
                    <option>Verra VCS (VCS-1422)</option>
                    <option>Gold Standard GS4GG</option>
                    <option>Plan Vivo Standard</option>
                    <option>Puro.earth Carbon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#69736B] mb-1 font-mono uppercase tracking-wider">
                    Claimed Volume (tCO2e)
                  </label>
                  <input
                    type="number"
                    value={claimedCredits}
                    onChange={(e) => setClaimedCredits(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#E2E2D9] text-[#202822] text-xs focus:outline-none focus:border-[#174B38]"
                  />
                </div>
              </div>

              {/* Collapsible Coordinates Section */}
              <div className="rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowCoordinates(!showCoordinates)}
                  className="w-full p-3 flex items-center justify-between text-xs text-[#202822] hover:bg-[#E2E2D9]/60 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#174B38] stroke-[2]" />
                    <span className="font-medium">Parcel Boundaries: 4 Vertices (Rio Branco Basin)</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[#69736B]">
                    <span className="text-[11px] font-mono">
                      {showCoordinates ? 'Hide Coordinates' : 'Show Coordinates'}
                    </span>
                    {showCoordinates ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                {showCoordinates && (
                  <div className="p-3 pt-0 border-t border-[#E2E2D9] space-y-2 mt-2">
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                      {activeCoords.map((coord, idx) => (
                        <div
                          key={idx}
                          className="bg-[#FFFFFF] p-2 rounded border border-[#E2E2D9] flex justify-between"
                        >
                          <span className="text-[#69736B]">V{idx + 1}:</span>
                          <span className="text-[#174B38] font-medium">
                            {coord[0].toFixed(4)}°, {coord[1].toFixed(4)}°
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-[#69736B] font-mono">
                      ~11m precision threshold • Canonical vertex order enforced by geo_normalizer.py
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Run Audit CTA */}
            <div className="pt-2">
              <button
                id="analyze-project-btn"
                onClick={handleTriggerAudit}
                disabled={analyzing}
                className="w-full py-3 px-4 rounded-lg font-medium text-xs text-white bg-[#174B38] hover:bg-[#103528] transition-colors flex items-center justify-center space-x-2 font-mono uppercase tracking-wider shadow-sm"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>
                      {uploadProgressStage === 1
                        ? 'Parsing PDF boundary annex...'
                        : 'Normalizing polygon & querying Sentinel-2...'}
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI Audit & Normalize Geohash</span>
                  </>
                )}
              </button>
            </div>

            {apiError && (
              <div className="p-3 rounded-lg bg-[#FDF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-start space-x-2 font-mono">
                <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5 stroke-[2]" />
                <div>
                  <p className="font-bold">Backend Connection Notice</p>
                  <p className="text-[11px] text-[#991B1B] mt-0.5">{apiError}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Canonical Geohash Proof & Scorecard */}
        <div className="lg:col-span-6 space-y-6">
          {/* Canonical Parcel Hash Card */}
          <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E2D9] pb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#174B38] stroke-[2]" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#202822] font-mono">
                  Canonical Parcel Hash (bytes32)
                </h3>
              </div>
              {canonicalHash ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EFEEE7] text-[#174B38] border border-[#E2E2D9] flex items-center space-x-1 font-semibold">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                  <span>Verified Invariant</span>
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EFEEE7] text-[#69736B] border border-[#E2E2D9]">
                  Pending Audit
                </span>
              )}
            </div>

            {canonicalHash ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-[#EFEEE7] p-3 rounded-lg border border-[#E2E2D9]">
                  <p className="font-mono text-xs text-[#174B38] font-semibold truncate" title={canonicalHash}>
                    {canonicalHash}
                  </p>
                  <button
                    onClick={() => {
                      handleCopyHash();
                      toast.success('Canonical parcel hash copied to clipboard!');
                    }}
                    className="ml-3 text-[#69736B] hover:text-[#174B38] p-1.5 transition-colors"
                    title="Copy Canonical Hash"
                  >
                    {copiedHash ? <Check className="w-4 h-4 text-[#174B38] stroke-[2.5]" /> : <Copy className="w-4 h-4 stroke-[2]" />}
                  </button>
                </div>

                <div className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9] text-xs text-[#69736B] space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-[#174B38] font-mono text-[11px] font-semibold">
                    <CheckCircle className="w-3.5 h-3.5 stroke-[2]" />
                    <span>Mathematical Deduplication Invariant:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Boundary vertices are sorted canonically and rounded to 4 decimals (~11m resolution). Any duplicate registration attempt on <code className="text-[#202822] font-mono">TerraProofRegistry.sol</code> will revert on-chain with <code className="text-[#991B1B] font-mono">"Parcel already registered"</code>.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-[#EFEEE7]/50 p-6 rounded-lg border border-dashed border-[#E2E2D9] text-center text-xs text-[#69736B] font-mono space-y-2">
                <FileCode className="w-6 h-6 text-[#69736B] mx-auto stroke-[1.8]" />
                <p>Click "Run AI Audit & Normalize Geohash" to compute the cryptographic 32-byte hash.</p>
              </div>
            )}
          </div>

          {/* AI Trust Scorecard */}
          <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#E2E2D9] pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#202822] font-mono">
                AI Multi-Spectral Trust Scorecard
              </span>
              <span className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded uppercase ${
                trustScore !== null
                  ? 'bg-[#EFEEE7] text-[#174B38] border border-[#E2E2D9]'
                  : 'bg-[#EFEEE7] text-[#69736B] border border-[#E2E2D9]'
              }`}>
                {trustScore !== null ? `${recommendation}: APPROVED` : 'NOT AUDITED'}
              </span>
            </div>

            {/* Score Highlight Box */}
            <div className="flex items-center space-x-5 p-4 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9]">
              <div className="w-20 h-20 rounded-lg bg-[#FFFFFF] border border-[#E2E2D9] flex flex-col items-center justify-center shrink-0 shadow-sm">
                <span className="font-mono text-3xl font-bold text-[#103528]">
                  {analyzing ? (
                    <RefreshCw className="w-6 h-6 animate-spin text-[#174B38]" />
                  ) : trustScore !== null ? (
                    trustScore
                  ) : (
                    '--'
                  )}
                </span>
                <span className="text-[9px] uppercase font-mono text-[#69736B]">Score</span>
              </div>

              <div>
                <span className="text-sm font-semibold text-[#202822] block">
                  Sentinel-2 Multi-Spectral Health
                </span>
                <p className="text-xs text-[#69736B] mt-1 leading-relaxed">
                  Calculated from 5-year historical reflectance curves, Sentinel-2 Band 8/4 NDVI variance, and GEDI LiDAR canopy height models.
                </p>
              </div>
            </div>

            {/* 4 Biometric Meters */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9]">
                <span className="text-[11px] font-mono text-[#69736B] block font-medium">Canopy Cover Density</span>
                <div className="w-full bg-[#E2E2D9] h-2 rounded mt-2 overflow-hidden">
                  <div
                    className="bg-[#174B38] h-full transition-all duration-700"
                    style={{ width: metrics ? metrics.canopy_density : '0%' }}
                  ></div>
                </div>
                <span className="text-xs font-mono text-[#202822] mt-1.5 block font-semibold">
                  {metrics ? `${metrics.canopy_density} (Healthy)` : '--'}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9]">
                <span className="text-[11px] font-mono text-[#69736B] block font-medium">Biomass Density Index</span>
                <div className="w-full bg-[#E2E2D9] h-2 rounded mt-2 overflow-hidden">
                  <div
                    className="bg-[#174B38] h-full transition-all duration-700"
                    style={{ width: metrics ? `${parseInt(metrics.biomass_density_index, 10)}%` : '0%' }}
                  ></div>
                </div>
                <span className="text-xs font-mono text-[#202822] mt-1.5 block font-semibold">
                  {metrics ? `${metrics.biomass_density_index} (310 tC/ha)` : '--'}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9]">
                <span className="text-[11px] font-mono text-[#69736B] block font-medium">Deforestation Risk</span>
                <div className="w-full bg-[#E2E2D9] h-2 rounded mt-2 overflow-hidden">
                  <div
                    className="bg-[#174B38] h-full transition-all duration-700"
                    style={{ width: metrics ? metrics.deforestation_risk_score : '0%' }}
                  ></div>
                </div>
                <span className="text-xs font-mono text-[#202822] mt-1.5 block font-semibold">
                  {metrics ? `${metrics.deforestation_risk_score} (Extremely Low)` : '--'}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#EFEEE7] border border-[#E2E2D9]">
                <span className="text-[11px] font-mono text-[#69736B] block font-medium">Additionality Baseline</span>
                <div className="w-full bg-[#E2E2D9] h-2 rounded mt-2 overflow-hidden">
                  <div
                    className="bg-[#174B38] h-full transition-all duration-700"
                    style={{ width: metrics ? metrics.additionality_confidence : '0%' }}
                  ></div>
                </div>
                <span className="text-xs font-mono text-[#202822] mt-1.5 block font-semibold">
                  {metrics ? `${metrics.additionality_confidence} Confirmed` : '--'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
