import { z } from 'zod';
const text = z.string().trim().min(1, 'Teks wajib diisi.').max(6000, 'Teks terlalu panjang.');
export const biSchema = z.object({ id: text, en: text });
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Alamat hanya boleh berisi huruf kecil, angka, dan tanda hubung.').max(80);
export const pageSchema = z.object({
  meta: z.object({ title: biSchema, description: biSchema, ogAlt: biSchema }),
  hero: z.object({ title: biSchema, sub: biSchema, cta: biSchema, secondary: biSchema, demoNote: biSchema }),
  why: z.object({
    title: biSchema,
    items: z.array(z.object({ title: biSchema, body: biSchema })).length(4),
    hw: z.array(biSchema).length(4),
    before: biSchema, after: biSchema, afterItem: biSchema,
    beforeItems: z.array(biSchema).min(1).max(4),
    siteSteps: z.array(biSchema).min(1).max(4),
  }),
  projects: z.object({ title: biSchema, sub: biSchema, shotNote: biSchema, colFor: biSchema }),
  team: z.object({ title: biSchema, sub: biSchema }),
  contact: z.object({ title: biSchema, body: biSchema, cta: biSchema, waText: biSchema, orEmail: biSchema, location: biSchema, waWho: biSchema, emailWho: biSchema }),
});
export const siteSchema = z.object({
  waNumber: z.string().regex(/^\d{8,16}$/, 'Nomor WhatsApp harus 8–16 angka, tanpa + atau spasi.'),
  email: z.email('Email belum valid.').max(200),
  legalName: z.string().trim().max(200).optional(),
  githubOrg: z.string().regex(/^[a-zA-Z0-9-]{1,80}$/, 'Nama organisasi belum valid.'),
});
export const productSchema = z.object({
  slug, name: text.max(160), nameEn: text.max(160), order: z.number().int().min(0).max(9999),
  status: z.enum(['in_use', 'internal_testing', 'in_development']),
  screenshot: z.string().regex(/^\/(?:src\/assets\/products\/[a-zA-Z0-9_/-]+\.(?:webp|png|jpe?g|avif)|media\/[a-f0-9-]{36}\.webp)$/, 'Pilih screenshot yang diunggah dari CMS.'),
  alt: biSchema, desc: biSchema, for: biSchema, points: z.array(biSchema).min(1).max(5),
});
export const teamSchema = z.object({
  slug, name: text.max(160), short: text.max(80), order: z.number().int().min(0).max(9999), role: biSchema,
  email: z.email('Email anggota belum valid.').max(200),
  github: z.string().regex(/^(?:[a-zA-Z0-9-]{1,80})?$/, 'Username GitHub belum valid.').optional(),
  whatsapp: z.boolean().optional(),
  work: z.array(z.object({ product: slug, summary: biSchema })).max(30),
});
export const contentSchema = z.object({
  revision: z.number().int().nonnegative(), page: pageSchema, site: siteSchema,
  products: z.array(productSchema).min(1).max(50), team: z.array(teamSchema).min(1).max(50),
}).superRefine((value, ctx) => {
  for (const key of ['products', 'team'] as const) {
    if (new Set(value[key].map(item => item.slug)).size !== value[key].length) ctx.addIssue({ code: 'custom', path: [key], message: 'Alamat harus unik.' });
  }
  const products = new Set(value.products.map(item => item.slug));
  for (const member of value.team) for (const work of member.work) {
    if (!products.has(work.product)) ctx.addIssue({ code: 'custom', path: ['team'], message: `Produk ${work.product} masih dirujuk profil tim. Perbarui profilnya dahulu.` });
  }
});
export type Content = z.infer<typeof contentSchema>;
export type ProductDoc = z.infer<typeof productSchema>;
export type TeamDoc = z.infer<typeof teamSchema>;
export type SiteDoc = z.infer<typeof siteSchema>;
export type Bi = z.infer<typeof biSchema>;
export type Status = ProductDoc['status'];
