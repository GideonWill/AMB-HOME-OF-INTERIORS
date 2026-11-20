
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const nav = $('nav');
function updateNav() {
  const isHome = $('#p-') && $('#p-').classList.contains('on');
  const isProjects = $('#p-projects') && $('#p-projects').classList.contains('on');
  let scrolled = scrollY > 24;
  if (isHome) {
    const heroPin = document.getElementById('hero-pin');
    if (heroPin) {
      const rect = heroPin.getBoundingClientRect();
      scrolled = rect.bottom <= 80;
    }
  } else if (isProjects) {
    const heroWrap = document.getElementById('projects-hero-wrap');
    if (heroWrap) {
      const rect = heroWrap.getBoundingClientRect();
      scrolled = rect.bottom <= 80;
    }
  }
  nav.classList.toggle('nav-scrolled', scrolled);
}
addEventListener('scroll', updateNav, { passive: true });
updateNav();


// preloader
let n = 0; const cnt = $('#cnt'), t = setInterval(() => { n += Math.ceil(Math.random() * 9); if (n >= 100) { n = 100; clearInterval(t); setTimeout(() => { $('#pre').classList.add('done'); const h1 = $('#h1'); if (h1) h1.classList.add('in'); const heroVid = document.querySelector('.hero-slide[data-hero-index="0"] video'); if (heroVid) { heroVid.muted = true; heroVid.play().catch(() => { }); } }, 300) } cnt.textContent = n }, 60);

