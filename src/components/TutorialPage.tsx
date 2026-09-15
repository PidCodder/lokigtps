import React, { useState, useEffect } from 'react';
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
import { CustomerSupportFooter } from './CustomerSupportFooter';
import { audioManager } from '../utils/audioManager';

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
    // Otomatis putar musik / aktifkan saat user pertama kali tap atau interaksi
    audioManager.enableAutoplayOnFirstInteraction();
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
    <div className="min-h-screen bg-[#fafaf9] flex flex-col items-center justify-between font-sans text-stone-900 selection:bg-orange-500 selection:text-white relative p-0 m-0">
      {/* Top Floating Navbar */}
      <div
        className="fixed top-0 left-0 right-0 w-full z-40 bg-[#ea580c] border-b border-[#c2410c] shadow-sm text-white"
      >
        <header className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between">
          <button
            id="tutorial-back-home-btn"
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/15 hover:bg-white/25 text-[11px] sm:text-sm font-semibold text-white border border-white/20 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Kembali</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-sm font-bold text-white tracking-wide uppercase">
              PANDUAN GTPS
            </span>
          </div>

          <AudioPlayer shouldPlay={shouldPlayAudio} />
        </header>
      </div>

      {/* Main Page Container */}
      <main className="w-full max-w-4xl mx-auto p-3 sm:p-6 pt-16 sm:pt-24 flex flex-col items-center flex-1">
        {/* Hero Card */}
        <div
          className="w-full p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#ea580c] border border-[#c2410c] text-white shadow-xl shadow-orange-950/20 mb-4 sm:mb-6 text-center relative overflow-hidden"
        >
          <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-1 sm:mb-2">
            Tutorial Bermain GTPS
          </h1>
          <p className="text-[11px] sm:text-sm text-orange-100 font-normal max-w-md mx-auto">
            Panduan lengkap langkah demi langkah cara pasang host dan login Growtopia Private Server di semua perangkat.
          </p>
        </div>

        {/* Tab Selection Grid */}
        <div className="w-full grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`page-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`p-2 sm:p-3.5 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-1 sm:gap-1.5 cursor-pointer border transition-all ${
                  isActive
                    ? 'bg-orange-600 text-white font-bold border-orange-600 shadow-lg shadow-orange-600/30'
                    : 'bg-white text-stone-600 hover:bg-orange-50/50 hover:text-orange-600 border-stone-200 shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                <span className="text-[11px] sm:text-sm font-semibold tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Details */}
        <div
          key={activeTab}
          className="w-full space-y-4"
        >
          {/* ANDROID TAB - POWERTUNNEL PHOTO TUTORIAL */}
          {activeTab === 'android' && (
            <div className="space-y-4">
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 space-y-4 shadow-2xl">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm sm:text-base border-b border-stone-100 pb-3">
                  <Smartphone className="w-5 h-5 text-orange-600" />
                  <span>Cara Bermain GTPS Menggunakan PowerTunnel Android</span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  Ikuti langkah-langkah di bawah sesuai gambar tangkapan layar untuk menghubungkan Growtopia ke Private Server:
                </p>

                {/* Step-by-Step Photo Cards */}
                <div className="space-y-4">
                  {PTUNEL_STEPS.map((item) => (
                    <div
                      key={item.step}
                      className="p-4 sm:p-5 rounded-2xl bg-[#ea580c] border border-[#c2410c] text-white shadow-xl shadow-orange-950/20 space-y-3 overflow-hidden"
                    >
                      {/* Step Header */}
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-white text-orange-600 font-extrabold flex items-center justify-center text-xs sm:text-sm flex-shrink-0 shadow-xs">
                          {item.step}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-xs sm:text-sm">
                            {item.title}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-orange-100 mt-0.5 leading-relaxed">
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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-orange-50 text-orange-600 font-bold text-xs sm:text-sm shadow-xs cursor-pointer"
                          >
                            <Download className="w-4 h-4 text-orange-600" />
                            <span>{item.downloadLabel || 'Download'}</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-80 ml-0.5 text-orange-600" />
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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-orange-50 text-orange-600 font-bold text-xs sm:text-sm shadow-xs cursor-pointer"
                          >
                            <Youtube className="w-4 h-4 fill-current text-orange-600" />
                            <span>{item.actionLabel || 'Semua Best GTPS Ada di Sini'}</span>
                            <ArrowLeft className="w-3.5 h-3.5 rotate-180 ml-0.5 text-orange-600" />
                          </button>
                        </div>
                      )}

                      {/* Note / Penjelasan */}
                      {item.note && (
                        <div className="p-3 rounded-xl bg-[#852d0f] border border-[#71250b] flex items-start gap-2.5 text-xs text-orange-100 mt-1.5 shadow-xs">
                          <FileText className="w-4 h-4 text-orange-300 flex-shrink-0 mt-0.5" />
                          <div className="leading-relaxed whitespace-pre-line">
                            <span className="font-bold text-white mr-1">Penjelasan:</span>
                            <span>{item.note}</span>
                          </div>
                        </div>
                      )}

                      {/* Step Image */}
                      {item.image && (
                        <div className="w-full rounded-xl overflow-hidden bg-white/20 p-1 border border-white/30 shadow-xs">
                          <img
                            src={item.image}
                            alt={`Langkah ${item.step}: ${item.title}`}
                            className="w-full h-auto block object-cover rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 flex items-start gap-2.5 text-xs text-stone-800 mt-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
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
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 space-y-4 shadow-2xl">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm sm:text-base border-b border-stone-100 pb-3">
                  <Monitor className="w-5 h-5 text-orange-600" />
                  <span>Cara Bermain GTPS Menggunakan NotePad Windows</span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  Ikuti langkah demi langkah di bawah untuk menyambungkan PC / Laptop Windows kamu ke Private Server:
                </p>

                {/* Step-by-Step Cards */}
                <div className="space-y-4">
                  {PC_STEPS.map((item) => (
                    <div
                      key={item.step}
                      className="p-4 sm:p-5 rounded-2xl bg-[#ea580c] border border-[#c2410c] text-white shadow-xl shadow-orange-950/20 space-y-3 overflow-hidden"
                    >
                      {/* Step Header */}
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-white text-orange-600 font-extrabold flex items-center justify-center text-xs sm:text-sm flex-shrink-0 shadow-xs">
                          {item.step}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-xs sm:text-sm">
                            {item.title}
                          </h4>
                          {item.desc && (
                            <p className="text-[11px] sm:text-xs text-orange-100 mt-0.5 leading-relaxed">
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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-orange-50 text-orange-600 font-bold text-xs sm:text-sm shadow-xs cursor-pointer"
                          >
                            <Download className="w-4 h-4 text-orange-600" />
                            <span>{item.downloadLabel || 'Download'}</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-80 ml-0.5 text-orange-600" />
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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-orange-50 text-orange-600 font-bold text-xs sm:text-sm shadow-xs cursor-pointer"
                          >
                            <Youtube className="w-4 h-4 fill-current text-orange-600" />
                            <span>{item.actionLabel || 'Semua Best GTPS Ada di Sini'}</span>
                            <ArrowLeft className="w-3.5 h-3.5 rotate-180 ml-0.5 text-orange-600" />
                          </button>
                        </div>
                      )}

                      {/* Code Block if any */}
                      {item.code && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900 border border-orange-300/40 text-xs font-mono text-orange-200">
                            <span className="truncate pr-2 select-all text-orange-200">{item.code}</span>
                            <button
                              onClick={() => handleCopy(item.code!, `pc-step-${item.step}`)}
                              className="px-2.5 py-1 rounded-lg bg-white hover:bg-orange-50 text-orange-600 font-sans text-[11px] font-bold flex items-center gap-1 cursor-pointer flex-shrink-0"
                            >
                              {copiedText === `pc-step-${item.step}` ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
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
                            <p className="text-[11px] text-orange-100 italic px-1">{item.codeNote}</p>
                          )}
                        </div>
                      )}

                      {/* Example if any */}
                      {item.example && (
                        <div className="p-2.5 rounded-xl bg-stone-900 border border-orange-300/40 font-mono text-xs text-orange-200 whitespace-pre leading-relaxed">
                          {item.example}
                        </div>
                      )}

                      {/* Note / Penjelasan */}
                      {item.note && (
                        <div className="p-3 rounded-xl bg-[#852d0f] border border-[#71250b] flex items-start gap-2.5 text-xs text-orange-100 mt-1.5 shadow-xs">
                          <FileText className="w-4 h-4 text-orange-300 flex-shrink-0 mt-0.5" />
                          <div className="leading-relaxed whitespace-pre-line">
                            <span className="font-bold text-white mr-1">Penjelasan:</span>
                            <span>{item.note}</span>
                          </div>
                        </div>
                      )}

                      {/* Step Image */}
                      {item.image && (
                        <div className="w-full rounded-xl overflow-hidden bg-white/20 p-1 border border-white/30 shadow-xs">
                          <img
                            src={item.image}
                            alt={`Langkah ${item.step}: ${item.title}`}
                            className="w-full h-auto block object-cover rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 flex items-start gap-2.5 text-xs text-stone-800 mt-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
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
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 space-y-4 shadow-2xl">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm sm:text-base border-b border-stone-100 pb-3">
                  <Apple className="w-5 h-5 text-orange-600" />
                  <span>Cara Bermain GTPS Menggunakan Surge 5 iOS</span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  Ikuti langkah-langkah di bawah sesuai gambar tangkapan layar untuk bermain GTPS di iPhone / iPad:
                </p>

                {/* Step-by-Step Photo Cards */}
                <div className="space-y-4">
                  {IOS_STEPS.map((item) => (
                    <div
                      key={item.step}
                      className="p-4 sm:p-5 rounded-2xl bg-[#ea580c] border border-[#c2410c] text-white shadow-xl shadow-orange-950/20 space-y-3 overflow-hidden"
                    >
                      {/* Step Header */}
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-white text-orange-600 font-extrabold flex items-center justify-center text-xs sm:text-sm flex-shrink-0 shadow-xs">
                          {item.step}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-xs sm:text-sm">
                            {item.title}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-orange-100 mt-0.5 leading-relaxed">
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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-orange-50 text-orange-600 font-bold text-xs sm:text-sm shadow-xs cursor-pointer"
                          >
                            <Download className="w-4 h-4 text-orange-600" />
                            <span>{item.downloadLabel || 'Download'}</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-80 ml-0.5 text-orange-600" />
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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-orange-50 text-orange-600 font-bold text-xs sm:text-sm shadow-xs cursor-pointer"
                          >
                            <Youtube className="w-4 h-4 fill-current text-orange-600" />
                            <span>{item.actionLabel || 'Semua Best GTPS Ada di Sini'}</span>
                            <ArrowLeft className="w-3.5 h-3.5 rotate-180 ml-0.5 text-orange-600" />
                          </button>
                        </div>
                      )}

                      {/* Note / Penjelasan */}
                      {item.note && (
                        <div className="p-3 rounded-xl bg-[#852d0f] border border-[#71250b] flex items-start gap-2.5 text-xs text-orange-100 mt-1.5 shadow-xs">
                          <FileText className="w-4 h-4 text-orange-300 flex-shrink-0 mt-0.5" />
                          <div className="leading-relaxed whitespace-pre-line">
                            <span className="font-bold text-white mr-1">Penjelasan:</span>
                            <span>{item.note}</span>
                          </div>
                        </div>
                      )}

                      {/* Step Image */}
                      {item.image && (
                        <div className="w-full rounded-xl overflow-hidden bg-white/20 p-1 border border-white/30 shadow-xs">
                          <img
                            src={item.image}
                            alt={`Langkah ${item.step}: ${item.title}`}
                            className="w-full h-auto block object-cover rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 flex items-start gap-2.5 text-xs text-stone-800 mt-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Tips iOS:</strong> Pastikan profil DNS/VPN telah diizinkan dan aktif di menu <em>Settings &gt; General &gt; VPN &amp; Device Management</em> pada perangkat Apple kamu.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Back Button */}
        <div className="w-full mt-6">
          <button
            id="tutorial-bottom-back-btn"
            onClick={onNavigateHome}
            className="w-full py-3 rounded-2xl bg-white hover:bg-stone-50 text-xs sm:text-sm font-semibold text-stone-700 border border-stone-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda LOKIGTPS</span>
          </button>
        </div>
      </main>

      {/* Customer Support & Community Footer */}
      <CustomerSupportFooter />
    </div>
  );
};
