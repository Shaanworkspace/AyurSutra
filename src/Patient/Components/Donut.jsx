import React from 'react';

const Donut = ({ segments, size = 170, stroke = 22, centerColor }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let acc = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}>
        <circle r={radius} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        {segments.map((s) => {
          const value = Math.max(0, Math.min(100, s.value));
          const dash = (value / 100) * circumference;
          const gap = circumference - dash;
          const rot = (acc / 100) * 360;
          acc += value;
          return (
            <circle
              key={`${s.label}-${s.color}`}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeLinecap="butt"
              transform={`rotate(${rot})`}
            />
          );
        })}
      </g>
      <foreignObject x={size / 2 - 44} y={size / 2 - 28} width="88" height="56">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold" style={{ color: centerColor }}>
              {Math.min(100, segments.reduce((a, b) => a + b.value, 0))}%
            </div>
            <div className="text-[11px] text-gray-500">Overall</div>
          </div>
        </div>
      </foreignObject>
    </svg>
  );
};

export default Donut;