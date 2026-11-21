/**
 * MODUL KONTROL ANIMASI (DIKONTROL LEWAT js/config.js)
 */
export class AnimationController {
  constructor(config) {
    this.config = config || { enabled: true, particleCount: 22 };
    this.isEnabled = Boolean(this.config.enabled);
    this.canvas = document.getElementById("goldParticlesCanvas");
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.particles = [];
    this.rafId = null;

    this.init();
  }

  init() {
    document.body.classList.toggle("anim-off", !this.isEnabled);

    if (!this.isEnabled) return;

    window.addEventListener("resize", () => this.resizeCanvas());
    this.resizeCanvas();
    this.setupScrollReveal();
    this.createParticles();
    this.animateParticles();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  createParticles() {
    if (!this.canvas) return;
    const count = this.config.particleCount || 22;
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      radius: Math.random() * 2 + 0.7,
      speedY: -(Math.random() * 0.38 + 0.12),
      speedX: (Math.random() - 0.5) * 0.24,
      alpha: Math.random() * 0.55 + 0.2
    }));
  }

  animateParticles() {
    if (!this.isEnabled || !this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y < -6) {
        p.y = this.canvas.height + 6;
        p.x = Math.random() * this.canvas.width;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(181, 148, 91, ${p.alpha})`;
      this.ctx.fill();
    }

    this.rafId = requestAnimationFrame(() => this.animateParticles());
  }

  setupScrollReveal() {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("is-hidden");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => {
      el.classList.add("is-hidden");
      observer.observe(el);
    });
  }
}