"use client";

import React from "react";
import { ArrowUp, ArrowDown, Activity } from "lucide-react";

export const EvolutionMetricsPanel: React.FC = () => {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] flex flex-col h-full overflow-hidden text-xs font-mono">
      {/* Header */}
      <div className="px-3 py-2 bg-[#0F172A] border-b border-[#334155] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-[#0284C7]" />
          <h3 className="text-xs font-mono font-bold text-[#F1F5F9] tracking-wider uppercase">
            6-HOUR TEMPORAL EVOLUTION (T-6H → NOW)
          </h3>
        </div>
        <span className="text-[10px] text-[#B91C1C] bg-[#B91C1C]/15 border border-[#B91C1C]/30 px-2 py-0.5 rounded font-bold">
          RAPID INTENSIFICATION REGIME
        </span>
      </div>

      {/* Changes Grid */}
      <div className="p-3 space-y-2.5 overflow-y-auto flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {/* Wind Speed Delta */}
          <div className="p-2.5 bg-[#0F172A] border border-[#334155] rounded-[3px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block mb-1">
              WIND TENDENCY
            </span>
            <div className="text-xs text-[#94A3B8] mb-1">
              132 → <strong className="text-[#F1F5F9]">145 kt</strong>
            </div>
            <div className="flex items-center gap-1 text-[#B91C1C] font-bold">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>+13 kt (+9.8%)</span>
            </div>
          </div>

          {/* Central Pressure Delta */}
          <div className="p-2.5 bg-[#0F172A] border border-[#334155] rounded-[3px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block mb-1">
              PRESSURE TENDENCY
            </span>
            <div className="text-xs text-[#94A3B8] mb-1">
              934 → <strong className="text-[#F1F5F9]">920 hPa</strong>
            </div>
            <div className="flex items-center gap-1 text-[#B45309] font-bold">
              <ArrowDown className="w-3.5 h-3.5" />
              <span>-14 hPa (-2.3 hPa/hr)</span>
            </div>
          </div>

          {/* CDO Area Growth */}
          <div className="p-2.5 bg-[#0F172A] border border-[#334155] rounded-[3px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block mb-1">
              CDO SHIELD AREA
            </span>
            <div className="text-xs text-[#94A3B8] mb-1">
              16,800 → <strong className="text-[#F1F5F9]">18,420 km²</strong>
            </div>
            <div className="flex items-center gap-1 text-[#15803D] font-bold">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>+18% Expansion</span>
            </div>
          </div>

          {/* Eye Symmetry Index */}
          <div className="p-2.5 bg-[#0F172A] border border-[#334155] rounded-[3px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block mb-1">
              EYE SYMMETRY INDEX
            </span>
            <div className="text-xs text-[#94A3B8] mb-1">
              0.77 → <strong className="text-[#F1F5F9]">0.88</strong>
            </div>
            <div className="flex items-center gap-1 text-[#0284C7] font-bold">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>+11% Ring Closure</span>
            </div>
          </div>

          {/* Cloud-Top Temperature Cooling */}
          <div className="p-2.5 bg-[#0F172A] border border-[#334155] rounded-[3px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block mb-1">
              COLD CORE (TIR-1)
            </span>
            <div className="text-xs text-[#94A3B8] mb-1">
              -71°C → <strong className="text-[#F1F5F9]">-76°C</strong>
            </div>
            <div className="flex items-center gap-1 text-[#3B82F6] font-bold">
              <ArrowDown className="w-3.5 h-3.5" />
              <span>-5°C Deepening</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
