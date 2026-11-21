/**
 * MODUL HITUNG MUNDUR (COUNTDOWN)
 */
export function startCountdown(targetIsoDate) {
  const targetTimestamp = new Date(targetIsoDate).getTime();
  const elDays = document.getElementById("cdDays");
  const elHours = document.getElementById("cdHours");
  const elMinutes = document.getElementById("cdMinutes");
  const elSeconds = document.getElementById("cdSeconds");

  if (!elDays || !elHours || !elMinutes || !elSeconds) return;

  function render() {
    const remaining = Math.max(0, targetTimestamp - Date.now());
    elDays.textContent = Math.floor(remaining / 86400000);
    elHours.textContent = Math.floor((remaining % 86400000) / 3600000);
    elMinutes.textContent = Math.floor((remaining % 3600000) / 60000);
    elSeconds.textContent = Math.floor((remaining % 60000) / 1000);
  }

  render();
  setInterval(render, 1000);
}
