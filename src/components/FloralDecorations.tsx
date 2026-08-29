import React from 'react';

/**
 * Romantic watercolor-style floral components inspired by the official invitation design.
 * Features pink cosmos, purple violas/pansies, peach wild blooms, lavender sprigs, and delicate climbing vines.
 */

export const DelicateBlossom: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    <defs>
      <radialGradient id="petalPink" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FDECF0" />
        <stop offset="60%" stopColor="#F2B2C2" />
        <stop offset="100%" stopColor="#D98297" />
      </radialGradient>
      <radialGradient id="flowerCenter" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF1B8" />
        <stop offset="70%" stopColor="#E5B25D" />
        <stop offset="100%" stopColor="#9E6237" />
      </radialGradient>
    </defs>
    {/* Petals */}
    <g opacity="0.95">
      <path d="M50 15 C44 25 42 38 50 48 C58 38 56 25 50 15Z" fill="url(#petalPink)" opacity="0.9" />
      <path d="M50 85 C44 75 42 62 50 52 C58 62 56 75 50 85Z" fill="url(#petalPink)" opacity="0.9" />
      <path d="M15 50 C25 44 38 42 48 50 C38 58 25 56 15 50Z" fill="url(#petalPink)" opacity="0.9" />
      <path d="M85 50 C75 44 62 42 52 50 C62 58 75 56 85 50Z" fill="url(#petalPink)" opacity="0.9" />
      <path d="M25 25 C36 32 42 42 48 48 C42 42 32 36 25 25Z" fill="url(#petalPink)" opacity="0.8" />
      <path d="M75 25 C64 32 58 42 52 48 C58 42 68 36 75 25Z" fill="url(#petalPink)" opacity="0.8" />
      <path d="M25 75 C36 68 42 58 48 52 C42 58 32 64 25 75Z" fill="url(#petalPink)" opacity="0.8" />
      <path d="M75 75 C64 68 58 58 52 52 C58 58 68 64 75 75Z" fill="url(#petalPink)" opacity="0.8" />
      
      {/* Secondary layered softer petals */}
      <circle cx="50" cy="32" r="13" fill="#F4BAC8" opacity="0.7" />
      <circle cx="50" cy="68" r="13" fill="#F4BAC8" opacity="0.7" />
      <circle cx="32" cy="50" r="13" fill="#F4BAC8" opacity="0.7" />
      <circle cx="68" cy="50" r="13" fill="#F4BAC8" opacity="0.7" />
      <circle cx="37" cy="37" r="12" fill="#F0A6B9" opacity="0.65" />
      <circle cx="63" cy="37" r="12" fill="#F0A6B9" opacity="0.65" />
      <circle cx="37" cy="63" r="12" fill="#F0A6B9" opacity="0.65" />
      <circle cx="63" cy="63" r="12" fill="#F0A6B9" opacity="0.65" />
    </g>
    {/* Center golden pistils */}
    <circle cx="50" cy="50" r="9" fill="url(#flowerCenter)" />
    <circle cx="48" cy="48" r="2" fill="#FFFFFF" opacity="0.6" />
    <circle cx="52" cy="51" r="1.5" fill="#6A3B18" opacity="0.5" />
  </svg>
);

export const ViolaBlossom: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    <defs>
      <radialGradient id="pansyViolet" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#E9D6F0" />
        <stop offset="50%" stopColor="#A872B8" />
        <stop offset="100%" stopColor="#6C3E80" />
      </radialGradient>
      <radialGradient id="pansyYellow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF5A8" />
        <stop offset="70%" stopColor="#F5B83D" />
        <stop offset="100%" stopColor="#8A2E12" />
      </radialGradient>
    </defs>
    {/* Upper Petals */}
    <ellipse cx="36" cy="34" rx="22" ry="24" transform="rotate(-15 36 34)" fill="url(#pansyViolet)" opacity="0.95" />
    <ellipse cx="64" cy="34" rx="22" ry="24" transform="rotate(15 64 34)" fill="url(#pansyViolet)" opacity="0.95" />
    
    {/* Side Petals */}
    <ellipse cx="25" cy="56" rx="20" ry="18" transform="rotate(-30 25 56)" fill="url(#pansyViolet)" opacity="0.9" />
    <ellipse cx="75" cy="56" rx="20" ry="18" transform="rotate(30 75 56)" fill="url(#pansyViolet)" opacity="0.9" />
    
    {/* Lower Broad Center Petal with yellow throat */}
    <ellipse cx="50" cy="70" rx="26" ry="22" fill="url(#pansyViolet)" opacity="0.95" />
    <path d="M50 56 C44 58 38 65 42 74 C47 77 53 77 58 74 C62 65 56 58 50 56Z" fill="url(#pansyYellow)" />
    {/* Whiskers */}
    <path d="M50 58 L46 68 M50 58 L54 68 M50 58 L42 63 M50 58 L58 63" stroke="#4A1E0D" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="50" cy="56" r="3.5" fill="#FFE566" />
  </svg>
);

