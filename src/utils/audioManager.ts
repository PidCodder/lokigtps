import bobaAudio from '../assets/images/boba_date.mp3';

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private targetVolume = 0.6;
  private fadeInterval: number | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();

  private clearFade() {
    if (this.fadeInterval !== null) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }
  }

  private getAudio(): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;

    if (!this.audio) {
      const audioSrc = bobaAudio || '/boba_date.mp3';
      this.audio = new Audio(audioSrc);
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = this.targetVolume;

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify(true);
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify(false);
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify(false);
      });

      // Pudar akhir sebelum lagu berulang (fade-out before loop ends) & pudar awal saat loop mulai lagi
      this.audio.addEventListener('timeupdate', () => {
        if (!this.audio || !this.isPlaying || this.fadeInterval !== null) return;
        const duration = this.audio.duration;
        const currentTime = this.audio.currentTime;
        const fadeSec = 3; // 3 detik pudar

        if (duration && duration > fadeSec * 2) {
          if (currentTime > duration - fadeSec) {
            // Pudar akhir lagu sebelum loop
            const remaining = duration - currentTime;
            const factor = Math.max(0, remaining / fadeSec);
            this.audio.volume = this.targetVolume * factor;
          } else if (currentTime < fadeSec) {
            // Pudar awal lagu setelah loop restart
            const factor = Math.min(1, currentTime / fadeSec);
            this.audio.volume = this.targetVolume * factor;
          } else {
            this.audio.volume = this.targetVolume;
          }
        }
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Audio element error, trying fallback /boba_date.mp3:', e);
        if (this.audio && !this.audio.src.endsWith('/boba_date.mp3')) {
          this.audio.src = '/boba_date.mp3';
          if (this.isPlaying) {
            this.audio.play().catch(() => {});
          }
        } else {
          this.isPlaying = false;
          this.notify(false);
        }
      });
    }
    return this.audio;
  }

  public subscribe(listener: (playing: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(playing: boolean) {
    this.listeners.forEach((l) => l(playing));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public play(fadeInMs: number = 1500): Promise<void> {
    const audio = this.getAudio();
    if (!audio) return Promise.resolve();

    this.clearFade();
    this.isPlaying = true;
    this.notify(true);

    audio.muted = false;
    audio.volume = 0;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      return playPromise
        .then(() => {
          // Jika pengguna menekan tombol stop sebelum play promise selesai
          if (!this.isPlaying) {
            audio.pause();
            audio.volume = this.targetVolume;
            return;
          }

          // Efek pudar awal (fade-in)
          const steps = 20;
          const stepTime = fadeInMs / steps;
          const volStep = this.targetVolume / steps;
          let currentVol = 0;

          this.fadeInterval = window.setInterval(() => {
            if (!this.audio || !this.isPlaying) {
              this.clearFade();
              if (this.audio) this.audio.pause();
              return;
            }
            currentVol += volStep;
            if (currentVol >= this.targetVolume) {
              this.audio.volume = this.targetVolume;
              this.clearFade();
            } else {
              this.audio.volume = currentVol;
            }
          }, stepTime);
        })
        .catch((err) => {
          console.warn('Playback prevented by browser policy:', err);
          this.isPlaying = false;
          this.notify(false);
        });
    }
    return Promise.resolve();
  }

  public pause(fadeOutMs: number = 500) {
    const audio = this.getAudio();
    this.clearFade();

    this.isPlaying = false;
    this.notify(false);

    if (!audio) return;

    if (fadeOutMs <= 0 || audio.paused) {
      try {
        audio.pause();
        audio.volume = this.targetVolume;
      } catch (e) {
        console.warn('Error pausing audio:', e);
      }
      return;
    }

    // Pudar akhir saat stop (fade-out sebelum benar-benar dipause)
    const startVol = audio.volume;
    const steps = 15;
    const stepTime = fadeOutMs / steps;
    const volStep = startVol / steps;
    let currentVol = startVol;

    this.fadeInterval = window.setInterval(() => {
      if (!this.audio) {
        this.clearFade();
        return;
      }
      currentVol -= volStep;
      if (currentVol <= 0 || !this.isPlaying) {
        this.audio.volume = 0;
        try {
          this.audio.pause();
        } catch (e) {
          console.warn('Error pausing audio:', e);
        }
        this.audio.volume = this.targetVolume;
        this.clearFade();
      } else {
        this.audio.volume = currentVol;
      }
    }, stepTime);
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause(400);
    } else {
      this.play(1500);
    }
  }
}

export const audioManager = new AudioManager();
