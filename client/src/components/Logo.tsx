import React from 'react';

export const TanDatLogo: React.FC<{ className?: string; alt?: string }> = ({
  className = 'w-10 h-10 object-contain',
  alt = 'Tấn Đạt Smartphone Logo',
}) => {
  return (
    <img
      src="/logo.png"
      alt={alt}
      className={className}
      loading="eager"
    />
  );
};

export default TanDatLogo;
