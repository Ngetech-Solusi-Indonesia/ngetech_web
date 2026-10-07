export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  const url = new URL(request.url);
  if (origin === url.origin) return true;
  // The Node listener is HTTP behind the HTTPS proxy. Require the exact
  // configured public origin and its validated host for that case.
  const publicUrl = new URL(process.env.PUBLIC_SITE_URL || 'https://ngetech.studio');
  return origin === publicUrl.origin && url.host === publicUrl.host;
}
export async function boundedBody(request: Request, limit: number): Promise<Uint8Array> {
  const reader = request.body?.getReader();
  if (!reader) return new Uint8Array();
  let total = 0;
  const parts: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > limit) { await reader.cancel(); throw new Error('Data terlalu besar.'); }
    parts.push(value);
  }
  const result = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) { result.set(part, offset); offset += part.length; }
  return result;
}
export function json(value: unknown, status = 200) { return new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } }); }
export function isLocalSetup(context: { url: URL; clientAddress: string }) {
  return import.meta.env.DEV && ['localhost', '127.0.0.1', '[::1]'].includes(context.url.hostname) && ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(context.clientAddress);
}
