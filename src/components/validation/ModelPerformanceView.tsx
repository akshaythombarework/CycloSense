"use client";

import React from "react";
import { ModelPerformanceBenchmark, ValidationMetric } from "@/types/validation";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Cpu } from "lucide-react";

interface ModelPerformanceViewProps {
  benchmarks: ModelPerformanceBenchmark[];
  leadTimeMetrics: ValidationMetric[];
}

export const ModelPerformanceView: React.FC<ModelPerformanceViewProps> = ({
  benchmarks,
  leadTimeMetrics,
}) => {
  const currentModel = benchmarks.find((m) => m.isCurrentSystem) || benchmarks[0];

  // Lead time error growth chart data
  const errorGrowthData = leadTimeMetrics.map((m) => ({
    leadTime: m.leadTime,
    trackMaeKm: m.trackMaeKm,
    trackRmseKm: m.trackRmseKm,
    intensityMaeKts: m.intensityMaeKts,
    crossTrackKm: m.crossTrackErrorKm,
    alongTrackKm: m.alongTrackErrorKm,
  }));

  return (
    <div className="flex-1 flex flex-col p-3 gap-3 overflow-y-auto bg-[#0F172A] text-xs font-mono">
      {/* Top Header Card */}
      <div className="bg-[#1E293B] border border-[#334155] p-3 rounded-[4px] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-5 h-5 text-[#0284C7]" />
          <div>
            <h2 className="font-bold text-sm text-[#F1F5F9] tracking-wider uppercase">
              MODEL PERFORMANCE, BENCHMARKS & OBJECTIVE VALIDATION
            </h2>
          </div>
        </div>
      </div>

      {/* Primary 4-Box Scientific Metrics Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Detection Performance */}
        <div className="p-3 bg-[#1E293B] border border-[#334155] rounded-[4px] space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#334155]">
            <span className="text-[10px] text-[#94A3B8] uppercase font-bold">
              1. CYCLONE DETECTION
            </span>
            <span className="text-[10px] text-[#15803D] font-bold">F1: {(currentModel.detectionF1 * 100).toFixed(1)}%</span>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Precision:</span>
              <span className="text-[#15803D] font-bold">{(currentModel.detectionPrecision * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Recall / Sensitivity:</span>
              <span className="text-[#15803D] font-bold">{(currentModel.detectionRecall * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Harmonic F1-Score:</span>
              <span className="text-[#15803D] font-bold">{(currentModel.detectionF1 * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Classification Performance */}
        <div className="p-3 bg-[#1E293B] border border-[#334155] rounded-[4px] space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#334155]">
            <span className="text-[10px] text-[#94A3B8] uppercase font-bold">
              2. INTENSITY CLASSIFICATION
            </span>
            <span className="text-[10px] text-[#15803D] font-bold">ACC: {(currentModel.classificationAccuracy * 100).toFixed(1)}%</span>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Overall Accuracy:</span>
              <span className="text-[#15803D] font-bold">{(currentModel.classificationAccuracy * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Macro Precision:</span>
              <span className="text-[#15803D] font-bold">{(currentModel.classificationPrecision * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Macro F1-Score:</span>
              <span className="text-[#15803D] font-bold">{(currentModel.classificationF1 * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Track Forecasting MAE */}
        <div className="p-3 bg-[#1E293B] border border-[#334155] rounded-[4px] space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#334155]">
            <span className="text-[10px] text-[#94A3B8] uppercase font-bold">
              3. TRACK ERROR (MAE / RMSE)
            </span>
            <span className="text-[10px] text-[#0284C7] font-bold">24H: {currentModel.track24hMaeKm} km</span>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">24-Hour Track MAE:</span>
              <span className="text-[#0284C7] font-bold">{currentModel.track24hMaeKm} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">48-Hour Track MAE:</span>
              <span className="text-[#0284C7] font-bold">{currentModel.track48hMaeKm} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Cross-Track 24h:</span>
              <span className="text-[#94A3B8] font-bold">28.5 km</span>
            </div>
          </div>
        </div>

        {/* Intensity Forecasting MAE & RI Brier */}
        <div className="p-3 bg-[#1E293B] border border-[#334155] rounded-[4px] space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#334155]">
            <span className="text-[10px] text-[#94A3B8] uppercase font-bold">
              4. INTENSITY MAE & RI SCORE
            </span>
            <span className="text-[10px] text-[#B91C1C] font-bold">RI BRIER: {currentModel.rapidIntensificationBrierScore}</span>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">24-Hour Intensity MAE:</span>
              <span className="text-[#15803D] font-bold">{currentModel.intensity24hMaeKts} kt</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">48-Hour Intensity MAE:</span>
              <span className="text-[#F1F5F9] font-bold">{currentModel.intensity48hMaeKts} kt</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">RI Brier Probability:</span>
              <span className="text-[#B91C1C] font-bold">{currentModel.rapidIntensificationBrierScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Growth Over Forecast Lead Time Chart */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] p-3 flex flex-col min-h-[300px]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#334155]">
          <span className="font-bold text-[#F1F5F9] tracking-wider uppercase">
            FORECAST ERROR GROWTH OVER LEAD TIME (+6H TO +72H)
          </span>
        </div>

        <div className="flex-1 min-h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={errorGrowthData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid stroke="#334155" strokeDasharray="3,3" />
              <XAxis
                dataKey="leadTime"
                stroke="#64748B"
                tick={{ fill: "#94A3B8", fontSize: 11, fontFamily: "monospace" }}
                axisLine={{ stroke: "#334155" }}
              />
              <YAxis
                stroke="#64748B"
                tick={{ fill: "#94A3B8", fontSize: 11, fontFamily: "monospace" }}
                axisLine={{ stroke: "#334155" }}
                unit=" km / kt"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="p-2.5 bg-[#0F172A] border border-[#334155] rounded-[4px] text-xs font-mono">
                        <div className="font-bold text-[#F1F5F9] pb-1 mb-1 border-b border-[#334155]">
                          LEAD TIME: {d.leadTime}
                        </div>
                        <div className="text-[#0284C7]">
                          Track MAE: <strong>{d.trackMaeKm} km</strong> (RMSE: {d.trackRmseKm} km)
                        </div>
                        <div className="text-[#15803D]">
                          Intensity MAE: <strong>{d.intensityMaeKts} kt</strong>
                        </div>
                        <div className="text-[#94A3B8] text-[10px] mt-1 pt-1 border-t border-[#334155]">
                          Along-Track: {d.alongTrackKm} km • Cross-Track: {d.crossTrackKm} km
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px", fontFamily: "monospace" }}
                formatter={(value) => <span className="text-[#94A3B8]">{value}</span>}
              />
              <Line type="monotone" dataKey="trackMaeKm" name="Track MAE (km)" stroke="#0284C7" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="trackRmseKm" name="Track RMSE (km)" stroke="#3B82F6" strokeWidth={1.5} strokeDasharray="4,4" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="intensityMaeKts" name="Intensity MAE (kt)" stroke="#15803D" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Model Benchmark Comparison Table */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] overflow-hidden">
        <div className="px-3 py-2 bg-[#0F172A] border-b border-[#334155] flex items-center justify-between">
          <span className="font-bold text-[#F1F5F9] tracking-wider uppercase">
            OBJECTIVE BENCHMARK COMPARISON AGAINST BASELINES
          </span>
          <span className="text-[10px] text-[#94A3B8]">STANDARDIZED NIO TESTSET</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] font-mono border-collapse">
            <thead className="bg-[#0F172A]">
              <tr className="border-b border-[#334155] text-[#94A3B8] text-[10px] uppercase">
                <th className="py-2 px-3 font-normal">MODEL ARCHITECTURE</th>
                <th className="py-2 px-3 font-normal">VERSION</th>
                <th className="py-2 px-3 font-normal">DETECTION F1</th>
                <th className="py-2 px-3 font-normal">CLASS F1</th>
                <th className="py-2 px-3 font-normal">TRACK 24H MAE</th>
                <th className="py-2 px-3 font-normal">TRACK 48H MAE</th>
                <th className="py-2 px-3 font-normal">INTENSITY 24H MAE</th>
                <th className="py-2 px-3 font-normal">RI BRIER</th>
                <th className="py-2 px-3 font-normal">ROLE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {benchmarks.map((bm, idx) => (
                <tr
                  key={idx}
                  className={`${
                    bm.isCurrentSystem ? "bg-[#0F172A] font-bold text-[#F1F5F9]" : "hover:bg-[#0F172A]/40 text-[#94A3B8]"
                  }`}
                >
                  <td className="py-2 px-3 flex items-center gap-1.5">
                    {bm.isCurrentSystem && <span className="w-2 h-2 rounded-full bg-[#0284C7]" />}
                    {bm.modelName}
                  </td>
                  <td className="py-2 px-3 text-[#94A3B8]">{bm.version}</td>
                  <td className="py-2 px-3 text-[#15803D]">{(bm.detectionF1 * 100).toFixed(1)}%</td>
                  <td className="py-2 px-3 text-[#15803D]">{(bm.classificationF1 * 100).toFixed(1)}%</td>
                  <td className="py-2 px-3 text-[#0284C7]">{bm.track24hMaeKm} km</td>
                  <td className="py-2 px-3 text-[#0284C7]">{bm.track48hMaeKm} km</td>
                  <td className="py-2 px-3 text-[#B45309]">{bm.intensity24hMaeKts} kt</td>
                  <td className="py-2 px-3 text-[#B91C1C]">{bm.rapidIntensificationBrierScore}</td>
                  <td className="py-2 px-3">
                    {bm.isCurrentSystem ? (
                      <span className="px-1.5 py-0.5 bg-[#15803D] text-white rounded text-[9px] font-bold">
                        ACTIVE SYSTEM
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 bg-[#334155] text-[#94A3B8] rounded text-[9px]">
                        BENCHMARK
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