// reveal on scroll
const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target) } }), { threshold: .15 });
$$('.rv').forEach(el => io.observe(el));
// scroll-linked: parallax + pinned horizontal track + hero pin
const track = $('#track'), pin = $('#work'), prog = $('#prog'), par = $$('[data-par]');
let updateHeroScroll = () => { };
function tick() {
  const y = scrollY, vh = innerHeight;
  updateHeroScroll();
  updateNav();
  par.forEach(el => { const r = el.getBoundingClientRect(); el.style.transform = `translateY(${(r.top - vh / 2) * -el.dataset.par}px)` });
  if (pin && track && prog) { const r = pin.getBoundingClientRect(), max = pin.offsetHeight - vh, p = Math.min(1, Math.max(0, -r.top / max)); track.style.transform = `translateX(${-p * (track.scrollWidth - innerWidth)}px)`; prog.style.width = p * 100 + '%' }
  requestAnimationFrame(tick)
}
tick();
// service hover image follows cursor
const hov = $('#hov'); let mx = 0, my = 0, cx = 0, cy = 0;
addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY });
(function f() { cx += (mx - cx) * .12; cy += (my - cy) * .12; hov.style.left = cx + 'px'; hov.style.top = cy + 'px'; requestAnimationFrame(f) })();
$$('.svc a').forEach(a => { a.onmouseenter = () => { if (a.dataset.g) hov.className = 'ph on ' + a.dataset.g }; a.onmouseleave = () => hov.classList.remove('on') });
// router with curtain transition
const P = {
  modernliving: { t: 'Modern Living Room', c: 'Living Room', k: 'living', loc: 'East Legon, Accra', y: '2025', a: '560 m\u00b2', i: 12, videoSrc: 'images/living-room-video.mp4', g: [], d: 'A contemporary living room defined by a fluted wood accent wall, sculptural circular chandeliers, plush sectional seating, and high-gloss marble floors.' },
  kitchen: { t: 'Contemporary Kitchen', c: 'Kitchen & Dining', k: 'living', loc: 'Airport Hills, Accra', y: '2025', a: '320 m\u00b2', i: 29, g: [], d: 'A contemporary luxury kitchen featuring sleek high-gloss cabinetry, warm illuminated glass vitrines, engineered quartz countertops, and tailored zebra blinds.' },
  islandkitchen: { t: 'Marble Island Kitchen', c: 'Kitchen & Dining', k: 'living', loc: 'Airport Hills, Accra', y: '2025', a: '280 m\u00b2', i: 30, g: [], d: 'A bespoke contemporary kitchen featuring a Calacatta marble waterfall island, sculptural rod chandelier, integrated wine cooler, and tailored zebra blinds.' },
  atelier: { t: 'Double-Height Living Room', c: 'Living Room', k: 'living', loc: 'Airport Hills, Accra', y: '2025', a: '640 m\u00b2', i: 27, g: [], d: 'An architectural double-height living room viewed from the mezzanine gallery, featuring a suspended crystal sphere chandelier, bookmatched marble fireplace wall, curved boucl\u00e9 armchairs, and floor-to-ceiling drapery.' },
  reservelounge: { t: 'Reserve Lounge & Bar', c: 'Lounge & Bar', k: 'living', loc: 'Trasacco Valley, Accra', y: '2025', a: '480 m\u00b2', i: 28, g: [], d: 'A bespoke residential lounge and cocktail bar featuring tiered cove tray ceilings with warm amber perimeter illumination, curved boucl\u00e9 sectional seating, and illuminated liquor vitrines.' },
  lounge: { t: 'Contemporary Lounge', c: 'Living & Dining', k: 'living', loc: 'Airport Hills, Accra', y: '2025', a: '480 m\u00b2', i: 15, g: [], d: 'An open-concept living lounge featuring a sculptural boat pendant fixture, warm backlit wall slats, burnt orange seating, and a marble waterfall island.' },
  olivesuite: { t: 'Olive Drapery Suite', c: 'Curtains & Bedroom', k: 'bedroom', loc: 'Airport Residential, Accra', y: '2025', a: '220 m\u00b2', i: 26, g: [], d: 'Tailored olive floor-to-ceiling drapes and sheer curtains framing twin bedroom suites with architectural tray lighting and bespoke cabinetry.' },
  wardrobe: { t: 'Walk-in Wardrobe', c: 'Dressing & Study', k: 'bedroom', loc: 'Cantonments, Accra', y: '2025', a: '160 m\u00b2', i: 18, g: [], d: 'A symmetrical dressing room gallery featuring bronze tinted glass wardrobes, integrated vertical illumination, slatted wood ceiling, and a central glass executive desk.' },
  masterbed: { t: 'Master Bedroom Suite', c: 'Master Bedroom', k: 'bedroom', loc: 'Roman Ridge, Accra', y: '2025', a: '180 m\u00b2', i: 4, g: [], d: 'A serene master bedroom suite featuring twin architectural beds, built-in study workstations, warm ambient illumination, and tailored joinery.' },
  twinbed: { t: 'Twin Bedroom Suite', c: 'Guest Bedroom', k: 'bedroom', loc: 'Airport Residential, Accra', y: '2025', a: '140 m\u00b2', i: 2, g: [], d: 'A contemporary bedroom suite defined by illuminated glass-front wardrobe vitrines, plush lounge ottoman seating, and tailored modern finishes.' },
  skyline: { t: 'Skyline Residence', c: 'Living Room', k: 'living', loc: 'East Legon, Accra', y: '2025', a: '780 m\u00b2', i: 3, g: [], d: 'A residence composed around a panoramic city view, layered with sculpted seating, a sculptural glass chandelier and a fireplace wall in stone.' },
  lumina: { t: 'Lumina Bedroom Suite', c: 'Bedroom', k: 'bedroom', loc: 'Roman Ridge, Accra', y: '2025', a: '180 m\u00b2', i: 16, g: [], d: 'A serene primary bedroom defined by an undulating acoustic slat headboard with warm perimeter illumination and a floating architectural tray ceiling.' },
  onyx: { t: 'Onyx Spa Ensuite', c: 'Bathroom', k: 'living', loc: 'East Legon Hills, Accra', y: '2024', a: '95 m\u00b2', i: 17, g: [], d: 'A framed glass sanctuary featuring a freestanding sculptural soaking tub, striated marble wall slabs, and warm natural oak joinery.' },
  halo: { t: 'Halo Penthouse', c: 'Penthouse', k: 'living', loc: 'Cantonments, Accra', y: '2024', a: '540 m\u00b2', i: 8, g: [], d: 'A starlit ceiling, glass staircase and a fireplace set into white stone turn a penthouse lounge into a night-sky retreat.' },
  spiral: { t: 'Private Reserve Bar', c: 'Bar & Cabinetry', k: 'living', loc: 'Trasacco Valley, Accra', y: '2024', a: '360 m\u00b2', i: 9, g: [], d: 'A bespoke floor-to-ceiling bar display vitrine in rich natural walnut with smoked glass vitrines, warm integrated LED shelving, and a waterfall cocktail island.' },
  kyoto: { t: 'Kyoto Living Suite', c: 'Living Room', k: 'living', loc: 'Osu, Accra', y: '2023', a: '320 m\u00b2', i: 11, g: [], d: 'Timber lattice screens, warm cove lighting and a mirror-polished floor bring quiet Japanese restraint to an Accra apartment.' },
  azure: { t: 'Azure Residence', c: 'Living Room', k: 'living', loc: 'Spintex, Accra', y: '2021', a: '420 m\u00b2', i: 7, g: [], d: 'Relaxed contemporary living spaces layered with architectural detailing, tailored drapery, and custom joinery.' },
  foyer: { t: 'Grand Entrance Foyer', c: 'Entrance Foyer', k: 'living', loc: 'Aburi', y: '2020', a: '280 m\u00b2', i: 10, g: [], d: 'Sculptural architectural forms, monumental chandeliers, and considered material details for an entrance statement.' },
  curtains: { t: 'Architectural Drapery', c: 'Curtains & Drapery', k: 'living', loc: 'Airport Residential, Accra', y: '2025', a: '380 m\u00b2', i: 24, g: [], d: 'Bespoke floor-to-ceiling sheer and blackout curtains tailored for modern architectural living, paired with custom lounge seating and warm ambient illumination.' },
  amb360clean: { t: 'Architectural Villa Clean', c: 'Villa Cleaning', k: 'cleaning', loc: 'Airport Hills, Accra', y: '2026', a: '1,200 m\u00b2', i: 25, videoSrc: 'images/cleaning-hero-v16.mp4', g: [], d: 'Precision architectural glass detailing and post-construction sanitization by AMB 360 Cleaning Agency for premier residential estates and luxury villas.' },
  amb360: { t: 'Estate Deep Clean', c: 'Deep Cleaning', k: 'cleaning', loc: 'Airport Hills & East Legon, Accra', y: '2026', a: '1,200 m\u00b2', i: 20, videoSrc: 'images/cleaning-video-2.mp4', g: [], d: 'Comprehensive post-construction and move-in deep cleaning by AMB360 Cleaning Agency for landmark residential estates and luxury interiors across Accra.' },
  amb360buffing: { t: 'Marble Floor Polishing', c: 'Floor Buffing', k: 'cleaning', loc: 'Airport Residential, Accra', y: '2026', a: '950 m\u00b2', i: 19, videoSrc: 'images/cleaning-video-1.mp4', g: [], d: 'Heavy-duty industrial marble buffing, diamond floor polishing, and post-construction surface decontamination restoring raw stone to high-gloss mirror clarity.' },
  amb360handover: { t: 'Move-In Handover Clean', c: 'Move-In Cleaning', k: 'cleaning', loc: 'Cantonments, Accra', y: '2026', a: '850 m\u00b2', i: 21, videoSrc: 'images/cleaning-video-3.mp4', g: [], d: 'Zero-snag post-renovation detailing, micro-fibre joinery wipedown, and medical-grade room preparation for immediate luxury handover.' }
};
const ids = Object.keys(P);
const imageFiles = { 2: '02-twin-bedroom-suite.jpg', 3: 'living%20room%201.jpeg', 4: '04-master-bedroom-suite.jpg', 7: '07-modern-living-blue-curtains.jpg', 8: 'interior%201.jpeg', 9: 'living%20room%202.jpeg', 10: '10-grand-hall-chandelier.jpg', 11: 'kyoto-suite.jpg', 12: '12-modern-living-room.jpg', 15: '15-contemporary-lounge.jpg', 16: '16-lumina-master-suite.jpg', 17: '17-glass-spa-ensuite.jpg', 18: '18-executive-walk-in-wardrobe.jpg', 19: 'cleaning-deep.jpg', 20: 'cleaning-residential.jpg', 21: 'cleaning-estate.jpg', 22: 'cleaning-estate-accra.jpg', 23: 'cleaning-home.jpeg', 24: '24-modern-living-curtains.jpg', 25: '25-amb360-estate-cleaning.jpg', 26: '26-olive-bedroom-drapery.jpg', 27: '27-double-height-grand-salon.jpg', 28: '28-cove-lounge-bar.jpg', 29: '29-contemporary-kitchen.jpg', 30: '30-marble-island-kitchen.jpg' };
const imagePath = id => `images/${imageFiles[id]}`;
const viewer = $('#gallery-viewer'), viewerImage = $('#viewer-image'), viewerTitle = $('#viewer-title'), viewerCount = $('#viewer-count'), viewerCaption = $('#viewer-caption'), viewerThumbs = $('#viewer-thumbs');
let galleryImages = [], galleryIndex = 0, galleryTitle = '';
function renderGallery() {
  const image = galleryImages[galleryIndex];
  viewerImage.src = imagePath(image);
  viewerImage.alt = `${galleryTitle}, interior photo ${galleryIndex + 1} of ${galleryImages.length}`;
  viewerTitle.textContent = galleryTitle;
  viewerCount.textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(galleryImages.length).padStart(2, '0')}`;
  viewerCaption.textContent = `${galleryTitle} · Photo ${galleryIndex + 1}`;
  if (galleryImages.length <= 1) {
    if ($('#viewer-prev')) $('#viewer-prev').style.display = 'none';
    if ($('#viewer-next')) $('#viewer-next').style.display = 'none';
    if (viewerThumbs) viewerThumbs.style.display = 'none';
  } else {
    if ($('#viewer-prev')) $('#viewer-prev').style.display = '';
    if ($('#viewer-next')) $('#viewer-next').style.display = '';
    if (viewerThumbs) {
      viewerThumbs.style.display = '';
      viewerThumbs.innerHTML = galleryImages.map((photo, index) => `<button class="viewer-thumb${index === galleryIndex ? ' active' : ''}" type="button" data-viewer-index="${index}" aria-label="Show photo ${index + 1}" aria-pressed="${index === galleryIndex}"><img src="${imagePath(photo)}" alt="" loading="lazy"></button>`).join('');
    }
  }
}
function moveGallery(step) { galleryIndex = (galleryIndex + step + galleryImages.length) % galleryImages.length; renderGallery() }
function openGallery(index) {
  galleryIndex = index;
  renderGallery();
  viewer.showModal();
}
$('#pj-open').addEventListener('click', () => openGallery(0));
const pjShowcaseEl = $('#pj-showcase');
if (pjShowcaseEl) pjShowcaseEl.addEventListener('click', () => openGallery(0));
$('#pj-g').addEventListener('click', e => { const photo = e.target.closest('[data-gallery-index]'); if (photo) openGallery(Number(photo.dataset.galleryIndex)) });
$('#viewer-close').addEventListener('click', () => viewer.close());
$('#viewer-prev').addEventListener('click', () => moveGallery(-1));
$('#viewer-next').addEventListener('click', () => moveGallery(1));
viewerThumbs.addEventListener('click', e => { const thumb = e.target.closest('[data-viewer-index]'); if (thumb) { galleryIndex = Number(thumb.dataset.viewerIndex); renderGallery() } });
viewer.addEventListener('click', e => { if (e.target === viewer) viewer.close() });

/* ── Cinematic Video Viewer Controller ─────────────────────────── */
const videoViewer = $('#video-viewer');
const videoViewerPlayer = $('#video-viewer-player');
const videoViewerTitle = $('#video-viewer-title');
const videoViewerCaption = $('#video-viewer-caption');
const videoViewerClose = $('#video-viewer-close');

function openVideoViewer(src, title = 'AMB In Motion', caption = '') {
  if (!videoViewer || !videoViewerPlayer || !src) return;
  videoViewerPlayer.src = src;
  videoViewerPlayer.currentTime = 0;
  if (videoViewerTitle) videoViewerTitle.textContent = title;
  if (videoViewerCaption) videoViewerCaption.textContent = caption || `${title} · AMB Architectural Reel`;
  try {
    videoViewer.showModal();
  } catch (err) {
    videoViewer.setAttribute('open', '');
  }
  videoViewerPlayer.play().catch(() => { });
}

function closeVideoViewer() {
  if (!videoViewer || !videoViewerPlayer) return;
  try {
    videoViewerPlayer.pause();
    videoViewerPlayer.removeAttribute('src');
    videoViewerPlayer.load();
    if (videoViewer.open) {
      try {
        videoViewer.close();
      } catch (err) {
        videoViewer.removeAttribute('open');
      }
    }
  } catch (err) { }
}

if (videoViewerClose) videoViewerClose.addEventListener('click', closeVideoViewer);
if (videoViewer) {
  videoViewer.addEventListener('click', e => {
    if (e.target === videoViewer) closeVideoViewer();
  });
  videoViewer.addEventListener('cancel', closeVideoViewer);
}
const featuredTrackIds = ['modernliving', 'kitchen', 'reservelounge', 'olivesuite', 'amb360clean'];
$('#track').innerHTML = featuredTrackIds.map(id => `<a class="card" href="#/project/${id}"><div class="ph im${P[id].i}"></div><small>${P[id].c} \u00b7 ${P[id].y}</small><h3 class="serif">${P[id].t}</h3></a>`).join('');
$('.grid').innerHTML = ids.map(id => {
  const p = P[id];
  return `
    <a class="it rv" data-c="${p.k}" href="#/project/${id}">
      <div class="w ${p.videoSrc ? 'video-container' : ''}">
        ${p.videoSrc ? `
          <video class="project-card-video" autoplay muted loop playsinline webkit-playsinline preload="auto" poster="${imagePath(p.i)}" src="${p.videoSrc}"></video>
        ` : `
          <div class="ph im${p.i}"></div>
        `}
      </div>
      <small>${p.c} \u00b7 ${p.y}</small>
      <h3 class="serif">${p.t}</h3>
    </a>
  `;
}).join('');
$$('.grid .it').forEach(e => io.observe(e));
// ── Senawa-style Pinned Hero Controller ────────────────────────
const heroPin = document.getElementById('hero-pin');
const heroTrack = document.getElementById('hero-track');
const heroStrip = document.getElementById('hero-strip');
const heroBarProg = document.getElementById('hero-bar-prog');

const heroProjectKeys = ['modernliving', 'kitchen', 'reservelounge', 'olivesuite', 'wardrobe', 'amb360clean'];
const heroProjects = heroProjectKeys.map(k => ({ id: k, ...P[k], imgSrc: imagePath(P[k].i) }));

if (heroTrack && heroStrip) {
  // Render hero slides
  heroTrack.innerHTML = heroProjects.map((p, idx) => `
    <div class="hero-slide${idx === 0 ? ' active' : ''}" data-hero-index="${idx}">
      ${p.videoSrc ? `
        <video class="hero-slide-img hero-slide-video" src="${p.videoSrc}" autoplay muted loop playsinline webkit-playsinline preload="auto" poster="${p.imgSrc}"></video>
      ` : `
        <img class="hero-slide-img" src="${p.imgSrc}" alt="${p.t}" loading="${idx < 2 ? 'eager' : 'lazy'}">
      `}
      <div class="hero-slide-overlay"></div>
      <div class="hero-slide-card">
        <span class="hero-slide-tag">${p.y} &nbsp;·&nbsp; ${p.c} &nbsp;·&nbsp; ${p.loc}</span>
        <h2 class="hero-slide-name">${p.t}</h2>
        <div class="hero-slide-actions">
          <a class="hero-slide-cta" href="#/project/${p.id}">View Project <span>→</span></a>
        </div>
      </div>
    </div>
  `).join('');

  // Render hero bottom strip (Senawa-style selector)
  heroStrip.innerHTML = heroProjects.map((p, idx) => `
    <button class="hero-item${idx === 0 ? ' active' : ''}" type="button" data-hero-index="${idx}" aria-label="Explore ${p.t}">
      <span class="hero-item-t">${p.t}</span>
      <span class="hero-item-m">${p.y} &nbsp;|&nbsp; ${p.c}</span>
    </button>
  `).join('');

  // Clicking an item in the strip
  heroStrip.addEventListener('click', e => {
    const btn = e.target.closest('[data-hero-index]');
    if (!btn) return;
    const targetIdx = Number(btn.dataset.heroIndex);
    const maxScroll = heroPin.offsetHeight - window.innerHeight;
    const targetY = heroPin.offsetTop + (targetIdx / (heroProjects.length - 1)) * maxScroll;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  });

  // Position progress bar indicator
  function syncHeroBar(idx) {
    const btns = heroStrip.children;
    if (btns[idx] && heroBarProg) {
      const b = btns[idx];
      heroBarProg.style.width = b.offsetWidth + 'px';
      heroBarProg.style.transform = `translateX(${b.offsetLeft}px)`;
    }
  }

  setTimeout(() => syncHeroBar(0), 120);
  window.addEventListener('resize', () => {
    const curActive = heroStrip.querySelector('.hero-item.active');
    if (curActive) syncHeroBar(Number(curActive.dataset.heroIndex));
  }, { passive: true });

  let lastHeroIdx = -1;
  updateHeroScroll = function () {
    if (!heroPin) return;
    const homePage = document.getElementById('p-');
    if (homePage && !homePage.classList.contains('on')) return;

    const rect = heroPin.getBoundingClientRect();
    const maxScroll = heroPin.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const p = Math.min(1, Math.max(0, -rect.top / maxScroll));
    const N = heroProjects.length;
    const floatIdx = p * (N - 1);
    const activeIdx = Math.min(N - 1, Math.max(0, Math.round(floatIdx)));

    const slides = heroTrack.children;
    for (let i = 0; i < N; i++) {
      const dist = floatIdx - i;
      const absDist = Math.abs(dist);
      const slide = slides[i];
      if (!slide) continue;

      if (absDist < 1.0) {
        const op = Math.max(0, 1 - absDist);
        slide.style.opacity = op.toFixed(3);
        slide.style.pointerEvents = absDist < 0.45 ? 'auto' : 'none';
      } else {
        slide.style.opacity = '0';
        slide.style.pointerEvents = 'none';
      }
      slide.classList.toggle('active', i === activeIdx);
    }

    const stripBtns = heroStrip.children;
    if (activeIdx !== lastHeroIdx) {
      lastHeroIdx = activeIdx;
      for (let i = 0; i < N; i++) {
        if (stripBtns[i]) stripBtns[i].classList.toggle('active', i === activeIdx);
      }
      syncHeroBar(activeIdx);
      if (stripBtns[activeIdx] && window.innerWidth < 800) {
        const btn = stripBtns[activeIdx];
        const targetLeft = btn.offsetLeft - (heroStrip.clientWidth - btn.offsetWidth) / 2;
        heroStrip.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
      }
    }
  };
}
const AR = ids.map(id => ({ id, t: P[id].t, ty: P[id].c, loc: P[id].loc, y: P[id].y, i: P[id].i })).sort((a, b) => b.y - a.y);
const archEl = $('#arch');
if (archEl) {
  archEl.innerHTML = AR.map(r => `<a href="#/project/${r.id}" class="row" data-i="${r.i}"><span>${r.y}</span><b>${r.t}</b><span>${r.ty}</span><span>${r.loc}</span><span>\u2197</span></a>`).join('');
  $$('.arch .row').forEach(a => { a.onmouseenter = () => { hov.className = 'ph on im' + a.dataset.i }; a.onmouseleave = () => hov.classList.remove('on') });
}
const menu = $('#menu'), mt = o => { menu.classList.toggle('open', o); document.body.style.overflow = o ? 'hidden' : '' };
$('#mbtn').onclick = () => mt(true); $('#mx').onclick = () => mt(false); menu.addEventListener('click', e => { if (e.target.closest('li a')) mt(false) });
addEventListener('keydown', e => { if (e.key === 'Escape') mt(false); if (viewer.open && e.key === 'ArrowLeft') { e.preventDefault(); moveGallery(-1) } if (viewer.open && e.key === 'ArrowRight') { e.preventDefault(); moveGallery(1) } });
function fill(id) {
  const p = P[id], i = ids.indexOf(id), n = (i + 1) % ids.length;
  $('#pj-img').className = 'ph im' + p.i;
  const pjVideo = $('#pj-video');
  const pjVideoScrim = $('#pj-video-scrim');
  if (p.videoSrc) {
    if (pjVideo) {
      pjVideo.src = p.videoSrc;
      pjVideo.poster = imagePath(p.i);
      pjVideo.style.display = 'block';
      pjVideo.muted = true;
      pjVideo.play().catch(() => {});
    }
    if (pjVideoScrim) pjVideoScrim.style.display = 'block';
  } else {
    if (pjVideo) {
      pjVideo.pause();
      pjVideo.removeAttribute('src');
      pjVideo.style.display = 'none';
    }
    if (pjVideoScrim) pjVideoScrim.style.display = 'none';
  }
  $('#pj-c').textContent = p.c;
  $('#pj-tt').textContent = p.t;
  $('#pj-l').textContent = p.loc;
  $('#pj-y').textContent = p.y;
  $('#pj-a').textContent = p.a;
  $('#pj-k').textContent = p.c;
  $('#pj-d').textContent = p.d;

  // Full showcase photo of this project after the description
  const pjFullImg = $('#pj-full-img');
  const pjFullCaption = $('#pj-full-caption');
  if (pjFullImg) {
    pjFullImg.src = imagePath(p.i);
    pjFullImg.alt = `${p.t} - ${p.c}`;
  }
  if (pjFullCaption) {
    pjFullCaption.textContent = `${p.t} · ${p.c} · ${p.loc} (${p.y})`;
  }

  galleryImages = [p.i, ...(p.g || [])];
  galleryTitle = p.t;
  const pjG = $('#pj-g');
  const pjOpen = $('#pj-open');
  if (p.g && p.g.length > 0) {
    pjG.style.display = 'grid';
    pjG.innerHTML = galleryImages.map((k, index) => `<button class="gallery-thumb" type="button" data-gallery-index="${index}" aria-label="Open photo ${index + 1} of ${galleryImages.length} for ${p.t}"><img class="gallery-photo" src="${imagePath(k)}" alt="${p.t}, interior photo ${index + 1}" loading="${index < 2 ? 'eager' : 'lazy'}"></button>`).join('');
    if (pjOpen) pjOpen.style.display = '';
  } else {
    // Only display this project - no series of images of other projects
    pjG.style.display = 'none';
    pjG.innerHTML = '';
    if (pjOpen) pjOpen.style.display = 'none';
  }
  $('#pj-n').href = '#/project/' + ids[n];
  $('#pj-nt').textContent = P[ids[n]].t;
}
const cur = $('#cur'), R = ['', 'about', 'projects', 'clientele', 'archive', 'services', 'contact']; let now = null, isTransitioning = false, pendingRoute = null;
const cio = new IntersectionObserver(e => e.forEach(x => {
  if (x.isIntersecting) {
    const el = x.target, to = +el.dataset.count, sfx = el.dataset.suffix || '', pfx = el.dataset.prefix || '', s = performance.now();
    (function u(t) { const k = Math.min(1, (t - s) / 1800); el.textContent = pfx + Math.round(to * (1 - Math.pow(1 - k, 3))) + sfx; if (k < 1) requestAnimationFrame(u) })(s);
    cio.unobserve(el);
  }
}));
$$('[data-count]').forEach(el => cio.observe(el));

function animateHeadline(id) {
  const h = $('#p-' + id + ' .pho h1');
  if (h) {
    h.classList.remove('in');
    void h.offsetHeight;
    h.classList.add('in');
  }
}

function revealAboveTheFold(id) {
  $$('#p-' + id + ' .rv').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.15) {
      el.classList.add('in');
    } else {
      io.observe(el);
    }
  });
}

function show(r) {
  try { if (viewer && viewer.open) viewer.close(); } catch (e) { }
  try { closeVideoViewer(); } catch (e) { }
  const pr = r.startsWith('project/');
  const isClientele = r === 'clientele' || r === 'archive';
  $$('.links a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#/' + (pr ? 'projects' : (isClientele ? 'clientele' : r))));
  if (pr) fill(r.slice(8));
  const id = pr ? 'project' : (isClientele ? 'clientele' : r);
  $$('.page').forEach(p => p.classList.toggle('on', p.id === 'p-' + id));
  scrollTo(0, 0);
  try { revealAboveTheFold(id); } catch (e) { }
  try { updateNav(); } catch (e) { }
  if (id === 'projects') {
    const pvid = document.getElementById('projects-hero-video');
    if (pvid) pvid.play().catch(() => { });
    $$('#p-projects video').forEach(v => { v.muted = true; v.play().catch(() => { }) });
    $$('#projects-cleaning-reel .rv').forEach(el => io.observe(el));
  }
  if (!id || id === '') {
    const heroVid = document.querySelector('.hero-slide[data-hero-index="0"] video');
    if (heroVid) { heroVid.muted = true; heroVid.play().catch(() => { }); }
  }
  if (id === 'about') {
    const aboutVid = document.querySelector('#p-about video');
    if (aboutVid) { aboutVid.muted = true; aboutVid.play().catch(() => { }); }
  }
}

function route() {
  let r = location.hash.replace('#/', '').replace('#', '');
  if (!R.includes(r) && !(r.startsWith('project/') && P[r.slice(8)])) r = '';
  if (r === now && !isTransitioning) return;
  if (isTransitioning) {
    pendingRoute = r;
    return;
  }
  const first = now === null;
  now = r;
  const pr = r.startsWith('project/');
  const isClientele = r === 'clientele' || r === 'archive';
  const id = pr ? 'project' : (isClientele ? 'clientele' : r);

  if (first) {
    show(r);
    setTimeout(() => animateHeadline(id), 120);
    return;
  }

  isTransitioning = true;
  cur.style.transition = 'transform .62s cubic-bezier(.77,0,.18,1)';
  cur.className = 'cur c';

  setTimeout(() => {
    try {
      show(r);
    } catch (err) {
      console.error('show error:', err);
    }
    cur.className = 'cur o';
    try {
      animateHeadline(id);
    } catch (err) {
      console.error('headline error:', err);
    }

    setTimeout(() => {
      cur.style.transition = 'none';
      cur.className = 'cur';
      void cur.offsetHeight;
      requestAnimationFrame(() => {
        cur.style.transition = '';
        isTransitioning = false;
        if (pendingRoute !== null) {
          const next = pendingRoute;
          pendingRoute = null;
          if (next !== now) route();
        }
      });
    }, 640);
  }, 620);
}
addEventListener('hashchange', route); route();
$$('.chips button').forEach(b => b.onclick = () => {
  $$('.chips button').forEach(x => x.classList.toggle('on', x === b));
  $$('.it').forEach(i => {
    const hide = b.dataset.f !== 'all' && i.dataset.c !== b.dataset.f;
    i.classList.toggle('h', hide);
    if (!hide) {
      const vid = i.querySelector('video');
      if (vid) { vid.muted = true; vid.play().catch(() => { }); }
    }
  });
});
$$('.clientele-filters button').forEach(b => {
  b.onclick = () => {
    $$('.clientele-filters button').forEach(x => x.classList.toggle('on', x === b));
    const f = b.dataset.cf;
    $$('.client-card').forEach(c => c.classList.toggle('h', f !== 'all' && c.dataset.sector !== f));
  }
});
$('#form').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.currentTarget;
  if (!form.reportValidity()) return;
  const details = [
    'Hello AMB Home of Interiors, I would like to discuss a project.',
    `Name: ${$('#fn').value.trim()}`,
    `Email: ${$('#fe').value.trim()}`,
    `Phone / WhatsApp: ${$('#fp').value.trim() || 'Not provided'}`,
    `Project type: ${$('#fs').value}`,
    `Location: ${$('#fl').value.trim() || 'Not provided'}`,
    `Approximate size: ${$('#fa').value.trim() || 'Not provided'}`,
    `Project details: ${$('#fm').value.trim()}`
  ];
  const url = `https://wa.me/233599600001?text=${encodeURIComponent(details.join('\n'))}`;
  $('#ok').hidden = false;
  const whatsapp = window.open(url, '_blank');
  if (whatsapp) whatsapp.opener = null;
  else location.href = url;
});
$$('.card,.it').forEach(a => { const g = a.classList.contains('card') ? $$('.card') : $$('.it'); a.href = '#/project/' + ids[g.indexOf(a)] });

