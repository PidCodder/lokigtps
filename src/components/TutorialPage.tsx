import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  BookOpen, 
  Smartphone, 
  Monitor, 
  Apple, 
  Copy, 
  Check, 
  Sparkles, 
  AlertCircle,
  Download,
  ExternalLink,
  Youtube,
  FileText
} from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';

// PowerTunnel Step Images
import ptunel1 from '../assets/images/ptunrl1.jpg';
import ptunel2 from '../assets/images/ptunel2.jpg';
import ptunel3 from '../assets/images/ptunel3.jpg';
import ptunel4 from '../assets/images/ptunel4.jpg';
import ptunel5 from '../assets/images/ptunel5.jpg';
import ptunel6 from '../assets/images/ptunel6.jpg';
import ptunel7 from '../assets/images/ptunel7.jpg';

// iOS Step Images
import ios1 from '../assets/images/ios1.png';
import ios2 from '../assets/images/ios2.png';
import ios3 from '../assets/images/ios3.png';
import ios4 from '../assets/images/ios4.png';

// Windows PC Step Images
import pc1 from '../assets/images/PC1.png';
import pc2 from '../assets/images/PC2.png';
import pc3 from '../assets/images/PC3.png';
import pc4 from '../assets/images/PC4.png';
import pc5 from '../assets/images/PC5.png';

interface TutorialPageProps {
  onNavigateHome: () => void;
  shouldPlayAudio?: boolean;
}

type TabType = 'android' | 'pc' | 'ios';

interface TutorialStep {
  step: number;
  title: string;
  desc?: string;
  downloadUrl?: string;
  downloadLabel?: string;
  actionType?: string;
  actionLabel?: string;
  note?: string;
  image?: string;
  code?: string;
  codeNote?: string;
  example?: string;
}

const PTUNEL_STEPS: TutorialStep[] = [
  {
    step: 1,
    title: 'Download Game Growtopia di Play Store',
    desc: 'Unduh dan pasang game resmi Growtopia langsung dari Google Play Store.',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.rtsoft.growtopia',
    downloadLabel: 'Download Growtopia',
  },
  {
    step: 2,
    title: 'Download PowerTunnel APK',
    desc: 'Unduh aplikasi PowerTunnel versi Android (pilih file APK rilis terbaru).',
    downloadUrl: 'https://github.com/krlvm/powertunnel-android/releases',
    downloadLabel: 'Download PowerTunnel',
  },
  {
    step: 3,
    title: 'Cari GTPS yang Mau Kalian Mainkan',
    desc: 'Pilih server GTPS terbaik dan terbaru yang ingin kamu mainkan melalui rekomendasi video YouTube kami.',
    actionType: 'navigateHomeVideos',
    actionLabel: 'Semua Best GTPS Ada di Sini',
  },
  {
    step: 4,
    title: 'Copy Host yang Ada di Deskripsi Video',
    desc: 'Buka video GTPS pilihanmu lalu salin link/teks Host dari deskripsi video.',
    note: 'Jika host tidak ada di deskripsi video, join community WA / Discord server GTPS yang ada di deskripsi video, lalu cek deskripsi grup WA atau channel #how-to-play di Discord.',
  },
  {
    step: 5,
    title: 'Buka Aplikasi PowerTunnel',
    image: ptunel1,
    desc: 'Jika sudah menemukan GTPS idaman kamu, buka aplikasi PowerTunnel yang sudah kamu download dan klik ikon yang di kotak merah.',
  },
  {
    step: 6,
    title: 'Uncentang semua yang di tandai garis merah',
    image: ptunel2,
    desc: 'Uncentang semua dan hanya aktifkan Hosts.',
  },
  {
    step: 7,
    title: 'Buka Icon Settings',
    image: ptunel3,
    desc: 'Buka ikon settings Hosts untuk paste host PowerTunnel server GTPS yang mau kalian mainkan.',
  },
  {
    step: 8,
    title: 'Masukkan Host Server GTPS',
    image: ptunel4,
    desc: 'Klik Hosts File URL dan paste URL host khusus PowerTunnel server GTPS yang mau dimainkan.',
  },
  {
    step: 9,
    title: 'Ubah menjadi On Start',
    image: ptunel5,
    desc: 'Buka Hosts File Update di bawah Hosts File URL dan ubah jadi On Start.',
  },
  {
    step: 10,
    title: 'Nyalakan Switch PowerTunnel (CONNECT)',
    image: ptunel6,
    desc: 'Tekan tombol Connect sampai status berubah aktif dan VPN tersambung.',
  },
  {
    step: 11,
    title: 'Buka Growtopia & Play Online',
    desc: 'Buka game Growtopia Dan Jika ada tampilan Isi nama server Kalian isi nama server nya dengan nama server yang mau kalian mainkan !',
    note: "Ada beberapa server juga yang tidak harus memasukan nama server dan langsung bermain, tapi jika ada Permintaan mengisi nama server silahkan isi dengan nama server yang mau kalian mainkan."
  },
];

