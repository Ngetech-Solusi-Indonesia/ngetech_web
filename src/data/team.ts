// Team and what each person has worked on. The "work" entries are
// summarised from each person's own commits in the org repos; nothing
// here is a claim the history doesn't support.
import type { Locale } from '../i18n';

type L = Record<Locale, string>;
export type ProductKey = 'inventory' | 'ngebooth' | 'rfid';

export interface Member {
  slug: string;
  name: string;
  short: string;
  role: L;
  email: string;
  github?: string;
  whatsapp?: boolean; // answers the site's WhatsApp line
  work: { product: ProductKey; summary: L }[];
}

export const team: Member[] = [
  {
    slug: 'daniandra-prayudisty',
    name: 'Daniandra Prayudisty',
    short: 'Dani',
    role: { id: 'CEO', en: 'CEO' },
    email: 'daniandra@ngetech.studio',
    whatsapp: true,
    work: [],
  },
  {
    slug: 'muhammad-farhan-al-hasan',
    name: 'Muhammad Farhan Al Hasan',
    short: 'Farhan',
    role: { id: 'CTO', en: 'CTO' },
    email: 'farhanlhsn@ngetech.studio',
    github: 'farhanlhsn',
    work: [
      {
        product: 'ngebooth',
        summary: {
          id: 'Arsitektur dan sebagian besar kode platform: editor booth, filter warna, galeri dengan passcode, analitik pendapatan, langganan vendor, keamanan, dan pengujian otomatis.',
          en: 'Architecture and most of the platform code: the booth editor, colour filters, passcode gallery, revenue analytics, vendor subscriptions, security and automated tests.',
        },
      },
      {
        product: 'inventory',
        summary: {
          id: 'Migrasi ke PostgreSQL, pencatatan jasa, laba harian di dashboard, backup database otomatis, dan deployment dengan Docker.',
          en: 'Migration to PostgreSQL, service records, daily profit on the dashboard, automated database backups and Docker deployment.',
        },
      },
      {
        product: 'rfid',
        summary: {
          id: 'Jadwal pelajaran untuk beberapa hari sekaligus, dari backend sampai form, dan layout yang responsif.',
          en: 'Multi-day class schedules from backend to forms, and the responsive layout.',
        },
      },
    ],
  },
  {
    slug: 'ali-hizqil',
    name: 'Ali Hizqil',
    short: 'Ali',
    role: { id: 'Desainer', en: 'Designer' },
    email: 'ali@ngetech.studio',
    github: 'alihizqils',
    work: [
      {
        product: 'ngebooth',
        summary: {
          id: 'Desain dan UI dashboard admin dan super admin, landing page, alur registrasi, manajemen booth, dan halaman analitik.',
          en: 'Design and UI for the admin and super-admin dashboards, landing page, sign-up flow, booth management and analytics pages.',
        },
      },
      {
        product: 'rfid',
        summary: {
          id: 'Tampilan kehadiran, mata pelajaran, dan guru, termasuk pencarian, filter, dan set ikon.',
          en: 'Attendance, subject and teacher screens, including search, filters and the icon set.',
        },
      },
    ],
  },
  {
    slug: 'athallah-zacky-maulana',
    name: 'Athallah Zacky Maulana',
    short: 'Zacky',
    role: { id: 'Developer', en: 'Developer' },
    email: 'zacky@ngetech.studio',
    github: 'zazazaxky-m',
    work: [
      {
        product: 'rfid',
        summary: { id: 'Menyiapkan kode dasar proyek.', en: 'Set up the project base code.' },
      },
      {
        product: 'inventory',
        summary: { id: 'Menyiapkan repositori awal.', en: 'Set up the initial repository.' },
      },
      {
        product: 'ngebooth',
        summary: {
          id: 'Menyiapkan repositori awal dan menggabungkan pembaruan pengalaman booth.',
          en: 'Set up the initial repository and merged the booth experience upgrade.',
        },
      },
    ],
  },
  {
    slug: 'ulinnuha-ubay',
    name: 'Ulinnuha Ubay',
    short: 'Ubay',
    role: { id: 'Developer', en: 'Developer' },
    email: 'ubay@ngetech.studio',
    work: [
      {
        product: 'inventory',
        summary: {
          id: 'Perhitungan harga beli rata-rata dan laba, pencegahan stok minus, fitur piutang manual, dan perbaikan pencatatan piutang.',
          en: 'Average purchase price and profit calculation, negative-stock prevention, manual receivables and fixes to receivable records.',
        },
      },
      {
        product: 'rfid',
        summary: {
          id: 'Halaman jadwal, halaman masuk, dan menu akun di sidebar.',
          en: 'Schedule page, sign-in page and the account menu in the sidebar.',
        },
      },
      {
        product: 'ngebooth',
        summary: { id: 'Perbaikan batas waktu sesi.', en: 'Fixed the session time limit.' },
      },
    ],
  },
];

export function profilePath(locale: Locale, slug: string): string {
  return locale === 'id' ? `/tim/${slug}/` : `/en/team/${slug}/`;
}
