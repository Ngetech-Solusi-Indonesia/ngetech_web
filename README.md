# ngetech.studio

Website NgeTech dengan CMS mandiri dan server Node untuk VPS. Bahasa Indonesia + English.

## Menjalankan
Gunakan Node >=22.12 dan pnpm 11.10.0. Di Windows, workspace pada NTFS direkomendasikan untuk dependensi Node.

| Perintah | Fungsi |
|---|---|
| `pnpm install` | Pasang dependensi |
| `pnpm dev` | Website dan CMS lokal di port 4321 |
| `pnpm build` | Validasi konten awal dan build server Node |
| `pnpm start` | Jalankan server hasil build |
| `pnpm cms:user` | Buat/reset akun admin melalui terminal |
| `pnpm test` | Tes website dan CMS pada penyimpanan sementara terisolasi; jalankan build dahulu |
| `node scripts/assets.mjs` | Regenerasi gambar OG dari server yang aktif |

CMS: `/admin`, memakai username/password sendiri. Edit konten langsung tampil tanpa build ulang. Tidak ada autentikasi GitHub atau layanan Cloudflare dalam aplikasi ini.

Konten awal: `src/content/`. Konten aktif, gambar, akun, sesi, riwayat, dan audit disimpan pada `DATA_DIR` (default `./data`). Folder ini tidak ikut repository dan harus dipertahankan saat deployment.

Panduan: `docs/cms.md` untuk editor, `docs/vps.md` untuk deployment, `DESIGN.md` untuk desain. Variabel server ada di `.env.example`. Situs dapat dijalankan dengan Docker Compose atau Node + systemd di belakang reverse proxy HTTPS.
