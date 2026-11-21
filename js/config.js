export const INVITATION_CONFIG = {
  animation: {
    enabled: true,      // true = Animasi ON, false = Statis OFF
    particleCount: 22
  },

  music: {
    enabled: true,      // true = Musik ON saat "Open Invitation" diklik, false = Musik OFF
    mp3Path: ""         // Isi "assets/music.mp3" jika memakai file lagu sendiri
  },

  assets: {
    fullBackgroundTemplate: "assets/bg-template.jpg",
    animatedBackgroundTemplate: ""
  },

  event: {
    coupleShortName: "Alya & Ijlal",
    brideFullName: "Alya Anantha Diahsaputri",
    groomFullName: "Muhammed Ijlal Basha",
    targetIsoDate: "2027-01-08T10:00:00+05:30"
  },

  generator: {
    pin: "222666",
    secretKey: "alya-ijlal-vip-2027"
  }
};

export function createGuestSignature(guestName) {
  const secret = INVITATION_CONFIG.generator?.secretKey || "";
  const input = `${secret}::${guestName.trim().toLowerCase()}`;
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;

  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0");
}