"use client";

import React, { useState } from "react";
import { ExplainabilityData } from "@/types/prediction";
import { Cpu, Eye, Zap, Layers, HelpCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";

interface ExplainabilitySectionProps {
  explainability: ExplainabilityData;
}

export const ExplainabilitySection: React.FC<ExplainabilitySectionProps> = ({
  explainability,
}) => {
  const [viewMode, setViewMode] = useState<"ORIGINAL" | "HEATMAP" | "OVERLAY">("OVERLAY");

  return (
    <div className="bg-[#111827] border border-[#263449] rounded-[4px] p-3 text-xs font-mono space-y-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 border-b border-[#263449] gap-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#38BDF8]" />
          <div>
            <h3 className="font-bold text-[#F8FAFC] tracking-wider uppercase">
              MODEL INTERPRETATION & EXPLAINABILITY (XAI)
            </h3>
            <p className="text-[10px] text-[#94A3B8]">
              Quantified SHAP feature contributions and Grad-CAM spatial cross-attention maps
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-[#0B1120] p-1 border border-[#263449] rounded-[3px] select-none">
          <button
            onClick={() => setViewMode("ORIGINAL")}
            className={`px-2 py-1 rounded-[2px] text-[10px] font-bold ${
              viewMode === "ORIGINAL"
                ? "bg-[#1E293B] text-[#F8FAFC] border border-[#334155]"
                : "text-[#94A3B8] hover:text-[#CBD5E1]"
            }`}
          >
            ORIGINAL
          </button>
          <button
            onClick={() => setViewMode("HEATMAP")}
            className={`px-2 py-1 rounded-[2px] text-[10px] font-bold ${
              viewMode === "HEATMAP"
                ? "bg-[#1E293B] text-[#F43F5E] border border-[#F43F5E]/40"
                : "text-[#94A3B8] hover:text-[#CBD5E1]"
            }`}
          >
            AI HEATMAP
          </button>
          <button
            onClick={() => setViewMode("OVERLAY")}
            className={`px-2 py-1 rounded-[2px] text-[10px] font-bold ${
              viewMode === "OVERLAY"
                ? "bg-[#1E40AF] text-white border border-[#60A5FA]"
                : "text-[#94A3B8] hover:text-[#CBD5E1]"
            }`}
          >
            OVERLAY
          </button>
        </div>
      </div>

      {/* Main Content: Feature Contributions + Grad-CAM Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left: SHAP Feature Importance Bars (7 cols) */}
        <div className="lg:col-span-7 p-3 bg-[#0B1120] border border-[#263449] rounded-[4px] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-bold">
              WHY DID THE MODEL PREDICT THIS INTENSIFICATION?
            </span>
            <span className="text-[10px] text-[#22C55E]">
              PRIMARY DRIVER: HIGH SST + LOW SHEAR
            </span>
          </div>

          <div className="space-y-2">
            {explainability.featureContributions.map((feat, idx) => {
              const pct = (feat.importanceWeight * 100).toFixed(0);

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#F8FAFC] font-medium">{feat.featureName}</span>
                      <span className="text-[9px] text-[#64748B] px-1 bg-[#172033] rounded">
                        {feat.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#CBD5E1] text-[10px]">{feat.valueDescription}</span>
                      <span className="text-[#38BDF8] font-bold w-9 text-right">{pct}%</span>
                    </div>
                  </div>

                  {/* Importance Bar */}
                  <div className="h-2 bg-[#172033] rounded overflow-hidden">
                    <div
                      className="h-full bg-[#38BDF8] rounded transition-all duration-200"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Grad-CAM Attention Region Map (5 cols) */}
        <div className="lg:col-span-5 p-3 bg-[#0B1120] border border-[#263449] rounded-[4px] flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#1E293B]">
              <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-bold">
                GRAD-CAM SPATIAL SALIENCY MAP
              </span>
              <span className="text-[10px] text-[#F43F5E] font-bold">
                CORE ACTIVATION (62%)
              </span>
            </div>

            {/* Canvas Attention Map Simulation */}
            <div className="h-36 bg-[#060A12] border border-[#1E293B] rounded-[3px] relative flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 240 160" className="w-full h-full">
                <defs>
                  <radialGradient id="gradcamHeat" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity={viewMode === "ORIGINAL" ? 0 : 0.9} />
                    <stop offset="25%" stopColor="#F59E0B" stopOpacity={viewMode === "ORIGINAL" ? 0 : 0.75} />
                    <stop offset="55%" stopColor="#22C55E" stopOpacity={viewMode === "ORIGINAL" ? 0 : 0.4} />
                    <stop offset="85%" stopColor="#38BDF8" stopOpacity={viewMode === "ORIGINAL" ? 0 : 0.15} />
                    <stop offset="100%" stopColor="#0B1120" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Satellite Cloud Underlay */}
                <circle
                  cx="120"
                  cy="80"
                  r="65"
                  fill="#E2E8F0"
                  opacity={viewMode === "HEATMAP" ? 0.05 : 0.6}
                />
                <path
                  d="M 120 80 Q 160 40 190 70 Q 200 110 160 135"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="12"
                  opacity={viewMode === "HEATMAP" ? 0.05 : 0.7}
                />

                {/* Grad-CAM Attention Heatmap */}
                <circle cx="120" cy="80" r="55" fill="url(#gradcamHeat)" />

                {/* Eyewall Center Focus Ring */}
                <circle
                  cx="120"
                  cy="80"
                  r="12"
                  fill="none"
                  stroke="#F8FAFC"
                  strokeWidth="1.5"
                  strokeDasharray="2,2"
                />
              </svg>

              <span className="absolute bottom-1 left-2 text-[9px] font-mono text-[#CBD5E1]">
                LAYER: vit_layer_11.cross_attn
              </span>
            </div>
          </div>

          {/* Region breakdown */}
          <div className="space-y-1 text-[10px]">
            {explainability.gradCamRegions.map((reg, idx) => (
              <div key={idx} className="flex items-center justify-between text-[#94A3B8]">
                <span>{reg.region}</span>
                <span className="text-[#38BDF8] font-bold">{(reg.weight * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
