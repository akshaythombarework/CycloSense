import React, { useState, useRef, useEffect } from "react";
import { Database, ShieldCheck, Clock, Layers, FileCode, CheckCircle2 } from "lucide-react";

interface DataProvenanceBadgeProps {
  source: string;
  timestamp: string;
  datasetId?: string;
  resolution?: string;
  processingState?: string;
  quality?: "VALID" | "DEGRADED" | "SIMULATED";
  className?: string;
}

export const DataProvenanceBadge: React.FC<DataProvenanceBadgeProps> = ({
  source,
  timestamp,
  datasetId = "NIO-CYC-2026-L2B",
  resolution = "4.0 km",
  processingState = "Level-2 Calibrated",
  quality = "VALID",
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-0.5 bg-[#0B1120] hover:bg-[#172033] border border-[#263449] hover:border-[#334155] rounded-[3px] text-[10px] font-mono text-[#94A3B8] transition-colors"
        title="Inspect Data Provenance & Telemetry (Metadata)"
      >
        <Database className="w-2.5 h-2.5 text-[#38BDF8]" />
        <span>PROVENANCE</span>
        <span className="text-[#64748B]">|</span>
        <span className="text-[#CBD5E1] truncate max-w-[120px]">{source}</span>
      </button>

      {open && (
        <div className="absolute z-50 bottom-full right-0 mb-1.5 w-76 p-3 bg-[#111827] border border-[#334155] rounded-[4px] shadow-2xl text-left">
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#263449]">
            <span className="text-[11px] font-mono font-bold text-[#F8FAFC] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
              DATA PROVENANCE & LINEAGE
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-[#64748B] hover:text-[#F8FAFC] text-xs font-mono p-0.5"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5 text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Sensor / Source:</span>
              <span className="text-[#F8FAFC] font-semibold">{source}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8] flex items-center gap-1">
                <FileCode className="w-3 h-3 text-[#64748B]" /> Dataset ID:
              </span>
              <span className="text-[#38BDF8]">{datasetId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#64748B]" /> Observation UTC:
              </span>
              <span className="text-[#E2E8F0]">{timestamp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8] flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#64748B]" /> Resolution:
              </span>
              <span className="text-[#E2E8F0]">{resolution}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Pipeline Stage:</span>
              <span className="text-[#E2E8F0]">{processingState}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-[#1E293B]">
              <span className="text-[#94A3B8]">Integrity Check:</span>
              <span className="text-[#22C55E] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />
                {quality}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
