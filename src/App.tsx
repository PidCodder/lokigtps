import React, { useState, useEffect } from 'react';
import {
  YUMICHIEE_PROFILE,
  SUPPORT_PLATFORMS,
  MINECRAFT_SERVERS,
} from './craftData';
import { MinecraftServer } from './types';
import { ServerModal } from './components/ServerModal';
import { WelcomeModal } from './components/WelcomeModal';
import { TutorialPage } from './components/TutorialPage';
import { YouTubeVideos } from './components/YouTubeVideos';
import { Globe, Youtube, ArrowRight, BookOpen } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { motion } from 'motion/react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });
  const [selectedServer, setSelectedServer] = useState<MinecraftServer | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/tutorial')) {
      return false;
    }
    return true;
  });
  const [hasStartedAudio, setHasStartedAudio] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
    setHasStartedAudio(true);
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch {}
  };

  // TikTok SVG Icon
  const TikTokIcon = () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.34V9a8.16 8.16 0 0 0 4.91 1.62v-3.93a4.85 4.85 0 0 1-1-.05z" />
    </svg>
  );

  // Discord SVG Icon
  const DiscordIcon = () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );

  // WhatsApp SVG Icon
  const WhatsAppIcon = () => (
    <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.332 5.003l-1.417 5.176 5.297-1.389c1.464.798 3.111 1.218 4.775 1.219h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.667-1.037-5.175-2.923-7.061s-4.393-2.924-7.067-2.924zm0 1.636c2.23 0 4.327.869 5.903 2.446 1.577 1.576 2.444 3.673 2.444 5.902 0 4.603-3.743 8.347-8.347 8.347h-.003c-1.469 0-2.912-.392-4.17-1.135l-.299-.177-3.1 1.813.828-3.023-.195-.311c-.815-1.3-1.246-2.809-1.246-4.35 0-4.604 3.744-8.347 8.348-8.347zm4.568 11.233c-.251-.126-1.488-.734-1.719-.818-.231-.084-.399-.126-.567.126-.168.251-.65.818-.797.985-.147.168-.294.189-.545.063-.251-.126-1.06-.391-2.019-1.246-.747-.666-1.252-1.489-1.399-1.74-.147-.251-.016-.387.11-.512.113-.112.251-.294.377-.441.126-.147.168-.251.251-.419.084-.168.042-.315-.021-.441-.063-.126-.567-1.365-.777-1.869-.205-.492-.415-.425-.567-.433l-.483-.008c-.168 0-.441.063-.671.315-.231.251-.881.861-.881 2.1 0 1.239.902 2.436 1.028 2.604.126.168 1.776 2.712 4.302 3.803.601.26 1.07.415 1.436.531.603.191 1.152.164 1.586.099.484-.072 1.488-.608 1.697-1.196.209-.588.209-1.091.147-1.196-.063-.105-.231-.189-.482-.315z"/>
    </svg>
  );

  if (currentPath === '/tutorial' || currentPath.startsWith('/tutorial')) {
    return (
      <TutorialPage
        onNavigateHome={() => navigateTo('/')}
        shouldPlayAudio={hasStartedAudio}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#c2410c] flex flex-col items-center justify-start font-sans text-stone-100 selection:bg-orange-500 selection:text-white relative p-0 m-0">
      <Navbar
        isVisible={!showWelcomeModal}
        shouldPlay={hasStartedAudio}
      />
      {/* Main Container Frame */}
      <motion.div
        key="main-content"
        initial="hidden"
        animate={showWelcomeModal ? "hidden" : "visible"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.14,
              delayChildren: 0.05,
            },
          },
        }}
        className="w-full max-w-lg mx-auto bg-[#c2410c] rounded-none p-4 sm:p-5 pt-24 sm:pt-28 shadow-[0_0_80px_rgba(0,0,0,0.5)] border-none flex flex-col items-center relative my-0 min-h-screen transform-gpu"
      >
        {/* Banner + Avatar Section */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.97 },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
            },
          }}
          className="w-full relative mb-12 z-10 transform-gpu"
        >
          {/* Top Banner Box */}
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/60 aspect-[3.56/1] border-none">
            <img
              src={YUMICHIEE_PROFILE.bannerImage}
              alt="LokiGTPS Banner"
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Overlapping Circular Avatar */}
          <motion.div
            variants={{
              hidden: { scale: 0, opacity: 0 },
              visible: {
                scale: 1,
                opacity: 1,
                transition: { delay: 0.15, duration: 0.7, type: 'spring', stiffness: 140, damping: 18 }
              },
            }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 transform-gpu"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-orange-100 shadow-2xl shadow-black/50 overflow-hidden">
              <img
                src={YUMICHIEE_PROFILE.avatarImage}
                alt="LokiGTPS Avatar"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Profile Info Header */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="text-center mb-6 transform-gpu"
        >
          <h1 className="text-xl sm:text-2xl font-normal text-white tracking-tight mb-1 drop-shadow-md">
            {YUMICHIEE_PROFILE.handle}
          </h1>

          <div className="text-sm font-normal text-amber-200 flex items-center justify-center gap-1 mb-0.5">
            <span>{YUMICHIEE_PROFILE.greeting}</span>
          </div>

          <p className="text-xs sm:text-sm font-normal text-orange-100 mb-1">
            {YUMICHIEE_PROFILE.subtitle}
          </p>

          <p className="text-xs font-normal text-yellow-300 tracking-wide">
            {YUMICHIEE_PROFILE.badges}
          </p>
        </motion.div>

        {/* Social Circular Icon Row */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="flex items-center justify-center gap-3 mb-8 transform-gpu"
        >
          <a
            href={YUMICHIEE_PROFILE.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="carrd-icon-btn"
          >
            <Youtube className="w-5 h-5 fill-current" />
          </a>

          <a
            href={YUMICHIEE_PROFILE.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="carrd-icon-btn"
          >
            <TikTokIcon />
          </a>

          <a
            href={YUMICHIEE_PROFILE.socials.discord}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="carrd-icon-btn"
          >
            <DiscordIcon />
          </a>
        </motion.div>

        {/* Support Service / Community Promote Buttons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9, y: 20 },
            visible: { 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              transition: { 
                type: 'spring', 
                stiffness: 90, 
                damping: 15,
                mass: 0.8
              } 
            },
          }}
          className="w-full space-y-3.5 mb-8"
        >
          {/* Top Button: Discord Purple/Blue */}
          <a
            href="https://discord.com/invite/XaTn4quvnZ"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full min-h-[54px] sm:min-h-[58px] p-2.5 sm:p-3 px-4 flex items-center justify-center rounded-[20px] bg-gradient-to-r from-[#5865F2] via-[#6366f1] to-[#4f46e5] hover:from-[#6975f3] hover:to-[#4338ca] active:scale-[0.98] transition-all shadow-lg shadow-black/20 group"
          >
            <div className="absolute left-2.5 sm:left-3 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-xs group-hover:bg-white/25 transition-colors">
              <DiscordIcon />
            </div>
            <span className="text-sm sm:text-base font-semibold text-white tracking-wide text-center px-12">
              Order Promote Service?
            </span>
          </a>

          {/* Bottom Button: WhatsApp Green */}
          <a
            href="https://chat.whatsapp.com/GhlwYFeJhgD4Onl3BEK3nP"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full min-h-[54px] sm:min-h-[58px] p-2.5 sm:p-3 px-4 flex items-center justify-center rounded-[20px] bg-gradient-to-r from-[#00b05b] via-[#10b981] to-[#059669] hover:from-[#00c868] hover:to-[#047857] active:scale-[0.98] transition-all shadow-lg shadow-black/20 group"
          >
            <div className="absolute left-2.5 sm:left-3 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-xs group-hover:bg-white/25 transition-colors">
              <WhatsAppIcon />
            </div>
            <span className="text-sm sm:text-base font-semibold text-white tracking-wide text-center px-12">
              Comunity Group Promoter
            </span>
          </a>

          {/* Banner Text under Buttons */}
          <div className="pt-0.5 text-center">
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-amber-300 drop-shadow-sm">
              ORDER PROMOTE? JOIN COMUNITY DISCORD LOKIGTPS
            </p>
          </div>

          {/* TUTORIAL BERMAIN GTPS Button */}
          <button
            id="tutorial-bermain-gtps-btn"
            onClick={() => navigateTo('/tutorial')}
            className="relative w-full min-h-[54px] sm:min-h-[58px] p-2.5 sm:p-3 px-4 flex items-center justify-center rounded-[20px] bg-gradient-to-r from-[#d97706] via-[#ea580c] to-[#c2410c] hover:from-[#f59e0b] hover:to-[#d97706] active:scale-[0.98] transition-all shadow-lg shadow-black/20 group cursor-pointer"
          >
            <div className="absolute left-2.5 sm:left-3 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-xs group-hover:bg-white/25 transition-colors text-white">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-white tracking-wide text-center px-12">
              Tutorial Bermain GTPS
            </span>
          </button>
        </motion.div>

        {/* Latest YouTube Videos Section */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="w-full"
        >
          <YouTubeVideos />
        </motion.div>

        {/* Section Heading: Growtopia Private Server 🌏 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="text-center mb-4"
        >
          <h2 className="text-base sm:text-lg font-normal text-white flex items-center justify-center gap-1.5 drop-shadow-md">
            <span>Growtopia Private Server</span>
            <Globe className="w-4 h-4 text-yellow-300 inline-block" />
          </h2>
        </motion.div>

        {/* Server List */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="w-full space-y-4 mb-3"
        >
          {MINECRAFT_SERVERS.map((server) => (
            <motion.div
              key={server.id}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.98 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="carrd-card p-4 flex items-center gap-4 relative"
            >
              {/* Server Logo Emblem */}
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-orange-950/40 p-0.5 shadow-md flex items-center justify-center">
                <img
                  src={server.icon}
                  alt={server.name}
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Server Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-normal text-white truncate drop-shadow-sm">
                  {server.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-amber-200 font-normal mb-2 truncate">
                  {server.tags}
                </p>
                <button
                  onClick={() => setSelectedServer(server)}
                  className="carrd-pill"
                >
                  <span>Start Your Adventure</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Pill Badge */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="mt-2 mb-2 flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900/90 text-stone-200 text-xs font-normal shadow-lg shadow-stone-900/10 backdrop-blur-sm transition-colors">
            <span>© {new Date().getFullYear()} Copyright by <span className="font-normal text-orange-400">@LokiGTPS</span></span>
          </div>
        </motion.div>
      </motion.div>

      {/* Server IP & Info Modal */}
      <ServerModal
        server={selectedServer}
        onClose={() => setSelectedServer(null)}
      />

      {/* Welcome / About Me Initial Popup Modal */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={handleCloseWelcomeModal}
      />
    </div>
  );
}
