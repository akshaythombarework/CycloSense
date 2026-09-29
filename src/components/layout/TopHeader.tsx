"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell } from "lucide-react";
import { CycloSenseLogo } from "../ui/CycloSenseLogo";

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
  const [utcTime, setUtcTime] = useState<string>("28 SEP 2026 16:42:00 UTC");

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
    <header className="h-14 bg-[#0F172A] border-b border-[#334155] px-4 flex items-center justify-between select-none">
      {/* Left: Brand */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <CycloSenseLogo size={34} />
          <div className="flex items-center">
            <span className="font-mono font-extrabold text-lg sm:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F1F5F9] to-[#38BDF8] drop-shadow-[0_2px_8px_rgba(2,132,199,0.3)] hover:brightness-110 transition-all cursor-default">
              CycloSense
            </span>
          </div>
        </div>
      </div>

      {/* Center: System Metrics — NO OPERATIONAL badge */}
      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center gap-2 px-2.5 py-1 bg-[#1E293B] border border-[#334155] rounded-[4px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
          <span className="text-[11px] font-mono text-[#94A3B8]">ACTIVE SYSTEMS:</span>
          <span className="text-xs font-mono font-bold text-[#F1F5F9]">
            {activeSystemsCount.toString().padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-1 bg-[#1E293B] border border-[#334155] rounded-[4px] text-[11px] font-mono text-[#94A3B8]">
          <span className="text-[10px] uppercase">FEEDS:</span>
          {["INSAT", "IR", "VIS", "MW"].map((feed) => (
            <span key={feed} className="flex items-center gap-1 text-[#CBD5E1]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
              {feed}
            </span>
          ))}
        </div>
      </div>

      {/* Right: UTC Clock, Search, Bell */}
      <div className="flex items-center gap-2">
        <div className="hidden lg:flex flex-col items-end mr-2 text-right">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#F1F5F9]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
            <span>{utcTime}</span>
          </div>
          <span className="text-[9px] font-mono text-[#94A3B8] uppercase">
            SYNCHRONIZED METEOROLOGICAL TIME
          </span>
        </div>

        {/* Search */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-2.5 py-1.5 bg-[#1E293B] hover:bg-[#263447] border border-[#334155] rounded-[4px] text-xs font-mono text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
          title="Search systems, coordinates, historical cases"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">SEARCH</span>
        </button>

        {/* Notifications */}
        <button
          onClick={onOpenEvents}
          className="relative p-1.5 bg-[#1E293B] hover:bg-[#263447] border border-[#334155] rounded-[4px] text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
          title="Open Alerts & Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadEventsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B91C1C] rounded-full text-[8px] font-mono font-bold text-white flex items-center justify-center">
              {unreadEventsCount > 9 ? "9+" : unreadEventsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
