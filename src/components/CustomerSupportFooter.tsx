import React from 'react';
import { ChevronRight } from 'lucide-react';

export const DiscordIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5 fill-current' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5 fill-current' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.332 5.003l-1.417 5.176 5.297-1.389c1.464.798 3.111 1.218 4.775 1.219h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.667-1.037-5.175-2.923-7.061s-4.393-2.924-7.067-2.924zm0 1.636c2.23 0 4.327.869 5.903 2.446 1.577 1.576 2.444 3.673 2.444 5.902 0 4.603-3.743 8.347-8.347 8.347h-.003c-1.469 0-2.912-.392-4.17-1.135l-.299-.177-3.1 1.813.828-3.023-.195-.311c-.815-1.3-1.246-2.809-1.246-4.35 0-4.604 3.744-8.347 8.348-8.347zm4.568 11.233c-.251-.126-1.488-.734-1.719-.818-.231-.084-.399-.126-.567.126-.168.251-.65.818-.797.985-.147.168-.294.189-.545.063-.251-.126-1.06-.391-2.019-1.246-.747-.666-1.252-1.489-1.399-1.74-.147-.251-.016-.387.11-.512.113-.112.251-.294.377-.441.126-.147.168-.251.251-.419.084-.168.042-.315-.021-.441-.063-.126-.567-1.365-.777-1.869-.205-.492-.415-.425-.567-.433l-.483-.008c-.168 0-.441.063-.671.315-.231.251-.881.861-.881 2.1 0 1.239.902 2.436 1.028 2.604.126.168 1.776 2.712 4.302 3.803.601.26 1.07.415 1.436.531.603.191 1.152.164 1.586.099.484-.072 1.488-.608 1.697-1.196.209-.588.209-1.091.147-1.196-.063-.105-.231-.189-.482-.315z"/>
  </svg>
);

export const CustomerSupportFooter: React.FC = () => {
  return (
    <footer className="w-full mt-8 sm:mt-12">
      {/* Orange Bottom Band */}
      <div className="w-full bg-[#ea580c] rounded-t-3xl sm:rounded-t-[2.5rem] pt-6 sm:pt-8 pb-6 sm:pb-8 px-3 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto">
          {/* Header: Bantuan Pelanggan */}
          <div className="flex items-center gap-2.5 mb-3.5 sm:mb-4 px-0.5">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/20 flex items-center justify-center text-white shadow-xs shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-current" viewBox="0 0 24 24">
                <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-11 9H7V8h2v3zm0-4H7V5h2v2zm5 4h-2V8h2v3zm0-4h-2V5h2v2z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xs sm:text-sm tracking-wide">
              Bantuan Pelanggan
            </h3>
          </div>

          {/* Buttons Grid: Side-by-side on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
            {/* Discord Layanan Promosi */}
            <a
              id="footer-discord-layanan-promosi"
              href="https://discord.com/invite/XaTn4quvnZ"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-stone-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-4.5 flex items-center justify-between gap-3 shadow-md hover:shadow-lg cursor-pointer border border-white/50 group w-full transition-all"
            >
              <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#5865F2] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <DiscordIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-stone-900 font-bold text-xs sm:text-sm truncate">
                    Discord Layanan Promosi
                  </span>
                  <span className="text-stone-500 text-[10px] sm:text-xs truncate">
                    Hubungi via Discord
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400 shrink-0 group-hover:text-stone-700" />
            </a>

            {/* Komunitas WhatsApp */}
            <a
              id="footer-whatsapp-komunitas"
              href="https://chat.whatsapp.com/GHhkBU7HiQkLGyhAK4ysWj"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-stone-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-4.5 flex items-center justify-between gap-3 shadow-md hover:shadow-lg cursor-pointer border border-white/50 group w-full transition-all"
            >
              <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-stone-900 font-bold text-xs sm:text-sm truncate">
                    Komunitas WhatsApp
                  </span>
                  <span className="text-stone-500 text-[10px] sm:text-xs truncate">
                    Hubungi via WhatsApp
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400 shrink-0 group-hover:text-stone-700" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
