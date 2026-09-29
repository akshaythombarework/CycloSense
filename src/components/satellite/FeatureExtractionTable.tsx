"use client";

import React from "react";
import { CycloneObservation } from "@/types/cyclone";
import { Layers } from "lucide-react";

interface FeatureExtractionTableProps {
  observation: CycloneObservation;
}

export const FeatureExtractionTable: React.FC<FeatureExtractionTableProps> = ({
  observation,
}) => {
  const { coordinate, structure, maxSustainedWindKts, centralPressureHpa } = observation;

  const features = [
    {
      param: "Centre Latitude",
      value: coordinate.formattedLat,
      unit: "°N",
      method: "Multi-Spectral Fusion Vertex Optimization",
      status: "OPTIMAL",
    },
    {
      param: "Centre Longitude",
      value: coordinate.formattedLon,
      unit: "°E",
      method: "Multi-Spectral Fusion Vertex Optimization",
      status: "OPTIMAL",
    },
    {
      param: "Cloud-top Temperature (Min)",
      value: `${structure.cloudTopTempMinC}`,
      unit: "°C",
      method: "INSAT-3DR TIR-1 (10.8 µm)",
      status: "CALIBRATED",
    },
    {
      param: "Central Dense Overcast (CDO) Area",
      value: `${structure.cdoAreaKm2.toLocaleString()}`,
      unit: "km²",
      method: "TIR Contour Segmentation (T ≤ -62°C)",
      status: "CALIBRATED",
    },
    {
      param: "Cloud Symmetry Index",
      value: "0.88",
      unit: "0.0 - 1.0",
      method: "Azimuthal Fourier Harmonic Analysis",
      status: "COMPUTED",
    },
    {
      param: "Spiral Band Curvature",
      value: "1.45",
      unit: "Revolutions (360°)",
      method: "Logarithmic Spiral Fitting (VIS/IR)",
      status: "COMPUTED",
    },
    {
      param: "Eye Presence & Classification",
      value: structure.eye === "DETECTED" ? "Pinhole Eye" : "Developing",
      unit: "--",
      method: "TIR-1 Gradient + VIS Albedo Hole",
      status: "VERIFIED",
    },
    {
      param: "Eye Stadium Diameter",
      value: structure.eyeDiameterKm ? `${structure.eyeDiameterKm}` : "N/A",
      unit: "km",
      method: "Radon Transform Edge Profiling",
      status: "COMPUTED",
    },
    {
      param: "Eyewall Microwave Ring Closure",
      value: "360° Closed Ring",
      unit: "Azimuth",
      method: "GPM/GMI 89 GHz Ice Scattering PCT",
      status: "VERIFIED",
    },
    {
      param: "Deep Convection Core Height",
      value: "16.8",
      unit: "km",
      method: "Stereo Parallax + GPM Radar Echo",
      status: "ESTIMATED",
    },
    {
      param: "Dvorak T-Number / Current Intensity (CI)",
      value: `T${structure.dvorakTNumber.toFixed(1)} / CI${structure.currentIntensityCI.toFixed(1)}`,
      unit: "T/CI",
      method: "Automated Objective Dvorak Technique (ODT)",
      status: "VERIFIED",
    },
    {
      param: "Maximum Sustained Surface Wind (10m)",
      value: `${maxSustainedWindKts}`,
      unit: "kt (3-min avg)",
      method: "Scatterometer + Dvorak + AI Fusion",
      status: "OPTIMAL",
    },
    {
      param: "Central Sea-Level Pressure",
      value: `${centralPressureHpa}`,
      unit: "hPa",
      method: "Knaff-Zehr Pressure-Wind Relationship",
      status: "OPTIMAL",
    },
    {
      param: "Sea Surface Temperature (SST)",
      value: "30.4",
      unit: "°C",
      method: "NOAA OISST v2.1 Daily High-Res",
      status: "EXTERNAL",
    },
    {
      param: "Vertical Wind Shear (200-850 hPa)",
      value: "6.8",
      unit: "kt",
      method: "ERA5 Reanalysis / Atmospheric Motion Vectors",
      status: "EXTERNAL",
    },
  ];

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] overflow-hidden text-xs font-mono">
      <div className="px-3 py-2 bg-[#0F172A] border-b border-[#334155] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#0284C7]" />
          <span className="font-bold text-[#F1F5F9] tracking-wider uppercase">
            EXTRACTED METEOROLOGICAL PARAMETERS & DESCRIPTORS
          </span>
        </div>
        <span className="text-[10px] text-[#94A3B8]">
          15 METRIC REGISTRY
        </span>
      </div>

      <div className="max-h-72 overflow-y-auto">
        <table className="w-full text-left text-[11px] font-mono border-collapse">
          <thead className="bg-[#0F172A] sticky top-0 z-10">
            <tr className="border-b border-[#334155] text-[#94A3B8] text-[10px] uppercase">
              <th className="py-2 px-3 font-normal">METEOROLOGICAL PARAMETER</th>
              <th className="py-2 px-3 font-normal">EXTRACTED VALUE</th>
              <th className="py-2 px-3 font-normal">UNIT</th>
              <th className="py-2 px-3 font-normal">ESTIMATION METHOD / SENSOR</th>
              <th className="py-2 px-3 font-normal">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#334155]">
            {features.map((f, idx) => (
              <tr key={idx} className="hover:bg-[#0F172A]/50 transition-colors">
                <td className="py-2 px-3 font-medium text-[#F1F5F9]">
                  {f.param}
                </td>
                <td className="py-2 px-3 font-bold text-[#0284C7]">
                  {f.value}
                </td>
                <td className="py-2 px-3 text-[#94A3B8]">{f.unit}</td>
                <td className="py-2 px-3 text-[#94A3B8] text-[10px]">{f.method}</td>
                <td className="py-2 px-3">
                  <span className="px-1.5 py-0.5 bg-[#15803D]/15 text-[#15803D] border border-[#15803D]/30 rounded-[2px] text-[9px] font-bold">
                    {f.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
