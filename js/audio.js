export class MusicController {
  constructor(config = {}) {
    this.config = config;
    this.isPlaying = false;
    this.wasPlayingBeforeHide = false;

    if (!this.config.enabled || !this.config.mp3Path) return;

    this.audio = new Audio(this.config.mp3Path);
    this.audio.loop = true;
    this.audio.preload = "auto";
    this.audio.volume = 0.85;

    this.createToggleButton();
    this.bindEvents();
  }

  createToggleButton() {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "musicToggleBtn";
    btn.setAttribute("aria-label", "Toggle background music");
    btn.title = "Play / Pause Music";

    Object.assign(btn.style, {
      position: "fixed",
      right: "16px",
      bottom: "16px",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      border: "1px solid #b5945b",
      backgroundColor: "rgba(248, 243, 232, 0.92)",
      color: "#8e6f3e",
      display: "none",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 14px rgba(63, 60, 53, 0.16)",
      cursor: "pointer",
      zIndex: "40",
      backdropFilter: "blur(4px)",
      transition: "transform 0.2s ease, opacity 0.2s ease"
    });

    this.toggleBtn = btn;
    this.updateButtonIcon();
    document.body.appendChild(btn);
  }

  updateButtonIcon() {
    if (!this.toggleBtn) return;
    if (this.isPlaying) {
      this.toggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>`;
    } else {
      this.toggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>`;
    }
  }

  async play() {
    if (!this.audio) return;
    try {
      await this.audio.play();
      this.isPlaying = true;
      if (this.toggleBtn) this.toggleBtn.style.display = "inline-flex";
      this.updateButtonIcon();
    } catch (err) {
      if (this.toggleBtn) this.toggleBtn.style.display = "inline-flex";
      this.isPlaying = false;
      this.updateButtonIcon();
    }
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.updateButtonIcon();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  bindEvents() {
    const openBtn = document.getElementById("openInviteBtn");
    if (openBtn) {
      openBtn.addEventListener("click", () => {
        if (!this.isPlaying) this.play();
      });
    }

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener("click", () => this.toggle());
    }

    // Jeda otomatis saat tamu menutup tab / mengunci layar HP
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.wasPlayingBeforeHide = this.isPlaying;
        if (this.isPlaying) this.pause();
      } else if (this.wasPlayingBeforeHide) {
        this.play();
      }
    });
  }
}