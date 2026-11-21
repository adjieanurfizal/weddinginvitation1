import { INVITATION_CONFIG } from "./config.js";
import { loadDecorationAssets } from "./assets.js";
import { AnimationController } from "./animations.js";
import { startCountdown } from "./countdown.js";
import { MusicController } from "./audio.js";

function initGuestRecipient() {
  const params = new URLSearchParams(window.location.search);
  const to = params.get("to");
  const guestEl = document.getElementById("guestName");
  if (to && guestEl) {
    guestEl.textContent = to;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const animController = new AnimationController(INVITATION_CONFIG.animation);
  loadDecorationAssets(INVITATION_CONFIG.assets, animController.isEnabled);
  initGuestRecipient();
  startCountdown(INVITATION_CONFIG.event.targetIsoDate);
  new MusicController(INVITATION_CONFIG.music);
});