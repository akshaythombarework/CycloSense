"use client";

import React from "react";
import { DataSourceFeed } from "@/types/dataSources";
import { Database } from "lucide-react";

interface DataSourcesViewProps {
  sources: DataSourceFeed[];
}

export const DataSourcesView: React.FC<DataSourcesViewProps> = ({ sources }) => {
  return (
    <div className="flex-1 flex flex-col p-3 gap-3 overflow-y-auto bg-[#0F172A] text-xs font-mono">
      {/* Header */}
      <div className="bg-[#1E293B] border border-[#334155] p-3 rounded-[4px] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Database className="w-5 h-5 text-[#0284C7]" />
          <div>
            <h2 className="font-bold text-sm text-[#F1F5F9] tracking-wider uppercase">
              MULTI-SOURCE SATELLITE & REANALYSIS DATA INGESTION REGISTRY
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white bg-[#15803D] px-2.5 py-1 rounded-[3px] flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            6 / 6 FEEDS SYNCHRONIZED
          </span>
        </div>
      </div>

      {/* Grid of Data Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sources.map((src) => (
          <div
            key={src.id}
            className="p-3 bg-[#1E293B] border border-[#334155] hover:border-[#3B82F6]/60 rounded-[4px] flex flex-col justify-between space-y-3 transition-colors"
          >
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#334155]">
                <span className="text-[10px] text-[#0284C7] font-bold">
                  {src.agency}
                </span>
                <span className="px-1.5 py-0.5 bg-[#15803D] text-white rounded text-[9px] font-bold tracking-wider uppercase">
                  {src.status}
                </span>
              </div>

              <h4 className="font-bold text-[#F1F5F9] text-sm mb-1">
                {src.name}
              </h4>
              <p className="text-[11px] text-[#94A3B8] font-sans">
                {src.sensor}
              </p>
            </div>

            {/* Specifications Matrix */}
            <div className="p-2.5 bg-[#0F172A] border border-[#334155] rounded-[3px] space-y-1.5 text-[11px]">
              <div className="flex justify-between items-start">
                <span className="text-[#94A3B8] whitespace-nowrap">SPATIAL RESOLUTION:</span>
                <span className="text-[#F1F5F9] font-semibold text-right ml-2">{src.spatialResolution}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-[#94A3B8] whitespace-nowrap">TEMPORAL CADENCE:</span>
                <span className="text-[#94A3B8] text-right ml-2">{src.temporalCadence}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-[#94A3B8] whitespace-nowrap">COVERAGE:</span>
                <span className="text-[#94A3B8] text-right ml-2 leading-tight">
                  {src.coverage}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-[#334155]">
                <span className="text-[#94A3B8] whitespace-nowrap">LAST INGESTION:</span>
                <span className="text-[#0284C7] font-semibold text-right ml-2">{src.lastIngestionUtc}</span>
              </div>
            </div>

            {/* Telemetry Stats */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#334155] text-[10px]">
              <div>
                <span className="text-[#94A3B8] block">24H PACKETS</span>
                <span className="text-[#F1F5F9] font-bold">{src.packetsProcessed24h} cycles</span>
              </div>
              <div className="text-right">
                <span className="text-[#94A3B8] block">INGEST LATENCY</span>
                <span className="text-[#15803D] font-bold">{src.latencySeconds}s</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
