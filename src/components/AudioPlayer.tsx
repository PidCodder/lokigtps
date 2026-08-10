import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import { audioManager } from '../utils/audioManager';

interface AudioPlayerProps {
  shouldPlay?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ shouldPlay }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(() => audioManager.getIsPlaying());

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (shouldPlay && !audioManager.getIsPlaying()) {
      audioManager.play();
    }
  }, [shouldPlay]);

  const togglePlayPause = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    audioManager.toggle();
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={togglePlayPause}
      className="px-3.5 sm:px-4 py-2 min-w-[125px] sm:min-w-[140px] rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-orange-500/20 hover:scale-102 active:scale-95 transition-all cursor-pointer border border-white/50 shrink-0 whitespace-nowrap select-none touch-manipulation"
      title={isPlaying ? 'Matikan Musik' : 'Putar Musik'}
    >
      {isPlaying ? (
        <>
          <div className="flex items-end gap-0.5 h-3.5 px-0.5 shrink-0">
            <span className="w-0.5 bg-stone-950 rounded-full animate-[bounce_0.8s_infinite_100ms] h-full" />
            <span className="w-0.5 bg-stone-950 rounded-full animate-[bounce_0.8s_infinite_300ms] h-2.5" />
            <span className="w-0.5 bg-stone-950 rounded-full animate-[bounce_0.8s_infinite_200ms] h-3" />
          </div>
          <span className="tracking-tight">Musik On</span>
          <Volume2 className="w-4 h-4 text-stone-950 shrink-0" />
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-stone-800 shrink-0" />
          <span className="tracking-tight">Putar Musik</span>
        </>
      )}
    </motion.button>
  );
};
