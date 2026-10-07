# Deployment pada VPS sendiri

## Docker Compose
Dibutuhkan Docker dengan Compose, domain yang mengarah ke VPS, serta reverse proxy HTTPS. Dari folder proyek:

```sh
cp .env.example .env
# Isi PUBLIC_SITE_URL dengan domain HTTPS Anda.
docker compose up -d --build
docker compose exec web npm run cms:user
```

Aplikasi mendengarkan port 3000 yang dipublikasikan hanya pada localhost VPS. Gunakan contoh `deploy/nginx-location.conf` dalam server block HTTPS domain Anda. Buka `https://domain-anda/admin` dan login. Compose menetapkan cookie Secure untuk HTTPS.

Data CMS disimpan pada named volume `ngetech-data`. `docker compose up -d --build` mempertahankannya. Jangan menjalankan `docker compose down -v` kecuali memang bermaksud menghapus seluruh data. Backup volume sebelum perubahan besar.

## Node + systemd
Gunakan Node.js >=22.12 (disarankan 24 LTS) dan pnpm 11.10.0. Siapkan pengguna sistem `ngetech`, proyek di `/opt/ngetech`, dan folder `/var/lib/ngetech` milik pengguna tersebut.

```sh
pnpm install --frozen-lockfile
cp .env.example .env
# Isi PUBLIC_SITE_URL, DATA_DIR=/var/lib/ngetech, CMS_COOKIE_SECURE=true.
pnpm build
npm run cms:user
```

Jalankan pembuatan akun dengan pengguna aplikasi dan DATA_DIR yang sama. Pasang contoh `deploy/ngetech.service`, sesuaikan path Node bila berbeda, lalu aktifkan servicenya. Gunakan reverse proxy HTTPS yang sama. Jangan memakai mode cluster atau beberapa proses yang menulis folder data bersama.

## Sesudah update
Build dan restart aplikasi; isi konten di DATA_DIR tetap dipertahankan. Konten baru dari CMS tidak membutuhkan rebuild. File `src/content` hanya menjadi konten awal ketika belum ada `content.json`; build tidak menimpa konten aktif.

## Pemeriksaan
- `/health` mengembalikan status ok saat aplikasi dan konten dapat dibaca.
- `/admin` mengarahkan pengguna yang belum login ke halaman login.
- Login tidak menerima permintaan lintas origin; reverse proxy harus meneruskan Host dan skema HTTPS dengan benar.
- Upload, konten, akun, dan sesi tersimpan di volume/folder yang sama setelah restart.
- Port aplikasi tidak perlu dibuka ke internet; reverse proxy menerima koneksi publik.

Paket deployment ini disiapkan dan diuji secara lokal. Deployment pada VPS Anda belum dijalankan.
