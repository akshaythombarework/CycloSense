"use client";

import React from "react";
import { ActiveCyclone } from "@/types/cyclone";
import { Wind, Navigation } from "lucide-react";

interface ActiveSystemsPanelProps {
  cyclones: ActiveCyclone[];
  selectedCycloneId: string;
  onSelectCyclone: (cycloneId: string) => void;
}

// Muted semantic colors — NO neon
const getCategoryColor = (category: string, windKts: number): string => {
  if (windKts >= 115 || category.toLowerCase().includes("severe") || category.toLowerCase().includes("super")) {
    return "#B91C1C"; // Muted Crimson
  }
  if (windKts >= 48 || category.toLowerCase().includes("cyclonic")) {
    return "#B45309"; // Muted Rust
  }
  return "#15803D"; // Muted Forest Green
};

export const ActiveSystemsPanel: React.FC<ActiveSystemsPanelProps> = ({
  cyclones,
  selectedCycloneId,
  onSelectCyclone,
}) => {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 bg-[#0F172A] border-b border-[#334155] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
          <h3 className="text-xs font-mono font-bold text-[#F1F5F9] tracking-wider uppercase">
            ACTIVE SYSTEMS
          </h3>
        </div>
        <span className="text-[10px] font-mono text-[#94A3B8] px-1.5 py-0.5 bg-[#1E293B] border border-[#334155] rounded-[4px]">
          {cyclones.length} MONITORED
        </span>
      </div>

      {/* List */}
      <div className="p-2 space-y-2 overflow-y-auto flex-1">
        {cyclones.map((cyclone) => {
          const isSelected = cyclone.id === selectedCycloneId;
          const catColor = getCategoryColor(cyclone.currentCategory, cyclone.maxSustainedWindKts);

          return (
            <button
              key={cyclone.id}
              onClick={() => onSelectCyclone(cyclone.id)}
              className={`w-full text-left p-3 rounded-[4px] border transition-all ${
                isSelected
                  ? "bg-[#263447] border-l-4 border-l-[#3B82F6] border-r-[#334155] border-t-[#334155] border-b-[#334155]"
                  : "bg-[#1E293B] hover:bg-[#263447] border-[#334155]"
              }`}
            >
              {/* Name & basin */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: catColor }}
                  />
                  <span className="text-sm font-mono font-bold text-[#F1F5F9]">
                    {cyclone.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#94A3B8]">
                    ({cyclone.code})
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#0284C7]">
                  {cyclone.basin}
                </span>
              </div>

              {/* Category — muted semantic color */}
              <div
                className="text-xs font-mono font-semibold mb-2.5 truncate"
                style={{ color: catColor }}
              >
                {cyclone.currentCategory}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#334155] text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                  <span className="font-bold text-[#F1F5F9]">{cyclone.maxSustainedWindKts}</span>
                  <span className="text-[#94A3B8] text-[10px]">kt</span>
                  <span className="text-[#334155]">|</span>
                  <span className="text-[#F1F5F9]">{cyclone.centralPressureHpa}</span>
                  <span className="text-[#94A3B8] text-[10px]">hPa</span>
                </div>
                <div className="flex items-center justify-end gap-1.5 text-[#94A3B8]">
                  <Navigation className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                  <span className="text-[#F1F5F9] font-semibold">{cyclone.movementDirection}</span>
                  <span className="text-[#94A3B8]">@</span>
                  <span className="text-[#F1F5F9] font-semibold">{cyclone.movementSpeedKts} kt</span>
                </div>
              </div>

              {/* Position */}
              <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                <span>{cyclone.currentCoord.formattedLat} • {cyclone.currentCoord.formattedLon}</span>
                <span>{cyclone.lastUpdatedUtc}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
