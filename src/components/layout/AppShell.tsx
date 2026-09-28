"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "./TopHeader";
import { Sidebar, NavTabId } from "./Sidebar";
import { AIEventsDrawer } from "./AIEventsDrawer";
import { SearchModal } from "./SearchModal";
import { MissionControlView } from "../dashboard/MissionControlView";
import { SatelliteAnalysisView } from "../satellite/SatelliteAnalysisView";
import { CyclonePredictionView } from "../prediction/CyclonePredictionView";
import { HistoricalValidationView } from "../validation/HistoricalValidationView";
import { ModelPerformanceView } from "../validation/ModelPerformanceView";
import { DataSourcesView } from "../sources/DataSourcesView";

import { cycloneService } from "@/services/cycloneService";
import { satelliteService } from "@/services/satelliteService";
import { predictionService } from "@/services/predictionService";
import { validationService } from "@/services/validationService";
import { dataSourcesService } from "@/services/dataSourcesService";

export const AppShell: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTabId>("mission-control");
  const [selectedCycloneId, setSelectedCycloneId] = useState<string>("BOB-04-2026");
  const [selectedTimeOffset, setSelectedTimeOffset] = useState<"T-12h" | "T-9h" | "T-6h" | "T-3h" | "NOW">("NOW");
  const [selectedForecastPoint, setSelectedForecastPoint] = useState<any | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isEventsOpen, setIsEventsOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Fetch mock services
  const activeCyclones = cycloneService.getActiveCyclones();
  const selectedCyclone = cycloneService.getCycloneById(selectedCycloneId) || activeCyclones[0];
  const aiEvents = cycloneService.getAIEvents();
  const forecastPoints = predictionService.getForecastPoints();
  const intensityIntervals = predictionService.getIntensityIntervals();
  const patternEvolution = predictionService.getPatternEvolution();
  const explainability = predictionService.getExplainability();
  const preprocessingSteps = satelliteService.getPreprocessingSteps();
  const historicalCases = validationService.getHistoricalCases();
  const modelBenchmarks = validationService.getModelBenchmarks();
  const leadTimeMetrics = validationService.getValidationMetrics();
  const dataSources = dataSourcesService.getDataSources();

  // Keyboard shortcut for Search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsEventsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0B1120] text-[#F8FAFC]">
      {/* Top Header */}
      <TopHeader
        activeSystemsCount={activeCyclones.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenEvents={() => setIsEventsOpen(true)}
        unreadEventsCount={aiEvents.length}
      />

      {/* Main Operations Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Primary View Workspace */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {activeTab === "mission-control" && (
            <MissionControlView
              cyclones={activeCyclones}
              selectedCyclone={selectedCyclone}
              onSelectCyclone={setSelectedCycloneId}
              events={aiEvents}
              forecastPoints={forecastPoints}
              preprocessingSteps={preprocessingSteps}
              selectedForecastPoint={selectedForecastPoint}
              onSelectForecastPoint={setSelectedForecastPoint}
              timeOffset={selectedTimeOffset}
              onSelectTimeOffset={setSelectedTimeOffset}
              onOpenEventsDrawer={() => setIsEventsOpen(true)}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === "satellite-analysis" && (
            <SatelliteAnalysisView
              cyclone={selectedCyclone}
              timeOffset={selectedTimeOffset}
              onSelectTimeOffset={setSelectedTimeOffset}
            />
          )}

          {activeTab === "cyclone-prediction" && (
            <CyclonePredictionView
              cyclone={selectedCyclone}
              forecastPoints={forecastPoints}
              intensityIntervals={intensityIntervals}
              patternEvolution={patternEvolution}
              explainability={explainability}
              selectedForecastPoint={selectedForecastPoint}
              onSelectForecastPoint={setSelectedForecastPoint}
            />
          )}

          {activeTab === "historical-cases" && (
            <HistoricalValidationView cases={historicalCases} />
          )}

          {activeTab === "model-performance" && (
            <ModelPerformanceView
              benchmarks={modelBenchmarks}
              leadTimeMetrics={leadTimeMetrics}
            />
          )}

          {activeTab === "data-sources" && (
            <DataSourcesView sources={dataSources} />
          )}
        </main>
      </div>

      {/* Slide-over AI Events Drawer */}
      <AIEventsDrawer
        isOpen={isEventsOpen}
        onClose={() => setIsEventsOpen(false)}
        events={aiEvents}
        onSelectEventCyclone={(id) => {
          setSelectedCycloneId(id);
          setActiveTab("mission-control");
          setIsEventsOpen(false);
        }}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCyclone={(id) => setSelectedCycloneId(id)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
};
