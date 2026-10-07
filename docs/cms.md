# Mengedit isi situs (Keystatic)

Isi situs diedit lewat **https://ngetech.studio/keystatic**. Setiap kali Anda menekan **Save**, Keystatic membuat commit ke repo `Ngetech-Solusi-Indonesia/ngetech_web`, lalu Cloudflare membangun ulang dan menayangkan situs dalam ±1–2 menit. Tidak perlu terminal atau redeploy manual.

## Yang bisa diedit

| Menu | Isi |
|---|---|
| **Teks halaman utama** | Judul, teks hero, empat keunggulan, judul tiap bagian, kontak, dan teks SEO (judul & deskripsi di Google). Setiap teks punya kolom Indonesia dan English berdampingan. |
| **Kontak & info perusahaan** | Nomor WhatsApp, email kontak, nama badan hukum (kosongkan selama belum PT/CV), organisasi GitHub. |
| **Produk** | Nama, status, screenshot, deskripsi, poin fitur, urutan. Produk dengan urutan terkecil tampil besar. |
| **Tim** | Nama, peran, email, GitHub, apakah menjawab WhatsApp, dan daftar "yang dikerjakan" per produk. Tiap anggota otomatis punya halaman profil di `/tim/<alamat>/`. |

Teks tampilan demo interaktif (tabel stok, absensi, NgeBooth) tetap di kode (`src/i18n/*.json`), karena itu bagian dari antarmuka, bukan konten.

Tips:
- **Screenshot**: rasio 16:10, lebar minimal 1600 px. Ukuran dan format WebP dibuat otomatis saat build.
- **Judul di Google** ±60 karakter, **deskripsi** ±155 karakter.
- Mengubah **Alamat profil** anggota tim atau **Kunci** produk akan memutus link lama; biarkan kecuali memang perlu.

## Setup sekali (oleh admin repo)

Situs dideploy ke **Cloudflare Workers** (adapter Astro untuk Cloudflare). Bagian statis tetap statis; hanya `/keystatic` yang berjalan di server.

### 1. Hubungkan repo ke Cloudflare
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository** → pilih `Ngetech-Solusi-Indonesia/ngetech_web`.
2. Build command: `pnpm build` · Deploy command: `npx wrangler deploy`.
3. Tambahkan domain `ngetech.studio` di **Settings → Domains & Routes**.

### 2. Buat GitHub App untuk Keystatic
Di komputer yang sudah clone repo ini:
```bash
pnpm install
pnpm cms:setup
```
Buka http://localhost:4321/keystatic, ikuti tombol **Create GitHub App**, pilih organisasi `Ngetech-Solusi-Indonesia`. Keystatic akan menulis `.env` berisi empat nilai (lihat `.env.example`). File `.env` tidak ikut di-commit.

Lalu di pengaturan GitHub App tersebut (GitHub → Settings → Developer settings → GitHub Apps):
- **Callback URL**: tambahkan `https://ngetech.studio/api/keystatic/github/oauth/callback`
- **Install** app ke repo `ngetech_web`.

### 3. Isi variabel di Cloudflare
Di Worker `ngetech-web` → **Settings → Variables and Secrets**:
- Secret: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`
- **Build** variable: `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`

Deploy ulang sekali. Setelah itu siapa pun di tim yang punya akses ke repo bisa login di `/keystatic` dengan akun GitHub-nya.

## Mengedit secara lokal
`pnpm dev` lalu buka http://localhost:4321/keystatic. Perubahan langsung ditulis ke file di `src/content/`; commit dan push seperti biasa.
