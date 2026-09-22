import { MinecraftServer, SupportPlatform, YumichieeProfile } from './types';
import lokiBannerImg from './assets/images/lokibanner.jpg';
import paviconImg from './assets/images/pavicon.webp';
import server1Img from './assets/images/server1.webp';

export const YUMICHIEE_PROFILE: YumichieeProfile & { logoImage: string } = {
  handle: '@LOKIGTPS',
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
    title: 'Order Promote Service?',
    platformName: 'Discord',
    url: 'https://discord.com/invite/XaTn4quvnZ',
  },
  {
    id: 'Comunity Promote',
    title: 'Comunity Group Promoter',
    platformName: 'Whatsapp Group',
    url: 'https://chat.whatsapp.com/BD8YuZDOC2MF4c9rhKoiDP?s=cl&p=i&mlu=4&ilr=4',
  },
];

export const MINECRAFT_SERVERS: MinecraftServer[] = [
  {
    id: 'server-5',
    name: 'FORCE Private Server',
    tags: 'Stable Economies • Many Players • Many Event⚡️',
    icon: 'https://i.imgur.com/y9barye.jpeg',
    description: 'FORCE adalah Growtopia Private Server Fresh yang memiliki banyak Sekali Update Setelah Rollback!',
    link: 'https://chat.whatsapp.com/LPt04XKArXu6JsyIspqmmn',
    playersOnline: 128,
  },
  {
    id: 'server-2',
    name: 'TERA Private Server',
    tags: 'MID Economies • BIG Server • Many Players⚡️',
    icon: 'https://i.imgur.com/RVU6EA7.png',
    description: 'TERA adalah Growtopia Private Server Big yang memiliki banyak sekali Players!',
    link: 'https://chat.whatsapp.com/KUli5gCNFwFJump2usRIpn',
    playersOnline: 128,
  },
    {
    id: 'server-3',
    name: 'TREE Private Server',
    tags: 'HARD Economies • RMT Players • Fresh Server⚡️',
    icon: 'https://i.imgur.com/7GUSirJ.jpeg',
    description: 'GROWINDO adalah Growtopia Private Server yang memiliki banyak sekali Players RMT!',
    link: 'https://linktr.ee/growindops',
    playersOnline: 128,
  },
  {
    id: 'server-4',
    name: 'LIT Private Server',
    tags: 'Stable Economies • Many Features • RMT Server⚡️',
    icon: 'https://i.imgur.com/cEHLg5R.jpeg',
    description: 'LITPS adalah Growtopia Private Server Dengan Economy stable dan memiliki coin Crypto!',
    link: 'https://linktr.ee/LitPS',
    playersOnline: 128,
  },
];