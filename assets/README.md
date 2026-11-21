# Panduan Aset & Menjalankan Projek Undangan Digital

## Struktur Folder
- `index.html` : Struktur utama undangan (mobile-first).
- `css/` : Terpisah menjadi `tokens.css` (warna & font), `layout.css` (tata letak mobile), dan `animations.css` (animasi & mode `.anim-off`).
- `js/` : Terpisah per tanggung jawab (`config.js`, `assets.js`, `animations.js`, `countdown.js`, `audio.js`, `rsvp.js`, `main.js`).
- `assets/` : Tempat menyimpan file gambar `.png` transparan dan audio `.mp3`.

## Cara Memasang Aset Gambar dari Gemini Image
1. Simpan gambar bunga sudut kiri atas (hapus background menjadi PNG transparan) sebagai `assets/floral-tl.png`.
2. Simpan gambar bunga sudut kanan bawah (PNG transparan) sebagai `assets/floral-br.png`.
3. Buka `js/config.js` lalu isi:
   ```js
   floralTopLeft: "assets/floral-tl.png",
   floralBottomRight: "assets/floral-br.png",
   ```

## Cara Menjalankan di Lokal
Karena memakai JavaScript ES Modules (`type="module"`), jalankan melalui server lokal seperti ekstensi **Live Server** di VS Code (jangan klik dua kali `file://` langsung).

## Link Preview untuk Klien
- Versi Animasi Nyala: `https://domainanda.com/?to=Nama+Tamu&anim=on`
- Versi Tanpa Animasi: `https://domainanda.com/?to=Nama+Tamu&anim=off`
