"use client";

import React from "react";
import { ActiveCyclone } from "@/types/cyclone";
import { Compass, Wind, Navigation, AlertTriangle } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";

interface ActiveSystemsPanelProps {
  cyclones: ActiveCyclone[];
  selectedCycloneId: string;
  onSelectCyclone: (cycloneId: string) => void;
}

export const ActiveSystemsPanel: React.FC<ActiveSystemsPanelProps> = ({
  cyclones,
  selectedCycloneId,
  onSelectCyclone,
}) => {
  return (
    <div className="bg-[#111827] border border-[#263449] rounded-[4px] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 bg-[#0B1120] border-b border-[#263449] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
          <h3 className="text-xs font-mono font-bold text-[#F8FAFC] tracking-wider uppercase">
            ACTIVE SYSTEMS
          </h3>
        </div>
        <span className="text-[10px] font-mono text-[#94A3B8] px-1.5 py-0.2 bg-[#172033] border border-[#263449] rounded-[3px]">
          {cyclones.length} MONITORED
        </span>
      </div>

      {/* List */}
      <div className="p-2 space-y-1.5 overflow-y-auto flex-1">
        {cyclones.map((cyclone) => {
          const isSelected = cyclone.id === selectedCycloneId;
          const isSevere = cyclone.maxSustainedWindKts >= 120;

          return (
            <button
              key={cyclone.id}
              onClick={() => onSelectCyclone(cyclone.id)}
              className={`w-full text-left p-2.5 rounded-[4px] border transition-all ${
                isSelected
                  ? "bg-[#111827] border-l-2 border-l-[#38BDF8] border-r-[#263449] border-t-[#263449] border-b-[#263449]"
                  : "bg-[#0B1120] hover:bg-[#172033]/60 border-[#263449]"
              }`}
            >
              {/* Cyclone code & status */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSevere ? "bg-[#F43F5E]" : cyclone.status === "ACTIVE" ? "bg-[#22C55E]" : "bg-[#F59E0B]"
                    }`}
                  />
                  <span className="text-xs font-mono font-bold text-[#F8FAFC]">
                    {cyclone.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">
                    ({cyclone.code})
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#38BDF8]">
                  {cyclone.basin}
                </span>
              </div>

              {/* Category */}
              <div className="text-[11px] font-mono text-[#CBD5E1] mb-2 truncate">
                {cyclone.currentCategory}
              </div>

              {/* Numerical Metrics Bar */}
              <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-[#1E293B] text-[11px] font-mono">
                <div className="flex items-center gap-1 text-[#E2E8F0]">
                  <Wind className="w-3 h-3 text-[#38BDF8]" />
                  <span className="font-bold text-[#F8FAFC]">
                    {cyclone.maxSustainedWindKts}
                  </span>
                  <span className="text-[#94A3B8] text-[10px]">kt</span>
                  <span className="text-[#64748B]">|</span>
                  <span className="text-[#CBD5E1] text-[10px]">
                    {cyclone.centralPressureHpa} hPa
                  </span>
                </div>

                <div className="flex items-center justify-end gap-1 text-[#94A3B8]">
                  <Navigation className="w-3 h-3 text-[#22C55E]" />
                  <span>{cyclone.movementDirection}</span>
                  <span className="text-[#64748B]">@</span>
                  <span>{cyclone.movementSpeedKts} kt</span>
                </div>
              </div>

              {/* Position */}
              <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                <span>
                  {cyclone.currentCoord.formattedLat} • {cyclone.currentCoord.formattedLon}
                </span>
                <span>{cyclone.lastUpdatedUtc}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
