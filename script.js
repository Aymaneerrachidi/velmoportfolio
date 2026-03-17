/*
 * VELMOVERSE — Script
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 1. Custom cursor (desktop)
 * 2. Navbar scroll behavior
 * 3. Mobile menu
 * 4. Portfolio tab filter
 * 5. Gallery modal + lightbox
 * 6. Scroll reveal (Intersection Observer)
 * 7. Counter animation
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

/* ══════════════════════════════════
   1. CUSTOM CURSOR
   Ring lags behind dot for that premium
   "magnetic" feel seen on award-winning sites
══════════════════════════════════ */
const ring = document.getElementById('curRing');
const dot  = document.getElementById('curDot');

if (ring && dot) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    // Dot follows instantly
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Ring follows with smooth lerp
  (function lerp() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(lerp);
  })();

  // Hover state on interactive elements
  document.querySelectorAll('a, button, .wcard, .srv-row, .clink, .gthumb, .tab').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('on-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('on-hover'));
    el.addEventListener('mousedown',  () => ring.classList.add('on-press'));
    el.addEventListener('mouseup',    () => ring.classList.remove('on-press'));
  });
}


/* ══════════════════════════════════
   2. NAVBAR SCROLL
══════════════════════════════════ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


/* ══════════════════════════════════
   3. MOBILE MENU
══════════════════════════════════ */
const hbg     = document.getElementById('hbg');
const mobMenu = document.getElementById('mobMenu');

hbg?.addEventListener('click', () => {
  const open = hbg.classList.toggle('open');
  mobMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.mob-a').forEach(a => {
  a.addEventListener('click', () => {
    hbg.classList.remove('open');
    mobMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


/* ══════════════════════════════════
   4. PORTFOLIO TAB FILTER
══════════════════════════════════ */
const artGrid = document.getElementById('artGrid');
const webGrid = document.getElementById('webGrid');

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--on'));
    btn.classList.add('tab--on');

    if (btn.dataset.tab === 'art') {
      artGrid.classList.remove('hidden');
      webGrid.classList.add('hidden');
    } else {
      artGrid.classList.add('hidden');
      webGrid.classList.remove('hidden');
    }
  });
});


/* ══════════════════════════════════
   5. GALLERY MODAL + LIGHTBOX
   Image data keyed to project IDs.
   Folder names use the actual filesystem
   names (with spaces) from the img/ directory.
══════════════════════════════════ */

