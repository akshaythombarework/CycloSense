"use client";

import React from "react";
import { CycloneObservation } from "@/types/cyclone";
import { Wind, Gauge, Navigation, Compass, Layers } from "lucide-react";
import { ScientificMetric } from "../ui/ScientificMetric";
import { DataProvenanceBadge } from "../ui/DataProvenanceBadge";

interface CurrentObservationPanelProps {
  observation: CycloneObservation;
  cycloneName: string;
}

export const CurrentObservationPanel: React.FC<CurrentObservationPanelProps> = ({
  observation,
  cycloneName,
}) => {
  return (
    <div className="bg-[#111827] border border-[#263449] rounded-[4px] flex flex-col h-full overflow-hidden">
      {/* Header with Data Provenance */}
      <div className="px-3 py-2 bg-[#0B1120] border-b border-[#263449] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
          <h3 className="text-xs font-mono font-bold text-[#F8FAFC] tracking-wider uppercase">
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
        <div className="p-2 bg-[#172033] border border-[#334155] rounded-[3px] flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#94A3B8] uppercase">
            IMD INTENSITY CLASSIFICATION:
          </span>
          <span className="text-xs font-mono font-bold text-[#F43F5E]">
            {observation.category.toUpperCase()}
          </span>
        </div>

        {/* Primary Twin Values: Wind & Pressure */}
        <div className="grid grid-cols-2 gap-2">
          <ScientificMetric
            label="Max Sustained Wind"
            value={observation.maxSustainedWindKts}
            unit="kt"
            trend="up"
            trendDelta="+13 kt (6h)"
            subValue="GUSTS: 165 kt • 1-min / 3-min avg"
            tooltipDefinition="10-meter maximum sustained 3-minute average surface wind speed near the eyewall radius."
            tooltipRef="IMD/WMO SPEC"
            highlight={true}
            alertColor="critical"
          />

          <ScientificMetric
            label="Central Pressure"
            value={observation.centralPressureHpa}
            unit="hPa"
            trend="down"
            trendDelta="-14 hPa (6h)"
            subValue="ENVIRONMENT: 1008 hPa"
            tooltipDefinition="Estimated minimum central sea-level barometric atmospheric pressure inside the cyclone eye."
            tooltipRef="DVORAK KNAFF-ZEHR"
            highlight={true}
            alertColor="warning"
          />
        </div>

        {/* Geographic Coordinates & Movement */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 bg-[#0B1120] border border-[#263449] rounded-[3px]">
            <span className="text-[10px] font-mono text-[#94A3B8] uppercase block mb-1">
              ESTIMATED CENTRE (LAT / LON)
            </span>
            <div className="text-base font-mono font-bold text-[#F8FAFC]">
              {observation.coordinate.formattedLat}
            </div>
            <div className="text-base font-mono font-bold text-[#CBD5E1]">
              {observation.coordinate.formattedLon}
            </div>
          </div>

          <div className="p-2.5 bg-[#0B1120] border border-[#263449] rounded-[3px] flex flex-col justify-between">
            <span className="text-[10px] font-mono text-[#94A3B8] uppercase block mb-1">
              STEERING MOTION
            </span>
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#22C55E]" />
              <span className="text-base font-mono font-bold text-[#F8FAFC]">
                {observation.movementDirection}
              </span>
              <span className="text-xs font-mono text-[#94A3B8]">
                @ {observation.movementSpeedKts} kt
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#64748B]">
              {(observation.movementSpeedKts * 1.852).toFixed(1)} km/h translation
            </span>
          </div>
        </div>

        {/* Dvorak T-Number & CI */}
        <div className="p-2 bg-[#0B1120] border border-[#263449] rounded-[3px] flex items-center justify-between text-xs font-mono">
          <span className="text-[#94A3B8]">DVORAK T-NUMBER / CI:</span>
          <span className="text-[#F8FAFC] font-bold">
            T{observation.structure.dvorakTNumber.toFixed(1)} / CI{observation.structure.currentIntensityCI.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};
