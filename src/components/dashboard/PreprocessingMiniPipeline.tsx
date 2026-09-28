"use client";

import React, { useState } from "react";
import { Cpu, CheckCircle2, ChevronDown, ChevronUp, Layers, Clock } from "lucide-react";
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
    <div className="bg-[#111827] border border-[#263449] rounded-[4px] overflow-hidden text-xs font-mono">
      {/* Header Bar */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="px-3 py-2 bg-[#0B1120] hover:bg-[#172033] cursor-pointer flex items-center justify-between border-b border-[#263449] transition-colors select-none"
      >
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span className="font-bold text-[#F8FAFC] tracking-wider uppercase">
            DATA PREPROCESSING & FUSION PIPELINE
          </span>
          <span className="text-[10px] text-[#22C55E] bg-[#062419] border border-[#134E35] px-1.5 py-0.2 rounded">
            ALL 5 STAGES NOMINAL
          </span>
        </div>

        <div className="flex items-center gap-2 text-[#94A3B8]">
          <span className="text-[10px]">{expanded ? "HIDE DETAILS" : "SHOW TELEMETRY"}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </div>

      {/* Pipeline Visual Flow Ribbon */}
      <div className="p-2.5 bg-[#070B14] flex items-center justify-between overflow-x-auto gap-2">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center gap-2 shrink-0">
            <div className="p-1.5 px-2 bg-[#111827] border border-[#263449] rounded-[3px] flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />
              <span className="text-[10px] text-[#E2E8F0] font-medium">
                {step.name.split(" ")[0]} {step.name.split(" ")[1]}
              </span>
              <span className="text-[9px] text-[#64748B]">{step.durationMs}ms</span>
            </div>
            {idx < steps.length - 1 && (
              <span className="text-[#38BDF8] font-bold text-xs">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Expanded Table */}
      {expanded && (
        <div className="p-3 bg-[#111827] border-t border-[#263449] space-y-2 overflow-x-auto animate-in fade-in-0 duration-150">
          <table className="w-full text-left text-[11px] font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#263449] text-[#64748B] text-[10px] uppercase">
                <th className="pb-1.5 font-normal">STAGE NAME</th>
                <th className="pb-1.5 font-normal">INPUT TENSOR</th>
                <th className="pb-1.5 font-normal">OUTPUT TENSOR</th>
                <th className="pb-1.5 font-normal">EXEC TIME</th>
                <th className="pb-1.5 font-normal">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              {steps.map((s) => (
                <tr key={s.id} className="hover:bg-[#172033]/50">
                  <td className="py-1.5 font-semibold text-[#F8FAFC]">{s.name}</td>
                  <td className="py-1.5 text-[#94A3B8]">{s.inputShape}</td>
                  <td className="py-1.5 text-[#38BDF8]">{s.outputShape}</td>
                  <td className="py-1.5 text-[#CBD5E1]">{s.durationMs} ms</td>
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
