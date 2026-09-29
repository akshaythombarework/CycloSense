"use client";

import React from "react";
import { ForecastPoint } from "@/types/prediction";
import { ActiveCyclone } from "@/types/cyclone";
import { Compass } from "lucide-react";

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
    <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] p-3 flex flex-col h-full text-xs font-mono">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#334155]">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#0284C7]" />
          <div>
            <h3 className="font-bold text-[#F1F5F9] tracking-wider uppercase">
              AI TRACK FORECAST & UNCERTAINTY POSITION MATRIX
            </h3>
          </div>
        </div>
      </div>

      {/* Forecast Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-[11px] font-mono border-collapse">
          <thead>
            <tr className="border-b border-[#334155] bg-[#0F172A] text-[#94A3B8] text-[10px] uppercase">
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
          <tbody className="divide-y divide-[#334155]">
            {/* Current Reference Row */}
            <tr className="bg-[#0F172A] font-bold">
              <td className="py-2.5 px-3 text-[#B91C1C]">NOW (0h)</td>
              <td className="py-2.5 px-3 text-[#94A3B8]">{cyclone.lastUpdatedUtc}</td>
              <td className="py-2.5 px-3 text-[#F1F5F9]">{cyclone.currentCoord.formattedLat}</td>
              <td className="py-2.5 px-3 text-[#F1F5F9]">{cyclone.currentCoord.formattedLon}</td>
              <td className="py-2.5 px-3 text-[#B91C1C]">{cyclone.maxSustainedWindKts} kt</td>
              <td className="py-2.5 px-3 text-[#94A3B8]">{cyclone.centralPressureHpa} hPa</td>
              <td className="py-2.5 px-3 text-[#F1F5F9]">{cyclone.currentCategory}</td>
              <td className="py-2.5 px-3 text-[#15803D]">OBSERVED</td>
              <td className="py-2.5 px-3 text-[#15803D]">100%</td>
            </tr>

            {/* Forecast Rows */}
            {forecastPoints.map((pt, idx) => {
              const isSelected = selectedPoint?.timeHorizon === pt.timeHorizon;

              return (
                <tr
                  key={idx}
                  onClick={() => onSelectPoint && onSelectPoint(pt)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? "bg-[#0F172A] text-[#F1F5F9]" : "hover:bg-[#0F172A]/50"
                  }`}
                >
                  <td className="py-2.5 px-3 font-bold text-[#3B82F6]">
                    {pt.timeHorizon}
                  </td>
                  <td className="py-2.5 px-3 text-[#94A3B8]">{pt.validTimestamp}</td>
                  <td className="py-2.5 px-3 text-[#F1F5F9]">{pt.formattedLat}</td>
                  <td className="py-2.5 px-3 text-[#F1F5F9]">{pt.formattedLon}</td>
                  <td className="py-2.5 px-3 font-bold text-[#F1F5F9]">
                    {pt.predictedWindKts} kt
                  </td>
                  <td className="py-2.5 px-3 text-[#94A3B8]">{pt.predictedPressureHpa} hPa</td>
                  <td className="py-2.5 px-3 text-[#94A3B8]">{pt.predictedCategory}</td>
                  <td className="py-2.5 px-3 text-[#0284C7]">±{pt.uncertaintyRadiusKm} km</td>
                  <td className="py-2.5 px-3">
                    <span className="text-[#15803D] font-bold">{pt.confidencePercent}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Probability Cone Coordinates Matrix */}
      <div className="mt-3 p-2.5 bg-[#0F172A] border border-[#334155] rounded-[3px] space-y-1.5">
        <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block font-bold">
          CONE OF UNCERTAINTY LATERAL BOUNDARIES (NORTH / SOUTH FLANKS)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
          {forecastPoints.map((pt) => (
            <div key={pt.timeHorizon} className="p-1.5 bg-[#1E293B] border border-[#334155] rounded">
              <div className="text-[#0284C7] font-bold mb-0.5">{pt.timeHorizon} FLANK:</div>
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
