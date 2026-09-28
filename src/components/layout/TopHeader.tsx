"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, Activity, Compass, ShieldAlert, Cpu } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";

interface TopHeaderProps {
  activeSystemsCount: number;
  onOpenSearch: () => void;
  onOpenEvents: () => void;
  unreadEventsCount: number;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeSystemsCount,
  onOpenSearch,
  onOpenEvents,
  unreadEventsCount,
}) => {
  const [utcTime, setUtcTime] = useState<string>("28 SEP 2026 16:42 UTC");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const day = now.getUTCDate().toString().padStart(2, "0");
      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const month = months[now.getUTCMonth()];
      const year = now.getUTCFullYear();
      const hours = now.getUTCHours().toString().padStart(2, "0");
      const minutes = now.getUTCMinutes().toString().padStart(2, "0");
      const seconds = now.getUTCSeconds().toString().padStart(2, "0");
      setUtcTime(`${day} ${month} ${year} ${hours}:${minutes}:${seconds} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 bg-[#0B1120] border-b border-[#263449] px-4 flex items-center justify-between z-30 sticky top-0 select-none">
      {/* Left: Product Brand and Basin Scope */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#111827] border border-[#38BDF8]/40 rounded-[3px] flex items-center justify-center text-[#38BDF8]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm tracking-wider text-[#F8FAFC]">
                CYCLONE AI
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#172033] text-[#38BDF8] border border-[#263449] rounded-[3px]">
                NIO-OPS
              </span>
            </div>
            <p className="text-[10px] text-[#94A3B8] font-sans leading-none">
              North Indian Ocean Tropical Cyclone Decision Support
            </p>
          </div>
        </div>
      </div>

      {/* Center: Operational Status & System Metrics */}
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-2 px-2.5 py-1 bg-[#111827] border border-[#263449] rounded-[4px]">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-[11px] font-mono text-[#94A3B8]">ACTIVE SYSTEMS:</span>
          <span className="text-xs font-mono font-bold text-[#F8FAFC]">
            {activeSystemsCount.toString().padStart(2, "0")}
          </span>
        </div>

        {/* Sensor Feeds Telemetry */}
        <div className="flex items-center gap-3 px-3 py-1 bg-[#111827] border border-[#263449] rounded-[4px] text-[11px] font-mono text-[#94A3B8]">
          <span className="text-[10px] text-[#64748B] uppercase">FEEDS:</span>
          <span className="flex items-center gap-1 text-[#CBD5E1]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> INSAT
          </span>
          <span className="flex items-center gap-1 text-[#CBD5E1]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> IR
          </span>
          <span className="flex items-center gap-1 text-[#CBD5E1]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> VIS
          </span>
          <span className="flex items-center gap-1 text-[#CBD5E1]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> MW
          </span>
        </div>

        {/* Strict Requirement: Visible DEMO MODE / SIMULATED DATA badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#291B07] border border-[#5A3E11] rounded-[3px] text-[#F59E0B]">
          <ShieldAlert className="w-3 h-3" />
          <span className="text-[10px] font-mono font-bold tracking-wider">
            DEMO MODE • SIMULATED DATA
          </span>
        </div>
      </div>

      {/* Right: Telemetry Clock, Global Search, and Notifications */}
      <div className="flex items-center gap-2">
        <div className="hidden lg:flex flex-col items-end mr-2 text-right">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#E2E8F0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span>{utcTime}</span>
          </div>
          <span className="text-[9px] font-mono text-[#64748B] uppercase">
            SYNCHRONIZED METEOROLOGICAL TIME
          </span>
        </div>

        {/* Global Search Shortcut */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-2.5 py-1 bg-[#111827] hover:bg-[#172033] border border-[#263449] hover:border-[#334155] rounded-[4px] text-xs font-mono text-[#94A3B8] transition-colors"
          title="Search systems, coordinates, historical cases (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-[#64748B]" />
          <span className="hidden sm:inline text-[11px]">SEARCH</span>
          <kbd className="hidden sm:inline-block text-[9px] px-1 bg-[#1E293B] border border-[#334155] rounded text-[#CBD5E1]">
            ⌘K
          </kbd>
        </button>

        {/* AI Events Drawer Toggle */}
        <button
          onClick={onOpenEvents}
          className="relative p-1.5 bg-[#111827] hover:bg-[#172033] border border-[#263449] hover:border-[#334155] rounded-[4px] text-[#CBD5E1] transition-colors"
          title="Open AI Detection & Warning Stream"
        >
          <Bell className="w-4 h-4" />
          {unreadEventsCount > 0 && (
            <span className="absolute -top-1 -right-1 px-1 min-w-[14px] h-[14px] bg-[#F43F5E] text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center">
              {unreadEventsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
