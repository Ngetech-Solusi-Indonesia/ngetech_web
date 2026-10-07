const form = document.querySelector<HTMLFormElement>('#cms-editor');
if (form) {
  let doc: Record<string, any> = JSON.parse(form.dataset.document!);
  const products: { slug: string; name: string }[] = JSON.parse(form.dataset.products!);
  const imageUrls: Record<string, string> = JSON.parse(form.dataset.images || '{}');
  const root = form.querySelector<HTMLElement>('[data-fields]')!;
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const save = form.querySelector<HTMLButtonElement>('[data-save]')!;
  let dirty = false;
  let uploads = 0;
  const labels: Record<string, string> = { slug: 'Alamat', name: 'Nama', nameEn: 'Nama produk dalam English', short: 'Nama panggilan', order: 'Urutan tampil', status: 'Status produk', screenshot: 'Screenshot produk', alt: 'Deskripsi gambar', desc: 'Deskripsi singkat', for: 'Untuk siapa', points: 'Poin fitur', role: 'Peran', email: 'Email', github: 'Username GitHub', githubOrg: 'Organisasi GitHub', whatsapp: 'Menjawab WhatsApp NgeTech', work: 'Yang dikerjakan', product: 'Produk', summary: 'Ringkasan pekerjaan', waNumber: 'Nomor WhatsApp', legalName: 'Nama badan hukum', meta: 'SEO dan hasil pencarian', hero: 'Bagian atas', why: 'Keunggulan', projects: 'Bagian produk', team: 'Bagian tim', contact: 'Bagian kontak', title: 'Judul', sub: 'Kalimat pembuka', description: 'Deskripsi hasil pencarian', ogAlt: 'Deskripsi gambar pratinjau', cta: 'Tombol WhatsApp', secondary: 'Tombol kedua', demoNote: 'Catatan demo', body: 'Isi', items: 'Empat keunggulan', hw: 'Label diagram perangkat', siteSteps: 'Langkah pemasangan', before: 'Label sebelum', beforeItems: 'Pekerjaan sebelum', after: 'Label sesudah', afterItem: 'Hasil sesudah', shotNote: 'Catatan screenshot', colFor: 'Label untuk siapa', waText: 'Pesan awal WhatsApp', waWho: 'Penjawab WhatsApp', orEmail: 'Teks sebelum email', emailWho: 'Penjawab email', location: 'Lokasi' };
  const node = <K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string) => { const el = document.createElement(tag); if (className) el.className = className; if (text !== undefined) el.textContent = text; return el; };
  const setValue = (path: string[], value: unknown) => { let parent: any = doc; for (const key of path.slice(0, -1)) parent = parent[key]; parent[path.at(-1)!] = value; dirty = true; };
  function message(text: string, kind = '') { status.textContent = text; status.dataset.kind = kind; }
  const titleFor = (path: string[]) => labels[path.at(-1)!] || path.at(-1) || '';
  const multiline = (path: string[]) => path.some(key => ['sub', 'body', 'desc', 'description', 'summary', 'waText', 'points'].includes(key));
  function scalar(value: any, path: string[], parent: HTMLElement, caption?: string) {
    const key = path.at(-1)!;
    const wrap = node('div', 'cms-field');
    const id = `field-${path.join('-')}`;
    if (typeof value === 'boolean') {
      const label = node('label', 'cms-check'); const input = node('input'); input.type = 'checkbox'; input.checked = value; input.dataset.testid = path.join('.'); input.addEventListener('change', () => setValue(path, input.checked)); label.append(input, document.createTextNode(titleFor(path))); wrap.append(label); parent.append(wrap); return;
    }
    const label = node('label', '', caption || titleFor(path)); label.htmlFor = id; wrap.append(label);
    let input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    if (key === 'status' || key === 'product') {
      input = node('select', 'admin-input');
      const options = key === 'status' ? [{ slug: 'in_development', name: 'Dalam pengembangan' }, { slug: 'internal_testing', name: 'Uji coba internal' }, { slug: 'in_use', name: 'Dipakai klien' }] : products;
      if (key === 'product') { const blank = node('option', '', 'Pilih produk'); blank.value = ''; input.append(blank); }
      for (const option of options) { const el = node('option', '', option.name); el.value = option.slug; input.append(el); }
      input.value = value || '';
    } else if (multiline(path)) { input = node('textarea', 'admin-input'); input.value = value ?? ''; input.maxLength = 6000; }
    else { input = node('input', 'admin-input'); input.type = typeof value === 'number' ? 'number' : key === 'email' ? 'email' : 'text'; input.value = value ?? ''; if (input.type === 'number') { input.min = '0'; input.max = '9999'; input.step = '1'; } else input.maxLength = ['name', 'nameEn'].includes(key) ? 160 : 6000; }
    input.id = id; input.dataset.testid = path.join('.'); input.required = !['legalName', 'github'].includes(key);
    if (key === 'slug' && form!.dataset.new !== 'true') (input as HTMLInputElement).readOnly = true;
    if (key === 'slug') { (input as HTMLInputElement).pattern = '[a-z0-9]+(-[a-z0-9]+)*'; (input as HTMLInputElement).maxLength = 80; }
    if (key === 'screenshot') (input as HTMLInputElement).readOnly = true;
    input.addEventListener('input', () => setValue(path, typeof value === 'number' ? Number(input.value) : input.value));
    input.addEventListener('change', () => setValue(path, typeof value === 'number' ? Number(input.value) : input.value));
    wrap.append(input);
    if (key === 'waNumber') wrap.append(node('p', 'hint', 'Format 628… tanpa + atau spasi.'));
    if (key === 'legalName') wrap.append(node('p', 'hint', 'Kosongkan selama belum terdaftar sebagai PT/CV.'));
    if (key === 'slug') wrap.append(node('p', 'hint', form!.dataset.new === 'true' ? 'Huruf kecil, angka, dan tanda hubung. Contoh: sistem-inventaris.' : 'Alamat yang sudah ada dipertahankan agar tautannya tetap bekerja.'));
    if (key === 'screenshot') {
      const upload = node('input'); upload.type = 'file'; upload.accept = 'image/jpeg,image/png,image/webp,image/avif'; upload.setAttribute('aria-label', 'Unggah screenshot');
      const preview = node('img', 'cms-image'); preview.alt = 'Pratinjau screenshot'; preview.src = imageUrls[value] || (String(value || '').startsWith('/media/') ? value : ''); preview.hidden = !value;
      upload.addEventListener('change', async () => {
        const file = upload.files?.[0]; if (!file) return;
        if (file.size > 10 * 1024 * 1024) { message('Gambar maksimal 10 MB.', 'error'); return; }
        uploads++; save.disabled = true; message('Mengunggah screenshot…');
        try { const body = new FormData(); body.set('image', file); const response = await fetch('/api/admin/upload', { method: 'POST', body }); const result = await response.json(); if (!response.ok) throw new Error(result.error || 'Unggah gagal.'); setValue(path, result.url); input.value = result.url; preview.src = result.url; preview.hidden = false; message('Screenshot siap. Klik Simpan perubahan untuk menayangkannya.', 'success'); }
        catch (error) { message((error as Error).message, 'error'); }
        finally { uploads--; save.disabled = uploads > 0; }
      });
      wrap.append(upload, node('p', 'hint', 'JPG, PNG, WebP, atau AVIF, maksimal 10 MB. Gunakan screenshot asli.'), preview);
    }
    parent.append(wrap);
  }
  function render(value: any, path: string[], parent: HTMLElement) {
    if (Array.isArray(value)) {
      const key = path.at(-1)!; const min = key === 'work' ? 0 : ['items', 'hw'].includes(key) ? 4 : 1; const max = key === 'work' ? 30 : key === 'points' ? 5 : 4;
      const wrap = node('div', 'cms-array'); wrap.append(node('p', 'field-label', titleFor(path)));
      value.forEach((item, i) => { const box = node('div', 'cms-array-item'); const toolbar = node('div', 'array-toolbar'); toolbar.append(node('span', '', `Item ${i + 1}`)); if (min !== max) { const remove = node('button', 'small-button', 'Hapus item'); remove.type = 'button'; remove.disabled = value.length <= min; remove.addEventListener('click', () => { value.splice(i, 1); dirty = true; renderAll(); }); toolbar.append(remove); } box.append(toolbar); render(item, [...path, String(i)], box); wrap.append(box); });
      if (min !== max) { const add = node('button', 'small-button', '+ Tambah item'); add.type = 'button'; add.disabled = value.length >= max; add.addEventListener('click', () => { value.push(key === 'work' ? { product: products[0]?.slug || '', summary: { id: '', en: '' } } : { id: '', en: '' }); dirty = true; renderAll(); }); wrap.append(add); }
      parent.append(wrap); return;
    }
    if (value && typeof value === 'object') {
      if ('id' in value && 'en' in value) { const field = node('div', 'cms-field'); field.append(node('p', 'field-label', titleFor(path))); const columns = node('div', 'cms-bi'); scalar(value.id, [...path, 'id'], columns, 'Indonesia'); scalar(value.en, [...path, 'en'], columns, 'English'); field.append(columns); parent.append(field); return; }
      for (const [key, item] of Object.entries(value)) {
        if (path.length === 0 && item && typeof item === 'object' && !Array.isArray(item) && !('id' in item)) { const group = node('details', 'cms-group'); group.dataset.group = key; group.open = key === 'hero' || ['role', 'desc'].includes(key); group.append(node('summary', '', titleFor([key]))); const body = node('div', 'group-body'); render(item, [key], body); group.append(body); parent.append(group); }
        else render(item, [...path, key], parent);
      }
      return;
    }
    scalar(value, path, parent);
  }
  function renderAll() { const opened = new Set([...root.querySelectorAll<HTMLDetailsElement>('details[open]')].map(item => item.dataset.group)); const hadGroups = !!root.childElementCount; root.replaceChildren(); render(doc, [], root); if (hadGroups) root.querySelectorAll<HTMLDetailsElement>('details').forEach(item => item.open = opened.has(item.dataset.group)); }
  renderAll();
  form.addEventListener('submit', async event => {
    event.preventDefault(); if (uploads || save.disabled) return;
    save.disabled = true; message('Menyimpan…');
    try {
      const response = await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: form!.dataset.section, slug: form!.dataset.entry, revision: Number(form!.dataset.revision), action: form!.dataset.new === 'true' ? 'create' : 'save', data: doc }) });
      const result = await response.json(); if (!response.ok) { if (response.status === 401) { dirty = false; location.assign('/admin/login'); return; } throw new Error(result.error || 'Gagal menyimpan.'); }
      form!.dataset.revision = String(result.revision); dirty = false; message(result.message, 'success');
      if (form!.dataset.new === 'true') location.assign(`/admin?section=${form!.dataset.section}&entry=${encodeURIComponent(doc.slug)}`);
    } catch (error) { message((error as Error).message, 'error'); }
    finally { save.disabled = false; }
  });
  form.querySelector<HTMLButtonElement>('[data-delete]')?.addEventListener('click', async () => {
    if (!confirm('Hapus konten ini dari website? Salinan sebelumnya tetap tersimpan di riwayat server.')) return;
    save.disabled = true;
    try { const response = await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: form!.dataset.section, slug: form!.dataset.entry, revision: Number(form!.dataset.revision), action: 'delete' }) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || 'Gagal menghapus.'); dirty = false; location.assign(`/admin?section=${form!.dataset.section}`); }
    catch (error) { message((error as Error).message, 'error'); save.disabled = false; }
  });
  addEventListener('beforeunload', event => { if (dirty) { event.preventDefault(); event.returnValue = ''; } });
}
