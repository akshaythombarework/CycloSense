"use client";

import React from "react";
import { ForecastPoint } from "@/types/prediction";
import { TrendingUp, Radio } from "lucide-react";

interface PredictionSummaryPanelProps {
  forecastPoints: ForecastPoint[];
  selectedPoint?: ForecastPoint | null;
  onSelectPoint?: (point: ForecastPoint) => void;
  onNavigatePredictionTab: () => void;
}

export const PredictionSummaryPanel: React.FC<PredictionSummaryPanelProps> = ({
  forecastPoints,
  selectedPoint,
  onSelectPoint,
  onNavigatePredictionTab,
}) => {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 bg-[#0F172A] border-b border-[#334155] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-[#3B82F6]" />
          <h3 className="text-xs font-mono font-bold text-[#F1F5F9] tracking-wider uppercase">
            PREDICTION SUMMARY (48H OUTLOOK)
          </h3>
        </div>
        <button
          onClick={onNavigatePredictionTab}
          className="text-[10px] font-mono text-[#0284C7] hover:text-[#3B82F6] underline transition-colors"
        >
          FULL PREDICTION VIEW →
        </button>
      </div>

      {/* Forecast Points Matrix */}
      <div className="p-2.5 space-y-2 overflow-y-auto flex-1">
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {forecastPoints.map((pt, idx) => {
            const isSelected = selectedPoint?.timeHorizon === pt.timeHorizon;

            return (
              <button
                key={idx}
                onClick={() => onSelectPoint && onSelectPoint(pt)}
                className={`p-2 rounded-[4px] border text-left transition-all ${
                  isSelected
                    ? "bg-[#0F172A] border-[#3B82F6] text-[#F1F5F9] shadow-sm"
                    : "bg-[#0F172A]/60 hover:bg-[#0F172A] border-[#334155] text-[#94A3B8]"
                }`}
              >
                <div className="flex items-center justify-between mb-1 font-mono">
                  <span className="text-[11px] font-bold text-[#3B82F6]">
                    {pt.timeHorizon}
                  </span>
                  <span className="text-[9px] font-bold text-[#15803D]">
                    {pt.confidencePercent}%
                  </span>
                </div>

                <div className="text-sm font-mono font-bold text-[#F1F5F9]">
                  {pt.predictedWindKts}{" "}
                  <span className="text-[10px] text-[#94A3B8] font-normal">kt</span>
                </div>

                <div className="text-[10px] font-mono text-[#94A3B8] truncate mt-0.5">
                  {pt.predictedPressureHpa} hPa
                </div>

                <div className="mt-1 pt-1 border-t border-[#334155] text-[9px] font-mono text-[#94A3B8]">
                  ±{pt.uncertaintyRadiusKm} km
                </div>
              </button>
            );
          })}
        </div>

        {/* Rapid Intensification Risk Metric Banner */}
        <div className="p-2.5 bg-[#B91C1C]/15 border border-[#B91C1C] rounded-[4px] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#B91C1C] shrink-0" />
            <span className="text-[#B91C1C] font-bold">
              RAPID INTENSIFICATION SIGNAL (24H):
            </span>
          </div>
          <span className="text-[#F1F5F9] font-bold text-xs bg-[#B91C1C] px-2 py-0.5 rounded-[4px]">
            DETECTED (84% CONFIDENCE)
          </span>
        </div>
      </div>
    </div>
  );
};
