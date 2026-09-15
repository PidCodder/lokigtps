import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
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
    <button
      onClick={togglePlayPause}
      className={`px-2.5 sm:px-4 py-1.5 sm:py-2 min-w-[95px] sm:min-w-[136px] rounded-full text-[11px] sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs cursor-pointer shrink-0 whitespace-nowrap select-none touch-manipulation ${
        isPlaying
          ? 'bg-white text-orange-700 hover:bg-orange-50 shadow-sm border border-white'
          : 'bg-orange-700/60 hover:bg-orange-700 text-white border border-white/30'
      }`}
      title={isPlaying ? 'Matikan Musik' : 'Putar Musik'}
    >
      {isPlaying ? (
        <>
          <div className="flex items-end gap-0.5 h-3 sm:h-3.5 px-0.5 shrink-0">
            <span className="w-0.5 bg-orange-600 rounded-full h-full" />
            <span className="w-0.5 bg-orange-600 rounded-full h-2.5" />
            <span className="w-0.5 bg-orange-600 rounded-full h-3" />
          </div>
          <span className="tracking-tight">Musik On</span>
          <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 shrink-0" />
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90 shrink-0" />
          <span className="tracking-tight text-white">Putar Musik</span>
        </>
      )}
    </button>
  );
};

