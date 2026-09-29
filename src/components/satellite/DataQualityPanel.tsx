"use client";

import React from "react";
import { DataQualityReport } from "@/types/satellite";
import { ShieldCheck } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";

interface DataQualityPanelProps {
  report: DataQualityReport;
}

export const DataQualityPanel: React.FC<DataQualityPanelProps> = ({ report }) => {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] p-3 text-xs font-mono">
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#334155]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
          <span className="font-bold text-[#F1F5F9] tracking-wider uppercase">
            DATA INTEGRITY & QUALITY AUDIT
          </span>
        </div>
        <StatusBadge status="normal" label="INGESTION NOMINAL" size="sm" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
          <span className="text-[10px] text-[#94A3B8] uppercase block">IR SENSOR</span>
          <StatusBadge status={report.irSensor} label={report.irSensor} size="sm" className="mt-1" />
        </div>

        <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
          <span className="text-[10px] text-[#94A3B8] uppercase block">VISIBLE</span>
          <StatusBadge status={report.visibleSensor} label={report.visibleSensor} size="sm" className="mt-1" />
        </div>

        <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
          <span className="text-[10px] text-[#94A3B8] uppercase block">MICROWAVE</span>
          <StatusBadge status={report.microwaveSensor} label={report.microwaveSensor} size="sm" className="mt-1" />
        </div>

        <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
          <span className="text-[10px] text-[#94A3B8] uppercase block">TIMESTAMP SYNC</span>
          <span className="text-xs font-bold text-[#15803D] block mt-1">
            ✓ {report.timestampSync}
          </span>
        </div>

        <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
          <span className="text-[10px] text-[#94A3B8] uppercase block">GEOLOCATION</span>
          <span className="text-xs font-bold text-[#15803D] block mt-1">
            ✓ {report.geolocation}
          </span>
        </div>

        <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
          <span className="text-[10px] text-[#94A3B8] uppercase block">MISSING PIXELS</span>
          <span className="text-xs font-bold text-[#F1F5F9] block mt-1">
            {report.missingPixelsPct}%
          </span>
        </div>

        <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
          <span className="text-[10px] text-[#94A3B8] uppercase block">INGEST LATENCY</span>
          <span className="text-xs font-bold text-[#0284C7] block mt-1">
            {report.ingestionLatencySeconds}s (LIVE)
          </span>
        </div>
      </div>
    </div>
  );
};
