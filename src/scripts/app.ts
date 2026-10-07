// Behaviour for the hero's product demo. Everything here is sample data;
// the page says so right under the window.

type Item = { name: string; unit: string; place: string; qty: number };
type Strings = {
  out: string; in: string; low: string;
  read: string; waiting: string; full: string; present: string;
  queue: string[]; seed: { name: string; time: string }[];
  ready: string; done: string; start: string; again: string; frame: string;
  items: Item[]; photos: string[];
};

const LOW_AT = 5;
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = (ms: number) => new Promise((r) => setTimeout(r, reduceMotion() ? 0 : ms));

function now(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function initApp(root: HTMLElement) {
  const s: Strings = JSON.parse(root.dataset.strings!);
  initTabs(root);
  initInventory(root.querySelector('[data-panel="inventory"]')!, s);
  initRfid(root.querySelector('[data-panel="rfid"]')!, s);
  initBooth(root.querySelector('[data-panel="booth"]')!, s);
}

function tick(node: Element, dir: 1 | -1) {
  node.classList.remove('tick-up', 'tick-down');
  void (node as HTMLElement).offsetWidth;
  node.classList.add(dir > 0 ? 'tick-up' : 'tick-down');
}

function initTabs(root: HTMLElement) {
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = tabs.map((t) => root.querySelector<HTMLElement>(`#${t.getAttribute('aria-controls')}`)!);

  function select(i: number, focus = false) {
    tabs.forEach((t, j) => {
      const on = i === j;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      panels[j].classList.toggle('is-active', on);
    });
    if (focus) tabs[i].focus();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', (e) => {
      const last = tabs.length - 1;
      const next = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: last }[e.key];
      if (next === undefined) return;
      e.preventDefault();
      select((next + tabs.length) % tabs.length, true);
    });
  });
}

function initInventory(panel: HTMLElement, s: Strings) {
  const qty = s.items.map((i) => i.qty);
  const log = panel.querySelector<HTMLOListElement>('[data-inv-log]')!;
  const rows = [...panel.querySelectorAll<HTMLTableRowElement>('tr[data-row]')];
  const empty = panel.querySelector<HTMLElement>('[data-inv-empty]')!;
  const search = panel.querySelector<HTMLInputElement>('[data-inv-search]')!;

  function render(i: number) {
    const row = rows[i];
    row.querySelector('[data-qty]')!.textContent = String(qty[i]);
    (row.querySelector('[data-low]') as HTMLElement).hidden = qty[i] > LOW_AT;
    (row.querySelector('[data-delta="-1"]') as HTMLButtonElement).disabled = qty[i] === 0;
  }

  function addLog(i: number, delta: number) {
    const item = s.items[i];
    const time = now();
    // Fold repeated clicks on the same item into one entry.
    const head = log.firstElementChild as HTMLLIElement | null;
    if (head && head.dataset.row === String(i) && Math.sign(Number(head.dataset.delta)) === Math.sign(delta)) {
      const total = Number(head.dataset.delta) + delta;
      head.dataset.delta = String(total);
      head.querySelector('[data-amount]')!.textContent = `${total > 0 ? '+' : '−'}${Math.abs(total)} ${item.unit}`;
      head.querySelector('[data-time]')!.textContent = time;
      head.classList.remove('is-new');
      void head.offsetWidth;
      head.classList.add('is-new');
      return;
    }
    const li = el('li', 'is-new');
    li.dataset.row = String(i);
    li.dataset.delta = String(delta);
    const meta = el('span', 'log-meta');
    const amount = el('span', `num ${delta > 0 ? 'is-in' : 'is-out'}`, `${delta > 0 ? '+' : '−'}${Math.abs(delta)} ${item.unit}`);
    amount.dataset.amount = '';
    const t = el('span', 'num', time);
    t.dataset.time = '';
    meta.append(amount, t);
    li.append(el('span', 'log-name', item.name), meta);
    log.prepend(li);
    while (log.children.length > 6) log.lastElementChild!.remove();
  }

  rows.forEach((row, i) => {
    render(i);
    row.querySelectorAll<HTMLButtonElement>('[data-delta]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const delta = Number(btn.dataset.delta);
        if (qty[i] + delta < 0) return;
        qty[i] += delta;
        render(i);
        tick(row.querySelector('[data-qty]')!, delta > 0 ? 1 : -1);
        addLog(i, delta);
        row.classList.add('is-flash');
        requestAnimationFrame(() => requestAnimationFrame(() => row.classList.remove('is-flash')));
      });
    });
  });

  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    rows.forEach((row) => {
      const match = !q || row.dataset.name!.includes(q);
      row.hidden = !match;
      if (match) shown++;
    });
    empty.hidden = shown > 0;
  });
}

