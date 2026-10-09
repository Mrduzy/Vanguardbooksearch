import React, { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  emblemOnly?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  emblemOnly = false
}) => {
  const [useFallback, setUseFallback] = useState(false);

  // Dimension scaling for emblem
  const emblemDim =
    size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-11 h-11';
  const titleSize =
    size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';
  const subtitleSize =
    size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-[10px]' : 'text-[9px]';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 1. Official Emblem */}
      <div className={`relative ${emblemDim} shrink-0 flex items-center justify-center`}>
        {!useFallback ? (
          <img
            src="/favicon.svg"
            alt="VANGUARDBOOKSEARCH Emblem"
            className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-200 hover:scale-105"
            onError={() => setUseFallback(true)}
            loading="eager"
          />
        ) : (
          <img
            src="/logo-emblem.png"
            alt="VANGUARDBOOKSEARCH Emblem"
            className="w-full h-full object-contain filter drop-shadow-sm"
            loading="eager"
          />
        )}
      </div>

      {/* 2. Brand Wordmark & Architectural Tagline */}
      {!emblemOnly && (
        <div className="flex flex-col justify-center">
          <div className={`flex items-baseline tracking-widest font-bold uppercase font-editorial-serif text-stone-950 dark:text-stone-50 ${titleSize}`}>
            <span>VANGUARD</span>
            <span className="text-amber-600 dark:text-amber-500 font-sans font-light tracking-wider ml-1.5">
              BOOKSEARCH
            </span>
          </div>
          {showSubtitle && (
            <span className={`tracking-widest uppercase text-stone-500 dark:text-stone-400 font-medium ${subtitleSize}`}>
              Discoverability &amp; Positioning Architecture
            </span>
          )}
        </div>
      )}
    </div>
  );
};