const PC_STEPS: TutorialStep[] = [
  {
    step: 1,
    title: 'Download Game Growtopia untuk Windows',
    desc: 'Unduh dan install game resmi Growtopia untuk PC / Laptop Windows.',
    downloadUrl: 'https://growtopiagame.com/',
    downloadLabel: 'Download Growtopia PC',
  },
  {
    step: 2,
    title: 'Cari GTPS yang Mau Kalian Mainkan',
    desc: 'Pilih server GTPS terbaik dan terbaru yang ingin kamu mainkan melalui rekomendasi video YouTube kami.',
    actionType: 'navigateHomeVideos',
    actionLabel: 'Semua Best GTPS Ada di Sini',
  },
  {
    step: 3,
    title: 'Buka Notepad sebagai Administrator!',
    desc: 'Di search Windows cari Notepad dan buka sebagai Administrator, lalu klik File > Open.',
    image: pc1,
  },
  {
    step: 4,
    title: 'Ketika sudah Click OPEN Cari Folder ECT',
    desc: 'Cari Folder ECT dan ikuti path Foto Di bawah!',
    image: pc2,
  },
  {
    step: 5,
    title: 'Jika Sudah Di Folder ECT Ubah Text Documents Ke All Files',
    desc: 'Ada beberapa yang file hosts-nya tidak muncul, maka dari itu kalian harus ubah dari Text Documents (*.txt) ke All Files (*.*) seperti di foto.',
    image: pc3,
  },
  {
    step: 6,
    title: 'Click 2x File Hosts Yang sudah mucul di Folder ECT',
    desc: 'Jika Sudah Muncul Kalian Bisa Click 2X File Hosts nya',
    image: pc4,
  },
  {
    step: 7,
    title: 'Paste IP Host PC GTPS Kalian',
    desc: 'Paste baris IP dan host-nya sesuai seperti yang ada di foto (di baris paling bawah ya).',
    image: pc5,
  },
  {
    step: 8,
    title: 'Buka Growtopia & Play Online',
    desc: 'Buka game Growtopia Dan Jika ada tampilan Isi nama server Kalian isi nama server nya dengan nama server yang mau kalian mainkan !',
    note: "Ada beberapa server juga yang tidak harus memasukan nama server dan langsung bermain, tapi jika ada Permintaan mengisi nama server silahkan isi dengan nama server yang mau kalian mainkan."
  },
];