// Map project key → { title, folder (actual fs name), images[] }
const PROJECTS = {
  'luna-memecoin': {
    title: 'Luna Memecoin',
    folder: 'Luna Memecoin',
    images: [
      'WhatsApp Image 2025-08-21 à 05.39.01_186f7215.jpg',
      'WhatsApp Image 2025-08-21 à 05.39.01_30646f1e.jpg',
      'WhatsApp Image 2025-08-21 à 05.39.01_be6a0d3f.jpg',
      'WhatsApp Image 2025-08-21 à 05.39.02_28665183.jpg',
      'WhatsApp Image 2025-08-21 à 05.39.02_771d2c6f.jpg',
      'WhatsApp Image 2025-08-21 à 05.39.02_a13ed0af.jpg',
      'WhatsApp Image 2025-08-21 à 05.39.03_10cc72c0.jpg',
      'WhatsApp Image 2025-08-21 à 05.39.03_259a2199.jpg',
      'WhatsApp Image 2025-08-21 à 05.39.03_9891c2ed.jpg'
    ]
  },
  'hypnotic-chameleons': {
    title: 'Hypnotic Chameleons',
    folder: 'Hypnotic Chameleons',
    images: [
      'WhatsApp Image 2025-08-21 à 05.40.57_00f14e32.jpg',
      'WhatsApp Image 2025-08-21 à 05.40.57_01f55f9d.jpg',
      'WhatsApp Image 2025-08-21 à 05.40.57_1eb3d67c.jpg',
      'WhatsApp Image 2025-08-21 à 05.40.57_4a8cc946.jpg',
      'WhatsApp Image 2025-08-21 à 05.40.57_6628fce5.jpg',
      'WhatsApp Image 2025-08-21 à 05.40.57_8d5f6050.jpg',
      'WhatsApp Image 2025-08-21 à 05.40.57_dcea6b1a.jpg'
    ]
  },
  'trumpio-ladio': {
    title: 'Trumpio Ladio',
    folder: 'Trumpio Ladio',
    images: [
      'WhatsApp Image 2025-08-21 à 06.36.55_7f23e124.jpg',
      'WhatsApp Image 2025-08-21 à 06.36.55_8a675499.jpg',
      'WhatsApp Image 2025-08-21 à 06.36.56_086a64f8.jpg',
      'WhatsApp Image 2025-08-21 à 06.36.56_1e68daa4.jpg',
      'WhatsApp Image 2025-08-21 à 06.36.56_3cb51517.jpg',
      'WhatsApp Image 2025-08-21 à 06.36.56_ad5b9ca0.jpg',
      'WhatsApp Image 2025-08-21 à 06.36.56_b0ab3da7.jpg',
      'WhatsApp Image 2025-08-21 à 06.36.56_e8589a3a.jpg',
      'WhatsApp Image 2025-08-21 à 06.36.56_ffadd926.jpg',
      'WhatsApp Image 2025-08-21 à 06.36.57_7870f06f.jpg',
      'WhatsApp Image 2025-08-21 à 06.36.57_7b4ab2d5.jpg'
    ]
  },
  'sugarcane-memecoin': {
    title: 'SugarCane Memecoin',
    folder: 'SugarCane Memecoin',
    images: [
      'WhatsApp Image 2025-08-21 à 07.06.37_bfb94736.jpg',
      'WhatsApp Image 2025-08-21 à 07.06.38_391ed3fc.jpg',
      'WhatsApp Image 2025-08-21 à 07.06.38_3ddd4851.jpg',
      'WhatsApp Image 2025-08-21 à 07.06.38_3fac0ea7.jpg',
      'WhatsApp Image 2025-08-21 à 07.06.38_ad94cffa.jpg',
      'WhatsApp Image 2025-08-21 à 07.06.38_dc2993c6.jpg',
      'WhatsApp Image 2025-08-21 à 07.06.39_02eb6100.jpg',
      'WhatsApp Image 2025-08-21 à 07.06.39_05a7cab9.jpg',
      'WhatsApp Image 2025-08-21 à 07.06.39_12ed34f7.jpg',
      'WhatsApp Image 2025-08-21 à 07.06.39_8191f42c.jpg',
      'WhatsApp Image 2025-08-21 à 07.06.39_c84fcab5.jpg',
      'WhatsApp Image 2025-08-21 à 07.06.39_d5286205.jpg'
    ]
  },
  'tilly-memecoin': {
    title: 'Tilly Memecoin',
    folder: 'Tilly Memecoin',
    images: [
      'WhatsApp Image 2025-08-21 à 07.07.14_306a7626.jpg',
      'WhatsApp Image 2025-08-21 à 07.07.14_3578df61.jpg',
      'WhatsApp Image 2025-08-21 à 07.07.14_75ef8e87.jpg',
      'WhatsApp Image 2025-08-21 à 07.07.14_b0ff54c5.jpg',
      'WhatsApp Image 2025-08-21 à 07.07.14_fe387a03.jpg',
      'WhatsApp Image 2025-08-21 à 07.07.15_08d7cdd5.jpg',
      'WhatsApp Image 2025-08-21 à 07.07.15_16cec7e0.jpg',
      'WhatsApp Image 2025-08-21 à 07.07.15_436c3aad.jpg',
      'WhatsApp Image 2025-08-21 à 07.07.15_4e425b8b.jpg',
      'WhatsApp Image 2025-08-21 à 07.07.15_8443f204.jpg',
      'WhatsApp Image 2025-08-21 à 07.07.15_ad05ed95.jpg',
      'WhatsApp Image 2025-08-21 à 07.07.15_bad23db4.jpg',
      'WhatsApp Image 2025-08-21 à 07.07.15_c5169a1e.jpg',
      'WhatsApp Image 2025-08-21 à 07.07.15_ff2f1b8c.jpg'
    ]
  },
  'random-arts': {
    title: 'Mixed NFT Arts',
    folder: 'Random Nfts + Memecoins Arts',
    images: [
      'WhatsApp Image 2025-08-21 à 07.21.04_00538c71.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.04_2656a916.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.04_7ceab4f3.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.04_a088abaf.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.05_16c1d5e3.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.05_519a12d5.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.05_5a062a17.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.05_7ae53e75.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.05_9802340b.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.05_a3766aee.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.05_db33450a.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.05_fc4a72c8.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.06_16a0750e.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.06_1f0e6ef3.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.06_2e5be975.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.06_39f9bd7e.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.06_43da8732.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.06_bb13d884.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.06_ddfe436c.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.06_e838ec9c.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.07_0526e763.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.07_27689e24.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.07_27c70ab1.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.07_2eb1bfc2.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.07_6958e732.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.07_7c592885.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.07_f7105835.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.08_23bec1e5.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.08_bf96c6ce.jpg',
      'WhatsApp Image 2025-08-21 à 07.21.08_e867f3f6.jpg'
    ]
  }
};

