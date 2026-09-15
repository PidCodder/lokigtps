import React, { useEffect } from 'react';
import { MinecraftServer } from '../types';
import { X, ExternalLink, Globe, Sparkles } from 'lucide-react';

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

  if (!server) return null;

  return (
    <div
      id="server-adventure-overlay"
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="server-adventure-modal-card"
        className="relative w-full max-w-sm sm:max-w-md bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col items-center text-center my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-server-modal-btn"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-900 flex items-center justify-center cursor-pointer transition-colors z-10"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Container */}
        <div className="flex flex-col items-center w-full mt-1">
          {/* Server Icon */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mb-3 flex-shrink-0">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg bg-stone-50 p-1 border-2 border-orange-100 ring-4 ring-orange-500/10 flex items-center justify-center">
              <img
                src={server.icon}
                alt={server.name}
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Server Name */}
          <h3 className="text-lg sm:text-2xl font-extrabold text-stone-900 mb-1 flex items-center justify-center gap-1.5">
            <span>{server.name}</span>
            <Sparkles className="w-4 h-4 text-orange-500 fill-orange-500/20" />
          </h3>

          {/* Tags */}
          <p className="text-xs sm:text-sm font-semibold text-orange-600 mb-2">
            {server.tags}
          </p>

          {/* Description */}
          <div className="w-full p-3.5 rounded-2xl bg-stone-50 text-xs sm:text-sm text-stone-600 leading-relaxed mb-5 font-normal text-center">
            {server.description}
          </div>

          {/* External Link Button */}
          <a
            id="modal-visit-server-link"
            href={server.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-600/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Globe className="w-4 h-4 text-white" />
            <span>Visit Website / Discord</span>
            <ExternalLink className="w-3.5 h-3.5 text-orange-200 ml-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
