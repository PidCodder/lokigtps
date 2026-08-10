import React, { useEffect } from 'react';
import { MinecraftServer } from '../types';
import { X, ExternalLink, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServerModalProps {
  server: MinecraftServer | null;
  onClose: () => void;
}

export const ServerModal: React.FC<ServerModalProps> = ({ server, onClose }) => {
  useEffect(() => {
    if (server) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [server]);

  return (
    <AnimatePresence>
      {server && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#c2410c]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 15 }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            className="relative w-full max-w-sm bg-gradient-to-b from-[#ea580c] via-[#c2410c] to-[#9a3412] border-none rounded-2xl p-6 sm:p-7 shadow-2xl shadow-orange-950/80 flex flex-col items-center text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.25 }}
              onClick={onClose}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 text-stone-200 hover:bg-white/20 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </motion.button>

            {/* Content Container */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.05,
                  },
                },
              }}
              className="flex flex-col items-center w-full"
            >
              {/* Server Icon with Glow */}
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
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500 opacity-70 blur-md animate-pulse" />
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg shadow-black/60 bg-orange-950/40 p-0.5 flex items-center justify-center">
                  <img
                    src={server.icon}
                    alt={server.name}
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              {/* Server Name */}
              <motion.h3
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="text-xl sm:text-2xl font-semibold text-white mb-1 flex items-center gap-1.5 drop-shadow-sm"
              >
                <span>{server.name}</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </motion.h3>

              {/* Tags */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="text-xs sm:text-sm font-normal text-amber-300 mb-3"
              >
                {server.tags}
              </motion.p>

              {/* Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="text-xs sm:text-sm text-orange-100/90 leading-relaxed mb-6 font-normal px-1"
              >
                {server.description}
              </motion.p>

              {/* External Link Button */}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
                }}
                href={server.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-2xl carrd-btn-primary font-medium text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                <Globe className="w-4 h-4 text-stone-950" />
                <span>Visit Website / Discord</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-900" />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
