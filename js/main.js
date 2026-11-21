import { INVITATION_CONFIG, createGuestSignature } from "./config.js";
import { loadDecorationAssets } from "./assets.js";
import { AnimationController } from "./animations.js";
import { startCountdown } from "./countdown.js";
import { MusicController } from "./audio.js";

function initGuestRecipient() {
  const params = new URLSearchParams(window.location.search);
  const rawName = params.get("to");
  const signature = params.get("s");

  if (!rawName || !rawName.trim() || !signature) return;

  const cleanName = rawName.trim();
  const expectedSignature = createGuestSignature(cleanName);

  if (signature !== expectedSignature) return;

  document.querySelectorAll("[data-guest-name]").forEach((el) => {
    el.textContent = cleanName;
  });
}

function initCoverUnlock() {
  const openBtn = document.getElementById("openInviteBtn");
  const firstCard = document.getElementById("home");

  if (!openBtn) return;

  openBtn.addEventListener("click", () => {
    document.body.classList.remove("is-locked");
    if (firstCard) {
      firstCard.scrollIntoView({ behavior: "smooth" });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const animController = new AnimationController(INVITATION_CONFIG.animation);
  loadDecorationAssets(INVITATION_CONFIG.assets, animController.isEnabled);
  initGuestRecipient();
  initCoverUnlock();
  startCountdown(INVITATION_CONFIG.event.targetIsoDate);
  new MusicController(INVITATION_CONFIG.music);
});