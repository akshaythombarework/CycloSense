"use client";

import React from "react";
import { DataSourceFeed } from "@/types/dataSources";
import { Database, Radio, CheckCircle2, Clock, Layers, ShieldCheck, Activity, RefreshCw } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";

interface DataSourcesViewProps {
  sources: DataSourceFeed[];
}

export const DataSourcesView: React.FC<DataSourcesViewProps> = ({ sources }) => {
  return (
    <div className="flex-1 flex flex-col p-3 gap-3 overflow-y-auto bg-[#0B1120] text-xs font-mono">
      {/* Header */}
      <div className="bg-[#111827] border border-[#263449] p-3 rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Database className="w-5 h-5 text-[#38BDF8]" />
          <div>
            <h2 className="font-bold text-sm text-[#F8FAFC] tracking-wider uppercase">
              MULTI-SOURCE SATELLITE & REANALYSIS DATA INGESTION REGISTRY
            </h2>
            <p className="text-[10px] text-[#94A3B8]">
              Telemetry status, ingestion cadence, spatial resolutions, and data provenance catalog
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#22C55E] bg-[#062419] border border-[#134E35] px-2 py-0.5 rounded flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            6 / 6 FEEDS SYNCHRONIZED
          </span>
        </div>
      </div>

      {/* Grid of Data Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sources.map((src) => (
          <div
            key={src.id}
            className="p-3 bg-[#111827] border border-[#263449] hover:border-[#334155] rounded-[4px] flex flex-col justify-between space-y-3 transition-colors"
          >
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#1E293B]">
                <span className="text-[10px] text-[#38BDF8] font-bold">
                  {src.agency}
                </span>
                <StatusBadge status={src.status} label={src.status} size="sm" />
              </div>

              <h4 className="font-bold text-[#F8FAFC] text-sm mb-1">
                {src.name}
              </h4>
              <p className="text-[11px] text-[#CBD5E1] font-sans">
                {src.sensor}
              </p>
            </div>

            {/* Specifications Matrix */}
            <div className="p-2.5 bg-[#0B1120] border border-[#1E293B] rounded-[3px] space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">SPATIAL RESOLUTION:</span>
                <span className="text-[#F8FAFC] font-semibold">{src.spatialResolution}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">TEMPORAL CADENCE:</span>
                <span className="text-[#CBD5E1]">{src.temporalCadence}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">COVERAGE:</span>
                <span className="text-[#CBD5E1] truncate max-w-[140px]" title={src.coverage}>
                  {src.coverage}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#1E293B]">
                <span className="text-[#94A3B8]">LAST INGESTION:</span>
                <span className="text-[#38BDF8] font-semibold">{src.lastIngestionUtc}</span>
              </div>
            </div>

            {/* Telemetry Stats */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#1E293B] text-[10px]">
              <div>
                <span className="text-[#64748B] block">24H PACKETS</span>
                <span className="text-[#F8FAFC] font-bold">{src.packetsProcessed24h} cycles</span>
              </div>
              <div className="text-right">
                <span className="text-[#64748B] block">INGEST LATENCY</span>
                <span className="text-[#22C55E] font-bold">{src.latencySeconds}s</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Provenance & Architecture Info Banner */}
      <div className="p-3 bg-[#111827] border border-[#263449] rounded-[4px] space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#F8FAFC]">
          <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
          <span>DATA PROVENANCE & GEOSPATIAL NORMALIZATION POLICY</span>
        </div>
        <p className="text-[11px] text-[#94A3B8] font-sans leading-relaxed">
          All geostationary and polar-orbiting satellite feeds undergo automated coordinate georeferencing, parallax cloud-height displacement correction, and multi-spectral spatial grid resampling to a standard 0.04° (~4 km) equirectangular grid centered on the storm vortex before input to the deep learning models.
        </p>
      </div>
    </div>
  );
};
