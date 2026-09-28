"use client";

import React from "react";
import { TrendingUp, ArrowUp, ArrowDown, Activity, Layers, Thermometer } from "lucide-react";
import { TrendArrow } from "../ui/TrendArrow";

export const EvolutionMetricsPanel: React.FC = () => {
  return (
    <div className="bg-[#111827] border border-[#263449] rounded-[4px] flex flex-col h-full overflow-hidden text-xs font-mono">
      {/* Header */}
      <div className="px-3 py-2 bg-[#0B1120] border-b border-[#263449] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-[#38BDF8]" />
          <h3 className="text-xs font-mono font-bold text-[#F8FAFC] tracking-wider uppercase">
            6-HOUR TEMPORAL EVOLUTION (T-6H → NOW)
          </h3>
        </div>
        <span className="text-[10px] text-[#F43F5E] bg-[#2D0D17] border border-[#65182D] px-1.5 py-0.2 rounded font-bold">
          RAPID INTENSIFICATION REGIME
        </span>
      </div>

      {/* Changes Grid */}
      <div className="p-3 space-y-2.5 overflow-y-auto flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {/* Wind Speed Delta */}
          <div className="p-2.5 bg-[#0B1120] border border-[#263449] rounded-[3px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block mb-1">
              WIND TENDENCY
            </span>
            <div className="text-xs text-[#CBD5E1] mb-1">
              132 → <strong className="text-[#F8FAFC]">145 kt</strong>
            </div>
            <div className="flex items-center gap-1 text-[#F43F5E] font-bold">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>+13 kt (+9.8%)</span>
            </div>
          </div>

          {/* Central Pressure Delta */}
          <div className="p-2.5 bg-[#0B1120] border border-[#263449] rounded-[3px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block mb-1">
              PRESSURE TENDENCY
            </span>
            <div className="text-xs text-[#CBD5E1] mb-1">
              934 → <strong className="text-[#F8FAFC]">920 hPa</strong>
            </div>
            <div className="flex items-center gap-1 text-[#F59E0B] font-bold">
              <ArrowDown className="w-3.5 h-3.5" />
              <span>-14 hPa (-2.3 hPa/hr)</span>
            </div>
          </div>

          {/* CDO Area Growth */}
          <div className="p-2.5 bg-[#0B1120] border border-[#263449] rounded-[3px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block mb-1">
              CDO SHIELD AREA
            </span>
            <div className="text-xs text-[#CBD5E1] mb-1">
              16,800 → <strong className="text-[#F8FAFC]">18,420 km²</strong>
            </div>
            <div className="flex items-center gap-1 text-[#22C55E] font-bold">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>+18% Expansion</span>
            </div>
          </div>

          {/* Eye Symmetry Index */}
          <div className="p-2.5 bg-[#0B1120] border border-[#263449] rounded-[3px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block mb-1">
              EYE SYMMETRY INDEX
            </span>
            <div className="text-xs text-[#CBD5E1] mb-1">
              0.77 → <strong className="text-[#F8FAFC]">0.88</strong>
            </div>
            <div className="flex items-center gap-1 text-[#38BDF8] font-bold">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>+11% Ring Closure</span>
            </div>
          </div>

          {/* Cloud-Top Temperature Cooling */}
          <div className="p-2.5 bg-[#0B1120] border border-[#263449] rounded-[3px]">
            <span className="text-[10px] text-[#94A3B8] uppercase block mb-1">
              COLD CORE (TIR-1)
            </span>
            <div className="text-xs text-[#CBD5E1] mb-1">
              -71°C → <strong className="text-[#F8FAFC]">-76°C</strong>
            </div>
            <div className="flex items-center gap-1 text-[#60A5FA] font-bold">
              <ArrowDown className="w-3.5 h-3.5" />
              <span>-5°C Deepening</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
