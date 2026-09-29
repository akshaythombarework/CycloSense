"use client";

import React from "react";
import {
  Compass,
  Layers,
  TrendingUp,
  History,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type NavTabId =
  | "mission-control"
  | "satellite-analysis"
  | "cyclone-prediction"
  | "historical-cases"
  | "model-performance";

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
  { id: "mission-control", label: "Mission Control", icon: Compass, badge: "LIVE" },
  { id: "satellite-analysis", label: "Satellite Analysis", icon: Layers },
  { id: "cyclone-prediction", label: "Cyclone Prediction", icon: TrendingUp },
  { id: "historical-cases", label: "Historical Cases", icon: History },
  { id: "model-performance", label: "Model Performance", icon: Activity },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
}) => {
  return (
    <aside
      className={`h-[calc(100vh-3.5rem)] bg-[#0F172A] border-r border-[#334155] flex flex-col justify-between select-none transition-all duration-200 z-20 shrink-0 ${
        collapsed ? "w-[68px]" : "w-[220px]"
      }`}
    >
      {/* Top Nav Items */}
      <div className="p-2 space-y-1">
        <div className="flex items-center justify-between px-2 py-1 mb-2">
          {!collapsed && (
            <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider">
              OPERATIONS NAVIGATION
            </span>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E293B] rounded-[4px] transition-colors ml-auto"
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
                  ? "bg-[#3B82F6] text-[#F1F5F9] font-semibold"
                  : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E293B] border border-transparent"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? "text-[#F1F5F9]" : "text-[#94A3B8] group-hover:text-[#F1F5F9]"
                }`}
              />
              {!collapsed && (
                <div className="flex items-center justify-between flex-1 truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-[4px] font-mono font-bold ${
                        isActive
                          ? "bg-[#1E3A5F] text-[#F1F5F9]"
                          : "bg-[#1E293B] text-[#15803D] border border-[#334155]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