// Gallery modal DOM refs
const gmodal      = document.getElementById('gmodal');
const gmodalBack  = document.getElementById('gmodalBack');
const gmodalClose = document.getElementById('gmodalClose');
const gmodalTitle = document.getElementById('gmodalTitle');
const gmodalCount = document.getElementById('gmodalCount');
const gmodalGrid  = document.getElementById('gmodalGrid');

// Lightbox DOM refs
const lightbox = document.getElementById('lightbox');
const lbClose  = document.getElementById('lbClose');
const lbPrev   = document.getElementById('lbPrev');
const lbNext   = document.getElementById('lbNext');
const lbImg    = document.getElementById('lbImg');

let lbImages = [];
let lbIndex  = 0;

// Open gallery modal when an art card is clicked
document.querySelectorAll('.wcard-art').forEach(card => {
  card.addEventListener('click', () => {
    const key  = card.dataset.proj;
    const proj = PROJECTS[key];
    if (!proj) return;

    // Build thumbnail grid
    gmodalTitle.textContent = proj.title;
    gmodalGrid.innerHTML = '';
    lbImages = [];

    proj.images.forEach((fname, idx) => {
      const src     = `img/${proj.folder}/${fname}`;
      lbImages.push(src);

      const thumb   = document.createElement('div');
      thumb.className = 'gthumb';

      const img     = document.createElement('img');
      img.src       = src;
      img.alt       = `${proj.title} — image ${idx + 1}`;
      img.loading   = 'lazy';
      img.onerror   = () => { thumb.style.display = 'none'; };

      thumb.appendChild(img);
      thumb.addEventListener('click', () => openLightbox(idx));
      gmodalGrid.appendChild(thumb);
    });

    gmodalCount.textContent = `${proj.images.length} images`;
    gmodal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
function closeModal() {
  gmodal.classList.remove('open');
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
gmodalClose?.addEventListener('click', closeModal);
gmodalBack?.addEventListener('click', closeModal);

// Lightbox
function openLightbox(idx) {
  lbIndex = idx;
  lbImg.src = lbImages[idx];
  lightbox.classList.add('open');
}
lbClose?.addEventListener('click', () => lightbox.classList.remove('open'));
lbPrev?.addEventListener('click',  () => { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; lbImg.src = lbImages[lbIndex]; });
lbNext?.addEventListener('click',  () => { lbIndex = (lbIndex + 1) % lbImages.length; lbImg.src = lbImages[lbIndex]; });

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (lightbox.classList.contains('open')) {
    if (e.key === 'ArrowLeft')  lbPrev?.click();
    if (e.key === 'ArrowRight') lbNext?.click();
    if (e.key === 'Escape')     lbClose?.click();
  } else if (gmodal.classList.contains('open')) {
    if (e.key === 'Escape') closeModal();
  }
});


/* ══════════════════════════════════
   6. SCROLL REVEAL
   Intersection Observer adds .in class
   when elements enter viewport
══════════════════════════════════ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target); // fire once
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Apply reveal to key content blocks
[
  '.section-label', '.about-h2', '.about-p', '.srv-h2', '.cta-h2',
  '.wcard', '.anum', '.srv-row', '.clink', '.web-grid .wcard'
].forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger siblings
    const delay = ['rv1','rv2','rv3','rv4','rv5','rv6'][i % 6];
    if (delay) el.classList.add(delay);
    revealObs.observe(el);
  });
});


/* ══════════════════════════════════
   7. COUNTER ANIMATION
   Counts up from 0 to data-to value
   when element enters viewport
══════════════════════════════════ */
function countUp(el, target, duration = 1400) {
  let start = 0;
  const step = target / (duration / 16);
  const tick = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(tick);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.dataset.to, 10);
      countUp(e.target, target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-to]').forEach(el => counterObs.observe(el));


/* ══════════════════════════════════
   8. SMOOTH ANCHOR SCROLL
══════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
