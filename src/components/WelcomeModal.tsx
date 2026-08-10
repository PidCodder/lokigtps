import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#c2410c]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 15 }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            className="relative w-full max-w-sm bg-gradient-to-b from-[#ea580c] via-[#c2410c] to-[#9a3412] border-none rounded-2xl p-6 sm:p-7 shadow-2xl shadow-orange-950/80 max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Content Container */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.09,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="flex flex-col items-center text-center flex-1 my-1 px-1"
            >
              {/* Avatar Icon */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.6, y: 10 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { type: 'spring', stiffness: 220, damping: 18 },
                  },
                }}
                className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full mb-3 flex-shrink-0"
              >
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500 opacity-60 blur-sm animate-pulse" />
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg shadow-black/60 bg-orange-950/40 p-0.5 flex items-center justify-center">
                  <img
                    src={YUMICHIEE_PROFILE.avatarImage}
                    alt="LokiGTPS Avatar"
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="text-xl sm:text-2xl font-normal text-white mb-1 flex items-center justify-center gap-1.5 drop-shadow-sm"
              >
                <span>Tentang Saya</span>
              </motion.h2>

              {/* Subtitle / Badges */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="text-xs sm:text-sm font-normal text-amber-300 mb-3"
              >
                {YUMICHIEE_PROFILE.handle} • {YUMICHIEE_PROFILE.greeting}
              </motion.p>

              {/* Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="text-xs sm:text-sm text-orange-100/90 font-normal leading-relaxed px-1"
              >
                Halo! Selamat datang di website official <span className="text-yellow-300 font-normal">@LokiGTPS</span>. Tempat terbaik untuk menemukan rekomendasi Growtopia Private Server (GTPS).
              </motion.p>
            </motion.div>

            {/* Continue Button Pinned at Bottom */}
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                audioManager.play();
                onClose();
              }}
              className="w-full py-3 px-6 rounded-2xl carrd-btn-primary font-medium text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer flex-shrink-0 mt-4"
            >
              <span>Lanjutkan</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
