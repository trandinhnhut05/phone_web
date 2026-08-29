import React from 'react';

export const TanDatLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Smartphone Frame with Notch and Rounded Corners */}
      <g stroke="#005bf8" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round">
        {/* Phone Body Outline */}
        <path d="M260 260V180C260 120 300 80 360 80H395C405 80 415 88 420 108C425 128 440 140 460 140H540C560 140 575 128 580 108C585 88 595 80 605 80H640C700 80 740 120 740 180V260" />
        <path d="M740 740V820C740 880 700 920 640 920H360C300 920 260 880 260 820V740" />
        {/* Bottom Speaker / Home Indicator */}
        <line x1="450" y1="860" x2="550" y2="860" strokeWidth="28" strokeLinecap="round" />
        {/* Top Speaker in Notch */}
        <line x1="475" y1="95" x2="525" y2="95" strokeWidth="16" strokeLinecap="round" />
      </g>

      {/* Monogram T & Đ */}
      <g fill="#005bf8">
        {/* Letter T: Top slanted bar + Slanted down leg */}
        <path d="M110 350L620 260L540 360L335 360L160 740L35 740L210 360L110 360Z" />

        {/* Letter Đ: Bold D Loop with horizontal crossbar and parallel diagonal cut */}
        <path d="M570 260C740 260 890 350 890 530C890 690 750 740 600 740H415L515 540H600C675 540 740 515 740 455C740 375 660 360 570 360L645 260Z" />

        {/* Letter Đ: Inner Cutout & Diagonal Crossbar */}
        <path d="M400 560L460 440H600L570 500H700L680 560H540L450 740H310L400 560Z" />
      </g>
    </svg>
  );
};

export default TanDatLogo;
