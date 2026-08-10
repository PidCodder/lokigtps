import type { Request, Response } from 'express';

const FALLBACK_VIDEOS = [
  {
    id: 'LokiGTPS_v1',
    title: 'PROMOTING BEST GTPS SERVER 2026 | NEW ITEMS & EVENT GTPS! 🚀',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    videoUrl: 'https://youtube.com',
    views: '12,4 rb x ditonton',
    viewCount: 12400
  },
  {
    id: 'LokiGTPS_v2',
    title: 'CARA ORDER PROMOTE GTPS Cepat & Banyak Member! ⚡ @LokiGTPS',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    videoUrl: 'https://youtube.com',
    views: '8,9 rb x ditonton',
    viewCount: 8900
  },
  {
    id: 'LokiGTPS_v3',
    title: 'REVIEW NEXIONMSL SERVER SURVIVAL APOCALYPSE EVENT! ☠️',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    publishedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    videoUrl: 'https://youtube.com',
    views: '24,1 rb x ditonton',
    viewCount: 24100
  },
];

function formatViewCount(val: number | string | undefined): string {
  if (!val && val !== 0) return '1,2 rb x ditonton';
  if (typeof val === 'number') {
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1).replace('.', ',')} jt x ditonton`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(1).replace('.', ',')} rb x ditonton`;
    return `${val.toLocaleString('id-ID')} x ditonton`;
  }
  const str = String(val).trim();
  if (/^\d+$/.test(str)) {
    return formatViewCount(parseInt(str, 10));
  }
  return str;
}

export default async function getLatestYouTubeVideos(req: Request | any, res: Response | any) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = (req.query?.channelId as string) || process.env.YOUTUBE_CHANNEL_ID || 'UCyBF-9RBNPKoNdarNKeci1A';

    // 1. Official YouTube API
    if (apiKey && channelId) {
      const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=6&type=video`;
      const ytRes = await fetch(url);
      if (ytRes.ok) {
        const data = await ytRes.json();
        const videoIds = (data.items || []).map((item: any) => item.id?.videoId).filter(Boolean);

        if (videoIds.length > 0) {
          let statsMap = new Map<string, number>();
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

          const videos = (data.items || []).map((item: any) => {
            const vId = item.id.videoId;
            const count = statsMap.get(vId) || 0;
            return {
              id: vId,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
              publishedAt: item.snippet.publishedAt,
              videoUrl: `https://www.youtube.com/watch?v=${vId}`,
              views: formatViewCount(count || 1200),
              viewCount: count
            };
          });

          if (videos.length > 0) {
            return res.status(200).json({ success: true, source: 'official_api', videos });
          }
        }
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
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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
          const parsedVideos: any[] = [];
          const seenIds = new Set<string>();

          const findLockups = (obj: any) => {
            if (!obj || typeof obj !== 'object') return;
            if (obj.lockupViewModel && obj.lockupViewModel.contentId && obj.lockupViewModel.contentType === 'LOCKUP_CONTENT_TYPE_VIDEO') {
              const l = obj.lockupViewModel;
              const id = l.contentId;
              if (!seenIds.has(id)) {
                seenIds.add(id);
                
                let title = '';
                let timeAgo = '';
                let views = '';

                const scanMetadata = (mObj: any) => {
                  if (!mObj || typeof mObj !== 'object') return;
                  if (typeof mObj.content === 'string') {
                    const text = mObj.content;
                    if (text.includes('lalu') || text.includes('ago') || text.includes('yang lalu')) {
                      timeAgo = text;
                    } else if (text.includes('x ditonton') || text.includes('views') || text.includes('ditonton')) {
                      views = text;
                    } else if (!title && text.length > 3) {
                      title = text;
                    }
                  }
                  for (const k of Object.keys(mObj)) {
                    scanMetadata(mObj[k]);
                  }
                };

                scanMetadata(l.metadata);

                parsedVideos.push({
                  id,
                  title: title || 'Video YouTube LokiGTPS',
                  timeAgo: timeAgo || 'Baru saja',
                  views: formatViewCount(views || '1,5 rb x ditonton'),
                  thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
                  videoUrl: `https://www.youtube.com/watch?v=${id}`,
                  publishedAt: timeAgo || 'Baru saja'
                });
              }
            }
            for (const k of Object.keys(obj)) {
              findLockups(obj[k]);
            }
          };

          findLockups(data);

          if (parsedVideos.length > 0) {
            return res.status(200).json({ success: true, source: 'live_channel_sync', videos: parsedVideos.slice(0, 6) });
          }
        }
      }
    } catch {
      // ignore scraping errors and move to RSS
    }

    // 3. RSS Feed
    if (channelId) {
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
      const rssRes = await fetch(rssUrl);
      if (rssRes.ok) {
        const xmlText = await rssRes.text();
        const videos: any[] = [];
        const entryMatches = xmlText.match(/<entry>[\s\S]*?<\/entry>/g) || [];

        for (const entry of entryMatches.slice(0, 6)) {
          const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
          const titleMatch = entry.match(/<title>(.*?)<\/title>/);
          const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
          const thumbnailMatch = entry.match(/<media:thumbnail url="(.*?)"/);
          const viewsMatch = entry.match(/views="(\d+)"/);

          if (idMatch && titleMatch) {
            const rawViews = viewsMatch ? parseInt(viewsMatch[1], 10) : undefined;
            videos.push({
              id: idMatch[1],
              title: titleMatch[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
              thumbnail: thumbnailMatch ? thumbnailMatch[1] : `https://i.ytimg.com/vi/${idMatch[1]}/hqdefault.jpg`,
              publishedAt: publishedMatch ? publishedMatch[1] : new Date().toISOString(),
              videoUrl: `https://www.youtube.com/watch?v=${idMatch[1]}`,
              views: formatViewCount(rawViews),
              viewCount: rawViews
            });
          }
        }

        if (videos.length > 0) {
          return res.status(200).json({ success: true, source: 'rss_feed', videos });
        }
      }
    }

    // 4. Demo Fallback
    return res.status(200).json({
      success: true,
      source: 'demo_fallback',
      videos: FALLBACK_VIDEOS
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to fetch YouTube videos' });
  }
}

