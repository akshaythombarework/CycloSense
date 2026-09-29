"use client";

import React from "react";
import { X, Zap } from "lucide-react";
import { AIEvent } from "@/types/cyclone";
import { StatusBadge } from "../ui/StatusBadge";

interface AIEventsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  events: AIEvent[];
  onSelectEventCyclone?: (cycloneId: string) => void;
}

export const AIEventsDrawer: React.FC<AIEventsDrawerProps> = ({
  isOpen,
  onClose,
  events,
  onSelectEventCyclone,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end bg-black/70 backdrop-blur-[3px]">
      <div className="w-full max-w-md h-full bg-[#0F172A] border-l border-[#334155] flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 bg-[#1E293B] border-b border-[#334155] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#B91C1C]" />
            <div>
              <h3 className="text-xs font-mono font-bold text-[#F1F5F9] tracking-wider uppercase">
                ALERTS & NOTIFICATIONS STREAM
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#334155] rounded-[4px] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Event List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {events.map((evt) => {
            return (
              <div
                key={evt.id}
                className="p-3 bg-[#1E293B] border border-[#334155] hover:border-[#3B82F6]/60 rounded-[4px] space-y-2 transition-colors cursor-pointer"
                onClick={() => onSelectEventCyclone && onSelectEventCyclone(evt.cycloneId)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <StatusBadge status={evt.severity} label={evt.severity} size="sm" />
                    <span className="text-xs font-bold text-[#F1F5F9]">
                      {evt.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#94A3B8] shrink-0">
                    {evt.timestamp}
                  </span>
                </div>

                <div className="text-xs text-[#94A3B8] leading-relaxed">
                  {evt.description}
                </div>

                {evt.supportingSignals && evt.supportingSignals.length > 0 && (
                  <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[4px] space-y-1">
                    <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider block font-semibold">
                      SUPPORTING OBSERVATIONS:
                    </span>
                    <ul className="space-y-0.5 text-[11px] font-mono text-[#94A3B8]">
                      {evt.supportingSignals.map((signal, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-[#0284C7]">•</span>
                          <span>{signal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1.5 border-t border-[#334155] text-[10px] font-mono">
                  <span className="text-[#94A3B8]">
                    TARGET: <span className="text-[#0284C7] font-bold">{evt.cycloneName}</span>
                  </span>
                  {evt.confidencePercent && (
                    <span className="text-[#94A3B8]">
                      CONFIDENCE: <strong className="text-[#F1F5F9]">{evt.confidencePercent}%</strong>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#1E293B] border-t border-[#334155] text-center">
          <span className="text-[10px] font-mono text-[#94A3B8]">
            All timestamps synchronized to UTC standard
          </span>
        </div>
      </div>
    </div>
  );
};
