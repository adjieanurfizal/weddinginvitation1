/**
 * MODUL INTERAKSI TAMU: NAMA TAMU URL, RSVP WHATSAPP & SALIN REKENING
 */
export function initGuestRecipient() {
  const params = new URLSearchParams(window.location.search);
  const to = params.get("to");
  const guestEl = document.getElementById("guestName");
  if (to && guestEl) {
    guestEl.textContent = to;
  }
}

export function initRSVPForm(eventConfig) {
  const form = document.getElementById("rsvpForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("rname").value.trim();
    const attendance = document.getElementById("attendance").value;
    const guests = document.getElementById("guests").value;
    const wish = document.getElementById("wish").value.trim();

    const text = [
      `RSVP Pernikahan ${eventConfig.brideFullName} & ${eventConfig.groomFullName}`,
      `Nama: ${name}`,
      `Kehadiran: ${attendance}`,
      `Jumlah: ${guests}`,
      `Ucapan: ${wish || "-"}`
    ].join("\n");

    if (navigator.share) {
      navigator.share({
        title: `RSVP ${eventConfig.coupleShortName}`,
        text
      }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }
  });
}

export function initWeddingGift(giftConfig) {
  const bankEl = document.getElementById("bankName");
  const accEl = document.getElementById("accountNumber");
  const holderEl = document.getElementById("accountHolder");
  const copyBtn = document.getElementById("copyAccountBtn");

  if (bankEl) bankEl.textContent = giftConfig.bankName;
  if (accEl) accEl.textContent = giftConfig.accountNumber;
  if (holderEl) holderEl.textContent = giftConfig.accountHolder;

  if (copyBtn && accEl) {
    copyBtn.addEventListener("click", () => {
      const value = accEl.textContent.trim();
      if (value.startsWith("[")) {
        alert("Nomor rekening belum diisi di file js/config.js.");
        return;
      }
      navigator.clipboard.writeText(value).then(() => {
        alert("Nomor rekening berhasil disalin.");
      });
    });
  }
}
