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

  let colorClasses = "bg-[#172033] text-[#94A3B8] border-[#263449]";
  let IconComponent: React.ElementType = HelpCircle;
  let defaultLabel = label || (status ? status.toUpperCase() : "UNKNOWN");

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
    colorClasses = "bg-[#062419] text-[#22C55E] border-[#134E35]";
    IconComponent = CheckCircle2;
  } else if (normStatus.includes("warning") || normStatus.includes("developing") || normStatus.includes("moderate")) {
    colorClasses = "bg-[#291B07] text-[#F59E0B] border-[#5A3E11]";
    IconComponent = AlertTriangle;
  } else if (
    normStatus.includes("ri") ||
    normStatus.includes("rapid") ||
    normStatus.includes("critical") ||
    normStatus.includes("severe")
  ) {
    colorClasses = "bg-[#2D0D17] text-[#F43F5E] border-[#65182D]";
    IconComponent = Zap;
  } else if (normStatus.includes("pred") || normStatus.includes("forecast")) {
    colorClasses = "bg-[#0B1E3B] text-[#60A5FA] border-[#1D3E70]";
    IconComponent = Radio;
  } else if (normStatus.includes("info")) {
    colorClasses = "bg-[#072338] text-[#38BDF8] border-[#0E4970]";
    IconComponent = Info;
  } else if (normStatus.includes("invalid") || normStatus.includes("failed")) {
    colorClasses = "bg-[#2D1214] text-[#EF4444] border-[#601D22]";
    IconComponent = AlertCircle;
  } else if (normStatus.includes("degraded")) {
    colorClasses = "bg-[#291B07] text-[#F59E0B] border-[#5A3E11]";
    IconComponent = AlertTriangle;
  } else if (normStatus.includes("reference")) {
    colorClasses = "bg-[#1E1638] text-[#A78BFA] border-[#3F2B75]";
    IconComponent = Radio;
  } else if (normStatus.includes("simulated") || normStatus.includes("demo")) {
    colorClasses = "bg-[#291B07] text-[#F59E0B] border-[#5A3E11]";
    IconComponent = ShieldAlert;
  } else if (normStatus.includes("unavailable") || normStatus.includes("n/a") || normStatus === "--") {
    colorClasses = "bg-[#111827] text-[#64748B] border-[#263449]";
    IconComponent = Minus;
  }

  const paddingClasses = size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]";

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono font-medium rounded-[3px] border tracking-wider uppercase ${paddingClasses} ${colorClasses} ${className}`}
    >
      {showIcon && <IconComponent className={size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"} />}
      <span>{label || defaultLabel}</span>
    </span>
  );
};
