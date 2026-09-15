import React, { useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { YUMICHIEE_PROFILE } from '../craftData';
import { audioManager } from '../utils/audioManager';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-hidden"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-white border border-stone-200 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Content Container */}
        <div className="flex flex-col items-center text-center flex-1 my-0.5 px-1">
          {/* Avatar Icon */}
          <div className="relative w-16 h-16 sm:w-22 sm:h-22 rounded-full mb-2 sm:mb-3 flex-shrink-0">
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-md bg-stone-50 border-2 border-white ring-2 ring-orange-500/30 flex items-center justify-center">
              <img
                src={YUMICHIEE_PROFILE.avatarImage}
                alt="LOKIGTPS Avatar"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-2xl font-bold text-stone-900 mb-2 sm:mb-3 flex items-center justify-center gap-1.5">
            <span>Tentang Saya</span>
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed px-1">
            Halo! Selamat datang di website official <span className="text-orange-600 font-semibold">@LOKIGTPS</span>. Tempat terbaik untuk menemukan rekomendasi Growtopia Private Server (GTPS).
          </p>
        </div>

        {/* Continue Button Pinned at Bottom */}
        <button
          onClick={() => {
            audioManager.play();
            onClose();
          }}
          className="w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-sm flex-shrink-0 mt-3 sm:mt-5"
        >
          <span>Lanjutkan</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

