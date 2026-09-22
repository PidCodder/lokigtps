import React, { useState, useEffect } from 'react';
import {
  YUMICHIEE_PROFILE,
  SUPPORT_PLATFORMS,
  MINECRAFT_SERVERS,
} from './craftData';
import { MinecraftServer } from './types';
import { ServerModal } from './components/ServerModal';
import { WelcomeModal } from './components/WelcomeModal';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CustomerSupportFooter } from './components/CustomerSupportFooter';
import { TutorialPage } from './components/TutorialPage';
import { YouTubeVideos } from './components/YouTubeVideos';
import { Globe, Youtube, ArrowRight, BookOpen } from 'lucide-react';
import { Navbar } from './components/Navbar';

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
  const [showAboutModal, setShowAboutModal] = useState(false);
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
    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.34V9a8.16 8.16 0 0 0 4.91 1.62v-3.93a4.85 4.85 0 0 1-1-.05z" />
    </svg>
  );

  // Discord SVG Icon
  const DiscordIcon = () => (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );

  // WhatsApp SVG Icon
  const WhatsAppIcon = () => (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
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

  // Display "Tentang Saya" screen FIRST before entering the Home Page
  if (showWelcomeModal) {
    return (
      <WelcomeScreen
        onContinue={handleCloseWelcomeModal}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col items-center justify-between font-sans text-stone-900 selection:bg-orange-500 selection:text-white relative p-0 m-0">
      <Navbar
        isVisible={true}
        shouldPlay={hasStartedAudio}
      />
      {/* Main Container Frame */}
      <main
        className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-6 sm:pb-8 flex flex-col items-center relative flex-1"
      >
        {/* Banner + Avatar Section */}
        <div
          className="w-full relative mb-10 sm:mb-14 z-10"
        >
          {/* Top Banner Box */}
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-stone-200/90 aspect-[3.2/1] sm:aspect-[3.6/1] bg-stone-100">
            <img
              src={YUMICHIEE_PROFILE.bannerImage}
              alt="LOKIGTPS Banner"
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Overlapping Circular Avatar */}
          <div
            className="absolute -bottom-8 sm:-bottom-11 left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={() => setShowAboutModal(true)}
            title="Klik untuk info Tentang Saya"
          >
            <div className="w-18 h-18 sm:w-28 sm:h-28 rounded-full border-3 sm:border-4 border-white bg-white shadow-lg ring-2 ring-orange-500/20 overflow-hidden">
              <img
                src={YUMICHIEE_PROFILE.avatarImage}
                alt="LOKIGTPS Avatar"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Profile Info Header */}
        <div
          className="text-center mb-4 sm:mb-6"
        >
          <h1 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-1.5 sm:mb-2">
            {YUMICHIEE_PROFILE.handle}
          </h1>

          <p className="text-xs sm:text-base font-normal text-stone-600 max-w-md mx-auto mb-1">
            {YUMICHIEE_PROFILE.subtitle}
          </p>

          <p className="text-[10px] sm:text-xs font-semibold text-orange-600 tracking-wider uppercase">
            {YUMICHIEE_PROFILE.badges}
          </p>
        </div>

        {/* Social Circular Icon Row */}
        <div
          className="flex items-center justify-center gap-2.5 mb-5 sm:mb-8"
        >
          <a
            href={YUMICHIEE_PROFILE.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="carrd-icon-btn"
          >
            <Youtube className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
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
        </div>

        {/* Support Service / Community Promote Buttons - Responsive Clean Grid */}
        <div
          className="w-full mb-6 sm:mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
            {/* Discord Order Button - Orange */}
            <a
              href="https://discord.com/invite/XaTn4quvnZ"
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-orange-600 hover:bg-orange-500 text-white shadow-xs hover:shadow-md flex items-center gap-2.5 sm:gap-3.5 group cursor-pointer"
            >
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/20 text-white flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 shadow-xs">
                <DiscordIcon />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-[11px] text-orange-100 font-medium leading-none mb-0.5">Layanan Promosi</span>
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                  Order Promote Service
                </span>
              </div>
            </a>

            {/* WhatsApp Community Button - Orange */}
            <a
              href="https://chat.whatsapp.com/BD8YuZDOC2MF4c9rhKoiDP?s=cl&p=i&mlu=4&ilr=4"
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-orange-600 hover:bg-orange-500 text-white shadow-xs hover:shadow-md flex items-center gap-2.5 sm:gap-3.5 group cursor-pointer"
            >
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/20 text-white flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 shadow-xs">
                <WhatsAppIcon />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-[11px] text-orange-100 font-medium leading-none mb-0.5">Grup Komunitas</span>
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                  Community Promoter
                </span>
              </div>
            </a>

            {/* TUTORIAL BERMAIN GTPS Button - Orange */}
            <button
              id="tutorial-bermain-gtps-btn"
              onClick={() => navigateTo('/tutorial')}
              className="relative p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-orange-600 hover:bg-orange-500 text-white shadow-xs hover:shadow-md flex items-center gap-2.5 sm:gap-3.5 text-left cursor-pointer group"
            >
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-[11px] text-orange-100 font-medium leading-none mb-0.5">Panduan Lengkap</span>
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                  Tutorial Bermain GTPS
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Latest YouTube Videos Section */}
        <div
          className="w-full mb-6 sm:mb-10"
        >
          <YouTubeVideos />
        </div>

        {/* Section Heading: Growtopia Private Server 🌏 */}
        <div
          className="w-full flex items-center justify-between mb-3 sm:mb-4 px-0.5"
        >
          <h2 className="text-sm sm:text-xl font-bold text-stone-900 flex items-center gap-1.5 sm:gap-2">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 inline-block" />
            <span>Growtopia Private Server</span>
          </h2>
        </div>

        {/* Server List - Responsive Multi-Column Grid */}
        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4 mb-6 sm:mb-10"
        >
          {MINECRAFT_SERVERS.map((server) => (
            <div
              key={server.id}
              className="carrd-card-orange p-3 sm:p-5 flex items-center gap-3 sm:gap-4 relative rounded-xl sm:rounded-2xl cursor-pointer group"
              onClick={() => setSelectedServer(server)}
            >
              {/* Server Logo Emblem */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 bg-white/20 p-0.5 border border-white/30 shadow-xs flex items-center justify-center">
                <img
                  src={server.icon}
                  alt={server.name}
                  className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Server Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xs sm:text-base font-bold text-white truncate">
                  {server.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-orange-100 font-medium mb-1.5 sm:mb-2.5 truncate">
                  {server.tags}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedServer(server);
                  }}
                  className="carrd-pill-white"
                >
                  <span>Start Your Adventure</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Customer Support & Community Footer */}
      <CustomerSupportFooter />

      {/* Server IP & Info Overlay Modal */}
      <ServerModal
        server={selectedServer}
        onClose={() => setSelectedServer(null)}
      />

      {/* About Me Popup Modal (Triggered via "Tentang Saya" button on Home) */}
      <WelcomeModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
    </div>
  );
}
