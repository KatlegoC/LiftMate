import React from 'react';

interface LiftMateLogoV2Props {
  className?: string;
  size?: number;
}

export const LiftMateLogoV2: React.FC<LiftMateLogoV2Props> = ({ 
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
      {/* Rounded square background */}
      <rect x="0" y="0" width="48" height="48" rx="8" fill="#10B981" />
      
      {/* "L" road path */}
      <path
        d="M 12 12 L 12 36 L 20 36"
        stroke="white"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* "M" people connection */}
      <circle cx="28" cy="18" r="3" fill="white" />
      <rect x="26.5" y="21" width="3" height="5" fill="white" />
      
      <circle cx="36" cy="18" r="3" fill="white" />
      <rect x="34.5" y="21" width="3" height="5" fill="white" />
      
      {/* Connection line between people */}
      <path
        d="M 31 23 Q 32 20 33 23"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LiftMateLogoV2;

