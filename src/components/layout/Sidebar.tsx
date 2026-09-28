"use client";

import React from "react";
import {
  Compass,
  Layers,
  TrendingUp,
  History,
  Activity,
  Database,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

export type NavTabId =
  | "mission-control"
  | "satellite-analysis"
  | "cyclone-prediction"
  | "historical-cases"
  | "model-performance"
  | "data-sources";

interface SidebarProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  id: NavTabId;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "mission-control",
    label: "Mission Control",
    icon: Compass,
    badge: "LIVE",
  },
  {
    id: "satellite-analysis",
    label: "Satellite Analysis",
    icon: Layers,
  },
  {
    id: "cyclone-prediction",
    label: "Cyclone Prediction",
    icon: TrendingUp,
  },
  {
    id: "historical-cases",
    label: "Historical Cases",
    icon: History,
  },
  {
    id: "model-performance",
    label: "Model Performance",
    icon: Activity,
  },
  {
    id: "data-sources",
    label: "Data Sources",
    icon: Database,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
}) => {
  return (
    <aside
      className={`h-[calc(100vh-3.5rem)] bg-[#0B1120] border-r border-[#263449] flex flex-col justify-between select-none transition-all duration-200 z-20 shrink-0 ${
        collapsed ? "w-[68px]" : "w-[220px]"
      }`}
    >
      {/* Top Nav Items */}
      <div className="p-2 space-y-1">
        <div className="flex items-center justify-between px-2 py-1 mb-2">
          {!collapsed && (
            <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
              OPERATIONS NAVIGATION
            </span>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1 text-[#64748B] hover:text-[#CBD5E1] hover:bg-[#111827] rounded-[3px] transition-colors ml-auto"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-[4px] text-xs font-mono transition-all text-left group ${
                isActive
                  ? "bg-[#111827] text-[#F8FAFC] border-l-2 border-l-[#38BDF8] border-r border-t border-b border-[#263449] font-semibold"
                  : "text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-[#111827]/60 border border-transparent"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? "text-[#38BDF8]" : "text-[#64748B] group-hover:text-[#94A3B8]"
                }`}
              />
              {!collapsed && (
                <div className="flex items-center justify-between flex-1 truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1 py-0.2 bg-[#062419] text-[#22C55E] border border-[#134E35] rounded font-mono">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Status & Version Block */}
      <div className="p-3 border-t border-[#263449] bg-[#070B14]">
        {!collapsed ? (
          <div className="space-y-2">
            <div>
              <div className="text-[9px] font-mono text-[#64748B] uppercase tracking-wider mb-0.5">
                SYSTEM TELEMETRY
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#22C55E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                <span>PIPELINE ONLINE</span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-[#1E293B] flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
              <span>MODEL:</span>
              <span className="text-[#38BDF8]">v0.1.0-alpha</span>
            </div>

            <div className="text-[9px] font-sans text-[#64748B] leading-tight">
              AI Decision Support • Non-IMD Operational Advisory
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 text-center" title="Pipeline Online • v0.1.0">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="text-[9px] font-mono text-[#64748B]">v0.1</span>
          </div>
        )}
      </div>
    </aside>
  );
};
