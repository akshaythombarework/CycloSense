"use client";

import React from "react";
import { PatternEvolutionSnapshot } from "@/types/prediction";
import { Layers } from "lucide-react";

interface PatternEvolutionGridProps {
  snapshots: PatternEvolutionSnapshot[];
}

export const PatternEvolutionGrid: React.FC<PatternEvolutionGridProps> = ({
  snapshots,
}) => {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] p-3 flex flex-col h-full text-xs font-mono">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#334155]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#0284C7]" />
          <div>
            <h3 className="font-bold text-[#F1F5F9] tracking-wider uppercase">
              AI MORPHOLOGICAL PATTERN EVOLUTION FORECAST
            </h3>
          </div>
        </div>
      </div>

      {/* Grid of Snapshots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
        {snapshots.map((snap, idx) => (
          <div
            key={idx}
            className="p-3 bg-[#0F172A] border border-[#334155] hover:border-[#3B82F6] rounded-[4px] flex flex-col justify-between space-y-2.5 transition-colors"
          >
            {/* Top Tag & Time */}
            <div className="flex items-center justify-between pb-1.5 border-b border-[#334155]">
              <span className="font-bold text-[#0284C7] text-xs">
                {snap.leadTime}
              </span>
              <span className="text-[10px] text-[#94A3B8]">{snap.timestamp}</span>
            </div>

            {/* Synthetic Satellite Thumbnail Canvas Simulation */}
            <div className="h-32 bg-[#0F172A] border border-[#334155] rounded-[3px] relative flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 200 160" className="w-full h-full">
                <defs>
                  <radialGradient id={`patGrad-${idx}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0F172A" stopOpacity="0.9" />
                    <stop
                      offset="20%"
                      stopColor={idx <= 1 ? "#B91C1C" : idx === 2 ? "#B45309" : "#0284C7"}
                      stopOpacity="0.95"
                    />
                    <stop offset="60%" stopColor="#3B82F6" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Cloud Spiral Simulation based on Stage */}
                <circle cx="100" cy="80" r="55" fill={`url(#patGrad-${idx})`} />
                <path
                  d="M 100 80 Q 140 40 170 70 Q 180 110 140 135 Q 90 150 50 120"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="8"
                  opacity="0.6"
                />

                {/* Eye Feature */}
                <circle cx="100" cy="80" r={idx === 1 ? 6 : 8} fill="#0F172A" stroke="#94A3B8" strokeWidth="1" />
              </svg>

              <span className="absolute bottom-1 right-1 text-[9px] font-mono px-1 py-0.5 bg-[#1E293B]/90 text-[#0284C7] rounded border border-[#334155]">
                {snap.thumbnailType}
              </span>
            </div>

            {/* Stage Title */}
            <div>
              <div className="font-bold text-[#F1F5F9] text-xs">
                {snap.stageName}
              </div>
            </div>

            {/* Symmetry Metric */}
            <div className="pt-1.5 border-t border-[#334155] flex items-center justify-between text-[10px]">
              <span className="text-[#94A3B8]">PREDICTED SYMMETRY:</span>
              <span className="text-[#15803D] font-bold">
                {(snap.predictedSymmetry * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Model Assessment Footer */}
      <div className="mt-3 p-2.5 bg-[#0F172A] border border-[#334155] rounded-[3px] flex items-center justify-between">
        <div>
          <span className="text-[10px] text-[#94A3B8] uppercase block">
            PATTERN EVOLUTION TRAJECTORY
          </span>
          <span className="text-xs font-bold text-[#F1F5F9]">
            ORGANIZING &gt; PEAK INTENSIFYING &gt; SECONDARY EYEWALL EXPANSION
          </span>
        </div>
        <span className="text-xs font-bold text-[#15803D]">
          CONFIDENCE: 84%
        </span>
      </div>
    </div>
  );
};
