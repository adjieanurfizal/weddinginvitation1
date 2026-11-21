export const INVITATION_CONFIG = {
  animation: {
    enabled: true,      // true = Animasi ON, false = Statis OFF
    particleCount: 22
  },

  music: {
    enabled: true,      // true = Musik ON saat "Buka Undangan" diklik, false = Musik OFF
    mp3Path: ""         // Isi "assets/music.mp3" jika memakai file lagu sendiri
  },

  assets: {
    // Sesuaikan dengan nama file gambar di folder assets/
    fullBackgroundTemplate: "assets/bg-template.jpg",

    // Opsional: isi "assets/bg-template.gif" jika memakai GIF saat animation.enabled = true
    animatedBackgroundTemplate: ""
  },

  event: {
    coupleShortName: "Alya & Ijlal",
    brideFullName: "Alya Anantha Diahsaputri",
    groomFullName: "Muhammed Ijlal Basha",
    targetIsoDate: "2026-12-26T09:00:00+07:00"
  }
};