import React from 'react';

interface LiftMateLogoProps {
  className?: string;
  size?: number;
}

export const LiftMateLogo: React.FC<LiftMateLogoProps> = ({ 
  className = '', 
  size = 48 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circular background */}
      <circle cx="24" cy="24" r="24" fill="#10B981" />

      {/* Thumbs-up icon */}
      {/* Wrist */}
      <rect x="14" y="22" width="6" height="10" rx="2" fill="white" />
      {/* Thumb and hand */}
      <path
        d="M20 30h9c1.38 0 2.5-1.12 2.5-2.5v-7c0-1.38-1.12-2.5-2.5-2.5h-4.3l0.7-3.1c0.35-1.53-0.63-3.04-2.16-3.39-0.97-0.22-1.99 0.16-2.58 0.96L17 17.5V28c0 1.1 0.9 2 2 2z"
        fill="white"
      />
    </svg>
  );
};

export default LiftMateLogo;