/* ── Modern Footer Interactive Features (ENA Ointing style) ── */
function updateGhanaClock() {
  const el = $('#footer-clock');
  if (!el) return;
  const d = new Date();
  const h = String(d.getUTCHours()).padStart(2, '0');
  const m = String(d.getUTCMinutes()).padStart(2, '0');
  el.textContent = `${h}:${m} GMT`;
}
updateGhanaClock();
setInterval(updateGhanaClock, 10000);

const btt = $('#back-to-top');
if (btt) {
  btt.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  function toggleBtt() {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    if (y > 240) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', toggleBtt, { passive: true });
  window.addEventListener('resize', toggleBtt, { passive: true });
  toggleBtt();
}

const giantMark = $('#footer-giant-mark');
const siteFooter = $('#site-footer');
if (giantMark && siteFooter) {
  let mouseStretchX = 1, mouseStretchY = 1;
  function updateGiantMark() {
    if (window.innerWidth <= 768) {
      giantMark.style.transform = 'none';
      giantMark.style.opacity = '1';
      return;
    }
    const rect = giantMark.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.top < vh && rect.bottom > 0) {
      const prog = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height * 0.35)));
      const y = (1 - prog) * 35;
      const scrollScaleY = 1 + (1 - prog) * 0.16;
      const op = Math.min(1, prog * 1.4);
      giantMark.style.transform = `translate3d(0,${y.toFixed(2)}%,0) scale(${mouseStretchX.toFixed(3)},${(scrollScaleY * mouseStretchY).toFixed(3)})`;
      giantMark.style.opacity = op.toFixed(3);
    }
  }
  window.addEventListener('scroll', updateGiantMark, { passive: true });
  window.addEventListener('resize', updateGiantMark, { passive: true });
  updateGiantMark();

  siteFooter.addEventListener('mousemove', e => {
    const r = siteFooter.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    mouseStretchX = 1 + Math.abs(nx) * 0.03;
    mouseStretchY = 1 + Math.abs(ny) * 0.04;
    updateGiantMark();
  });
  siteFooter.addEventListener('mouseleave', () => {
    mouseStretchX = 1;
    mouseStretchY = 1;
    updateGiantMark();
  });
}

