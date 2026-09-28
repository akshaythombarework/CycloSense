"use client";

import React, { useState } from "react";
import { HistoricalCase } from "@/types/validation";
import { PredictionVsReference } from "./PredictionVsReference";
import { History, Filter, Search, Compass, CheckCircle2, ChevronRight, Play } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";

interface HistoricalValidationViewProps {
  cases: HistoricalCase[];
}

export const HistoricalValidationView: React.FC<HistoricalValidationViewProps> = ({
  cases,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || "fani-2019");
  const [selectedBasin, setSelectedBasin] = useState<string>("ALL");
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCases = cases.filter((c) => {
    if (selectedBasin !== "ALL" && c.basin !== selectedBasin) return false;
    if (selectedYear !== "ALL" && c.year.toString() !== selectedYear) return false;
    if (
      searchQuery &&
      !c.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !c.landfallLocation.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const activeCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  return (
    <div className="flex-1 flex flex-col p-3 gap-3 overflow-y-auto bg-[#0B1120]">
      {/* Top Filter Toolbar */}
      <div className="bg-[#111827] border border-[#263449] p-2.5 rounded-[4px] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#38BDF8] font-bold">
            <Filter className="w-3.5 h-3.5" />
            <span>ARCHIVE FILTERS:</span>
          </div>

          {/* Basin Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-[#64748B]">BASIN:</span>
            <select
              value={selectedBasin}
              onChange={(e) => setSelectedBasin(e.target.value)}
              className="bg-[#0B1120] border border-[#263449] rounded px-2 py-1 text-xs text-[#CBD5E1] outline-none"
            >
              <option value="ALL">All North Indian Ocean</option>
              <option value="Bay of Bengal">Bay of Bengal</option>
              <option value="Arabian Sea">Arabian Sea</option>
            </select>
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-[#64748B]">YEAR:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-[#0B1120] border border-[#263449] rounded px-2 py-1 text-xs text-[#CBD5E1] outline-none"
            >
              <option value="ALL">All Seasons</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </select>
          </div>
        </div>

        {/* Search input */}
        <div className="flex items-center gap-1.5 bg-[#0B1120] border border-[#263449] rounded px-2 py-1">
          <Search className="w-3.5 h-3.5 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search cyclone name, landfall..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs font-mono text-[#F8FAFC] placeholder-[#64748B] w-48"
          />
        </div>
      </div>

      {/* Historical Cases Archive Table */}
      <div className="bg-[#111827] border border-[#263449] rounded-[4px] overflow-hidden text-xs font-mono">
        <div className="px-3 py-2 bg-[#0B1120] border-b border-[#263449] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-3.5 h-3.5 text-[#A78BFA]" />
            <span className="font-bold text-[#F8FAFC] tracking-wider uppercase">
              HISTORICAL CYCLONE CASE ARCHIVE & GROUND TRUTH BEST TRACK
            </span>
          </div>
          <span className="text-[10px] text-[#94A3B8]">
            {filteredCases.length} OF {cases.length} CASES
          </span>
        </div>

        <div className="overflow-x-auto max-h-60">
          <table className="w-full text-left text-[11px] font-mono border-collapse">
            <thead className="bg-[#070B14] sticky top-0 z-10">
              <tr className="border-b border-[#263449] text-[#64748B] text-[10px] uppercase">
                <th className="py-2 px-3 font-normal">HISTORICAL CYCLONE</th>
                <th className="py-2 px-3 font-normal">YEAR</th>
                <th className="py-2 px-3 font-normal">BASIN</th>
                <th className="py-2 px-3 font-normal">PEAK WIND</th>
                <th className="py-2 px-3 font-normal">MIN PRESSURE</th>
                <th className="py-2 px-3 font-normal">LANDFALL LOCATION</th>
                <th className="py-2 px-3 font-normal">AI TRACK MAE</th>
                <th className="py-2 px-3 font-normal">AI INTENSITY MAE</th>
                <th className="py-2 px-3 font-normal">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              {filteredCases.map((c) => {
                const isSelected = c.id === selectedCaseId;

                return (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "bg-[#1E293B] text-[#F8FAFC]" : "hover:bg-[#172033]/60"
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-[#F8FAFC] flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#38BDF8]" : "bg-[#64748B]"}`} />
                      {c.name}
                    </td>
                    <td className="py-2.5 px-3 text-[#CBD5E1]">{c.year}</td>
                    <td className="py-2.5 px-3 text-[#38BDF8]">{c.basin}</td>
                    <td className="py-2.5 px-3 font-bold text-[#F43F5E]">{c.peakWindKts} kt</td>
                    <td className="py-2.5 px-3 text-[#94A3B8]">{c.lowestPressureHpa} hPa</td>
                    <td className="py-2.5 px-3 text-[#CBD5E1]">{c.landfallLocation}</td>
                    <td className="py-2.5 px-3 font-bold text-[#22C55E]">{c.aiTrackMaeKm} km</td>
                    <td className="py-2.5 px-3 font-bold text-[#22C55E]">{c.aiIntensityMaeKts} kt</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 bg-[#0B1120] hover:bg-[#1E40AF] border border-[#263449] rounded text-[10px] text-[#38BDF8] hover:text-white transition-colors">
                        INSPECT
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Case Detailed Verification Analysis */}
      {activeCase && (
        <div className="flex-1 min-h-[380px]">
          <PredictionVsReference historicalCase={activeCase} />
        </div>
      )}
    </div>
  );
};
