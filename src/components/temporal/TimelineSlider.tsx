"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export type TimeOffset = "T-12h" | "T-9h" | "T-6h" | "T-3h" | "NOW";

interface TimelineSliderProps {
  currentOffset: TimeOffset;
  onSelectOffset: (offset: TimeOffset) => void;
  timestamps: { [key in TimeOffset]: string };
  autoPlay?: boolean;
}

const TIMELINE_STEPS: TimeOffset[] = ["T-12h", "T-9h", "T-6h", "T-3h", "NOW"];

export const TimelineSlider: React.FC<TimelineSliderProps> = ({
  currentOffset,
  onSelectOffset,
  timestamps,
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const currentIndex = TIMELINE_STEPS.indexOf(currentOffset);

  // Playback timer — advances every 1.8s, loops back to start
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        const nextIdx = (currentIndex + 1) % TIMELINE_STEPS.length;
        onSelectOffset(TIMELINE_STEPS[nextIdx]);
      }, 1800);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, onSelectOffset]);

  // REPLAY: restart from T-12h
  const handleReplay = () => {
    onSelectOffset(TIMELINE_STEPS[0]);
    setIsPlaying(true);
  };

  // If already playing, toggle pause/resume
  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      handleReplay();
    }
  };

  const handlePrev = () => {
    const prevIdx = Math.max(0, currentIndex - 1);
    onSelectOffset(TIMELINE_STEPS[prevIdx]);
    setIsPlaying(false);
  };

  const handleNext = () => {
    const nextIdx = Math.min(TIMELINE_STEPS.length - 1, currentIndex + 1);
    onSelectOffset(TIMELINE_STEPS[nextIdx]);
    setIsPlaying(false);
  };

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] p-2.5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono select-none">
      {/* Playback Controls on Left */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-1.5 bg-[#0F172A] hover:bg-[#334155] disabled:opacity-40 border border-[#334155] rounded-[3px] text-[#94A3B8] transition-colors"
          title="Previous Frame (Skip Back)"
        >
          <SkipBack className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handlePlayPause}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] font-bold border transition-colors ${
            isPlaying
              ? "bg-[#B91C1C] border-[#B91C1C] text-[#F1F5F9]"
              : "bg-[#0284C7] hover:bg-[#0369A1] border-[#0284C7] text-white"
          }`}
          title={isPlaying ? "Pause replay" : "Start replay from beginning"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? "PAUSE" : "REPLAY"}</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === TIMELINE_STEPS.length - 1}
          className="p-1.5 bg-[#0F172A] hover:bg-[#334155] disabled:opacity-40 border border-[#334155] rounded-[3px] text-[#94A3B8] transition-colors"
          title="Next Frame (Skip Forward)"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Interactive Step Track */}
      <div className="flex-1 w-full max-w-2xl px-2">
        <div className="relative flex items-center justify-between">
          {/* Background Track Line */}
          <div className="absolute left-0 right-0 h-1 bg-[#334155] -z-0 rounded" />
          <div
            className="absolute left-0 h-1 bg-[#0284C7] -z-0 transition-all duration-200"
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
                  onClick={() => {
                    onSelectOffset(step);
                    setIsPlaying(false);
                  }}
                  className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                    isActive
                      ? "bg-[#0284C7] border-white scale-125 shadow-lg"
                      : isPassed
                      ? "bg-[#3B82F6] border-[#0284C7]"
                      : "bg-[#0F172A] border-[#334155] hover:border-[#94A3B8]"
                  }`}
                />
                <div className="mt-1.5 text-center">
                  <span
                    className={`text-[11px] font-bold block ${
                      isActive ? "text-[#0284C7]" : "text-[#94A3B8]"
                    }`}
                  >
                    {step}
                  </span>
                  <span className="text-[9px] text-[#94A3B8] block truncate max-w-[80px]">
                    {timestamps[step] || "--"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Time Readout */}
      <div className="px-2.5 py-1 bg-[#0F172A] border border-[#334155] rounded-[3px] text-right shrink-0">
        <span className="text-[9px] text-[#94A3B8] uppercase block">
          OBSERVATION TIMESTAMP
        </span>
        <span className="text-xs font-bold text-[#F1F5F9]">
          {timestamps[currentOffset]}
        </span>
      </div>
    </div>
  );
};
