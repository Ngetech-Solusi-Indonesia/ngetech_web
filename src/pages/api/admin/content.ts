import type { APIRoute } from 'astro';
import { z } from 'zod';
import { appendFileSync } from 'node:fs';
import { join } from 'node:path';
import { readContent, saveContent, ConflictError, dataDir } from '../../../server/store';
import { boundedBody, json } from '../../../server/http';
import { pageSchema, siteSchema, productSchema, teamSchema } from '../../../server/schema';
import { productImage } from '../../../data/content';
import { existsSync } from 'node:fs';
const requestSchema = z.object({ section: z.enum(['page', 'site', 'products', 'team']), slug: z.string().optional(), revision: z.number().int().nonnegative(), action: z.enum(['save', 'create', 'delete']).default('save'), data: z.unknown().optional() });
export const GET: APIRoute = () => json(readContent());
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const input = requestSchema.parse(JSON.parse(new TextDecoder().decode(await boundedBody(request, 256 * 1024))));
    const state = structuredClone(readContent());
    if (input.section === 'page' || input.section === 'site') {
      if (input.action !== 'save') return json({ error: 'Bagian ini tidak bisa dihapus atau ditambah.' }, 400);
      if (input.section === 'page') state.page = pageSchema.parse(input.data);
      else state.site = siteSchema.parse(input.data);
    } else {
      const list = input.section === 'products' ? state.products : state.team;
      const index = list.findIndex(item => item.slug === input.slug);
      if (input.action === 'delete') {
        if (index < 0) return json({ error: 'Konten tidak ditemukan.' }, 404);
        list.splice(index, 1);
      } else {
        const item = input.section === 'products' ? productSchema.parse(input.data) : teamSchema.parse(input.data);
        if ('screenshot' in item) {
          if (item.screenshot.startsWith('/media/')) {
            if (!existsSync(join(dataDir(), 'media', item.screenshot.slice('/media/'.length)))) return json({ error: 'Screenshot belum diunggah.' }, 400);
          } else {
            try { productImage(item.screenshot); } catch { return json({ error: 'Screenshot tidak ditemukan. Unggah gambar dari CMS.' }, 400); }
          }
        }
        if (input.action === 'create') {
          if (list.some(existing => existing.slug === item.slug)) return json({ error: 'Alamat ini sudah digunakan.' }, 409);
          (list as unknown[]).push(item);
        } else {
          if (index < 0) return json({ error: 'Konten tidak ditemukan.' }, 404);
          if (item.slug !== input.slug) return json({ error: 'Alamat konten yang sudah ada tidak boleh diubah.' }, 400);
          (list as unknown[])[index] = item;
        }
      }
    }
    const saved = saveContent(state, input.revision);
    // Content has already committed; audit failure must not report a false save failure.
    try { appendFileSync(join(dataDir(), 'audit.jsonl'), JSON.stringify({ time: new Date().toISOString(), user: locals.admin, section: input.section, slug: input.slug, action: input.action, revision: saved.revision }) + '\n', { mode: 0o600 }); } catch (error) { console.error('CMS audit write failed:', (error as Error).message); }
    return json({ revision: saved.revision, message: 'Perubahan tersimpan dan langsung tampil di website.' });
  } catch (error) {
    if (error instanceof ConflictError) return json({ error: error.message }, 409);
    if (error instanceof z.ZodError) return json({ error: error.issues.map(issue => issue.message).join(' ') }, 400);
    if (error instanceof SyntaxError) return json({ error: 'Data belum valid.' }, 400);
    console.error('CMS save failed:', (error as Error).message);
    return json({ error: 'Gagal menyimpan. Periksa izin folder data pada server.' }, 500);
  }
};