function setupAutoplayVideos() {
  const scrollVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const vid = entry.target;
      if (entry.isIntersecting) {
        vid.muted = true;
        vid.defaultMuted = true;
        vid.play().catch(() => { });
      }
    });
  }, { rootMargin: '200px 0px', threshold: 0.01 });

  function initVideo(vid) {
    vid.muted = true;
    vid.defaultMuted = true;
    vid.autoplay = true;
    vid.loop = true;
    vid.playsInline = true;
    vid.setAttribute('autoplay', '');
    vid.setAttribute('muted', '');
    vid.setAttribute('loop', '');
    vid.setAttribute('playsinline', '');
    vid.setAttribute('webkit-playsinline', '');
    vid.setAttribute('disablePictureInPicture', '');
    scrollVideoObserver.observe(vid);
    vid.play().catch(() => { });
  }

  document.querySelectorAll('video').forEach(initVideo);

  // Universal mobile & desktop unlock so videos start automatically without tapping
  const unlockAutoplay = () => {
    document.querySelectorAll('video').forEach(vid => {
      if (vid.paused) {
        vid.muted = true;
        vid.defaultMuted = true;
        vid.play().catch(() => { });
      }
    });
  };
  ['touchstart', 'touchend', 'scroll', 'click'].forEach(evt => {
    window.addEventListener(evt, unlockAutoplay, { passive: true, once: true });
  });
}

setupAutoplayVideos();


