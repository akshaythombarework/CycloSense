"use client";

import React from "react";
import { AIEvent } from "@/types/cyclone";
import { Zap, AlertTriangle, ShieldCheck, ChevronRight } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";

interface RecentEventsPanelProps {
  events: AIEvent[];
  onOpenEventsDrawer: () => void;
}

export const RecentEventsPanel: React.FC<RecentEventsPanelProps> = ({
  events,
  onOpenEventsDrawer,
}) => {
  return (
    <div className="bg-[#111827] border border-[#263449] rounded-[4px] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 bg-[#0B1120] border-b border-[#263449] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#F43F5E]" />
          <h3 className="text-xs font-mono font-bold text-[#F8FAFC] tracking-wider uppercase">
            AI EVENTS & SIGNALS
          </h3>
        </div>
        <button
          onClick={onOpenEventsDrawer}
          className="text-[10px] font-mono text-[#38BDF8] hover:text-[#60A5FA] flex items-center gap-0.5 transition-colors"
        >
          VIEW ALL <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Events List */}
      <div className="p-2 space-y-1.5 overflow-y-auto flex-1">
        {events.slice(0, 4).map((evt) => {
          return (
            <div
              key={evt.id}
              className="p-2 bg-[#0B1120] hover:bg-[#172033] border border-[#263449] rounded-[3px] space-y-1 transition-colors"
            >
              <div className="flex items-center justify-between gap-1">
                <StatusBadge status={evt.severity} label={evt.severity} size="sm" />
                <span className="text-[10px] font-mono text-[#94A3B8]">
                  {evt.timestamp}
                </span>
              </div>

              <div className="text-xs font-mono font-semibold text-[#F8FAFC]">
                {evt.title}
              </div>

              <p className="text-[11px] text-[#94A3B8] font-sans leading-tight line-clamp-2">
                {evt.description}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-[#1E293B] text-[10px] font-mono">
                <span className="text-[#64748B]">{evt.cycloneName}</span>
                {evt.confidencePercent && (
                  <span className="text-[#38BDF8]">
                    CONF: <strong>{evt.confidencePercent}%</strong>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
