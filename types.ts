export interface MinecraftServer {
  id: string;
  name: string;
  tags: string;
  icon: string;
  description: string;
  link: string;
  playersOnline: number;
}

export interface SupportPlatform {
  id: string;
  title: string;
  platformName: string;
  url: string;
}

export interface YumichieeProfile {
  handle: string;
  greeting: string;
  subtitle: string;
  badges: string;
  bannerImage: string;
  avatarImage: string;
  socials: {
    youtube: string;
    tiktok: string;
    discord: string;
  };
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  videoUrl: string;
  timeAgo?: string;
  views?: string;
}
