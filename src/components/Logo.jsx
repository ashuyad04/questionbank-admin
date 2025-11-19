// src/components/Logo.jsx
import React from "react";

export default function Logo({ className = "w-36 h-auto" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#0066FF" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#002b5c" floodOpacity="0.25"/>
          </filter>
        </defs>

        {/* background rounded rect */}
        <rect x="2" y="2" width="60" height="60" rx="12" fill="#071233" />

        {/* waveform path */}
        <g filter="url(#shadow)">
          <path
            d="M8 40 C16 12, 24 52, 32 28 C40 4, 48 52, 56 20"
            stroke="url(#g1)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* bolt accent */}
        <path d="M34 18 L30 30 L38 30 L32 44" stroke="#FFD500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>

      {/* Text */}
      <div className="leading-tight">
        <div className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          PowerLine
        </div>
        <div className="text-xs text-slate-400 -mt-0.5">Question Bank</div>
      </div>
    </div>
  );
}