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
      
      {/* Person 1 (left) */}
      <circle cx="14" cy="20" r="4" fill="white" />
      <rect x="12" y="24" width="4" height="6" fill="white" />
      
      {/* Person 2 (right) */}
      <circle cx="34" cy="20" r="4" fill="white" />
      <rect x="32" y="24" width="4" height="6" fill="white" />
      
      {/* Connecting path/road */}
      <path
        d="M 18 24 Q 24 18 30 24"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LiftMateLogo;

