"use client";

import React, { useState } from "react";
import { HistoricalCase } from "@/types/validation";
import { PredictionVsReference } from "./PredictionVsReference";
import { History, Filter, Search } from "lucide-react";

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
    <div className="flex-1 flex flex-col p-3 gap-3 overflow-y-auto bg-[#0F172A]">
      {/* Top Filter Toolbar */}
      <div className="bg-[#1E293B] border border-[#334155] p-2.5 rounded-[4px] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#0284C7] font-bold">
            <Filter className="w-3.5 h-3.5" />
            <span>ARCHIVE FILTERS:</span>
          </div>

          {/* Basin Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-[#94A3B8]">BASIN:</span>
            <select
              value={selectedBasin}
              onChange={(e) => setSelectedBasin(e.target.value)}
              className="bg-[#0F172A] border border-[#334155] rounded px-2 py-1 text-xs text-[#F1F5F9] outline-none"
            >
              <option value="ALL">All North Indian Ocean</option>
              <option value="Bay of Bengal">Bay of Bengal</option>
              <option value="Arabian Sea">Arabian Sea</option>
            </select>
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-[#94A3B8]">YEAR:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-[#0F172A] border border-[#334155] rounded px-2 py-1 text-xs text-[#F1F5F9] outline-none"
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
        <div className="flex items-center gap-1.5 bg-[#0F172A] border border-[#334155] rounded px-2 py-1">
          <Search className="w-3.5 h-3.5 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search cyclone name, landfall..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs font-mono text-[#F1F5F9] placeholder-[#94A3B8] w-48"
          />
        </div>
      </div>

      {/* Historical Cases Archive Table */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] overflow-hidden text-xs font-mono">
        <div className="px-3 py-2 bg-[#0F172A] border-b border-[#334155] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span className="font-bold text-[#F1F5F9] tracking-wider uppercase">
              HISTORICAL CYCLONE CASE ARCHIVE & GROUND TRUTH BEST TRACK
            </span>
          </div>
          <span className="text-[10px] text-[#94A3B8]">
            {filteredCases.length} OF {cases.length} CASES
          </span>
        </div>

        <div className="overflow-x-auto max-h-60">
          <table className="w-full text-left text-[11px] font-mono border-collapse">
            <thead className="bg-[#0F172A] sticky top-0 z-10">
              <tr className="border-b border-[#334155] text-[#94A3B8] text-[10px] uppercase">
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
            <tbody className="divide-y divide-[#334155]">
              {filteredCases.map((c) => {
                const isSelected = c.id === selectedCaseId;

                return (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "bg-[#0F172A] text-[#F1F5F9]" : "hover:bg-[#0F172A]/50"
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-[#F1F5F9] flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#0284C7]" : "bg-[#94A3B8]"}`} />
                      {c.name}
                    </td>
                    <td className="py-2.5 px-3 text-[#94A3B8]">{c.year}</td>
                    <td className="py-2.5 px-3 text-[#0284C7]">{c.basin}</td>
                    <td className={`py-2.5 px-3 font-bold ${c.peakWindKts >= 140 ? "text-[#B91C1C]" : "text-[#B45309]"}`}>
                      {c.peakWindKts} kt
                    </td>
                    <td className="py-2.5 px-3 text-[#94A3B8]">{c.lowestPressureHpa} hPa</td>
                    <td className="py-2.5 px-3 text-[#94A3B8]">{c.landfallLocation}</td>
                    <td className="py-2.5 px-3 font-bold text-[#15803D]">{c.aiTrackMaeKm} km</td>
                    <td className="py-2.5 px-3 font-bold text-[#15803D]">{c.aiIntensityMaeKts} kt</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] transition-colors border ${
                          isSelected
                            ? "bg-[#3B82F6] text-white border-[#3B82F6] font-bold"
                            : "bg-[#0F172A] hover:bg-[#1E293B] border-[#334155] text-[#94A3B8] hover:text-[#F1F5F9]"
                        }`}
                      >
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
