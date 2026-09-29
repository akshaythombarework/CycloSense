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
        className="flex items-center gap-1.5 px-2 py-0.5 bg-[#0F172A] hover:bg-[#1E293B] border border-[#334155] hover:border-[#3B82F6]/50 rounded-[4px] text-[10px] font-mono text-[#94A3B8] transition-colors"
        title="Inspect Data Provenance (Metadata)"
      >
        <Database className="w-2.5 h-2.5 text-[#0284C7]" />
        <span>PROVENANCE</span>
        <span className="text-[#334155]">|</span>
        <span className="text-[#F1F5F9] truncate max-w-[120px]">{source}</span>
      </button>

      {open && (
        <div className="absolute z-50 bottom-full right-0 mb-1.5 w-76 p-3 bg-[#1E293B] border border-[#334155] rounded-[4px] shadow-2xl text-left">
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#334155]">
            <span className="text-[11px] font-mono font-bold text-[#F1F5F9] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
              DATA PROVENANCE & LINEAGE
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-[#94A3B8] hover:text-[#F1F5F9] text-xs font-mono p-0.5"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5 text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Sensor / Source:</span>
              <span className="text-[#F1F5F9] font-semibold">{source}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8] flex items-center gap-1">
                <FileCode className="w-3 h-3 text-[#94A3B8]" /> Dataset ID:
              </span>
              <span className="text-[#0284C7]">{datasetId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#94A3B8]" /> Observation UTC:
              </span>
              <span className="text-[#F1F5F9]">{timestamp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8] flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#94A3B8]" /> Resolution:
              </span>
              <span className="text-[#F1F5F9]">{resolution}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Pipeline Stage:</span>
              <span className="text-[#F1F5F9]">{processingState}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-[#334155]">
              <span className="text-[#94A3B8]">Integrity Check:</span>
              <span className="text-[#15803D] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#15803D]" />
                {quality}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
