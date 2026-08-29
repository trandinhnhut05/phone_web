import React from 'react';

export const TanDatLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Smartphone Outline in Background */}
      <rect
        x="42"
        y="14"
        width="116"
        height="172"
        rx="26"
        stroke="#0256c4"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Top Notch / Speaker */}
      <path
        d="M80 24H120"
        stroke="#0256c4"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Bottom Bar */}
      <path
        d="M84 176H116"
        stroke="#0256c4"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Stylized TĐ Monogram Foreground */}
      <g fill="#0256c4">
        {/* Letter T: Top bar & Slanted Leg */}
        <path
          d="M24 64L136 54L128 72L86 76L48 152H24L64 72L24 74V64Z"
        />
        {/* Letter Đ: Outer curve & Inner loop */}
        <path
          d="M82 64C134 50 182 82 182 118C182 148 148 158 116 158H76L82 142H116C138 142 162 134 162 116C162 94 126 72 88 80L82 64Z"
        />
        {/* Letter Đ: Middle Crossbar */}
        <path
          d="M78 104H144L140 120H74L78 104Z"
        />
        {/* Middle Slanted Stem connection */}
        <path
          d="M72 152L106 82H124L90 152H72Z"
        />
      </g>
    </svg>
  );
};

export default TanDatLogo;
