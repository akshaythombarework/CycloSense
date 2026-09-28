"use client";

import React from "react";
import { PatternEvolutionSnapshot } from "@/types/prediction";
import { Layers, ArrowRight, Activity, Eye, ShieldCheck } from "lucide-react";

interface PatternEvolutionGridProps {
  snapshots: PatternEvolutionSnapshot[];
}

export const PatternEvolutionGrid: React.FC<PatternEvolutionGridProps> = ({
  snapshots,
}) => {
  return (
    <div className="bg-[#111827] border border-[#263449] rounded-[4px] p-3 flex flex-col h-full text-xs font-mono">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#263449]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#38BDF8]" />
          <div>
            <h3 className="font-bold text-[#F8FAFC] tracking-wider uppercase">
              AI MORPHOLOGICAL PATTERN EVOLUTION FORECAST
            </h3>
            <p className="text-[10px] text-[#94A3B8]">
              Predicted spatial structural transformations, CDO expansion, and secondary eyewall replacement
            </p>
          </div>
        </div>
        <span className="text-[10px] text-[#22C55E] bg-[#062419] border border-[#134E35] px-2 py-0.5 rounded">
          DEEP GENERATIVE SPATIAL MODEL
        </span>
      </div>

      {/* Grid of Snapshots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
        {snapshots.map((snap, idx) => (
          <div
            key={idx}
            className="p-3 bg-[#0B1120] border border-[#263449] hover:border-[#38BDF8] rounded-[4px] flex flex-col justify-between space-y-2.5 transition-colors"
          >
            {/* Top Tag & Time */}
            <div className="flex items-center justify-between pb-1.5 border-b border-[#1E293B]">
              <span className="font-bold text-[#38BDF8] text-xs">
                {snap.leadTime}
              </span>
              <span className="text-[10px] text-[#94A3B8]">{snap.timestamp}</span>
            </div>

            {/* Synthetic Satellite Thumbnail Canvas Simulation */}
            <div className="h-32 bg-[#060A12] border border-[#1E293B] rounded-[3px] relative flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 200 160" className="w-full h-full">
                <defs>
                  <radialGradient id={`patGrad-${idx}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0B1120" stopOpacity="0.9" />
                    <stop
                      offset="20%"
                      stopColor={idx === 0 ? "#F43F5E" : idx === 1 ? "#EF4444" : idx === 2 ? "#F59E0B" : "#0284C7"}
                      stopOpacity="0.95"
                    />
                    <stop offset="60%" stopColor="#2563EB" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#0B1120" stopOpacity="0" />
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
                <circle cx="100" cy="80" r={idx === 1 ? 6 : 8} fill="#0B1120" stroke="#CBD5E1" strokeWidth="1" />
              </svg>

              <span className="absolute bottom-1 right-1 text-[9px] font-mono px-1 py-0.2 bg-[#111827]/90 text-[#38BDF8] rounded border border-[#263449]">
                {snap.thumbnailType}
              </span>
            </div>

            {/* Stage Title */}
            <div>
              <div className="font-bold text-[#F8FAFC] text-xs">
                {snap.stageName}
              </div>
              <p className="text-[11px] text-[#94A3B8] font-sans mt-0.5 leading-relaxed">
                {snap.morphologyDescription}
              </p>
            </div>

            {/* Symmetry Metric */}
            <div className="pt-1.5 border-t border-[#1E293B] flex items-center justify-between text-[10px]">
              <span className="text-[#64748B]">PREDICTED SYMMETRY:</span>
              <span className="text-[#22C55E] font-bold">
                {(snap.predictedSymmetry * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Model Assessment Footer */}
      <div className="mt-3 p-2.5 bg-[#0B1120] border border-[#263449] rounded-[3px] flex items-center justify-between">
        <div>
          <span className="text-[10px] text-[#64748B] uppercase block">
            PATTERN EVOLUTION TRAJECTORY
          </span>
          <span className="text-xs font-bold text-[#F8FAFC]">
            ORGANIZING → PEAK INTENSIFYING → SECONDARY EYEWALL EXPANSION
          </span>
        </div>
        <span className="text-xs font-bold text-[#22C55E]">
          CONFIDENCE: 84%
        </span>
      </div>
    </div>
  );
};