const IOS_STEPS: TutorialStep[] = [
  {
    step: 1,
    title: 'Download Game Growtopia di App Store',
    desc: 'Unduh dan pasang game resmi Growtopia langsung dari Apple App Store.',
    downloadUrl: 'https://apps.apple.com/app/growtopia/id590495115',
    downloadLabel: 'Download Growtopia',
  },
  {
    step: 2,
    title: 'Download Surge 5 di App Store',
    desc: 'Unduh aplikasi Surge 5 langsung dari Apple App Store di perangkat iPhone / iPad kamu.',
    downloadUrl: 'https://apps.apple.com/app/surge-5/id1442620678',
    downloadLabel: 'Download Surge 5',
  },
  {
    step: 3,
    title: 'Cari GTPS yang Mau Kalian Mainkan',
    desc: 'Pilih server GTPS terbaik dan terbaru yang ingin kamu mainkan melalui rekomendasi video YouTube kami.',
    actionType: 'navigateHomeVideos',
    actionLabel: 'Semua Best GTPS Ada di Sini',
  },
  {
    step: 4,
    title: 'Copy Host yang Ada di Deskripsi Video',
    desc: 'Buka video GTPS pilihanmu lalu salin link/teks Host khusus iOS dari deskripsi video.',
    note: 'Jika host tidak ada di deskripsi video, join community WA / Discord server GTPS yang ada di deskripsi video, lalu cek deskripsi grup WA atau channel #how-to-play di Discord.',
  },
  {
    step: 5,
    title: 'Buka Aplikasi Surge 5',
    image: ios1,
    desc: 'Buka aplikasi Surge 5 di iPhone lalu klik kotak merah seperti pada foto di bawah.',
  },
  {
    step: 6,
    title: 'Geser ke bawah dan cari Download Profile From URL',
    image: ios2,
    desc: 'Scroll ke bawah dan klik Download Profile From URL untuk memasang host URL iOS server GTPS kalian.',
  },
  {
    step: 7,
    title: 'Paste URL iOS Server GTPS yang Mau Dimainkan',
    image: ios3,
    desc: 'Paste URL iOS server GTPS yang mau kalian mainkan seperti di foto dan klik OK untuk menuju langkah berikutnya.',
  },
  {
    step: 8,
    title: 'Klik Start di Halaman Utama',
    image: ios4,
    desc: 'Balik ke halaman utama untuk Start host-nya, dan jika berubah jadi STOP maka VPN sudah berhasil dijalankan.',
  },
  {
    step: 9,
    title: 'Buka Growtopia & Play Online',
    desc: 'Buka game Growtopia Dan Jika ada tampilan Isi nama server Kalian isi nama server nya dengan nama server yang mau kalian mainkan !',
    note: "Ada beberapa server juga yang tidak harus memasukan nama server dan langsung bermain, tapi jika ada Permintaan mengisi nama server silahkan isi dengan nama server yang mau kalian mainkan."
  },
];

