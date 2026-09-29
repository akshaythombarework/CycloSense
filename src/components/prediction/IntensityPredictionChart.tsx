"use client";

import React from "react";
import { IntensityForecastInterval } from "@/types/prediction";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { Activity } from "lucide-react";

interface IntensityPredictionChartProps {
  intervals: IntensityForecastInterval[];
}

export const IntensityPredictionChart: React.FC<IntensityPredictionChartProps> = ({
  intervals,
}) => {
  // Format data for Recharts
  const chartData = intervals.map((item) => ({
    time: item.timeHorizon,
    timestamp: item.timestamp,
    observedWind: item.observedWindKts,
    predictedWind: item.predictedWindKts,
    lowerBound: item.lowerConfidenceBoundKts,
    upperBound: item.upperConfidenceBoundKts,
    observedPressure: item.observedPressureHpa,
    predictedPressure: item.predictedPressureHpa,
  }));

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] p-3 flex flex-col h-full text-xs font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 mb-3 border-b border-[#334155] gap-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#3B82F6]" />
          <div>
            <h3 className="font-bold text-[#F1F5F9] tracking-wider uppercase">
              INTENSITY PREDICTION & CONFIDENCE INTERVAL
            </h3>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#15803D]" />
            <span className="text-[#94A3B8]">Observed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-b border-dashed border-[#3B82F6]" />
            <span className="text-[#3B82F6]">Prediction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 bg-[#3B82F6]/20 border border-[#3B82F6]/40" />
            <span className="text-[#94A3B8]">10%–90% Envelope</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="flex-1 min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid stroke="#334155" strokeDasharray="3,3" />
            <XAxis
              dataKey="time"
              stroke="#64748B"
              tick={{ fill: "#94A3B8", fontSize: 11, fontFamily: "monospace" }}
              axisLine={{ stroke: "#334155" }}
            />
            <YAxis
              domain={[40, 180]}
              stroke="#64748B"
              tick={{ fill: "#94A3B8", fontSize: 11, fontFamily: "monospace" }}
              axisLine={{ stroke: "#334155" }}
              unit=" kt"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-2.5 bg-[#0F172A] border border-[#334155] rounded-[4px] shadow-xl text-xs font-mono">
                      <div className="font-bold text-[#F1F5F9] mb-1 pb-1 border-b border-[#334155]">
                        LEAD TIME: {data.time} ({data.timestamp})
                      </div>
                      {data.observedWind !== undefined && (
                        <div className="text-[#15803D]">
                          OBSERVED: <strong>{data.observedWind} kt</strong>
                        </div>
                      )}
                      {data.predictedWind !== undefined && (
                        <div className="text-[#3B82F6]">
                          PREDICTED: <strong>{data.predictedWind} kt</strong>
                        </div>
                      )}
                      {data.lowerBound !== undefined && (
                        <div className="text-[#94A3B8] text-[10px]">
                          ENVELOPE: {data.lowerBound} kt – {data.upperBound} kt
                        </div>
                      )}
                      {data.predictedPressure && (
                        <div className="text-[#94A3B8] text-[10px] mt-1 pt-1 border-t border-[#334155]">
                          PRESSURE: {data.predictedPressure} hPa
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Current Reference Line */}
            <ReferenceLine
              x="NOW"
              stroke="#B91C1C"
              strokeDasharray="4,4"
              label={{
                value: "NOW (145 kt)",
                fill: "#B91C1C",
                fontSize: 10,
                position: "top",
                fontFamily: "monospace",
              }}
            />

            {/* Uncertainty Envelope Area */}
            <Area
              type="monotone"
              dataKey="upperBound"
              stroke="none"
              fill="#3B82F6"
              fillOpacity={0.15}
            />

            {/* Observed Historical Solid Line */}
            <Line
              type="monotone"
              dataKey="observedWind"
              stroke="#15803D"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#0F172A", stroke: "#15803D", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#15803D" }}
            />

            {/* Model Predicted Dashed Line */}
            <Line
              type="monotone"
              dataKey="predictedWind"
              stroke="#3B82F6"
              strokeWidth={2.5}
              strokeDasharray="6,4"
              dot={{ r: 4, fill: "#0F172A", stroke: "#3B82F6", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#3B82F6" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Quantitative Prediction Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#334155]">
        <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
          <span className="text-[10px] text-[#94A3B8] uppercase block">CURRENT WIND</span>
          <span className="text-base font-bold text-[#F1F5F9]">145 kt</span>
        </div>

        <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
          <span className="text-[10px] text-[#94A3B8] uppercase block">PREDICTED +24H</span>
          <span className="text-base font-bold text-[#3B82F6]">135 kt</span>
          <span className="text-[10px] text-[#94A3B8] block">Interval: 118–152 kt</span>
        </div>

        <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
          <span className="text-[10px] text-[#94A3B8] uppercase block">PEAK FORECAST</span>
          <span className="text-base font-bold text-[#B91C1C]">150 kt (+12h)</span>
        </div>

        <div className="p-2 bg-[#0F172A] border border-[#334155] rounded-[3px]">
          <span className="text-[10px] text-[#94A3B8] uppercase block">INTENSITY MAE</span>
          <span className="text-base font-bold text-[#15803D]">8.4 kt (24h)</span>
        </div>
      </div>
    </div>
  );
};
