import type { APIRoute } from 'astro';
import { randomUUID } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { dataDir } from '../../../server/store';
import { boundedBody, json } from '../../../server/http';
export const POST: APIRoute = async ({ request }) => {
  try {
    const bytes = await boundedBody(request, 11 * 1024 * 1024);
    const formRequest = new Request(request.url, { method: 'POST', headers: { 'Content-Type': request.headers.get('content-type') || '' }, body: bytes });
    const file = (await formRequest.formData()).get('image');
    if (!(file instanceof File) || !file.size || file.size > 10 * 1024 * 1024) return json({ error: 'Pilih gambar maksimal 10 MB.' }, 400);
    const input = Buffer.from(await file.arrayBuffer());
    const isPng = input.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const isJpeg = input[0] === 255 && input[1] === 216 && input[2] === 255;
    const isWebp = input.toString('ascii', 0, 4) === 'RIFF' && input.toString('ascii', 8, 12) === 'WEBP';
    const isAvif = input.toString('ascii', 4, 8) === 'ftyp' && ['avif', 'avis'].includes(input.toString('ascii', 8, 12));
    if (!isPng && !isJpeg && !isWebp && !isAvif) return json({ error: 'Gunakan JPG, PNG, WebP, atau AVIF.' }, 400);
    const image = sharp(input, { limitInputPixels: 40_000_000 });
    const metadata = await image.metadata();
    if (!metadata.format || !['jpeg', 'png', 'webp', 'avif'].includes(metadata.format) && !(isAvif && metadata.format === 'heif')) return json({ error: 'Gunakan JPG, PNG, WebP, atau AVIF.' }, 400);
    const result = await image.rotate().resize({ width: 1600, height: 1000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
    const name = `${randomUUID()}.webp`;
    mkdirSync(join(dataDir(), 'media'), { recursive: true, mode: 0o700 });
    writeFileSync(join(dataDir(), 'media', name), result, { flag: 'wx', mode: 0o600 });
    return json({ url: `/media/${name}` });
  } catch { return json({ error: 'Gambar tidak dapat diproses. Gunakan gambar valid maksimal 10 MB dan 40 megapiksel.' }, 400); }
};
