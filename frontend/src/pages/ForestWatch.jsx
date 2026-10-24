import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Marker } from 'react-leaflet';
import L from 'leaflet';
import {
  Satellite,
  Layers,
  Compass,
  Eye,
  MapPin,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';

// Restrained clean map pin icon
const pinIcon = L.divIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="width: 12px; height: 12px; background: #174B38; border: 2px solid #FFFFFF; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.25);"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

export default function ForestWatch({
  polygonCoordinates,
  activeLayer,
  setActiveLayer,
  ndviMean = 0.74,
  canonicalHash,
  isFrozenSimulation,
  trustScore,
  metrics
}) {
  const [showHud, setShowHud] = useState(true);
  const center = [-9.9754, -67.8249];

  // Coordinates array for Leaflet Polygon [lat, lng]
  const leafletCoords = polygonCoordinates && polygonCoordinates.length > 0
    ? polygonCoordinates
    : [
        [-9.9754, -67.8249],
        [-9.9721, -67.8180],
        [-9.9805, -67.8152],
        [-9.9840, -67.8221]
      ];

  // Thin, crisp lines for boundaries as requested
  const polygonPathOptions = {
    color: isFrozenSimulation ? '#B91C1C' : '#174B38',
    fillColor: isFrozenSimulation ? '#DC2626' : '#174B38',
    fillOpacity: isFrozenSimulation ? 0.20 : 0.14,
    weight: 1.5,
    dashArray: isFrozenSimulation ? '3, 3' : null
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E2D9] pb-5">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#103528] font-normal tracking-tight">
            Forest Watch GIS
          </h1>
          <p className="text-[#69736B] text-sm mt-1">
            Real-time orbital telemetry over Rio Branco forest reserve using high-resolution Esri World Imagery & Sentinel-2 overlays.
          </p>
        </div>

        {/* Sensor Mode Switcher */}
        <div className="flex items-center space-x-1.5 p-1 rounded-lg bg-[#FFFFFF] border border-[#E2E2D9] text-xs font-mono shadow-sm">
          <button
            onClick={() => setActiveLayer('optical')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeLayer === 'optical'
                ? 'bg-[#174B38] text-white shadow-sm'
                : 'text-[#69736B] hover:text-[#202822]'
            }`}
          >
            Optical RGB
          </button>
          <button
            onClick={() => setActiveLayer('ndvi')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeLayer === 'ndvi'
                ? 'bg-[#174B38] text-white shadow-sm'
                : 'text-[#69736B] hover:text-[#202822]'
            }`}
          >
            NDVI Vegetation
          </button>
          <button
            onClick={() => setActiveLayer('thermal')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeLayer === 'thermal'
                ? 'bg-[#991B1B] text-white shadow-sm'
                : 'text-[#69736B] hover:text-[#202822]'
            }`}
          >
            Thermal Deforest
          </button>
        </div>
      </div>

      {/* Main Map Container - The Visual Centerpiece */}
      <div className="relative rounded-xl overflow-hidden border border-[#E2E2D9] bg-[#FFFFFF] shadow-sm h-[580px] flex flex-col">
        {/* Leaflet Map with free Esri World Imagery */}
        <div className="flex-1 w-full h-full relative">
          <MapContainer
            center={center}
            zoom={14}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            {/* Esri World Imagery Satellite Map */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS Community'
            />

            {/* Project Boundary Polygon - Crisp Thin Lines */}
            <Polygon positions={leafletCoords} pathOptions={polygonPathOptions}>
              <Popup>
                <div className="p-2 text-xs space-y-1 font-sans">
                  <p className="font-semibold text-[#174B38] uppercase font-mono">
                    Rio Branco Agroforestry
                  </p>
                  <p className="text-[#202822]">Monitored Parcel: 1,200 ha</p>
                  <p className="font-mono text-[10px] text-[#69736B]">
                    Status: {isFrozenSimulation ? 'FROZEN (Health < 50)' : 'ACTIVE & VERIFIED'}
                  </p>
                </div>
              </Popup>
            </Polygon>

            {/* Parcel Center Marker */}
            <Marker position={center} icon={pinIcon}>
              <Popup>
                <div className="p-2 text-xs font-sans">
                  <p className="font-semibold text-[#202822]">Centroid: Rio Branco Basin</p>
                  <p className="font-mono text-[#69736B] mt-0.5">-9.9754° S, -67.8249° W</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>

          {/* Floating Telemetry HUD Overlay (Pure White, Thin 1px Border) */}
          {showHud && (
            <div className="absolute top-4 right-4 z-[1000] w-80 p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E2D9] shadow-md text-xs space-y-3 font-mono text-[#202822]">
              <div className="flex items-center justify-between border-b border-[#E2E2D9] pb-2">
                <span className="text-[#174B38] font-semibold flex items-center space-x-1.5">
                  <Satellite className="w-3.5 h-3.5 stroke-[2]" />
                  <span>Sentinel-2B Telemetry</span>
                </span>
                <span className="text-[10px] text-[#69736B]">MSI Level-2A</span>
              </div>

              <div className="space-y-1.5 text-[#202822] text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#69736B]">Pass Timestamp:</span>
                  <span>2026-10-24 00:15 UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#69736B]">Ground Resolution:</span>
                  <span>10m / Pixel</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#69736B]">Cloud Obstruction:</span>
                  <span className="text-[#174B38] font-semibold">1.4% (Clear)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#69736B]">NDVI Mean Index:</span>
                  <span className={isFrozenSimulation ? 'text-[#991B1B] font-bold' : 'text-[#174B38] font-semibold'}>
                    {isFrozenSimulation ? '0.34 (Depleted)' : `${ndviMean || 0.74} (Dense)`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#69736B]">LiDAR Biomass:</span>
                  <span>310 tC/ha</span>
                </div>
              </div>

              <div className={`p-2.5 rounded-lg text-[10px] flex items-center space-x-1.5 border ${
                isFrozenSimulation
                  ? 'bg-[#FDF2F2] text-[#991B1B] border-[#FCA5A5]'
                  : 'bg-[#EFEEE7] text-[#174B38] border-[#E2E2D9]'
              }`}>
                {isFrozenSimulation ? <Flame className="w-3.5 h-3.5 shrink-0 stroke-[2]" /> : <ShieldCheck className="w-3.5 h-3.5 shrink-0 stroke-[2]" />}
                <span>
                  {isFrozenSimulation
                    ? 'High-risk disturbance alert: health score < 50.'
                    : 'Reflectance signature aligns with pristine primary canopy.'}
                </span>
              </div>
            </div>
          )}

          {/* Bottom GIS Coordinate Bar */}
          <div className="absolute bottom-4 left-4 z-[1000] p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E2E2D9] shadow-sm text-xs font-mono flex items-center space-x-4 text-[#202822]">
            <span className="flex items-center space-x-1 text-[#174B38] font-medium">
              <Compass className="w-3.5 h-3.5 stroke-[2]" />
              <span>Centroid: [-9.9754, -67.8249]</span>
            </span>
            <span className="text-[#E2E2D9]">|</span>
            <span className="text-[#69736B]">Acre Reserve: 1,200 ha</span>
            <span className="text-[#E2E2D9]">|</span>
            <span className="text-[#69736B]">Esri World Imagery Satellite</span>
          </div>
        </div>
      </div>
    </div>
  );
}
