import React from 'react';
import zebraPatternImg from '../assets/zebra-pattern.webp';

export default function ZebraHeart({ className = '', size = 20 }: { className?: string, size?: number }) {
  return (
    <svg aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="zebraPattern" patternUnits="userSpaceOnUse" width="12" height="12">
          <image href={zebraPatternImg} width="12" height="12" style={{ filter: 'sepia(100%) hue-rotate(345deg) saturate(80%) brightness(50%)' }} />
        </pattern>
      </defs>
      
      {/* Heart shape path */}
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="#DC2626"
        stroke="#B91C1C"
        strokeWidth="1"
      />
    </svg>
  );
}
