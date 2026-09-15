import React, { useEffect, useState } from 'react';
import { Eye, Play, RefreshCw, Youtube } from 'lucide-react';
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
    <div id="youtube-videos-section" className="w-full mb-4 sm:mb-8 scroll-mt-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-2.5 sm:mb-4 px-0.5 sm:px-1">
        <h2 className="text-sm sm:text-xl font-bold text-stone-900 flex items-center gap-1.5 sm:gap-2">
          <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 fill-current inline-block" />
          <span>Server GTPS yang kalian cari</span>
        </h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={fetchLatestVideos}
            disabled={loading}
            className="p-1 sm:p-1.5 rounded-lg text-stone-500 hover:text-orange-600 hover:bg-orange-50 cursor-pointer"
            title="Refresh Video"
          >
            <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Content State */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="carrd-card p-2 sm:p-3 flex flex-col gap-1.5">
              <div className="w-full aspect-video bg-stone-200 rounded-md sm:rounded-xl" />
              <div className="h-3 sm:h-4 bg-stone-200 rounded w-3/4 mt-1" />
              <div className="h-2 sm:h-3 bg-stone-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-600 font-medium">
          {error}
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-6 carrd-card text-xs text-stone-500 font-medium">
          Belum ada video ditemukan.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          {videos.map((video, idx) => (
            <a
              key={video.id || idx}
              id={idx === 0 ? 'first-youtube-video' : undefined}
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group carrd-card p-1.5 sm:p-3 flex flex-col justify-between overflow-hidden relative cursor-pointer scroll-mt-24 rounded-xl"
            >
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-stone-100 mb-1.5 sm:mb-2.5">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
                  <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md">
                    <Play className="w-3 h-3 sm:w-5 sm:h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Video Details */}
              <div className="px-0.5 flex-1 flex flex-col justify-between">
                <h3 className="text-[10.5px] sm:text-sm font-semibold text-stone-900 group-hover:text-orange-600 line-clamp-2 leading-snug mb-1 sm:mb-2">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between text-[9px] sm:text-[11px] text-stone-500 font-normal pt-1 sm:pt-2 border-t border-stone-100">
                  <span className="truncate">{video.timeAgo || formatDate(video.publishedAt)}</span>
                  {video.views && (
                    <span className="text-stone-700 font-medium flex items-center gap-0.5 sm:gap-1 shrink-0 ml-1">
                      <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-600" />
                      {video.views}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

