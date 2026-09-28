"use client";

import React from "react";
import { ForecastPoint } from "@/types/prediction";
import { TrendingUp, Radio, Compass, ShieldCheck } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";

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
    <div className="bg-[#111827] border border-[#263449] rounded-[4px] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 bg-[#0B1120] border-b border-[#263449] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-[#60A5FA]" />
          <h3 className="text-xs font-mono font-bold text-[#F8FAFC] tracking-wider uppercase">
            PREDICTION SUMMARY (48H OUTLOOK)
          </h3>
        </div>
        <button
          onClick={onNavigatePredictionTab}
          className="text-[10px] font-mono text-[#38BDF8] hover:text-[#60A5FA] underline transition-colors"
        >
          FULL PREDICTION VIEW →
        </button>
      </div>

      {/* Forecast Points Matrix */}
      <div className="p-2 space-y-1.5 overflow-y-auto flex-1">
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {forecastPoints.map((pt, idx) => {
            const isSelected = selectedPoint?.timeHorizon === pt.timeHorizon;

            return (
              <button
                key={idx}
                onClick={() => onSelectPoint && onSelectPoint(pt)}
                className={`p-2 rounded-[3px] border text-left transition-all ${
                  isSelected
                    ? "bg-[#1E293B] border-[#38BDF8] text-[#F8FAFC]"
                    : "bg-[#0B1120] hover:bg-[#172033] border-[#263449] text-[#CBD5E1]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono font-bold text-[#38BDF8]">
                    {pt.timeHorizon}
                  </span>
                  <span className="text-[9px] font-mono text-[#22C55E]">
                    {pt.confidencePercent}%
                  </span>
                </div>

                <div className="text-sm font-mono font-bold text-[#F8FAFC]">
                  {pt.predictedWindKts}{" "}
                  <span className="text-[10px] text-[#94A3B8] font-normal">kt</span>
                </div>

                <div className="text-[10px] font-mono text-[#94A3B8] truncate mt-0.5">
                  {pt.predictedPressureHpa} hPa
                </div>

                <div className="mt-1 pt-1 border-t border-[#1E293B] text-[9px] font-mono text-[#64748B]">
                  ±{pt.uncertaintyRadiusKm} km
                </div>
              </button>
            );
          })}
        </div>

        {/* Rapid Intensification Risk Metric Banner */}
        <div className="p-2 bg-[#2D0D17] border border-[#65182D] rounded-[3px] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#F43F5E]" />
            <span className="text-[#F43F5E] font-bold">
              RAPID INTENSIFICATION SIGNAL (24H):
            </span>
          </div>
          <span className="text-[#F8FAFC] font-bold text-xs bg-[#65182D]/60 px-2 py-0.5 rounded border border-[#F43F5E]/30">
            DETECTED (84% CONFIDENCE)
          </span>
        </div>
      </div>
    </div>
  );
};
