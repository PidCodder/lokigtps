import type { Request, Response } from 'express';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  videoUrl: string;
  views?: string;
  timeAgo?: string;
  viewCount?: number;
}

// Actual real fallback videos if YouTube server is totally unreachable
const FALLBACK_VIDEOS: VideoItem[] = [
  {
    id: 'oenDHXwz-8k',
    title: 'GTPS Terbaru 2026 ❗HALFTOPIA❗ Giveaway @MODERATOR 😱 - Growtopia private server',
    thumbnail: 'https://i.ytimg.com/vi/oenDHXwz-8k/hqdefault.jpg',
    publishedAt: '1 hari yang lalu',
    timeAgo: '1 hari yang lalu',
    videoUrl: 'https://www.youtube.com/watch?v=oenDHXwz-8k',
    views: '575 x ditonton',
    viewCount: 575
  },
  {
    id: '4g6h1lLcVzw',
    title: 'GTPS Terbaru 2026 ❗GROWLAB❗ Giveaway @MODERATOR 😱 - Growtopia private server',
    thumbnail: 'https://i.ytimg.com/vi/4g6h1lLcVzw/hqdefault.jpg',
    publishedAt: '3 hari yang lalu',
    timeAgo: '3 hari yang lalu',
    videoUrl: 'https://www.youtube.com/watch?v=4g6h1lLcVzw',
    views: '603 x ditonton',
    viewCount: 603
  },
  {
    id: 'OMWzNnr-1tw',
    title: 'GTPS Terbaru 2026 ❗TERAPS❗ Giveaway @DEVELOPER 😱 - Growtopia private server',
    thumbnail: 'https://i.ytimg.com/vi/OMWzNnr-1tw/hqdefault.jpg',
    publishedAt: '5 hari yang lalu',
    timeAgo: '5 hari yang lalu',
    videoUrl: 'https://www.youtube.com/watch?v=OMWzNnr-1tw',
    views: '656 x ditonton',
    viewCount: 656
  },
  {
    id: 'AwGaIjXQNkQ',
    title: 'GTPS Terbaru 2026 ❗GTFY❗ Giveaway 4X ROLE CODE REDEEM 🤯 - Growtopia private server',
    thumbnail: 'https://i.ytimg.com/vi/AwGaIjXQNkQ/hqdefault.jpg',
    publishedAt: '6 hari yang lalu',
    timeAgo: '6 hari yang lalu',
    videoUrl: 'https://www.youtube.com/watch?v=AwGaIjXQNkQ',
    views: '485 x ditonton',
    viewCount: 485
  },
  {
    id: 'SMrxTmb2d_8',
    title: 'GTPS Terbaru 2026 ❗TREEPS❗ Giveaway @MODERATOR 😱 - Growtopia private server',
    thumbnail: 'https://i.ytimg.com/vi/SMrxTmb2d_8/hqdefault.jpg',
    publishedAt: '7 hari yang lalu',
    timeAgo: '7 hari yang lalu',
    videoUrl: 'https://www.youtube.com/watch?v=SMrxTmb2d_8',
    views: '627 x ditonton',
    viewCount: 627
  },
  {
    id: '2csOeW83REM',
    title: 'GTPS Terbaru 2026 ❗FARELPS❗ Giveaway @SDEV 😱 - Growtopia private server',
    thumbnail: 'https://i.ytimg.com/vi/2csOeW83REM/hqdefault.jpg',
    publishedAt: '9 hari yang lalu',
    timeAgo: '9 hari yang lalu',
    videoUrl: 'https://www.youtube.com/watch?v=2csOeW83REM',
    views: '944 x ditonton',
    viewCount: 944
  }
];

// In-memory cache to prevent hitting YouTube rate limits on Vercel
let memoryCache: { timestamp: number; videos: VideoItem[] } | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache

function formatViewCount(val: number | string | undefined): string {
  if (!val && val !== 0) return '';
  if (typeof val === 'number') {
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1).replace('.', ',')} jt x ditonton`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(1).replace('.', ',')} rb x ditonton`;
    return `${val.toLocaleString('id-ID')} x ditonton`;
  }
  const str = String(val).replace(/\u00a0/g, ' ').trim();
  if (!str) return '';

  // Indonesian format
  if (str.includes('x ditonton') || str.includes('ditonton')) {
    return str;
  }

  // English formats e.g. "1.2K views", "500 views"
  const kMatch = str.match(/^([\d.,]+)\s*K\s*views/i);
  if (kMatch) {
    return `${kMatch[1].replace('.', ',')} rb x ditonton`;
  }
  const mMatch = str.match(/^([\d.,]+)\s*M\s*views/i);
  if (mMatch) {
    return `${mMatch[1].replace('.', ',')} jt x ditonton`;
  }
  const numViewsMatch = str.match(/^([\d,.]+)\s*views/i);
  if (numViewsMatch) {
    const rawNum = numViewsMatch[1].replace(/,/g, '');
    const num = parseInt(rawNum, 10);
    if (!isNaN(num)) return formatViewCount(num);
  }

  if (/^\d+$/.test(str)) {
    return formatViewCount(parseInt(str, 10));
  }

  return str;
}

