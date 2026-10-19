import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const GigoLogo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = ''
}) => {
  const sizeMap = {
    sm: { icon: 24, fontTitle: 'text-sm', fontSub: 'text-[9px]' },
    md: { icon: 32, fontTitle: 'text-base', fontSub: 'text-[10px]' },
    lg: { icon: 42, fontTitle: 'text-lg', fontSub: 'text-xs' },
    xl: { icon: 56, fontTitle: 'text-2xl', fontSub: 'text-sm' }
  };

  const { icon, fontTitle, fontSub } = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Official GIGO Network geometric emblem with interconnected network nodes */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform duration-200 hover:scale-105"
      >
        <defs>
          <linearGradient id="gigoGradientMain" x1="4" y1="8" x2="60" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E85D9E" />
            <stop offset="50%" stopColor="#C83F7D" />
            <stop offset="100%" stopColor="#9D174D" />
          </linearGradient>
          <linearGradient id="gigoGlow" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FCE7F3" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E85D9E" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* Outer stylized faceted G hexagonal contour */}
        <path
          d="M32 6L54 18V46L32 58L10 46V18L32 6Z"
          stroke="url(#gigoGradientMain)"
          strokeWidth="3.5"
          strokeLinejoin="round"
          fill="url(#gigoGlow)"
        />
        
        {/* Inner network conduits and core node linkages */}
        <path
          d="M32 16L45 23.5V40.5L32 48L19 40.5V23.5L32 16Z"
          stroke="#C83F7D"
          strokeWidth="2"
          strokeDasharray="2 2"
          fill="none"
        />

        {/* Central horizontal cross-vector of the GIGO intelligence matrix */}
        <path
          d="M32 32H45V40.5L32 48L19 40.5V23.5L32 16L45 23.5"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central active core node */}
        <circle cx="32" cy="32" r="4.5" fill="#C83F7D" stroke="#FFFFFF" strokeWidth="2" />
        
        {/* Satellite intelligence vertices */}
        <circle cx="32" cy="6" r="2.5" fill="#E85D9E" />
        <circle cx="54" cy="18" r="2.5" fill="#E85D9E" />
        <circle cx="54" cy="46" r="2.5" fill="#C83F7D" />
        <circle cx="32" cy="58" r="2.5" fill="#9D174D" />
        <circle cx="10" cy="46" r="2.5" fill="#C83F7D" />
        <circle cx="10" cy="18" r="2.5" fill="#E85D9E" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-tight select-none">
          <div className="flex items-center gap-1.5">
            <span className={`${fontTitle} font-extrabold tracking-tight text-[#172033]`}>
              GIS
            </span>
            <span className="h-3 w-px bg-[#F3D4E3]"></span>
            <span className="text-[10px] font-semibold text-[#E85D9E] tracking-wider uppercase">
              NETWORK
            </span>
          </div>
          <span className={`${fontSub} font-medium text-[#667085] tracking-widest uppercase`}>
            GIGO INTELLIGENT SYSTEM
          </span>
        </div>
      )}
    </div>
  );
};
