"use client";

import React, { useState } from "react";
import { ActiveCyclone } from "@/types/cyclone";
import { ForecastPoint, IntensityForecastInterval, PatternEvolutionSnapshot, ExplainabilityData } from "@/types/prediction";
import { TrackPredictionTab } from "./TrackPredictionTab";
import { IntensityPredictionChart } from "./IntensityPredictionChart";
import { PatternEvolutionGrid } from "./PatternEvolutionGrid";
import { ExplainabilitySection } from "./ExplainabilitySection";
import { Compass, TrendingUp, Layers } from "lucide-react";

interface CyclonePredictionViewProps {
  cyclone: ActiveCyclone;
  forecastPoints: ForecastPoint[];
  intensityIntervals: IntensityForecastInterval[];
  patternEvolution: PatternEvolutionSnapshot[];
  explainability: ExplainabilityData;
  selectedForecastPoint?: ForecastPoint | null;
  onSelectForecastPoint?: (point: ForecastPoint | null) => void;
}

export type PredictionTabId = "track" | "intensity" | "pattern";

export const CyclonePredictionView: React.FC<CyclonePredictionViewProps> = ({
  cyclone,
  forecastPoints,
  intensityIntervals,
  patternEvolution,
  explainability,
  selectedForecastPoint = null,
  onSelectForecastPoint,
}) => {
  const [activeTab, setActiveTab] = useState<PredictionTabId>("track");
  const [localSelectedPoint, setLocalSelectedPoint] = useState<ForecastPoint | null>(null);

  const selectedPoint = selectedForecastPoint !== undefined ? selectedForecastPoint : localSelectedPoint;
  const setSelectedPoint = onSelectForecastPoint || setLocalSelectedPoint;

  return (
    <div className="flex-1 flex flex-col p-3 gap-3 overflow-y-auto bg-[#0F172A]">
      {/* Top Controls Bar: Sub-tabs & Scope */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#1E293B] border border-[#334155] p-2.5 rounded-[4px]">
        {/* Prediction Navigation Tabs */}
        <div className="flex items-center gap-1 bg-[#0F172A] p-1 border border-[#334155] rounded-[4px] select-none">
          <button
            onClick={() => setActiveTab("track")}
            className={`px-3 py-1.5 rounded-[3px] text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "track"
                ? "bg-[#1E293B] text-[#0284C7] border border-[#0284C7]/60 shadow"
                : "text-[#94A3B8] hover:text-[#F1F5F9]"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>[ TRACK PREDICTION ]</span>
          </button>

          <button
            onClick={() => setActiveTab("intensity")}
            className={`px-3 py-1.5 rounded-[3px] text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "intensity"
                ? "bg-[#1E293B] text-[#3B82F6] border border-[#3B82F6]/60 shadow"
                : "text-[#94A3B8] hover:text-[#F1F5F9]"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>[ INTENSITY FORECAST ]</span>
          </button>

          <button
            onClick={() => setActiveTab("pattern")}
            className={`px-3 py-1.5 rounded-[3px] text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "pattern"
                ? "bg-[#1E293B] text-[#3B82F6] border border-[#3B82F6]/60 shadow"
                : "text-[#94A3B8] hover:text-[#F1F5F9]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>[ PATTERN EVOLUTION ]</span>
          </button>
        </div>

        {/* Cyclone Status Info */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#94A3B8]">SYSTEM:</span>
          <span className="font-bold text-[#F1F5F9]">
            {cyclone.name} ({cyclone.code})
          </span>
          <span className="text-[#334155]">|</span>
          <span className="text-[#B91C1C] font-bold">
            {cyclone.maxSustainedWindKts} kt • {cyclone.currentCategory}
          </span>
        </div>
      </div>

      {/* Primary Tab View */}
      <div className="flex-1 min-h-[380px]">
        {activeTab === "track" && (
          <TrackPredictionTab
            cyclone={cyclone}
            forecastPoints={forecastPoints}
            selectedPoint={selectedPoint}
            onSelectPoint={setSelectedPoint}
          />
        )}
        {activeTab === "intensity" && (
          <IntensityPredictionChart intervals={intensityIntervals} />
        )}
        {activeTab === "pattern" && (
          <PatternEvolutionGrid snapshots={patternEvolution} />
        )}
      </div>

      {/* Dedicated AI Explainability (XAI) Section */}
      <ExplainabilitySection explainability={explainability} />
    </div>
  );
};