export default async function getLatestYouTubeVideos(req: Request | any, res: Response | any) {
  try {
    // 0. Serve from cache if still valid
    if (memoryCache && (Date.now() - memoryCache.timestamp < CACHE_TTL) && memoryCache.videos.length > 0) {
      return res.status(200).json({ success: true, source: 'cache', videos: memoryCache.videos });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = (req.query?.channelId as string) || process.env.YOUTUBE_CHANNEL_ID || 'UCyBF-9RBNPKoNdarNKeci1A';

    // 1. Official YouTube Data API v3 (if key provided)
    if (apiKey && channelId) {
      try {
        const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=6&type=video`;
        const ytRes = await fetch(url);
        if (ytRes.ok) {
          const data = await ytRes.json();
          const videoIds = (data.items || []).map((item: any) => item.id?.videoId).filter(Boolean);

          if (videoIds.length > 0) {
            const statsMap = new Map<string, number>();
            try {
              const statsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds.join(',')}&part=statistics`;
              const statsRes = await fetch(statsUrl);
              if (statsRes.ok) {
                const statsData = await statsRes.json();
                for (const item of (statsData.items || [])) {
                  if (item.id && item.statistics?.viewCount) {
                    statsMap.set(item.id, parseInt(item.statistics.viewCount, 10));
                  }
                }
              }
            } catch {
              // ignore stats error
            }

            const videos: VideoItem[] = (data.items || []).map((item: any) => {
              const vId = item.id.videoId;
              const count = statsMap.get(vId);
              return {
                id: vId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
                publishedAt: item.snippet.publishedAt,
                videoUrl: `https://www.youtube.com/watch?v=${vId}`,
                views: count !== undefined ? formatViewCount(count) : undefined,
                viewCount: count
              };
            });

            if (videos.length > 0) {
              memoryCache = { timestamp: Date.now(), videos };
              return res.status(200).json({ success: true, source: 'official_api', videos });
            }
          }
        }
      } catch {
        // continue to scraper
      }
    }

    // 2. Direct Channel Scraping via ytInitialData
    try {
      const channelUrls = [
        'https://www.youtube.com/@LokiGTPS/videos',
        `https://www.youtube.com/channel/${channelId}/videos`
      ];
      
      let html = '';
      for (const cUrl of channelUrls) {
        const pageRes = await fetch(cUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
          }
        });
        if (pageRes.ok) {
          html = await pageRes.text();
          if (html.includes('ytInitialData')) break;
        }
      }

      if (html) {
        const match = html.match(/var ytInitialData = ({.*?});<\/script>/s);
        if (match) {
          const data = JSON.parse(match[1]);
          const parsedVideos: VideoItem[] = [];
          const seenIds = new Set<string>();

          const findLockups = (obj: any) => {
            if (!obj || typeof obj !== 'object') return;
            if (obj.lockupViewModel && obj.lockupViewModel.contentId && obj.lockupViewModel.contentType === 'LOCKUP_CONTENT_TYPE_VIDEO') {
              const l = obj.lockupViewModel;
              const id = l.contentId;
              if (!seenIds.has(id)) {
                seenIds.add(id);
                
                const lMeta = l.metadata?.lockupMetadataViewModel;
                const title = lMeta?.title?.content || 'Video LokiGTPS';
                const rows = lMeta?.metadata?.contentMetadataViewModel?.metadataRows || [];
                const parts = (rows[0]?.metadataParts) || [];

                let rawViews = '';
                let timeAgo = '';

                for (const p of parts) {
                  const content = (p.text?.content || '').replace(/\u00a0/g, ' ').trim();
                  if (content.includes('ditonton') || content.toLowerCase().includes('views')) {
                    rawViews = content;
                  } else if (content.includes('lalu') || content.toLowerCase().includes('ago')) {
                    timeAgo = content;
                  }
                }

                // If not found in primary metadataParts, check deeper inside metadata
                if (!rawViews || !timeAgo) {
                  const scanDeep = (mObj: any) => {
                    if (!mObj || typeof mObj !== 'object') return;
                    if (typeof mObj.content === 'string') {
                      const text = mObj.content.replace(/\u00a0/g, ' ').trim();
                      if (!timeAgo && (text.includes('lalu') || text.includes('ago') || text.includes('yang lalu'))) {
                        timeAgo = text;
                      } else if (!rawViews && (text.includes('x ditonton') || text.includes('views') || text.includes('ditonton'))) {
                        rawViews = text;
                      }
                    }
                    for (const k of Object.keys(mObj)) {
                      scanDeep(mObj[k]);
                    }
                  };
                  scanDeep(l.metadata);
                }

                const finalViews = formatViewCount(rawViews);

                parsedVideos.push({
                  id,
                  title,
                  timeAgo: timeAgo || 'Terbaru',
                  views: finalViews || undefined,
                  thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
                  videoUrl: `https://www.youtube.com/watch?v=${id}`,
                  publishedAt: timeAgo || 'Terbaru'
                });
              }
            }
            for (const k of Object.keys(obj)) {
              findLockups(obj[k]);
            }
          };

          findLockups(data);

          if (parsedVideos.length > 0) {
            const topVideos = parsedVideos.slice(0, 6);
            memoryCache = { timestamp: Date.now(), videos: topVideos };
            return res.status(200).json({ success: true, source: 'live_channel_sync', videos: topVideos });
          }
        }
      }
    } catch {
      // ignore scraping errors and move to cached or fallback
    }

    // 3. If scraping failed (e.g. rate limit), check if we have older memoryCache
    if (memoryCache && memoryCache.videos.length > 0) {
      return res.status(200).json({ success: true, source: 'stale_cache', videos: memoryCache.videos });
    }

    // 4. Clean Fallback to real LokiGTPS videos
    return res.status(200).json({
      success: true,
      source: 'fallback_loki',
      videos: FALLBACK_VIDEOS
    });
  } catch (err) {
    if (memoryCache && memoryCache.videos.length > 0) {
      return res.status(200).json({ success: true, source: 'error_stale_cache', videos: memoryCache.videos });
    }
    return res.status(200).json({ success: true, source: 'error_fallback', videos: FALLBACK_VIDEOS });
  }
}