function cardId(name: string): string {
  let h = 2166136261;
  for (const c of name) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).toUpperCase().padStart(8, '0').match(/../g)!.join(':');
}

function initRfid(panel: HTMLElement, s: Strings) {
  const reader = panel.querySelector<HTMLElement>('[data-reader]')!;
  const state = panel.querySelector<HTMLElement>('[data-reader-state]')!;
  const tap = panel.querySelector<HTMLButtonElement>('[data-tap]')!;
  const reset = panel.querySelector<HTMLButtonElement>('[data-reset]')!;
  const count = panel.querySelector<HTMLElement>('[data-count]')!;
  const roll = panel.querySelector<HTMLOListElement>('[data-roll]')!;
  // Reuse the server-rendered check icon so the markup matches.
  const checkSvg = roll.querySelector('.roll-ok svg')!.outerHTML;
  const seedHtml = roll.innerHTML;
  let next = 0;
  let busy = false;

  function row(name: string, time: string) {
    const li = el('li', 'is-new');
    const ok = el('span', 'roll-ok');
    ok.innerHTML = checkSvg;
    ok.append(s.present);
    li.append(el('span', 'roll-name', name), el('span', 'num roll-time', time), ok);
    return li;
  }

  tap.addEventListener('click', async () => {
    if (busy || next >= s.queue.length) return;
    busy = true;
    tap.disabled = true;
    const name = s.queue[next++];
    reader.classList.remove('is-reading');
    void reader.offsetWidth;
    reader.classList.add('is-reading');
    await wait(350);
    state.replaceChildren(el('strong', '', name), document.createTextNode(`${s.read} · ${cardId(name)}`));
    roll.prepend(row(name, now()));
    count.textContent = String(s.seed.length + next);
    tick(count, 1);
    busy = false;
    if (next >= s.queue.length) {
      tap.hidden = true;
      reset.hidden = false;
      state.replaceChildren(el('strong', '', s.full));
    } else {
      tap.disabled = false;
    }
  });

  reset.addEventListener('click', () => {
    next = 0;
    roll.innerHTML = seedHtml;
    count.textContent = String(s.seed.length);
    state.textContent = s.waiting;
    reader.classList.remove('is-reading');
    reset.hidden = true;
    tap.hidden = false;
    tap.disabled = false;
    tap.focus();
  });
}

function initBooth(panel: HTMLElement, s: Strings) {
  const vf = panel.querySelector<HTMLElement>('[data-vf]')!;
  const flash = panel.querySelector<HTMLElement>('[data-flash]')!;
  const strip = panel.querySelector<HTMLElement>('[data-strip]')!;
  const frames = [...panel.querySelectorAll<HTMLElement>('[data-frame]')];
  const btn = panel.querySelector<HTMLButtonElement>('[data-booth-start]')!;
  const label = panel.querySelector<HTMLElement>('[data-booth-label]')!;
  let done = false;

  function setVf(text: string, mode: '' | 'is-big' | 'is-done' = '') {
    vf.textContent = text;
    vf.className = `vf-count ${mode}`;
  }

  function resetSession() {
    frames.forEach((f) => f.classList.remove('is-filled'));
    strip.classList.remove('is-done');
    setVf(s.ready);
    label.textContent = s.start;
    done = false;
  }

  btn.addEventListener('click', async () => {
    if (done) resetSession();
    btn.disabled = true;
    for (let i = 0; i < frames.length; i++) {
      for (const n of i === 0 ? ['3', '2', '1'] : ['1']) {
        setVf(n, 'is-big');
        await wait(550);
      }
      if (!reduceMotion()) {
        flash.classList.remove('go');
        void flash.offsetWidth;
        flash.classList.add('go');
      }
      frames[i].classList.add('is-filled');
      setVf(`${s.frame} ${i + 1}/${frames.length}`);
      await wait(500);
    }
    strip.classList.add('is-done');
    setVf(s.done, 'is-done');
    label.textContent = s.again;
    btn.disabled = false;
    done = true;
  });
}
