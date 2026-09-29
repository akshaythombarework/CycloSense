"use client";

import React from "react";

interface CycloSenseLogoProps {
  className?: string;
  size?: number;
}

export const CycloSenseLogo: React.FC<CycloSenseLogoProps> = ({
  className = "",
  size = 28,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="CycloSense Logo"
    >
      <defs>
        {/* Vortex Gradient 1 - Atmospheric Flow */}
        <linearGradient id="vortexGrad1" x1="2" y1="4" x2="30" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="60%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>

        {/* Vortex Gradient 2 - Secondary Spiral Rainband */}
        <linearGradient id="vortexGrad2" x1="30" y1="28" x2="2" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="50%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#0C4A6E" />
        </linearGradient>

        {/* Eye Core Sensor Glow */}
        <radialGradient id="eyeSensorGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#0284C7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Atmospheric Radar / Range Reticle Ring */}
      <circle cx="16" cy="16" r="14.5" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 2" />
      <circle cx="16" cy="16" r="11" stroke="#334155" strokeWidth="0.5" opacity="0.4" />

      {/* Rotating Cyclonic Vortex Rainbands */}
      <g className="origin-center animate-[spin_14s_linear_infinite]" style={{ transformOrigin: "16px 16px" }}>
        {/* Primary Inflow Spiral Band (Counter-Clockwise Vortex) */}
        <path
          d="M 16 3.5 C 23.5 3.5 28.5 8.5 28.5 15.5 C 28.5 22 24 27 18 28.2 C 22.2 25 24.8 20.8 24.2 15.8 C 23.5 10.2 19 6.5 14 6.8 C 9.5 7.2 6.5 10.8 6.2 15.2 C 5.8 19.8 8.8 23.2 13 24.2 C 9.8 23 7.8 19.8 8.2 16.2 C 8.8 12 11.8 9.5 15.5 9.5 C 18.5 9.5 20.8 11.8 20.8 14.8 C 20.8 17.5 18.8 19.5 16 19.5 C 14 19.5 12.8 18 13 16.2 C 13.2 14.8 14.5 13.8 16 14"
          fill="url(#vortexGrad1)"
        />

        {/* Secondary Counter Rainband Arm */}
        <path
          d="M 16 28.5 C 8.5 28.5 3.5 23.5 3.5 16.5 C 3.5 10 8 5 14 3.8 C 9.8 7 7.2 11.2 7.8 16.2 C 8.5 21.8 13 25.5 18 25.2 C 22.5 24.8 25.5 21.2 25.8 16.8 C 26.2 12.2 23.2 8.8 19 7.8 C 22.2 9 24.2 12.2 23.8 15.8 C 23.2 20 20.2 22.5 16.5 22.5 C 13.5 22.5 11.2 20.2 11.2 17.2 C 11.2 14.5 13.2 12.5 16 12.5 C 18 12.5 19.2 14 19 15.8 C 18.8 17.2 17.5 18.2 16 18"
          fill="url(#vortexGrad2)"
          opacity="0.85"
        />
      </g>

      {/* Cyclone Eye / Sensor Center with Pulse Animation */}
      <circle cx="16" cy="16" r="4.5" fill="url(#eyeSensorGlow)" className="animate-pulse" />
      <circle cx="16" cy="16" r="2.2" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" />
      <circle cx="16" cy="16" r="0.9" fill="#38BDF8" className="animate-ping opacity-75 origin-center" style={{ transformOrigin: "16px 16px" }} />
      <circle cx="16" cy="16" r="0.8" fill="#38BDF8" />
    </svg>
  );
};
