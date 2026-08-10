import React, { useEffect, useState } from 'react';
import { Eye, Play, RefreshCw, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import { YouTubeVideo } from '../types';

export const YouTubeVideos: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/youtube/latest');
      const data = await res.json();
      if (data.success && data.videos) {
        setVideos(data.videos);
      } else {
        setError('Gagal memuat video');
      }
    } catch (err) {
      console.error(err);
      setError('Gagal menghubungkan ke server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestVideos();
  }, []);

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="w-full mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-base sm:text-lg font-normal text-white flex items-center gap-1.5 drop-shadow-sm">
          <Youtube className="w-5 h-5 text-red-500 fill-current inline-block" />
          <span>Video Terbaru YouTube</span>
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchLatestVideos}
            disabled={loading}
            className="p-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-orange-900/40 transition cursor-pointer"
            title="Refresh Video"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-yellow-300' : ''}`} />
          </button>
        </div>
      </div>

      {/* Content State */}
      {loading ? (
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="carrd-card p-2 sm:p-3 animate-pulse flex flex-col gap-2">
              <div className="w-full aspect-video bg-orange-950/60 rounded-xl" />
              <div className="h-3.5 bg-orange-950/60 rounded w-3/4 mt-1" />
              <div className="h-2.5 bg-orange-950/60 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-4 bg-red-950/80 border border-red-500/40 rounded-2xl text-xs text-red-200">
          {error}
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-4 carrd-card text-xs text-amber-200 font-normal">
          Belum ada video ditemukan.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {videos.map((video, idx) => (
            <motion.a
              key={video.id || idx}
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.3 }}
              className="group carrd-card p-2 sm:p-2.5 flex flex-col justify-between overflow-hidden relative cursor-pointer"
            >
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/40 mb-1.5 sm:mb-2">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md">
                    <Play className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* View count overlay badge on thumbnail */}
                {video.views && (
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-[9px] sm:text-[10px] font-medium text-amber-200 flex items-center gap-1 shadow-md">
                    <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-400" />
                    <span>{video.views}</span>
                  </div>
                )}
              </div>

              {/* Video Details */}
              <div className="px-0.5 flex-1 flex flex-col justify-between">
                <h3 className="text-[11px] sm:text-xs font-normal text-white group-hover:text-yellow-300 line-clamp-2 leading-snug mb-1 transition-colors drop-shadow-sm">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-amber-200/90 font-normal mt-1 pt-1 border-t border-white/10">
                  <span className="truncate">{video.timeAgo || formatDate(video.publishedAt)}</span>
                  {video.views && (
                    <span className="text-amber-100 font-medium flex items-center gap-1 shrink-0 ml-1">
                      <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400" />
                      {video.views}
                    </span>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
};
