import React, { useState } from "react";
import { Info } from "lucide-react";

interface ScientificTooltipProps {
  term: string;
  definition: string;
  sourceRef?: string;
  children?: React.ReactNode;
}

export const ScientificTooltip: React.FC<ScientificTooltipProps> = ({
  term,
  definition,
  sourceRef,
  children,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-flex items-center gap-1 cursor-help group"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0}
      role="tooltip"
    >
      {children || <span className="underline decoration-dotted decoration-[#64748B] underline-offset-2">{term}</span>}
      <Info className="w-3 h-3 text-[#64748B] group-hover:text-[#94A3B8] transition-colors" />

      {visible && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-64 p-2 bg-[#1E293B] border border-[#334155] rounded-[4px] shadow-xl text-left pointer-events-none">
          <div className="text-[11px] font-mono font-semibold text-[#F1F5F9] mb-1 flex items-center justify-between border-b border-[#334155] pb-1">
            <span>{term}</span>
            {sourceRef && <span className="text-[9px] text-[#94A3B8] uppercase">{sourceRef}</span>}
          </div>
          <p className="text-[11px] text-[#94A3B8] leading-relaxed font-sans">{definition}</p>
        </div>
      )}
    </span>
  );
};
