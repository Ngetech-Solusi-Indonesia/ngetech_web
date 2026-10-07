import { config, collection, singleton, fields } from '@keystatic/core';

// Every visible text has an Indonesian and an English version, edited side by side.
const bi = (label: string, opts: { multiline?: boolean; description?: string } = {}) =>
  fields.object(
    {
      id: fields.text({ label: 'Indonesia', multiline: opts.multiline, validation: { length: { min: 1 } } }),
      en: fields.text({ label: 'English', multiline: opts.multiline, validation: { length: { min: 1 } } }),
    },
    { label, description: opts.description, layout: [6, 6] },
  );

const biList = (label: string, itemLabel: string, length?: { min: number; max: number }) =>
  fields.array(bi(itemLabel), {
    label,
    itemLabel: (p) => p.fields.id.value || itemLabel,
    ...(length ? { validation: { length } } : {}),
  });

export default config({
  // Locally (`pnpm dev`) edits are written straight to the files. In production
  // they are committed to GitHub, which triggers a rebuild and deploy.
  // `pnpm cms:setup` runs dev in GitHub mode once to create the GitHub App.
  storage:
    import.meta.env.DEV && import.meta.env.PUBLIC_KEYSTATIC_STORAGE !== 'github'
      ? { kind: 'local' }
      : { kind: 'github', repo: { owner: 'Ngetech-Solusi-Indonesia', name: 'ngetech_web' } },

  ui: {
    brand: { name: 'NgeTech' },
    navigation: {
      Halaman: ['page', 'site'],
      Konten: ['products', 'team'],
    },
  },

  singletons: {
    site: singleton({
      label: 'Kontak & info perusahaan',
      path: 'src/content/site',
      format: { data: 'json' },
      schema: {
        waNumber: fields.text({
          label: 'Nomor WhatsApp',
          description: 'Format internasional tanpa + atau spasi, misalnya 6282188974105.',
          validation: { length: { min: 8 }, pattern: { regex: /^\d+$/, message: 'Angka saja, tanpa + atau spasi' } },
        }),
        email: fields.text({ label: 'Email kontak', validation: { length: { min: 3 } } }),
        legalName: fields.text({
          label: 'Nama badan hukum',
          description: 'Kosongkan selama belum terdaftar sebagai PT/CV. Footer memakai "NgeTech Solusi Indonesia".',
        }),
        githubOrg: fields.text({ label: 'Organisasi GitHub' }),
      },
    }),

    page: singleton({
      label: 'Teks halaman utama',
      path: 'src/content/page',
      format: { data: 'json' },
      schema: {
        meta: fields.object(
          {
            title: bi('Judul di Google', { description: 'Maksimal sekitar 60 karakter.' }),
            description: bi('Deskripsi di Google', { multiline: true, description: 'Maksimal sekitar 155 karakter.' }),
            ogAlt: bi('Teks alternatif gambar pratinjau (WhatsApp, media sosial)'),
          },
          { label: 'SEO' },
        ),
        hero: fields.object(
          {
            title: bi('Judul besar', { description: 'Usahakan muat 2 baris di desktop.' }),
            sub: bi('Kalimat di bawah judul', { multiline: true, description: 'Maksimal sekitar 20 kata.' }),
            cta: bi('Tombol WhatsApp'),
            secondary: bi('Tombol kedua'),
            demoNote: bi('Keterangan di bawah demo'),
          },
          { label: 'Bagian atas (hero)' },
        ),
        why: fields.object(
          {
            title: bi('Judul bagian'),
            items: fields.array(
              fields.object({ title: bi('Judul'), body: bi('Isi', { multiline: true }) }),
              {
                label: 'Empat keunggulan',
                description: 'Urutannya tetap: perangkat, datang ke lokasi, alur kerja, biaya.',
                itemLabel: (p) => p.fields.title.fields.id.value || 'Keunggulan',
                validation: { length: { min: 4, max: 4 } },
              },
            ),
            hw: biList('Label diagram perangkat', 'Label', { min: 4, max: 4 }),
            siteSteps: biList('Langkah "datang ke lokasi"', 'Langkah', { min: 1, max: 4 }),
            before: bi('Label "Sebelum"'),
            beforeItems: biList('Isi "Sebelum"', 'Item', { min: 1, max: 4 }),
            after: bi('Label "Sesudah"'),
            afterItem: bi('Isi "Sesudah"'),
          },
          { label: 'Keunggulan' },
        ),
        projects: fields.object(
          {
            title: bi('Judul bagian'),
            sub: bi('Kalimat pembuka'),
            shotNote: bi('Catatan di bawah screenshot'),
            colFor: bi('Label "Untuk"'),
          },
          { label: 'Bagian produk' },
        ),
        team: fields.object(
          { title: bi('Judul bagian'), sub: bi('Kalimat pembuka', { multiline: true }) },
          { label: 'Bagian tim' },
        ),
        contact: fields.object(
          {
            title: bi('Judul'),
            body: bi('Isi', { multiline: true }),
            cta: bi('Tombol WhatsApp'),
            waText: bi('Pesan awal WhatsApp', { description: 'Teks yang otomatis terisi saat pengunjung membuka WhatsApp.' }),
            waWho: bi('Siapa yang menjawab WhatsApp'),
            orEmail: bi('Teks sebelum email'),
            emailWho: bi('Siapa yang membalas email'),
            location: bi('Lokasi'),
          },
          { label: 'Kontak (bagian bawah)' },
        ),
      },
    }),
  },

  collections: {
    products: collection({
      label: 'Produk',
      path: 'src/content/products/*',
      format: { data: 'json' },
      slugField: 'name',
      columns: ['status', 'order'],
      schema: {
        name: fields.slug({
          name: { label: 'Nama produk (Indonesia)' },
          slug: { label: 'Kunci', description: 'Jangan diubah untuk produk yang sudah ada.' },
        }),
        nameEn: fields.text({ label: 'Nama produk (English)' }),
        order: fields.integer({ label: 'Urutan', description: 'Angka kecil tampil lebih dulu. Produk pertama tampil besar.', defaultValue: 10 }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Dipakai klien', value: 'in_use' },
            { label: 'Uji coba internal', value: 'internal_testing' },
            { label: 'Dalam pengembangan', value: 'in_development' },
          ],
          defaultValue: 'in_development',
        }),
        screenshot: fields.image({
          label: 'Screenshot',
          description: 'Rasio 16:10, lebar minimal 1600 px. Gunakan screenshot asli dengan data contoh.',
          directory: 'src/assets/products',
          publicPath: '/src/assets/products/',
          validation: { isRequired: true },
        }),
        alt: bi('Deskripsi screenshot (untuk tunanetra dan Google)'),
        desc: bi('Deskripsi singkat', { multiline: true }),
        for: bi('Untuk siapa'),
        points: biList('Poin fitur', 'Poin', { min: 1, max: 5 }),
      },
    }),

    team: collection({
      label: 'Tim',
      path: 'src/content/team/*',
      format: { data: 'json' },
      slugField: 'name',
      columns: ['order', 'email'],
      schema: {
        name: fields.slug({
          name: { label: 'Nama lengkap' },
          slug: { label: 'Alamat profil', description: 'Dipakai di /tim/<alamat>/. Mengubahnya akan memutus link lama.' },
        }),
        short: fields.text({ label: 'Nama panggilan' }),
        order: fields.integer({ label: 'Urutan', defaultValue: 10 }),
        role: bi('Peran'),
        email: fields.text({ label: 'Email', validation: { length: { min: 3 } } }),
        github: fields.text({ label: 'Username GitHub', description: 'Kosongkan kalau tidak ada.' }),
        whatsapp: fields.checkbox({ label: 'Menjawab WhatsApp NgeTech', description: 'Menampilkan tombol WhatsApp di profilnya.' }),
        work: fields.array(
          fields.object({
            product: fields.relationship({ label: 'Produk', collection: 'products', validation: { isRequired: true } }),
            summary: bi('Yang dikerjakan', { multiline: true }),
          }),
          {
            label: 'Yang dikerjakan di NgeTech',
            itemLabel: (p) => p.fields.product.value ?? 'Pekerjaan',
          },
        ),
      },
    }),
  },
});
