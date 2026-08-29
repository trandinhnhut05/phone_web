import React from 'react';

export const TanDatLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 1. Smartphone Frame Outline */}
      <g stroke="#005bf8" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round">
        {/* Top & Left/Right Upper Frame with Notch */}
        <path d="M260 260 V 170 C 260 110, 305 70, 370 70 H 400 C 412 70, 420 78, 426 95 C 434 118, 452 132, 478 132 H 522 C 548 132, 566 118, 574 95 C 580 78, 588 70, 600 70 H 630 C 695 70, 740 110, 740 170 V 260" />
        
        {/* Bottom & Left/Right Lower Frame */}
        <path d="M740 730 V 830 C 740 890, 695 930, 630 930 H 370 C 305 930, 260 890, 260 830 V 730" />
        
        {/* Top Speaker in Notch */}
        <line x1="472" y1="88" x2="528" y2="88" strokeWidth="18" strokeLinecap="round" />

        {/* Bottom Home Indicator */}
        <line x1="440" y1="872" x2="560" y2="872" strokeWidth="32" strokeLinecap="round" />
      </g>

      {/* 2. Bold TD Monogram Glyph */}
      <g fill="#005bf8">
        {/* Letter T: Upper horizontal stroke & slanted diagonal pillar */}
        <path d="M 160 260 L 635 260 L 560 355 L 330 355 L 175 740 L 60 740 L 215 355 L 100 355 Z" />

        {/* Letter Đ: Main Outer Loop & Slanted Left Baseline */}
        <path d="M 645 260 C 790 260, 900 370, 900 520 C 900 680, 780 740, 620 740 L 405 740 L 442 645 H 620 C 710 645, 785 610, 785 520 C 785 415, 710 355, 620 355 H 570 L 645 260 Z" />

        {/* Letter Đ: Distinctive Horizontal Crossbar & Inner Stem Structure */}
        <path d="M 390 500 H 720 V 560 H 510 L 435 740 H 350 L 425 560 H 390 V 500 Z" />

        {/* Inner Top Wedge of Letter D */}
        <path d="M 525 425 H 620 C 665 425, 710 445, 710 490 H 495 L 525 425 Z" />
      </g>
    </svg>
  );
};

export default TanDatLogo;
