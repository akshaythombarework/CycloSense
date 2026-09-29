"use client";

import React from "react";
import { ActiveCyclone } from "@/types/cyclone";
import { AIEvent } from "@/types/cyclone";
import { ForecastPoint } from "@/types/prediction";
import { PreprocessingStep } from "@/types/satellite";
import { ActiveSystemsPanel } from "./ActiveSystemsPanel";
import { RecentEventsPanel } from "./RecentEventsPanel";
import { MissionMap } from "./MissionMap";
import { CurrentObservationPanel } from "./CurrentObservationPanel";
import { StructuralAnalysisPanel } from "./StructuralAnalysisPanel";
import { PredictionSummaryPanel } from "./PredictionSummaryPanel";
import { NavTabId } from "../layout/Sidebar";

interface MissionControlViewProps {
  cyclones: ActiveCyclone[];
  selectedCyclone: ActiveCyclone;
  onSelectCyclone: (cycloneId: string) => void;
  events: AIEvent[];
  forecastPoints: ForecastPoint[];
  preprocessingSteps: PreprocessingStep[];
  selectedForecastPoint?: ForecastPoint | null;
  onSelectForecastPoint?: (point: ForecastPoint | null) => void;
  timeOffset?: "T-12h" | "T-9h" | "T-6h" | "T-3h" | "NOW";
  onSelectTimeOffset?: (offset: "T-12h" | "T-9h" | "T-6h" | "T-3h" | "NOW") => void;
  onOpenEventsDrawer: () => void;
  onNavigateTab: (tab: NavTabId) => void;
}

export const MissionControlView: React.FC<MissionControlViewProps> = ({
  cyclones,
  selectedCyclone,
  onSelectCyclone,
  events,
  forecastPoints,
  preprocessingSteps: _preprocessingSteps,
  selectedForecastPoint = null,
  onSelectForecastPoint,
  timeOffset = "NOW",
  onSelectTimeOffset: _onSelectTimeOffset,
  onOpenEventsDrawer,
  onNavigateTab,
}) => {
  // Current observation matching selected temporal offset
  const currentObs =
    selectedCyclone.temporalSequence.find((obs) => obs.timeOffsetLabel === timeOffset) ||
    selectedCyclone.temporalSequence[selectedCyclone.temporalSequence.length - 1];

  return (
    <div className="flex-1 flex flex-col p-3 gap-3 overflow-y-auto bg-[#0F172A]">
      {/* 12-Column Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1">
        {/* Left Column: Active Systems & Alerts (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-3 min-h-[420px]">
          <div className="flex-1 min-h-[260px]">
            <ActiveSystemsPanel
              cyclones={cyclones}
              selectedCycloneId={selectedCyclone.id}
              onSelectCyclone={onSelectCyclone}
            />
          </div>
          <div className="h-[280px]">
            <RecentEventsPanel
              events={events}
              onOpenEventsDrawer={onOpenEventsDrawer}
            />
          </div>
        </div>

        {/* Center Column: Dominant Situation Map (6 cols) */}
        <div className="lg:col-span-6 flex flex-col min-h-[550px]">
          <div className="flex-1 h-full min-h-[550px]">
            <MissionMap
              cyclone={selectedCyclone}
              forecastPoints={forecastPoints}
              selectedPoint={selectedForecastPoint}
              onSelectForecastPoint={onSelectForecastPoint}
              className="h-full"
            />
          </div>
        </div>

        {/* Right Column: Current Observation, Structural Analysis & 48h Outlook (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-3 min-h-[500px]">
          <div className="min-h-[220px]">
            <CurrentObservationPanel
              observation={currentObs}
              cycloneName={selectedCyclone.name}
            />
          </div>
          <div className="min-h-[220px]">
            <StructuralAnalysisPanel structure={currentObs.structure} />
          </div>
          <div className="min-h-[160px]">
            <PredictionSummaryPanel
              forecastPoints={forecastPoints}
              selectedPoint={selectedForecastPoint}
              onSelectPoint={onSelectForecastPoint}
              onNavigatePredictionTab={() => onNavigateTab("cyclone-prediction")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
