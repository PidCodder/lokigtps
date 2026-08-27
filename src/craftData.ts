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
    id: 'server-1',
    name: 'CorePS Private Server',
    tags: 'Easy Economies • FRESH Server • Many Feature⚡️',
    icon: 'https://i.imgur.com/XkxdiBU.jpeg',
    description: 'CorePS adalah Growtopia Private Server Fresh yang sangat menarik karna kalian bisa membeli role menggunakan coin di dalam game!',
    link: 'https://chat.whatsapp.com/Lg20u3X4GNy6q2mxmwc3v9',
    playersOnline: 128,
  },
  {
    id: 'server-2',
    name: 'CreativePS Private Server',
    tags: 'Easy Economies • BIG Server • Many Players⚡️',
    icon: 'https://i.imgur.com/ZTKfDrv.png',
    description: 'CreativePS adalah Growtopia Private Server Big yang memiliki banyak sekali Players!',
    link: 'https://creativeps.netlify.app/',
    playersOnline: 128,
  },
  {
    id: 'server-3',
    name: 'GROWINDO Private Server',
    tags: 'Mid Economies • RMT Players • Many Players⚡️',
    icon: 'https://i.imgur.com/jh6LGiC.png',
    description: 'GROWINDO adalah Growtopia Private Server yang memiliki banyak sekali Players RMT!',
    link: 'https://linktr.ee/growindops',
    playersOnline: 128,
  },
  {
    id: 'server-4',
    name: 'NUSATOPIA Private Server',
    tags: 'Stable Economies • ManyFreatures • Many Event⚡️',
    icon: 'https://i.imgur.com/jtWUgu7.jpeg',
    description: 'NUSATOPIA adalah Growtopia Private Server Fresh yang memiliki banyak sekali Features dan costum item!',
    link: 'https://chat.whatsapp.com/KWw1HmsIsoT7JmalF0d4vS',
    playersOnline: 128,
  },
];