export const LavenderSprig: React.FC<{ className?: string; height?: number }> = ({ className = '', height = 64 }) => (
  <svg
    height={height}
    viewBox="0 0 40 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Stem */}
    <path d="M20 95 C20 60 21 30 20 5" stroke="#68764B" strokeWidth="2" strokeLinecap="round" />
    {/* Florets */}
    <ellipse cx="14" cy="20" rx="5" ry="3.5" transform="rotate(-25 14 20)" fill="#A081B4" />
    <ellipse cx="26" cy="20" rx="5" ry="3.5" transform="rotate(25 26 20)" fill="#BFA3D4" />
    <ellipse cx="13" cy="30" rx="5.5" ry="4" transform="rotate(-30 13 30)" fill="#8B68A2" />
    <ellipse cx="27" cy="30" rx="5.5" ry="4" transform="rotate(30 27 30)" fill="#A081B4" />
    <ellipse cx="14" cy="42" rx="6" ry="4" transform="rotate(-25 14 42)" fill="#9B78B0" />
    <ellipse cx="26" cy="42" rx="6" ry="4" transform="rotate(25 26 42)" fill="#845F9C" />
    <ellipse cx="15" cy="54" rx="5.5" ry="4" transform="rotate(-20 15 54)" fill="#A587BA" />
    <ellipse cx="25" cy="54" rx="5.5" ry="4" transform="rotate(20 25 54)" fill="#946FA9" />
    <ellipse cx="20" cy="10" rx="4" ry="5" fill="#BFA3D4" />
    {/* Leaves */}
    <path d="M20 70 C12 68 8 62 10 56 C14 62 18 66 20 70Z" fill="#758654" />
    <path d="M20 78 C28 76 32 70 30 64 C26 70 22 74 20 78Z" fill="#657644" />
  </svg>
);

