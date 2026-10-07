const items = document.querySelectorAll<HTMLElement>('.reveal');
if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
  items.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  items.forEach((el) => io.observe(el));
}
