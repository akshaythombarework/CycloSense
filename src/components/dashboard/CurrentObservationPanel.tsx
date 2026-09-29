"use client";

import React from "react";
import { CycloneObservation } from "@/types/cyclone";
import { Navigation, Compass } from "lucide-react";
import { DataProvenanceBadge } from "../ui/DataProvenanceBadge";

interface CurrentObservationPanelProps {
  observation: CycloneObservation;
  cycloneName: string;
}

export const CurrentObservationPanel: React.FC<CurrentObservationPanelProps> = ({
  observation,
  cycloneName: _cycloneName,
}) => {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] flex flex-col h-full overflow-hidden">
      {/* Header with Data Provenance */}
      <div className="px-3 py-2 bg-[#0F172A] border-b border-[#334155] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#0284C7]" />
          <h3 className="text-xs font-mono font-bold text-[#F1F5F9] tracking-wider uppercase">
            CURRENT OBSERVATION
          </h3>
        </div>
        <DataProvenanceBadge
          source="INSAT-3DR + MetOp ASCAT"
          timestamp={observation.timestamp}
          resolution="4.0 km"
          processingState="Fused Observation (Level-2B)"
          quality="VALID"
        />
      </div>

      {/* Main Scientific Metrics Grid */}
      <div className="p-3 space-y-2.5 overflow-y-auto flex-1">
        {/* Category banner */}
        <div className="p-2.5 bg-[#0F172A]/60 border border-[#334155] rounded-[4px] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wide">
            IMD INTENSITY CLASSIFICATION:
          </span>
          <span className="text-xs font-mono font-bold text-[#B91C1C]">
            {observation.category.toUpperCase()}
          </span>
        </div>

        {/* Primary Twin Values: Wind & Pressure */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-[#0F172A]/60 border border-[#334155] rounded-[4px] flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                MAX SUSTAINED WIND
              </span>
              <span className="text-xs font-mono font-bold text-[#15803D] ml-auto">
                +13 kt (6h)
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 my-1">
              <span className="text-3xl font-mono font-bold text-[#B91C1C]">
                {observation.maxSustainedWindKts}
              </span>
              <span className="text-xs font-mono text-[#94A3B8]">kt</span>
            </div>
            <div className="mt-1 text-[11px] font-mono text-[#94A3B8] border-t border-[#334155] pt-1">
              GUSTS: 165 kt • 1-min / 3-min avg
            </div>
          </div>

          <div className="p-3 bg-[#0F172A]/60 border border-[#334155] rounded-[4px] flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                CENTRAL PRESSURE
              </span>
              <span className="text-xs font-mono font-bold text-[#B91C1C] ml-auto">
                -14 hPa (6h)
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 my-1">
              <span className="text-3xl font-mono font-bold text-[#F1F5F9]">
                {observation.centralPressureHpa}
              </span>
              <span className="text-xs font-mono text-[#94A3B8]">hPa</span>
            </div>
            <div className="mt-1 text-[11px] font-mono text-[#94A3B8] border-t border-[#334155] pt-1">
              ENVIRONMENT: 1008 hPa
            </div>
          </div>
        </div>

        {/* Geographic Coordinates & Movement */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 bg-[#0F172A]/60 border border-[#334155] rounded-[4px]">
            <span className="text-[10px] font-mono text-[#94A3B8] uppercase block mb-1">
              ESTIMATED CENTRE (LAT / LON)
            </span>
            <div className="text-base font-mono font-bold text-[#F1F5F9]">
              {observation.coordinate.formattedLat}
            </div>
            <div className="text-base font-mono font-bold text-[#94A3B8]">
              {observation.coordinate.formattedLon}
            </div>
          </div>

          <div className="p-2.5 bg-[#0F172A]/60 border border-[#334155] rounded-[4px] flex flex-col justify-between">
            <span className="text-[10px] font-mono text-[#94A3B8] uppercase block mb-1">
              STEERING MOTION
            </span>
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#15803D]" />
              <span className="text-base font-mono font-bold text-[#F1F5F9]">
                {observation.movementDirection}
              </span>
              <span className="text-xs font-mono text-[#94A3B8]">
                @ {observation.movementSpeedKts} kt
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#94A3B8]">
              {(observation.movementSpeedKts * 1.852).toFixed(1)} km/h translation
            </span>
          </div>
        </div>

        {/* Dvorak T-Number & CI */}
        <div className="p-2.5 bg-[#0F172A]/60 border border-[#334155] rounded-[4px] flex items-center justify-between text-xs font-mono">
          <span className="text-[#94A3B8]">DVORAK T-NUMBER / CI:</span>
          <span className="text-[#F1F5F9] font-bold">
            T{observation.structure.dvorakTNumber.toFixed(1)} / CI{observation.structure.currentIntensityCI.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};
