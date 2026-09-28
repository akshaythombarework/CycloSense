import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-[#172033] border border-[#263449]/40 rounded-[3px] ${className}`}
    />
  );
};
