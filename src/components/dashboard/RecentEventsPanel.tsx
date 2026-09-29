"use client";

import React from "react";
import { AIEvent } from "@/types/cyclone";
import { Zap, ChevronRight } from "lucide-react";
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
    <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 bg-[#0F172A] border-b border-[#334155] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#B91C1C]" />
          <h3 className="text-xs font-mono font-bold text-[#F1F5F9] tracking-wider uppercase">
            ALERTS & NOTIFICATIONS
          </h3>
        </div>
        <button
          onClick={onOpenEventsDrawer}
          className="text-[10px] font-mono text-[#0284C7] hover:text-[#3B82F6] flex items-center gap-0.5 transition-colors"
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
              className="p-2.5 bg-[#0F172A]/60 hover:bg-[#0F172A] border border-[#334155] rounded-[4px] space-y-1 transition-colors"
            >
              <div className="flex items-center justify-between gap-1">
                <StatusBadge status={evt.severity} label={evt.severity} size="sm" />
                <span className="text-[10px] font-mono text-[#94A3B8]">
                  {evt.timestamp}
                </span>
              </div>

              <div className="text-xs font-mono font-bold text-[#F1F5F9]">
                {evt.title}
              </div>

              <p className="text-[11px] text-[#94A3B8] font-sans leading-tight line-clamp-2">
                {evt.description}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-[#334155] text-[10px] font-mono">
                <span className="text-[#94A3B8]">{evt.cycloneName}</span>
                {evt.confidencePercent && (
                  <span className="text-[#94A3B8]">
                    CONF: <strong className="text-[#F1F5F9]">{evt.confidencePercent}%</strong>
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
