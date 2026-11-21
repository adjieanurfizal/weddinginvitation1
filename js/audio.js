export class MusicController {
  constructor(musicConfig = {}) {
    this.enabled = Boolean(musicConfig.enabled);
    this.mp3Path = musicConfig.mp3Path || "";
    this.isPlaying = false;
    this.openInviteBtn = document.getElementById("openInviteBtn");

    this.audioEl = null;
    this.audioCtx = null;
    this.synthTimer = null;
    this.noteIndex = 0;
    this.melody = [261.63, 329.63, 392, 523.25, 392, 329.63, 293.66, 349.23, 440, 587.33, 440, 349.23];

    if (this.enabled) {
      this.init();
    }
  }

  init() {
    if (this.mp3Path) {
      this.audioEl = new Audio(this.mp3Path);
      this.audioEl.loop = true;
    }

    if (this.openInviteBtn) {
      this.openInviteBtn.addEventListener("click", () => this.play(), { once: true });
    }
  }

  playSynthNote(freq) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.035, this.audioCtx.currentTime + 0.07);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.15);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 1.2);
  }

  play() {
    if (!this.enabled || this.isPlaying) return;

    if (this.audioEl) {
      this.audioEl.play().catch(() => {});
    } else {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      this.audioCtx = this.audioCtx || new AudioContextClass();
      this.audioCtx.resume();
      this.playSynthNote(this.melody[this.noteIndex++ % this.melody.length]);
      this.synthTimer = setInterval(() => {
        this.playSynthNote(this.melody[this.noteIndex++ % this.melody.length]);
      }, 680);
    }

    this.isPlaying = true;
  }
}