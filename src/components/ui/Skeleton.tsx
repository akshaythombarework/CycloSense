import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-[#1E293B] border border-[#334155]/40 rounded-[3px] ${className}`}
    />
  );
};
