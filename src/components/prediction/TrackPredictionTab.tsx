"use client";

import React from "react";
import { ForecastPoint } from "@/types/prediction";
import { ActiveCyclone } from "@/types/cyclone";
import { Compass, Navigation, Radio, ShieldCheck, MapPin } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";

interface TrackPredictionTabProps {
  cyclone: ActiveCyclone;
  forecastPoints: ForecastPoint[];
  selectedPoint?: ForecastPoint | null;
  onSelectPoint?: (point: ForecastPoint) => void;
}

export const TrackPredictionTab: React.FC<TrackPredictionTabProps> = ({
  cyclone,
  forecastPoints,
  selectedPoint,
  onSelectPoint,
}) => {
  return (
    <div className="bg-[#111827] border border-[#263449] rounded-[4px] p-3 flex flex-col h-full text-xs font-mono">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#263449]">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#38BDF8]" />
          <div>
            <h3 className="font-bold text-[#F8FAFC] tracking-wider uppercase">
              AI TRACK FORECAST & UNCERTAINTY POSITION MATRIX
            </h3>
            <p className="text-[10px] text-[#94A3B8]">
              Geographical center forecasts, probability cone boundaries, and cross-track deviations
            </p>
          </div>
        </div>
        <span className="text-[10px] text-[#38BDF8] bg-[#072338] border border-[#0E4970] px-2 py-0.5 rounded">
          DEEP TRAJECTORY NETWORK
        </span>
      </div>

      {/* Forecast Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-[11px] font-mono border-collapse">
          <thead>
            <tr className="border-b border-[#263449] bg-[#070B14] text-[#64748B] text-[10px] uppercase">
              <th className="py-2 px-3 font-normal">LEAD TIME</th>
              <th className="py-2 px-3 font-normal">VALID UTC</th>
              <th className="py-2 px-3 font-normal">FORECAST LAT</th>
              <th className="py-2 px-3 font-normal">FORECAST LON</th>
              <th className="py-2 px-3 font-normal">WIND (kt)</th>
              <th className="py-2 px-3 font-normal">PRESSURE</th>
              <th className="py-2 px-3 font-normal">CATEGORY</th>
              <th className="py-2 px-3 font-normal">UNCERTAINTY</th>
              <th className="py-2 px-3 font-normal">CONFIDENCE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]">
            {/* Current Reference Row */}
            <tr className="bg-[#0B1120] font-bold">
              <td className="py-2.5 px-3 text-[#F43F5E]">NOW (0h)</td>
              <td className="py-2.5 px-3 text-[#CBD5E1]">{cyclone.lastUpdatedUtc}</td>
              <td className="py-2.5 px-3 text-[#F8FAFC]">{cyclone.currentCoord.formattedLat}</td>
              <td className="py-2.5 px-3 text-[#F8FAFC]">{cyclone.currentCoord.formattedLon}</td>
              <td className="py-2.5 px-3 text-[#F43F5E]">{cyclone.maxSustainedWindKts} kt</td>
              <td className="py-2.5 px-3 text-[#CBD5E1]">{cyclone.centralPressureHpa} hPa</td>
              <td className="py-2.5 px-3 text-[#F8FAFC]">{cyclone.currentCategory}</td>
              <td className="py-2.5 px-3 text-[#22C55E]">OBSERVED</td>
              <td className="py-2.5 px-3 text-[#22C55E]">100%</td>
            </tr>

            {/* Forecast Rows */}
            {forecastPoints.map((pt, idx) => {
              const isSelected = selectedPoint?.timeHorizon === pt.timeHorizon;

              return (
                <tr
                  key={idx}
                  onClick={() => onSelectPoint && onSelectPoint(pt)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? "bg-[#1E293B] text-[#F8FAFC]" : "hover:bg-[#172033]/60"
                  }`}
                >
                  <td className="py-2.5 px-3 font-bold text-[#60A5FA]">
                    {pt.timeHorizon}
                  </td>
                  <td className="py-2.5 px-3 text-[#94A3B8]">{pt.validTimestamp}</td>
                  <td className="py-2.5 px-3 text-[#E2E8F0]">{pt.formattedLat}</td>
                  <td className="py-2.5 px-3 text-[#E2E8F0]">{pt.formattedLon}</td>
                  <td className="py-2.5 px-3 font-bold text-[#F8FAFC]">
                    {pt.predictedWindKts} kt
                  </td>
                  <td className="py-2.5 px-3 text-[#94A3B8]">{pt.predictedPressureHpa} hPa</td>
                  <td className="py-2.5 px-3 text-[#CBD5E1]">{pt.predictedCategory}</td>
                  <td className="py-2.5 px-3 text-[#38BDF8]">±{pt.uncertaintyRadiusKm} km</td>
                  <td className="py-2.5 px-3">
                    <span className="text-[#22C55E] font-bold">{pt.confidencePercent}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Probability Cone Coordinates Matrix */}
      <div className="mt-3 p-2.5 bg-[#0B1120] border border-[#263449] rounded-[3px] space-y-1.5">
        <span className="text-[10px] text-[#64748B] uppercase tracking-wider block font-bold">
          CONE OF UNCERTAINTY LATERAL BOUNDARIES (NORTH / SOUTH FLANKS)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
          {forecastPoints.map((pt) => (
            <div key={pt.timeHorizon} className="p-1.5 bg-[#111827] border border-[#1E293B] rounded">
              <div className="text-[#38BDF8] font-bold mb-0.5">{pt.timeHorizon} FLANK:</div>
              <div className="text-[#94A3B8]">
                North: {pt.trackProbabilityCone.latNorth.toFixed(2)}°N, {pt.trackProbabilityCone.lonNorth.toFixed(2)}°E
              </div>
              <div className="text-[#94A3B8]">
                South: {pt.trackProbabilityCone.latSouth.toFixed(2)}°N, {pt.trackProbabilityCone.lonSouth.toFixed(2)}°E
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
