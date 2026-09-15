import React from 'react';
import { ArrowRight } from 'lucide-react';
import { YUMICHIEE_PROFILE } from '../craftData';
import { audioManager } from '../utils/audioManager';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  const handleProceed = () => {
    audioManager.play();
    onContinue();
  };

  return (
    <div className="min-h-screen w-full bg-[#fafaf9] flex items-center justify-center p-4 selection:bg-orange-500 selection:text-white">
      <div className="w-full max-w-sm bg-white border border-stone-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl flex flex-col items-center text-center">
        {/* Avatar Icon */}
        <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full mb-3 sm:mb-4 flex-shrink-0">
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-md bg-stone-50 border-2 border-white ring-3 ring-orange-500/30 flex items-center justify-center">
            <img
              src={YUMICHIEE_PROFILE.avatarImage}
              alt="LOKIGTPS Avatar"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 sm:mb-2.5">
          Tentang Saya
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed mb-6 sm:mb-7 px-1">
          Halo! Selamat datang di website official{' '}
          <span className="text-orange-600 font-semibold">@LOKIGTPS</span>.
          Tempat terbaik untuk menemukan rekomendasi Growtopia Private Server (GTPS).
        </p>

        {/* Continue Button to enter Home Page */}
        <button
          id="welcome-continue-btn"
          onClick={handleProceed}
          className="w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <span>Lanjutkan</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};
