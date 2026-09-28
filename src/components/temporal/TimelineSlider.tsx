"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Clock, RotateCcw } from "lucide-react";

export type TimeOffset = "T-12h" | "T-9h" | "T-6h" | "T-3h" | "NOW";

interface TimelineSliderProps {
  currentOffset: TimeOffset;
  onSelectOffset: (offset: TimeOffset) => void;
  timestamps: { [key in TimeOffset]: string };
}

const TIMELINE_STEPS: TimeOffset[] = ["T-12h", "T-9h", "T-6h", "T-3h", "NOW"];

export const TimelineSlider: React.FC<TimelineSliderProps> = ({
  currentOffset,
  onSelectOffset,
  timestamps,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 2 | 4>(1);

  const currentIndex = TIMELINE_STEPS.indexOf(currentOffset);

  // Playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        const nextIdx = (currentIndex + 1) % TIMELINE_STEPS.length;
        onSelectOffset(TIMELINE_STEPS[nextIdx]);
      }, 2000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, playbackSpeed, onSelectOffset]);

  const handlePrev = () => {
    const prevIdx = Math.max(0, currentIndex - 1);
    onSelectOffset(TIMELINE_STEPS[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = Math.min(TIMELINE_STEPS.length - 1, currentIndex + 1);
    onSelectOffset(TIMELINE_STEPS[nextIdx]);
  };

  return (
    <div className="bg-[#111827] border border-[#263449] rounded-[4px] p-2.5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono select-none">
      {/* Playback Controls on Left */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-1.5 bg-[#0B1120] hover:bg-[#172033] disabled:opacity-40 border border-[#263449] rounded-[3px] text-[#CBD5E1]"
          title="Previous Step (T-3h)"
        >
          <SkipBack className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] font-bold border transition-colors ${
            isPlaying
              ? "bg-[#65182D] border-[#F43F5E] text-[#F8FAFC]"
              : "bg-[#1E40AF] hover:bg-[#1E3A8A] border-[#3B82F6] text-white"
          }`}
          title={isPlaying ? "Pause temporal replay" : "Play continuous temporal replay"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? "PAUSE" : "REPLAY"}</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === TIMELINE_STEPS.length - 1}
          className="p-1.5 bg-[#0B1120] hover:bg-[#172033] disabled:opacity-40 border border-[#263449] rounded-[3px] text-[#CBD5E1]"
          title="Next Step (+3h)"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>

        {/* Speed Selector */}
        <button
          onClick={() => setPlaybackSpeed((s) => (s === 1 ? 2 : s === 2 ? 4 : 1))}
          className="px-2 py-1 bg-[#0B1120] hover:bg-[#172033] border border-[#263449] rounded-[3px] text-[10px] text-[#38BDF8]"
          title="Playback speed multiplier"
        >
          {playbackSpeed}× SPEED
        </button>
      </div>

      {/* Main Interactive Step Track */}
      <div className="flex-1 w-full max-w-2xl px-2">
        <div className="relative flex items-center justify-between">
          {/* Background Track Line */}
          <div className="absolute left-0 right-0 h-1 bg-[#263449] -z-0 rounded" />
          <div
            className="absolute left-0 h-1 bg-[#38BDF8] -z-0 transition-all duration-200"
            style={{
              width: `${(currentIndex / (TIMELINE_STEPS.length - 1)) * 100}%`,
            }}
          />

          {TIMELINE_STEPS.map((step, idx) => {
            const isActive = currentOffset === step;
            const isPassed = idx <= currentIndex;

            return (
              <div key={step} className="flex flex-col items-center relative z-10">
                <button
                  onClick={() => onSelectOffset(step)}
                  className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                    isActive
                      ? "bg-[#38BDF8] border-white scale-125 shadow-lg"
                      : isPassed
                      ? "bg-[#1E40AF] border-[#38BDF8]"
                      : "bg-[#0B1120] border-[#263449] hover:border-[#64748B]"
                  }`}
                />
                <div className="mt-1.5 text-center">
                  <span
                    className={`text-[11px] font-bold block ${
                      isActive ? "text-[#38BDF8]" : "text-[#94A3B8]"
                    }`}
                  >
                    {step}
                  </span>
                  <span className="text-[9px] text-[#64748B] block truncate max-w-[80px]">
                    {timestamps[step] || "--"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Time Readout */}
      <div className="px-2.5 py-1 bg-[#0B1120] border border-[#263449] rounded-[3px] text-right shrink-0">
        <span className="text-[9px] text-[#64748B] uppercase block">
          OBSERVATION TIMESTAMP
        </span>
        <span className="text-xs font-bold text-[#F8FAFC]">
          {timestamps[currentOffset]}
        </span>
      </div>
    </div>
  );
};
