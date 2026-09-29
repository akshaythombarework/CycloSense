import React from "react";
import { AlertTriangle, RefreshCw, FolderSearch } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`p-8 text-center bg-[#1E293B] border border-[#334155] rounded-[4px] flex flex-col items-center justify-center ${className}`}
    >
      <FolderSearch className="w-8 h-8 text-[#94A3B8] mb-3 stroke-[1.5]" />
      <h4 className="text-sm font-mono font-semibold text-[#F1F5F9] tracking-wide mb-1">
        {title}
      </h4>
      <p className="text-xs text-[#94A3B8] max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-3 py-1.5 bg-[#0F172A] hover:bg-[#0F172A]/80 border border-[#334155] rounded-[4px] text-xs font-mono text-[#F1F5F9] transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "DATA ACQUISITION ERROR",
  message,
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={`p-6 bg-[#B91C1C]/10 border border-[#B91C1C]/30 rounded-[4px] text-center flex flex-col items-center justify-center ${className}`}
    >
      <AlertTriangle className="w-7 h-7 text-[#B91C1C] mb-2" />
      <h4 className="text-xs font-mono font-bold text-[#B91C1C] tracking-wider mb-1">
        {title}
      </h4>
      <p className="text-xs text-[#94A3B8] max-w-sm mb-4 font-sans">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B91C1C] hover:bg-[#991B1B] border border-[#B91C1C] rounded-[4px] text-xs font-mono text-white transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>RETRY INGESTION</span>
        </button>
      )}
    </div>
  );
};
