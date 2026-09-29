import React from "react";
import { ArrowUpRight, ArrowDownRight, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";

interface TrendArrowProps {
  direction: "up" | "down" | "neutral" | "up-right" | "down-right" | "positive" | "negative";
  value?: string | number;
  className?: string;
  size?: "sm" | "md";
}

export const TrendArrow: React.FC<TrendArrowProps> = ({
  direction,
  value,
  className = "",
  size = "md",
}) => {
  const iconSize = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";

  let icon = <ArrowRight className={iconSize} />;
  let color = "text-[#94A3B8]";

  switch (direction) {
    case "up":
    case "positive":
      icon = <ArrowUp className={iconSize} />;
      color = "text-[#B91C1C]"; // intensification is critical in meteorological tracking
      break;
    case "down":
    case "negative":
      icon = <ArrowDown className={iconSize} />;
      color = "text-[#15803D]"; // weakening is favorable
      break;
    case "up-right":
      icon = <ArrowUpRight className={iconSize} />;
      color = "text-[#B45309]";
      break;
    case "down-right":
      icon = <ArrowDownRight className={iconSize} />;
      color = "text-[#0284C7]";
      break;
    default:
      icon = <ArrowRight className={iconSize} />;
      color = "text-[#94A3B8]";
  }

  return (
    <span className={`inline-flex items-center gap-0.5 font-mono text-xs ${color} ${className}`}>
      {icon}
      {value && <span>{value}</span>}
    </span>
  );
};
