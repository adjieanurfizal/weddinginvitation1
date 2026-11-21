/**
 * MODUL LOADER ASET LATAR BELAKANG PER KOTAK
 */
export function loadDecorationAssets(assetConfig, isAnimEnabled = true) {
  const cardSlots = document.querySelectorAll("[data-card-bg]");
  const activeSrc = (isAnimEnabled && assetConfig.animatedBackgroundTemplate)
    ? assetConfig.animatedBackgroundTemplate
    : assetConfig.fullBackgroundTemplate;

  if (!activeSrc) {
    document.body.classList.remove("use-full-template");
    return;
  }

  // Aktifkan mode aset penuh (sembunyikan bingkai garis CSS)
  document.body.classList.add("use-full-template");

  const isVideo = activeSrc.endsWith(".mp4") || activeSrc.endsWith(".webm");

  cardSlots.forEach((slot) => {
    if (isVideo) {
      slot.innerHTML = `<video src="${activeSrc}" autoplay loop muted playsinline></video>`;
      return;
    }

    const img = document.createElement("img");
    img.alt = "";
    img.src = activeSrc;

    // Cadangan otomatis jika ekstensi file di folder assets berbeda (.jpeg / .png)
    let fallbackStep = 0;
    img.onerror = () => {
      const basePath = activeSrc.replace(/\.(jpg|jpeg|png|webp)$/i, "");
      const alternatives = [`${basePath}.jpeg`, `${basePath}.png`, `${basePath}.jpg`];
      if (fallbackStep < alternatives.length) {
        img.src = alternatives[fallbackStep++];
      } else {
        console.warn("File aset latar tidak ditemukan:", activeSrc);
        document.body.classList.remove("use-full-template");
      }
    };

    slot.innerHTML = "";
    slot.appendChild(img);
  });
}