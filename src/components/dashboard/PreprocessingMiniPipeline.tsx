"use client";

import React, { useState } from "react";
import { Cpu, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { PreprocessingStep } from "@/types/satellite";
import { StatusBadge } from "../ui/StatusBadge";

interface PreprocessingMiniPipelineProps {
  steps: PreprocessingStep[];
}

export const PreprocessingMiniPipeline: React.FC<PreprocessingMiniPipelineProps> = ({
  steps,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] overflow-hidden text-xs font-mono">
      {/* Header Bar */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="px-3 py-2 bg-[#0F172A] hover:bg-[#0F172A]/80 cursor-pointer flex items-center justify-between border-b border-[#334155] transition-colors select-none"
      >
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-[#0284C7]" />
          <span className="font-bold text-[#F1F5F9] tracking-wider uppercase">
            DATA PREPROCESSING & FUSION PIPELINE
          </span>
          <span className="text-[10px] text-[#15803D] bg-[#15803D]/15 border border-[#15803D]/30 px-2 py-0.5 rounded font-bold">
            ALL 5 STAGES NOMINAL
          </span>
        </div>

        <div className="flex items-center gap-2 text-[#94A3B8]">
          <span className="text-[10px]">{expanded ? "HIDE DETAILS" : "SHOW TELEMETRY"}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </div>

      {/* Pipeline Visual Flow Ribbon */}
      <div className="p-2.5 bg-[#0F172A] flex items-center justify-between overflow-x-auto gap-2">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center gap-2 shrink-0">
            <div className="p-1.5 px-2 bg-[#1E293B] border border-[#334155] rounded-[3px] flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-[#15803D]" />
              <span className="text-[10px] text-[#F1F5F9] font-medium">
                {step.name.split(" ")[0]} {step.name.split(" ")[1]}
              </span>
              <span className="text-[9px] text-[#94A3B8]">{step.durationMs}ms</span>
            </div>
            {idx < steps.length - 1 && (
              <span className="text-[#0284C7] font-bold text-xs">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Expanded Table */}
      {expanded && (
        <div className="p-3 bg-[#1E293B] border-t border-[#334155] space-y-2 overflow-x-auto animate-in fade-in-0 duration-150">
          <table className="w-full text-left text-[11px] font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#334155] text-[#94A3B8] text-[10px] uppercase">
                <th className="pb-1.5 font-normal">STAGE NAME</th>
                <th className="pb-1.5 font-normal">INPUT TENSOR</th>
                <th className="pb-1.5 font-normal">OUTPUT TENSOR</th>
                <th className="pb-1.5 font-normal">EXEC TIME</th>
                <th className="pb-1.5 font-normal">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {steps.map((s) => (
                <tr key={s.id} className="hover:bg-[#0F172A]/50">
                  <td className="py-1.5 font-semibold text-[#F1F5F9]">{s.name}</td>
                  <td className="py-1.5 text-[#94A3B8]">{s.inputShape}</td>
                  <td className="py-1.5 text-[#0284C7]">{s.outputShape}</td>
                  <td className="py-1.5 text-[#94A3B8]">{s.durationMs} ms</td>
                  <td className="py-1.5">
                    <StatusBadge status={s.status} label={s.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
