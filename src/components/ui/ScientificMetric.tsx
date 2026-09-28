import React from "react";
import { ScientificTooltip } from "./ScientificTooltip";
import { TrendArrow } from "./TrendArrow";

interface ScientificMetricProps {
  label: string;
  value: string | number;
  unit?: string;
  subValue?: string;
  trend?: "up" | "down" | "neutral" | "up-right" | "down-right" | "positive" | "negative";
  trendDelta?: string;
  tooltipDefinition?: string;
  tooltipRef?: string;
  highlight?: boolean;
  alertColor?: "normal" | "warning" | "critical" | "info" | "none";
  className?: string;
}

export const ScientificMetric: React.FC<ScientificMetricProps> = ({
  label,
  value,
  unit,
  subValue,
  trend,
  trendDelta,
  tooltipDefinition,
  tooltipRef,
  highlight = false,
  alertColor = "none",
  className = "",
}) => {
  let valueColor = "text-[#F8FAFC]";
  if (alertColor === "critical") valueColor = "text-[#F43F5E]";
  else if (alertColor === "warning") valueColor = "text-[#F59E0B]";
  else if (alertColor === "normal") valueColor = "text-[#22C55E]";
  else if (alertColor === "info") valueColor = "text-[#38BDF8]";

  return (
    <div
      className={`p-2.5 bg-[#111827] border ${
        highlight ? "border-[#38BDF8]/60 bg-[#172033]" : "border-[#263449]"
      } rounded-[4px] flex flex-col justify-between transition-colors ${className}`}
    >
      <div className="flex items-center justify-between gap-1 mb-1">
        <span className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
          {tooltipDefinition ? (
            <ScientificTooltip term={label} definition={tooltipDefinition} sourceRef={tooltipRef}>
              <span>{label}</span>
            </ScientificTooltip>
          ) : (
            label
          )}
        </span>
        {trend && <TrendArrow direction={trend} value={trendDelta} size="sm" />}
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className={`text-2xl font-mono font-bold tracking-tight ${valueColor}`}>
          {value}
        </span>
        {unit && <span className="text-xs font-mono text-[#94A3B8]">{unit}</span>}
      </div>

      {subValue && (
        <div className="mt-1 text-[11px] font-mono text-[#64748B] flex items-center justify-between border-t border-[#1E293B] pt-1">
          <span>{subValue}</span>
        </div>
      )}
    </div>
  );
};
