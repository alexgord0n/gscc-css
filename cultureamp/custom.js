/* Culture Amp Community JS Enhancements */
/* ===================================== */

/* 1. Intersection Observer fade‑in for elements with .cai-fade */
(function () {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('cai-inview');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.cai-fade').forEach((el) => io.observe(el));
})();

/* 2. Lightweight confetti on click for elements with .cai-celebrate */
/*    (Uses https://cdn.skypack.dev/canvas-confetti – loads only if JS allowed) */
import('https://cdn.skypack.dev/canvas-confetti').then((module) => {
  const confetti = module.default;
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.cai-celebrate');
    if (!btn) return;
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.7 },
    });
  });
}).catch(() => {
  /* Offline or blocked – ignore gracefully */
});

/* ========== HOW TO USE ==========
1. Upload this JS file in your theme’s Global › Custom HTML » Footer (or Header) **inside** <script> tags, *if* custom JS is allowed in your instance.
2. Keep the CSS file separate (already provided) in Global › Custom CSS.
3. Add class names where desired:
   • .cai-fade        → any element that should fade/slide in on scroll
   • .cai-celebrate   → clickable element that should fire confetti
*/
