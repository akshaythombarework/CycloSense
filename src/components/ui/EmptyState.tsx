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
      className={`p-8 text-center bg-[#111827] border border-[#263449] rounded-[4px] flex flex-col items-center justify-center ${className}`}
    >
      <FolderSearch className="w-8 h-8 text-[#64748B] mb-3 stroke-[1.5]" />
      <h4 className="text-sm font-mono font-semibold text-[#CBD5E1] tracking-wide mb-1">
        {title}
      </h4>
      <p className="text-xs text-[#64748B] max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-3 py-1.5 bg-[#172033] hover:bg-[#1E293B] border border-[#334155] rounded-[4px] text-xs font-mono text-[#F8FAFC] transition-colors"
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
      className={`p-6 bg-[#171115] border border-[#601D22] rounded-[4px] text-center flex flex-col items-center justify-center ${className}`}
    >
      <AlertTriangle className="w-7 h-7 text-[#F43F5E] mb-2" />
      <h4 className="text-xs font-mono font-bold text-[#F43F5E] tracking-wider mb-1">
        {title}
      </h4>
      <p className="text-xs text-[#CBD5E1] max-w-sm mb-4 font-sans">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2D0D17] hover:bg-[#401221] border border-[#65182D] rounded-[4px] text-xs font-mono text-[#F8FAFC] transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>RETRY INGESTION</span>
        </button>
      )}
    </div>
  );
};
