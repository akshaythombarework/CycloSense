"use client";

/**
 * MissionMap – thin wrapper that dynamically loads the Leaflet world map.
 * Leaflet cannot run on the server (it reads window/document), so we use
 * next/dynamic with ssr:false.  All props are forwarded unchanged.
 */

import React from "react";
import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

import type { LeafletWorldMap as LeafletWorldMapType } from "./LeafletWorldMap";

// Leaflet requires browser APIs – must be client-only
const LeafletWorldMap = dynamic(
  () =>
    import("./LeafletWorldMap").then((mod) => ({ default: mod.LeafletWorldMap })),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#0F172A] border border-[#334155] rounded-[4px] min-h-[460px] gap-3">
        <div className="w-8 h-8 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-[#94A3B8] tracking-wider">LOADING WORLD MAP…</span>
      </div>
    ),
  }
);

// Re-export with the same prop interface so callers don't change
export type MissionMapProps = ComponentProps<typeof LeafletWorldMapType>;

export const MissionMap: React.FC<MissionMapProps> = (props) => {
  return <LeafletWorldMap {...props} />;
};
