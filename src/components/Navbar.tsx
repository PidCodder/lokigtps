import React from 'react';
import { motion } from 'motion/react';
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
  return (
    <motion.div
      initial={{ y: -90, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -90,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-40 transform-gpu ${
        isVisible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <header className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 bg-[#ea580c]/25 backdrop-blur-md text-white border border-orange-400/50 rounded-none shadow-[0_0_15px_rgba(249,115,22,0.35)] gap-3">
        <div className="flex items-center gap-3 min-w-0 shrink">
          <img
            src={YUMICHIEE_PROFILE.logoImage}
            alt="LokiGTPS Logo"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-md border-2 border-white/60 object-cover shrink-0"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col leading-snug min-w-0">
            <span className="text-base sm:text-lg font-extrabold tracking-wide text-white drop-shadow-xs truncate">
              {YUMICHIEE_PROFILE.handle}
            </span>
            <span className="text-xs sm:text-sm text-amber-100/95 font-semibold truncate">
              {YUMICHIEE_PROFILE.greeting}
            </span>
          </div>
        </div>

        {/* Music Player Button in Navbar */}
        <AudioPlayer shouldPlay={shouldPlay} />
      </header>
    </motion.div>
  );
};

export default Navbar;