export const TutorialPage: React.FC<TutorialPageProps> = ({ onNavigateHome, shouldPlayAudio }) => {
  const [activeTab, setActiveTab] = useState<TabType>('android');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const tabs = [
    { id: 'android' as TabType, label: 'Android', icon: Smartphone, subtitle: 'PowerTunnel' },
    { id: 'pc' as TabType, label: 'Windows', icon: Monitor, subtitle: 'Notepad & Hosts System32' },
    { id: 'ios' as TabType, label: 'iOS', icon: Apple, subtitle: 'Surge 5' },
  ];

  return (
    <div className="min-h-screen bg-[#c2410c] flex flex-col items-center justify-start font-sans text-stone-100 selection:bg-orange-500 selection:text-white relative p-0 m-0 pb-16">
      {/* Top Floating Navbar */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-40"
      >
        <header className="w-full flex items-center justify-between px-4 py-3.5 bg-[#ea580c]/35 backdrop-blur-md text-white border-b border-orange-400/50 shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
          <button
            id="tutorial-back-home-btn"
            onClick={onNavigateHome}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/30 hover:bg-black/45 active:scale-95 transition-all text-xs sm:text-sm font-bold text-amber-200 border border-amber-300/30 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide uppercase drop-shadow-xs">
              PANDUAN GTPS
            </span>
          </div>

          <AudioPlayer shouldPlay={shouldPlayAudio} />
        </header>
      </motion.div>

      {/* Main Page Container */}
      <main className="w-full max-w-lg mx-auto p-4 sm:p-5 pt-20 sm:pt-22 flex flex-col items-center">
        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full p-5 rounded-3xl bg-gradient-to-br from-[#ea580c] via-[#c2410c] to-[#9a3412] shadow-2xl shadow-black/40 border border-orange-400/40 mb-5 relative overflow-hidden text-center"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase mb-1 drop-shadow-md">
            Tutorial Bermain GTPS
          </h1>
          <p className="text-xs sm:text-sm text-orange-100 font-medium max-w-xs mx-auto">
            Panduan lengkap langkah demi langkah cara pasang host dan login Growtopia Private Server di semua perangkat.
          </p>
        </motion.div>

        {/* Tab Selection Grid */}
        <div className="w-full grid grid-cols-3 gap-2 mb-5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`page-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-b from-amber-400 to-orange-500 text-stone-950 font-bold border-yellow-200 shadow-lg shadow-black/30 scale-[1.02]'
                    : 'bg-black/25 text-orange-100 hover:bg-black/35 hover:text-white border-white/10'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-stone-950' : 'text-yellow-300'}`} />
                <span className="text-xs sm:text-sm font-bold tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Details */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full space-y-4"
        >
          {/* ANDROID TAB - POWERTUNNEL PHOTO TUTORIAL */}
          {activeTab === 'android' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-black/25 border border-white/15 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-yellow-300 font-bold text-sm sm:text-base border-b border-white/10 pb-3">
                  <Smartphone className="w-5 h-5" />
                  <span>Cara Bermain GTPS Menggunakan PowerTunnel Android</span>
                </div>

                <p className="text-xs text-orange-100 leading-relaxed">
                  Ikuti langkah-langkah di bawah sesuai gambar tangkapan layar untuk menghubungkan Growtopia ke Private Server:
                </p>

                {/* Step-by-Step Photo Cards */}
                <div className="space-y-4">
                  {PTUNEL_STEPS.map((item) => (
                    <div
                      key={item.step}
                      className="p-3 sm:p-4 rounded-2xl bg-black/30 border border-white/10 space-y-2.5 overflow-hidden transition-all hover:border-amber-400/40"
                    >
                      {/* Step Header */}
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 font-black flex items-center justify-center text-xs flex-shrink-0 shadow-md">
                          {item.step}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-xs sm:text-sm">
                            {item.title}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-orange-200 mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Download Link Button */}
                      {item.downloadUrl && (
                        <div className="pt-1">
                          <a
                            href={item.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            <span>{item.downloadLabel || 'Download'}</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
                          </a>
                        </div>
                      )}

                      {/* Action Button (e.g. Navigate to Latest Videos on Home) */}
                      {item.actionType === 'navigateHomeVideos' && (
                        <div className="pt-1">
                          <button
                            onClick={() => {
                              onNavigateHome();
                              setTimeout(() => {
                                const el = document.getElementById('first-youtube-video') || document.getElementById('youtube-videos-section');
                                if (el) {
                                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                              }, 120);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                          >
                            <Youtube className="w-4 h-4 fill-current text-stone-950" />
                            <span>{item.actionLabel || 'Semua Best GTPS Ada di Sini'}</span>
                            <ArrowLeft className="w-3.5 h-3.5 rotate-180 ml-0.5" />
                          </button>
                        </div>
                      )}

                      {/* Note / Penjelasan */}
                      {item.note && (
                        <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200 mt-1.5">
                          <FileText className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div className="leading-relaxed whitespace-pre-line">
                            <span className="font-bold text-amber-300 mr-1">Penjelasan:</span>
                            <span>{item.note}</span>
                          </div>
                        </div>
                      )}

                      {/* Step Image */}
                      {item.image && (
                        <div className="w-full rounded-xl overflow-hidden bg-black/20 border border-white/10 shadow-sm">
                          <img
                            src={item.image}
                            alt={`Langkah ${item.step}: ${item.title}`}
                            className="w-full h-auto block object-cover rounded-xl"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200 mt-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Tips HP Android:</strong> Pastikan PowerTunnel sudah aktif (tombol status Connect) dan memiliki izin VPN sebelum membuka aplikasi Growtopia.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PC / WINDOWS TAB */}
          {activeTab === 'pc' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-black/25 border border-white/15 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-yellow-300 font-bold text-sm sm:text-base border-b border-white/10 pb-3">
                  <Monitor className="w-5 h-5" />
                  <span>Cara Bermain GTPS Menggunakan NotePad Windows</span>
                </div>

                <p className="text-xs text-orange-100 leading-relaxed">
                  Ikuti langkah demi langkah di bawah untuk menyambungkan PC / Laptop Windows kamu ke Private Server:
                </p>

                {/* Step-by-Step Cards */}
                <div className="space-y-4">
                  {PC_STEPS.map((item) => (
                    <div
                      key={item.step}
                      className="p-3 sm:p-4 rounded-2xl bg-black/30 border border-white/10 space-y-2.5 overflow-hidden transition-all hover:border-amber-400/40"
                    >
                      {/* Step Header */}
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 font-black flex items-center justify-center text-xs flex-shrink-0 shadow-md">
                          {item.step}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-xs sm:text-sm">
                            {item.title}
                          </h4>
                          {item.desc && (
                            <p className="text-[11px] sm:text-xs text-orange-200/90 mt-0.5 leading-relaxed">
                              {item.desc}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Download Link Button */}
                      {item.downloadUrl && (
                        <div className="pt-1">
                          <a
                            href={item.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            <span>{item.downloadLabel || 'Download'}</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
                          </a>
                        </div>
                      )}

                      {/* Action Button (e.g. Navigate to Latest Videos on Home) */}
                      {item.actionType === 'navigateHomeVideos' && (
                        <div className="pt-1">
                          <button
                            onClick={() => {
                              onNavigateHome();
                              setTimeout(() => {
                                const el = document.getElementById('first-youtube-video') || document.getElementById('youtube-videos-section');
                                if (el) {
                                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                              }, 120);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                          >
                            <Youtube className="w-4 h-4 fill-current text-stone-950" />
                            <span>{item.actionLabel || 'Semua Best GTPS Ada di Sini'}</span>
                            <ArrowLeft className="w-3.5 h-3.5 rotate-180 ml-0.5" />
                          </button>
                        </div>
                      )}

                      {/* Code Block if any */}
                      {item.code && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-amber-200">
                            <span className="truncate pr-2 select-all">{item.code}</span>
                            <button
                              onClick={() => handleCopy(item.code!, `pc-step-${item.step}`)}
                              className="px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-sans text-[11px] font-semibold flex items-center gap-1 cursor-pointer flex-shrink-0 transition-colors"
                            >
                              {copiedText === `pc-step-${item.step}` ? (
                                <>
                                  <Check className="w-3 h-3 text-green-300" />
                                  <span>Tersalin</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Salin</span>
                                </>
                              )}
                            </button>
                          </div>
                          {item.codeNote && (
                            <p className="text-[11px] text-orange-300 italic px-1">{item.codeNote}</p>
                          )}
                        </div>
                      )}

                      {/* Example if any */}
                      {item.example && (
                        <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-yellow-300 whitespace-pre leading-relaxed">
                          {item.example}
                        </div>
                      )}

                      {/* Note / Penjelasan */}
                      {item.note && (
                        <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200 mt-1.5">
                          <FileText className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div className="leading-relaxed whitespace-pre-line">
                            <span className="font-bold text-amber-300 mr-1">Penjelasan:</span>
                            <span>{item.note}</span>
                          </div>
                        </div>
                      )}

                      {/* Step Image */}
                      {item.image && (
                        <div className="w-full rounded-xl overflow-hidden bg-black/20 border border-white/10 shadow-sm">
                          <img
                            src={item.image}
                            alt={`Langkah ${item.step}: ${item.title}`}
                            className="w-full h-auto block object-cover rounded-xl"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200 mt-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Tips PC Windows:</strong> Jika tidak bisa menyimpan file hosts (Permission Denied), pastikan kamu membuka Notepad dengan <strong>Run as administrator</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* IOS / IPHONE TAB - PHOTO TUTORIAL */}
          {activeTab === 'ios' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-black/25 border border-white/15 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-yellow-300 font-bold text-sm sm:text-base border-b border-white/10 pb-3">
                  <Apple className="w-5 h-5" />
                  <span>Cara Bermain GTPS Menggunakan Surge 5 iOS</span>
                </div>

                <p className="text-xs text-orange-100 leading-relaxed">
                  Ikuti langkah-langkah di bawah sesuai gambar tangkapan layar untuk bermain GTPS di iPhone / iPad:
                </p>

                {/* Step-by-Step Photo Cards */}
                <div className="space-y-4">
                  {IOS_STEPS.map((item) => (
                    <div
                      key={item.step}
                      className="p-3 sm:p-4 rounded-2xl bg-black/30 border border-white/10 space-y-2.5 overflow-hidden transition-all hover:border-amber-400/40"
                    >
                      {/* Step Header */}
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 font-black flex items-center justify-center text-xs flex-shrink-0 shadow-md">
                          {item.step}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-xs sm:text-sm">
                            {item.title}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-orange-200 mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Download Link Button */}
                      {item.downloadUrl && (
                        <div className="pt-1">
                          <a
                            href={item.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            <span>{item.downloadLabel || 'Download'}</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
                          </a>
                        </div>
                      )}

                      {/* Action Button (e.g. Navigate to Latest Videos on Home) */}
                      {item.actionType === 'navigateHomeVideos' && (
                        <div className="pt-1">
                          <button
                            onClick={() => {
                              onNavigateHome();
                              setTimeout(() => {
                                const el = document.getElementById('first-youtube-video') || document.getElementById('youtube-videos-section');
                                if (el) {
                                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                              }, 120);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                          >
                            <Youtube className="w-4 h-4 fill-current text-stone-950" />
                            <span>{item.actionLabel || 'Semua Best GTPS Ada di Sini'}</span>
                            <ArrowLeft className="w-3.5 h-3.5 rotate-180 ml-0.5" />
                          </button>
                        </div>
                      )}

                      {/* Note / Penjelasan */}
                      {item.note && (
                        <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200 mt-1.5">
                          <FileText className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div className="leading-relaxed whitespace-pre-line">
                            <span className="font-bold text-amber-300 mr-1">Penjelasan:</span>
                            <span>{item.note}</span>
                          </div>
                        </div>
                      )}

                      {/* Step Image */}
                      {item.image && (
                        <div className="w-full rounded-xl overflow-hidden bg-black/20 border border-white/10 shadow-sm">
                          <img
                            src={item.image}
                            alt={`Langkah ${item.step}: ${item.title}`}
                            className="w-full h-auto block object-cover rounded-xl"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200 mt-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Tips iOS:</strong> Pastikan profil DNS/VPN telah diizinkan dan aktif di menu <em>Settings &gt; General &gt; VPN &amp; Device Management</em> pada perangkat Apple kamu.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Bottom Back Button */}
        <div className="w-full mt-6">
          <button
            id="tutorial-bottom-back-btn"
            onClick={onNavigateHome}
            className="w-full py-3 rounded-2xl bg-black/35 hover:bg-black/50 active:scale-98 transition-all text-xs sm:text-sm font-bold text-amber-200 border border-white/10 flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda LokiGTPS</span>
          </button>
        </div>
      </main>
    </div>
  );
};
