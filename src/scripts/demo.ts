// One clock drives all three panels so they stay in step.
// Each event is a token added to a panel's data-on at phase `at` (0..1).
const PERIOD = 6000;

type Event = { panel: 'rfid' | 'inventory' | 'booth'; token: string; at: number };
const EVENTS: Event[] = [
  { panel: 'booth', token: 'f1', at: 0.1 },
  { panel: 'rfid', token: 'card', at: 0.12 },
  { panel: 'rfid', token: 'read', at: 0.22 },
  { panel: 'rfid', token: 'row', at: 0.26 },
  { panel: 'booth', token: 'f2', at: 0.3 },
  { panel: 'inventory', token: 'scan', at: 0.34 },
  { panel: 'inventory', token: 'dec', at: 0.4 },
  { panel: 'inventory', token: 'log', at: 0.46 },
  { panel: 'booth', token: 'f3', at: 0.5 },
  { panel: 'booth', token: 'f4', at: 0.68 },
  { panel: 'booth', token: 'done', at: 0.78 },
];
const OUT_AT = 0.93;

export function startDemo() {
  const root = document.querySelector<HTMLElement>('[data-demo]');
  if (!root) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const panels = {
    rfid: root.querySelector<HTMLElement>('[data-panel="rfid"]')!,
    inventory: root.querySelector<HTMLElement>('[data-panel="inventory"]')!,
    booth: root.querySelector<HTMLElement>('[data-panel="booth"]')!,
  };
  const fill = root.querySelector<HTMLElement>('[data-fill]')!;
  const clock = root.querySelector<HTMLElement>('[data-clock]')!;
  const count = root.querySelector<HTMLElement>('[data-count]')!;
  const flash = root.querySelector<HTMLElement>('.flash')!;

  const last: Record<string, string> = {};
  let elapsed = 0;
  let prevNow = 0;
  let running = false;
  let inView = false;
  let raf = 0;

  function stateAt(p: number) {
    const out: Record<keyof typeof panels, string[]> = { rfid: [], inventory: [], booth: [] };
    for (const e of EVENTS) if (p >= e.at) out[e.panel].push(e.token);
    if (p >= OUT_AT) for (const k of Object.keys(out) as (keyof typeof panels)[]) out[k].push('out');
    return out;
  }

  function render(p: number) {
    const state = stateAt(p);
    for (const key of Object.keys(panels) as (keyof typeof panels)[]) {
      const el = panels[key];
      const next = state[key].join(' ');
      if (last[key] === next) continue;
      const wasOut = (last[key] ?? '').includes('out');
      // Coming back from the fade-out: jump to the start state without
      // playing every transition in reverse.
      if (wasOut) el.classList.add('snap');
      el.dataset.on = next;
      if (wasOut) {
        void el.offsetWidth;
        requestAnimationFrame(() => el.classList.remove('snap'));
      }
      if (key === 'booth') {
        const shots = state.booth.filter((t) => t.startsWith('f')).length;
        const prevShots = (last.booth ?? '').split(' ').filter((t) => t.startsWith('f')).length;
        count.textContent = `${shots}/4`;
        if (shots > prevShots) {
          flash.classList.remove('go');
          void flash.offsetWidth;
          flash.classList.add('go');
        }
      }
      last[key] = next;
    }
    fill.style.transform = `scaleX(${p})`;
    clock.textContent = `00:0${((p * PERIOD) / 1000).toFixed(1)}`;
  }

  function frame(now: number) {
    elapsed += now - prevNow;
    prevNow = now;
    render((elapsed % PERIOD) / PERIOD);
    raf = requestAnimationFrame(frame);
  }

  function update() {
    const shouldRun = inView && !document.hidden;
    if (shouldRun === running) return;
    running = shouldRun;
    if (running) {
      prevNow = performance.now();
      raf = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(raf);
    }
  }

  // Start from the empty state rather than the server-rendered final frame.
  for (const el of Object.values(panels)) el.classList.add('snap');
  render(0);
  requestAnimationFrame(() => Object.values(panels).forEach((el) => el.classList.remove('snap')));

  new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    update();
  }).observe(root);
  document.addEventListener('visibilitychange', update);
}
