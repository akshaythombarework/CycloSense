"use client";

import React, { useState } from "react";
import { ActiveCyclone, CycloneObservation } from "@/types/cyclone";
import { SpectralBand } from "@/types/satellite";
import { IRViewer } from "./IRViewer";
import { VisibleViewer } from "./VisibleViewer";
import { MicrowaveViewer } from "./MicrowaveViewer";
import { FusedViewer } from "./FusedViewer";
import { DataQualityPanel } from "./DataQualityPanel";
import { FeatureExtractionTable } from "./FeatureExtractionTable";
import { TimelineSlider, TimeOffset } from "../temporal/TimelineSlider";
import { EvolutionMetricsPanel } from "../temporal/EvolutionMetricsPanel";
import { satelliteService } from "@/services/satelliteService";
import { Layers, Activity, Eye, Radio, Cpu, ShieldCheck } from "lucide-react";

interface SatelliteAnalysisViewProps {
  cyclone: ActiveCyclone;
  timeOffset?: TimeOffset;
  onSelectTimeOffset?: (offset: TimeOffset) => void;
}

export const SatelliteAnalysisView: React.FC<SatelliteAnalysisViewProps> = ({
  cyclone,
  timeOffset: propTimeOffset,
  onSelectTimeOffset: propOnSelectTimeOffset,
}) => {
  const [activeBand, setActiveBand] = useState<SpectralBand>("IR");
  const [localTimeOffset, setLocalTimeOffset] = useState<TimeOffset>("NOW");

  const selectedTimeOffset = propTimeOffset || localTimeOffset;
  const setSelectedTimeOffset = propOnSelectTimeOffset || setLocalTimeOffset;

  // Lookup observation for selected time offset
  const currentObs =
    cyclone.temporalSequence.find(
      (obs) => obs.timeOffsetLabel === selectedTimeOffset
    ) || cyclone.temporalSequence[cyclone.temporalSequence.length - 1];

  // Map of timestamps for timeline slider
  const timestampsMap: { [key in TimeOffset]: string } = {
    "T-12h": cyclone.temporalSequence[0]?.timestamp || "28 SEP 04:00 UTC",
    "T-9h": cyclone.temporalSequence[1]?.timestamp || "28 SEP 07:00 UTC",
    "T-6h": cyclone.temporalSequence[2]?.timestamp || "28 SEP 10:00 UTC",
    "T-3h": cyclone.temporalSequence[3]?.timestamp || "28 SEP 13:00 UTC",
    NOW: cyclone.temporalSequence[4]?.timestamp || "28 SEP 16:00 UTC",
  };

  const irMetrics = satelliteService.getIRMetrics();
  const visMetrics = satelliteService.getVisibleMetrics();
  const mwMetrics = satelliteService.getMicrowaveMetrics();
  const fusionMetrics = satelliteService.getFusionMetrics();
  const qualityReport = satelliteService.getDataQualityReport();

  return (
    <div className="flex-1 flex flex-col p-3 gap-3 overflow-y-auto bg-[#0B1120]">
      {/* Top Header Controls: Spectral Tabs & Synchronized Timeline Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-[#111827] border border-[#263449] p-2.5 rounded-[4px]">
        {/* Spectral Band Switcher */}
        <div className="flex items-center gap-1 bg-[#0B1120] p-1 border border-[#263449] rounded-[4px] select-none">
          <button
            onClick={() => setActiveBand("IR")}
            className={`px-3 py-1.5 rounded-[3px] text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeBand === "IR"
                ? "bg-[#1E293B] text-[#38BDF8] border border-[#38BDF8]/60 shadow"
                : "text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>IR (10.8 µm)</span>
          </button>

          <button
            onClick={() => setActiveBand("VISIBLE")}
            className={`px-3 py-1.5 rounded-[3px] text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeBand === "VISIBLE"
                ? "bg-[#1E293B] text-[#F59E0B] border border-[#F59E0B]/60 shadow"
                : "text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>VISIBLE (0.65 µm)</span>
          </button>

          <button
            onClick={() => setActiveBand("MICROWAVE")}
            className={`px-3 py-1.5 rounded-[3px] text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeBand === "MICROWAVE"
                ? "bg-[#1E293B] text-[#A78BFA] border border-[#A78BFA]/60 shadow"
                : "text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>MICROWAVE (89 GHz)</span>
          </button>

          <button
            onClick={() => setActiveBand("FUSED")}
            className={`px-3 py-1.5 rounded-[3px] text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeBand === "FUSED"
                ? "bg-[#1E40AF] text-white border border-[#60A5FA] shadow"
                : "text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>AI FUSED SYNTHESIS</span>
          </button>
        </div>

        {/* Selected Target Cyclone Summary */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#64748B]">TARGET:</span>
          <span className="font-bold text-[#F8FAFC]">
            {cyclone.name} ({cyclone.code})
          </span>
          <span className="text-[#64748B]">|</span>
          <span className="text-[#38BDF8]">
            {currentObs.coordinate.formattedLat} • {currentObs.coordinate.formattedLon}
          </span>
        </div>
      </div>

      {/* Synchronized Temporal Timeline Bar */}
      <TimelineSlider
        currentOffset={selectedTimeOffset}
        onSelectOffset={setSelectedTimeOffset}
        timestamps={timestampsMap}
      />

      {/* Main Satellite Multi-Spectral Viewer Area */}
      <div className="flex-1 min-h-[460px]">
        {activeBand === "IR" && (
          <IRViewer
            metrics={irMetrics}
            centerCoord={currentObs.coordinate}
            timestamp={currentObs.timestamp}
          />
        )}
        {activeBand === "VISIBLE" && (
          <VisibleViewer
            metrics={visMetrics}
            centerCoord={currentObs.coordinate}
            timestamp={currentObs.timestamp}
          />
        )}
        {activeBand === "MICROWAVE" && (
          <MicrowaveViewer
            metrics={mwMetrics}
            centerCoord={currentObs.coordinate}
            timestamp={currentObs.timestamp}
          />
        )}
        {activeBand === "FUSED" && (
          <FusedViewer
            metrics={fusionMetrics}
            centerCoord={currentObs.coordinate}
            timestamp={currentObs.timestamp}
          />
        )}
      </div>

      {/* 6-Hour Temporal Evolution Delta Panel */}
      <EvolutionMetricsPanel />

      {/* Data Quality and Sensor Telemetry */}
      <DataQualityPanel report={qualityReport} />

      {/* Comprehensive Feature Extraction Table */}
      <FeatureExtractionTable observation={currentObs} />
    </div>
  );
};
