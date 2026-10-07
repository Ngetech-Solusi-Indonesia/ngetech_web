// Progressive motion: all content remains visible without JavaScript.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const animations = new Set<Animation>();
const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    revealObserver.unobserve(entry.target);
    if (motionPreference.matches) continue;
    const node = entry.target as HTMLElement;
    const animation = node.animate(
      [{ opacity: 0, transform: 'translateY(26px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 800, delay: Number(node.dataset.revealDelay ?? 0), easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' },
    );
    animations.add(animation);
    animation.finished.then(() => animations.delete(animation)).catch(() => animations.delete(animation));
  }
}, { threshold: 0.08 });
document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((node) => revealObserver.observe(node));
motionPreference.addEventListener('change', () => {
  if (motionPreference.matches) animations.forEach((animation) => animation.cancel());
});
const ambientObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.target.classList.toggle('is-inview', entry.isIntersecting));
});
document.querySelectorAll('[data-ambient]').forEach((node) => ambientObserver.observe(node));
document.addEventListener('visibilitychange', () => {
  document.documentElement.classList.toggle('page-hidden', document.hidden);
});
const header = document.querySelector<HTMLElement>('.header');
let queued = false;
function updateProgress() {
  const extent = document.documentElement.scrollHeight - innerHeight;
  header?.style.setProperty('--read-progress', String(extent > 0 ? Math.min(1, Math.max(0, scrollY / extent)) : 0));
  header?.classList.toggle('is-scrolled', scrollY > 24);
  queued = false;
}
function queueProgress() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(updateProgress);
}
addEventListener('scroll', queueProgress, { passive: true });
addEventListener('resize', queueProgress);
new ResizeObserver(queueProgress).observe(document.body);
updateProgress();