export const FloralCornerTopLeft: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
  >
    {/* Climbing vines */}
    <path
      d="M10 230 C20 160 50 90 120 40 C160 15 200 10 235 10"
      stroke="#6E7D50"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M5 190 C30 130 75 70 145 35 C185 18 215 15 235 10"
      stroke="#889868"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="4 2"
      fill="none"
      opacity="0.6"
    />
    {/* Leaf clusters */}
    <path d="M70 75 C55 60 45 40 60 35 C75 40 75 60 70 75Z" fill="#788958" opacity="0.85" />
    <path d="M125 38 C140 25 160 20 162 35 C155 48 135 48 125 38Z" fill="#687948" opacity="0.85" />
    <path d="M35 140 C18 135 12 115 25 110 C38 115 40 130 35 140Z" fill="#889A68" opacity="0.8" />
    <path d="M22 195 C10 185 10 170 22 165 C32 172 32 188 22 195Z" fill="#607040" opacity="0.8" />

    {/* Cosmos Pink Bloom top */}
    <g transform="translate(180, 15) scale(0.45)">
      <circle cx="50" cy="50" r="40" fill="#F4BAC8" opacity="0.8" />
      <circle cx="50" cy="50" r="28" fill="#E892A8" opacity="0.85" />
      <circle cx="50" cy="50" r="10" fill="#E5B25D" />
    </g>

    {/* Violet Viola Bloom left */}
    <g transform="translate(10, 65) scale(0.42)">
      <ellipse cx="40" cy="40" rx="30" ry="25" fill="#9969A6" opacity="0.9" />
      <ellipse cx="60" cy="40" rx="30" ry="25" fill="#814D90" opacity="0.9" />
      <ellipse cx="50" cy="65" rx="32" ry="26" fill="#713B80" opacity="0.9" />
      <circle cx="50" cy="52" r="8" fill="#FCD34D" />
    </g>

    {/* Sweet Pea Blossom & Bud */}
    <g transform="translate(90, 22) scale(0.38)">
      <ellipse cx="50" cy="45" rx="25" ry="32" fill="#F6C8B2" opacity="0.9" />
      <ellipse cx="40" cy="55" rx="18" ry="20" fill="#FADECF" opacity="0.9" />
      <ellipse cx="60" cy="55" rx="18" ry="20" fill="#EFA892" opacity="0.85" />
    </g>

    {/* Lavender Florets */}
    <g transform="translate(35, 150) rotate(-20) scale(0.4)">
      <ellipse cx="20" cy="15" rx="7" ry="5" fill="#A587BA" />
      <ellipse cx="12" cy="28" rx="8" ry="6" fill="#8B68A2" />
      <ellipse cx="28" cy="28" rx="8" ry="6" fill="#9F7DA4" />
      <ellipse cx="14" cy="42" rx="8" ry="6" fill="#7D5594" />
      <ellipse cx="26" cy="42" rx="8" ry="6" fill="#926BA8" />
    </g>
  </svg>
);

export const FloralCornerTopRight: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`transform scale-x-[-1] ${className}`}>
    <FloralCornerTopLeft />
  </div>
);

export const FloralDivider: React.FC<{ className?: string; text?: string }> = ({ className = '', text }) => (
  <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
    <div className="h-px bg-gradient-to-r from-transparent via-[#5E693D]/30 to-[#5E693D]/50 flex-1 max-w-[120px] sm:max-w-[180px]" />
    
    <div className="flex items-center gap-2 px-2">
      <LavenderSprig height={24} className="opacity-80 rotate-[-45deg]" />
      <DelicateBlossom size={28} className="animate-gentle-float" />
      {text && (
        <span className="font-serif-cormorant italic text-sm sm:text-base text-[#5E693D] font-medium tracking-wider px-1">
          {text}
        </span>
      )}
      <DelicateBlossom size={28} className="animate-gentle-float" />
      <LavenderSprig height={24} className="opacity-80 rotate-[45deg]" />
    </div>

    <div className="h-px bg-gradient-to-l from-transparent via-[#5E693D]/30 to-[#5E693D]/50 flex-1 max-w-[120px] sm:max-w-[180px]" />
  </div>
);

export const RomanticFloralCardFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  badge?: string;
}> = ({ children, className = '', badge }) => {
  return (
    <div className={`relative bg-[#FAF7F2]/95 backdrop-blur-md rounded-[2.5rem] border border-[#5E693D]/25 shadow-xl p-6 sm:p-10 overflow-hidden ${className}`}>
      {/* Delicate floral corners */}
      <FloralCornerTopLeft className="absolute -top-3 -left-3 w-28 sm:w-36 h-28 sm:h-36 opacity-75" />
      <FloralCornerTopRight className="absolute -top-3 -right-3 w-28 sm:w-36 h-28 sm:h-36 opacity-75" />
      
      {/* Subtle bottom floral sprigs */}
      <div className="absolute -bottom-3 left-6 opacity-60 pointer-events-none">
        <LavenderSprig height={42} className="rotate-45" />
      </div>
      <div className="absolute -bottom-3 right-6 opacity-60 pointer-events-none">
        <LavenderSprig height={42} className="-rotate-45" />
      </div>

      {badge && (
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E89CAE]/15 border border-[#E89CAE]/40 text-[#5E693D] text-xs font-montserrat uppercase tracking-[0.2em] font-medium shadow-xs">
            <DelicateBlossom size={16} />
            <span>{badge}</span>
            <DelicateBlossom size={16} />
          </div>
        </div>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
