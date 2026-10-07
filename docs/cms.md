# Mengelola website melalui CMS

CMS berada di `/admin`. Login memakai username dan password sendiri. Konten tersimpan pada server VPS dan langsung tampil setelah disimpan; tidak membutuhkan akun GitHub, Cloudflare, commit, atau build ulang.

## Pertama kali di komputer lokal
1. Pasang dependensi: `pnpm install`.
2. Jika menggunakan `.env` dari contoh, atur `CMS_COOKIE_SECURE=false` untuk HTTP lokal. Jalankan `pnpm dev` dan buka `http://127.0.0.1:4321/admin`.
3. Jika akun belum ada, halaman lokal menampilkan **Buat akun admin**. Isi username dan password minimal 12 karakter, lalu login.
4. Menu **Halaman utama**, **Kontak perusahaan**, **Produk**, dan **Tim** berisi form yang bisa diedit. Isi Indonesia dan English, lalu tekan **Simpan perubahan**.

Setup melalui browser hanya tersedia pada dev server localhost dan otomatis tertutup setelah akun dibuat. Di VPS, akun awal dibuat dari terminal dengan `npm run cms:user`; perintah tersebut menyembunyikan password saat diketik. Menjalankan ulang perintah dapat mereset akun/password dan mengakhiri semua sesi sebelumnya.

## Mengedit konten
- Halaman utama: judul, deskripsi, keunggulan, teks kontak, dan SEO.
- Kontak: nomor WhatsApp, email, nama badan hukum, dan tautan organisasi GitHub sebagai informasi perusahaan.
- Produk: tambah/edit/hapus, status, urutan, fitur, dan upload screenshot.
- Tim: tambah/edit/hapus, kontak, peran, dan pekerjaan per produk. Profil baru otomatis tersedia dalam dua bahasa.
- Screenshot: JPG, PNG, WebP, atau AVIF maksimal 10 MB / 40 megapiksel; CMS membuat WebP secara otomatis.
- Alamat produk/profil yang sudah ada dikunci agar tautan lama tidak berubah.
- Produk yang masih dirujuk profil tim harus dilepas dari profil tersebut sebelum dapat dihapus.
- Bila konten telah berubah dari tab lain, editor menolak penyimpanan versi lama. Muat ulang halaman dan ulangi perubahan.
- Teks antarmuka demo tetap berada di `src/i18n/*.json`.

## Penyimpanan dan backup
`DATA_DIR` menentukan folder data permanen. Default lokal: `./data`.
- `content.json`: konten aktif.
- `media/`: screenshot hasil upload.
- `history/`: salinan konten sebelum setiap perubahan.
- `admin.json`: username dan hash password scrypt.
- `sessions.json`: sesi login yang disimpan sebagai hash token.
- `audit.jsonl`: catatan perubahan.

Backup seluruh folder ini, bukan hanya `content.json`. Jangan menaruh DATA_DIR di folder publik atau menghapus volume saat mengganti versi aplikasi. Password dan sesi tidak ikut repository. Sesi berakhir setelah delapan jam; Keluar membatalkan sesi saat ini. CMS menggunakan satu proses Node, agar pembaruan konten dan sesi tetap terserialisasi.

## VPS
Lihat `docs/vps.md`. Aplikasi memakai adapter Node standalone. `/keystatic` diarahkan ke `/admin` untuk membantu pengguna tautan lama.
