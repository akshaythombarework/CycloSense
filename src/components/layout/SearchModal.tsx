"use client";

import React, { useState } from "react";
import { Search, X, Compass, History, Radio, MapPin, Database } from "lucide-react";
import { MOCK_ACTIVE_CYCLONES } from "@/mock/cyclones";
import { MOCK_HISTORICAL_CASES } from "@/mock/validation";
import { NavTabId } from "./Sidebar";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCyclone: (cycloneId: string) => void;
  onNavigateTab: (tab: NavTabId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCyclone,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filteredActive = MOCK_ACTIVE_CYCLONES.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.code.toLowerCase().includes(query.toLowerCase()) ||
      c.basin.toLowerCase().includes(query.toLowerCase())
  );

  const filteredHistorical = MOCK_HISTORICAL_CASES.filter(
    (h) =>
      h.name.toLowerCase().includes(query.toLowerCase()) ||
      h.year.toString().includes(query) ||
      h.landfallLocation.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-[2px]">
      <div className="w-full max-w-xl bg-[#111827] border border-[#334155] rounded-[6px] shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Input bar */}
        <div className="p-3 border-b border-[#263449] flex items-center gap-2 bg-[#0B1120]">
          <Search className="w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search active cyclones, historical archives, sensor feeds, coordinates..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-xs font-mono text-[#F8FAFC] placeholder-[#64748B]"
          />
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-[#172033] border border-[#263449] rounded text-[#94A3B8]">
            ESC
          </kbd>
          <button onClick={onClose} className="p-1 text-[#64748B] hover:text-[#CBD5E1]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Active Systems */}
          <div>
            <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block mb-1.5">
              ACTIVE CYCLONIC SYSTEMS
            </span>
            <div className="space-y-1">
              {filteredActive.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCyclone(c.id);
                    onNavigateTab("mission-control");
                    onClose();
                  }}
                  className="w-full p-2 bg-[#0B1120] hover:bg-[#172033] border border-[#263449] hover:border-[#38BDF8] rounded-[4px] flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span className="text-xs font-mono font-bold text-[#F8FAFC]">
                      {c.name} ({c.code})
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8] px-1.5 py-0.2 bg-[#172033] rounded">
                      {c.currentCategory}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#CBD5E1]">
                    {c.maxSustainedWindKts} kt • {c.currentCoord.formattedLat}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Historical Cases */}
          <div>
            <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block mb-1.5">
              HISTORICAL BEST TRACK ARCHIVE
            </span>
            <div className="space-y-1">
              {filteredHistorical.map((h) => (
                <button
                  key={h.id}
                  onClick={() => {
                    onNavigateTab("historical-cases");
                    onClose();
                  }}
                  className="w-full p-2 bg-[#0B1120] hover:bg-[#172033] border border-[#263449] hover:border-[#A78BFA] rounded-[4px] flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <History className="w-3.5 h-3.5 text-[#A78BFA]" />
                    <span className="text-xs font-mono font-medium text-[#F8FAFC]">
                      {h.name} ({h.year})
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#94A3B8]">
                    Peak {h.peakWindKts} kt • {h.landfallLocation}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Navigation Short-links */}
          <div className="pt-2 border-t border-[#263449]">
            <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block mb-1.5">
              SYSTEM WORKSPACES
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => {
                  onNavigateTab("satellite-analysis");
                  onClose();
                }}
                className="p-2 bg-[#0B1120] hover:bg-[#172033] border border-[#263449] rounded text-left text-[#CBD5E1] hover:text-[#38BDF8]"
              >
                📡 Satellite Multi-Source Analysis
              </button>
              <button
                onClick={() => {
                  onNavigateTab("cyclone-prediction");
                  onClose();
                }}
                className="p-2 bg-[#0B1120] hover:bg-[#172033] border border-[#263449] rounded text-left text-[#CBD5E1] hover:text-[#60A5FA]"
              >
                📈 Prediction & Uncertainty Cone
              </button>
              <button
                onClick={() => {
                  onNavigateTab("model-performance");
                  onClose();
                }}
                className="p-2 bg-[#0B1120] hover:bg-[#172033] border border-[#263449] rounded text-left text-[#CBD5E1] hover:text-[#22C55E]"
              >
                📊 Model Benchmarks & F1 Metrics
              </button>
              <button
                onClick={() => {
                  onNavigateTab("data-sources");
                  onClose();
                }}
                className="p-2 bg-[#0B1120] hover:bg-[#172033] border border-[#263449] rounded text-left text-[#CBD5E1] hover:text-[#F59E0B]"
              >
                🗄 Data Sources & Telemetry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
