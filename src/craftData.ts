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
    id: 'server-3',
    name: 'MX Private Server',
    tags: 'Mid to Hard Economies • Fresh Server • Many Citem',
    icon: 'https://i.imgur.com/zUN5bIL.png',
    description: 'MXPS adalah Growtopia Private Server Fresh yang memiliki banyak sekali Features dan costum item!',
    link: 'https://mxps.netlify.app/ ',
    playersOnline: 128,
  },
  {
    id: 'server-2',
    name: 'GTFY Private Server',
    tags: 'Easy Economies • BIG Server • Many Feature⚡️',
    icon: 'https://i.imgur.com/YBKoh9D.png',
    description: 'GTFYPS adalah Growtopia Private Server Big yang memiliki banyak sekali Players!',
    link: 'https://gtfy.me/',
    playersOnline: 128,
  },
  {
    id: 'server-2',
    name: 'Tera Private Server',
    tags: 'Mid Economies • BIG Server • Many Players⚡️',
    icon: 'https://i.imgur.com/OiYoYCW.jpeg',
    description: 'TERAPS adalah Growtopia Private Server Big yang memiliki banyak sekali Players!',
    link: 'https://linktr.ee/teraps__',
    playersOnline: 128,
  },
];