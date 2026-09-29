import React from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, Radio, Zap, HelpCircle, ShieldAlert, Minus } from "lucide-react";

export type StatusVariant =
  | "normal"
  | "info"
  | "prediction"
  | "warning"
  | "critical"
  | "ri"
  | "reference"
  | "uncertainty"
  | "unavailable"
  | "degraded"
  | "simulated";

interface StatusBadgeProps {
  status: StatusVariant | string;
  label?: string;
  showIcon?: boolean;
  className?: string;
  size?: "sm" | "md";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  showIcon = true,
  className = "",
  size = "md",
}) => {
  const normStatus = (status || "").toLowerCase();

  let colorClasses = "bg-[#1E293B] text-[#94A3B8] border-[#334155]";
  let IconComponent: React.ElementType = HelpCircle;
  const defaultLabel = label || (status ? status.toUpperCase() : "UNKNOWN");

  if (
    normStatus.includes("normal") ||
    normStatus.includes("valid") ||
    normStatus.includes("detected") ||
    normStatus.includes("online") ||
    normStatus.includes("strong") ||
    normStatus.includes("synchronized") ||
    normStatus.includes("verified") ||
    normStatus.includes("calibrated") ||
    normStatus.includes("optimal") ||
    normStatus.includes("active")
  ) {
    colorClasses = "bg-[#15803D]/15 text-[#15803D] border-[#15803D]/30 font-bold";
    IconComponent = CheckCircle2;
  } else if (normStatus.includes("warning") || normStatus.includes("developing") || normStatus.includes("moderate")) {
    colorClasses = "bg-[#B45309]/15 text-[#B45309] border-[#B45309]/30 font-bold";
    IconComponent = AlertTriangle;
  } else if (
    normStatus.includes("ri") ||
    normStatus.includes("rapid") ||
    normStatus.includes("critical") ||
    normStatus.includes("severe")
  ) {
    colorClasses = "bg-[#B91C1C]/15 text-[#B91C1C] border-[#B91C1C]/30 font-bold";
    IconComponent = Zap;
  } else if (normStatus.includes("pred") || normStatus.includes("forecast")) {
    colorClasses = "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30 font-bold";
    IconComponent = Radio;
  } else if (normStatus.includes("info")) {
    colorClasses = "bg-[#0284C7]/15 text-[#0284C7] border-[#0284C7]/30 font-bold";
    IconComponent = Info;
  } else if (normStatus.includes("invalid") || normStatus.includes("failed")) {
    colorClasses = "bg-[#B91C1C]/15 text-[#B91C1C] border-[#B91C1C]/30 font-bold";
    IconComponent = AlertCircle;
  } else if (normStatus.includes("degraded")) {
    colorClasses = "bg-[#B45309]/15 text-[#B45309] border-[#B45309]/30 font-bold";
    IconComponent = AlertTriangle;
  } else if (normStatus.includes("reference")) {
    colorClasses = "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30 font-bold";
    IconComponent = Radio;
  } else if (normStatus.includes("simulated") || normStatus.includes("demo")) {
    colorClasses = "bg-[#B45309]/15 text-[#B45309] border-[#B45309]/30 font-bold";
    IconComponent = ShieldAlert;
  } else if (normStatus.includes("unavailable") || normStatus.includes("n/a") || normStatus === "--") {
    colorClasses = "bg-[#1E293B] text-[#94A3B8] border-[#334155]";
    IconComponent = Minus;
  }

  const paddingClasses = size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]";

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono rounded-[4px] border tracking-wider uppercase ${paddingClasses} ${colorClasses} ${className}`}
    >
      {showIcon && <IconComponent className={size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"} />}
      <span>{label || defaultLabel}</span>
    </span>
  );
};
