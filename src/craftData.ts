import { MinecraftServer, SupportPlatform, YumichieeProfile } from './types';
import lokiBannerImg from './assets/images/lokibanner.jpg';
import paviconImg from './assets/images/pavicon.webp';
import server1Img from './assets/images/server1.webp';

export const YUMICHIEE_PROFILE: YumichieeProfile & { logoImage: string } = {
  handle: '@LokiGTPS',
  greeting: 'Best Promote GTPS Indonesia🚀',
  subtitle: 'Growtopia Private Server Promoter & Content Creator ⚡',
  badges: 'Growtopia • GTPS Promote • Community',
  bannerImage: lokiBannerImg,
  avatarImage: paviconImg,
  logoImage: paviconImg,
  socials: {
    youtube: 'https://www.youtube.com/@LokiGTPS/videos',
    tiktok: 'https://www.tiktok.com/@lokigtps',
    discord: 'https://discord.com/invite/XaTn4quvnZ',
  },
};

export const SUPPORT_PLATFORMS: SupportPlatform[] = [
  {
    id: 'Promote Service',
    title: 'Order Promote Service? Click Here !',
    platformName: 'Discord',
    url: 'https://discord.com/invite/XaTn4quvnZ',
  },
  {
    id: 'Comunity Promote',
    title: 'Comunity Group Promoter INDONESIA',
    platformName: 'Whatsapp Group',
    url: 'https://chat.whatsapp.com/GhlwYFeJhgD4Onl3BEK3nP',
  },
];

export const MINECRAFT_SERVERS: MinecraftServer[] = [
  {
    id: 'server-2',
    name: 'Celestial Private Server',
    tags: 'Mid Economies • Fresh Server • Many Feature⚡️',
    icon: 'https://i.imgur.com/iJUdVpF.jpeg',
    description: 'CelestialPS adalah Growtopia Private Server Fresh yang memiliki banyak sekali Features!',
    link: 'https://celestialps.site/#top',
    playersOnline: 128,
  },
  {
    id: 'server-2',
    name: 'GTID Private Server',
    tags: 'Hard Economies • Indonesia Server • Many event⚡️',
    icon: 'https://i.imgur.com/OTIDtzw.png',
    description: 'CelestialPS adalah Growtopia Private Server Fresh yang memiliki banyak sekali hal bertema indonesia!',
    link: 'https://discord.gg/indo',
    playersOnline: 128,
  },
  {
    id: 'server-3',
    name: 'MX Private Server',
    tags: 'Mid to Hard Economies • Fresh Server • Many Citem',
    icon: 'https://i.imgur.com/zUN5bIL.png',
    description: 'MXPS adalah Growtopia Private Server Fresh yang memiliki banyak sekali Features dan costum item!',
    link: 'https://mxps.netlify.app/ ',
    playersOnline: 128,
  },
];