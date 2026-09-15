import React from 'react';
import { YUMICHIEE_PROFILE } from '../craftData';
import { AudioPlayer } from './AudioPlayer';

interface NavbarProps {
  isVisible?: boolean;
  shouldPlay?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  isVisible = true,
  shouldPlay = false,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-40">
      <header className="w-full bg-[#ea580c] border-b border-[#c2410c] shadow-sm text-white">
        <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3.5 flex items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
            <img
              src={YUMICHIEE_PROFILE.logoImage}
              alt="LOKIGTPS Logo"
              className="w-8 h-8 sm:w-11 sm:h-11 rounded-full shadow-xs border-2 border-white/60 object-cover shrink-0"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-sm sm:text-lg font-bold tracking-tight text-white truncate">
                {YUMICHIEE_PROFILE.handle}
              </span>
              <span className="text-[10px] sm:text-xs text-orange-100 font-medium truncate">
                {YUMICHIEE_PROFILE.greeting}
              </span>
            </div>
          </div>

          {/* Music Player Button in Navbar */}
          <AudioPlayer shouldPlay={shouldPlay} />
        </div>
      </header>
    </div>
  );
};

export default Navbar;


