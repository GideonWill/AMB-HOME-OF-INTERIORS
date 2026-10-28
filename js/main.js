
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const nav=$('nav');
function updateNav(){
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
addEventListener('scroll',updateNav,{passive:true});
updateNav();


// preloader
let n=0;const cnt=$('#cnt'),t=setInterval(()=>{n+=Math.ceil(Math.random()*9);if(n>=100){n=100;clearInterval(t);setTimeout(()=>{$('#pre').classList.add('done');const h1=$('#h1');if(h1)h1.classList.add('in')},300)}cnt.textContent=n},60);

// reveal on scroll
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.15});
$$('.rv').forEach(el=>io.observe(el));
// scroll-linked: parallax + pinned horizontal track + hero pin
const track=$('#track'),pin=$('#work'),prog=$('#prog'),par=$$('[data-par]');
let updateHeroScroll = () => {};
function tick(){
  const y=scrollY,vh=innerHeight;
  updateHeroScroll();
  updateNav();
  par.forEach(el=>{const r=el.getBoundingClientRect();el.style.transform=`translateY(${(r.top-vh/2)*-el.dataset.par}px)`});
  if(pin&&track&&prog){const r=pin.getBoundingClientRect(),max=pin.offsetHeight-vh,p=Math.min(1,Math.max(0,-r.top/max));track.style.transform=`translateX(${-p*(track.scrollWidth-innerWidth)}px)`;prog.style.width=p*100+'%'}
  requestAnimationFrame(tick)}
tick();
// service hover image follows cursor
const hov=$('#hov');let mx=0,my=0,cx=0,cy=0;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function f(){cx+=(mx-cx)*.12;cy+=(my-cy)*.12;hov.style.left=cx+'px';hov.style.top=cy+'px';requestAnimationFrame(f)})();
$$('.svc a').forEach(a=>{a.onmouseenter=()=>{if(a.dataset.g)hov.className='ph on '+a.dataset.g};a.onmouseleave=()=>hov.classList.remove('on')});
// router with curtain transition
const P={skyline:{t:'Skyline Residence',c:'Living Space',k:'living',loc:'East Legon, Accra',y:'2025',a:'780 m\u00b2',i:3,g:[12,7,4,1],d:'A residence composed around a panoramic city view, layered with sculpted seating, a sculptural glass chandelier and a fireplace wall in stone.'},solstice:{t:'Solstice Living & Dining',c:'Living Space',k:'living',loc:'Airport Hills, Accra',y:'2025',a:'480 m\u00b2',i:15,g:[15,16,17,18,7,3],d:'A layered double-height living room featuring sculptural ring halo pendants, a monolithic fireplace media wall, and bespoke curved seating overlooking the dining gallery.'},lumina:{t:'Lumina Master Suite',c:'Master Suite',k:'living',loc:'Roman Ridge, Accra',y:'2025',a:'180 m\u00b2',i:16,g:[16,17,18,15,8],d:'A serene primary bedroom defined by an undulating acoustic slat headboard with warm perimeter illumination and a floating architectural tray ceiling.'},noir:{t:'Noir Dining Room',c:'Dining Room',k:'dining',loc:'Airport Residential, Accra',y:'2025',a:'120 m\u00b2',i:5,g:[1,4,10,2],d:'Charcoal panelling, herringbone walnut and halo lighting create a dining room that feels like an evening in itself.'},onyx:{t:'Onyx Spa Ensuite',c:'Spa Ensuite',k:'living',loc:'East Legon Hills, Accra',y:'2024',a:'95 m\u00b2',i:17,g:[17,18,16,15,12],d:'A framed glass sanctuary featuring a freestanding sculptural soaking tub, striated marble wall slabs, and warm natural oak joinery.'},linear:{t:'Linear Dressing Gallery',c:'Dressing Gallery',k:'living',loc:'Cantonments, Accra',y:'2024',a:'110 m\u00b2',i:18,g:[18,16,17,15,1],d:'A bespoke walk-in wardrobe gallery lined with smoked glass vitrines, tailored interior illumination, and floor-to-ceiling shoe shelving in natural timber.'},halo:{t:'Halo Penthouse',c:'Living Space',k:'living',loc:'Cantonments, Accra',y:'2024',a:'540 m\u00b2',i:8,g:[7,12,2,10],d:'A starlit ceiling, glass staircase and a fireplace set into white stone turn a penthouse lounge into a night-sky retreat.'},atelier:{t:"Chef's Atelier",c:'Kitchen',k:'kitchen',loc:'Labone, Accra',y:'2024',a:'210 m\u00b2',i:6,g:[1,2,12,4,14],d:'A waterfall marble island, matte black cabinetry and a crystal light bar make this kitchen a stage for entertaining.'},spiral:{t:'Spiral House',c:'Living Space',k:'living',loc:'Trasacco Valley, Accra',y:'2023',a:'960 m\u00b2',i:9,g:[10,12,7,4],d:'A sculpted timber staircase sweeps through a double-height lounge, polished marble floors carrying light through every room.'},kyoto:{t:'Kyoto Suite',c:'Living Space',k:'living',loc:'Osu, Accra',y:'2023',a:'320 m\u00b2',i:11,g:[12,7,2,10],d:'Timber lattice screens, warm cove lighting and a mirror-polished floor bring quiet Japanese restraint to an Accra apartment.'},ember:{t:'Ember Kitchen',c:'Kitchen',k:'kitchen',loc:'Dzorwulu, Accra',y:'2022',a:'—',i:1,g:[6,2,14],d:'Explore this Dzorwulu kitchen through photographs of considered cabinetry, natural finishes and contemporary kitchen design.'},aura:{t:'Aura Smart Kitchen',c:'Kitchen',k:'kitchen',loc:'Tema, Community 25',y:'2022',a:'—',i:2,g:[6,1,14],d:'Explore this Tema kitchen through photographs of bright, modern interiors and refined kitchen detailing.'},blossom:{t:'Blossom Dining',c:'Dining Room',k:'dining',loc:'Weija, Accra',y:'2021',a:'—',i:4,g:[5],d:'Explore this Weija dining room through photographs of considered dining spaces, warm lighting and contemporary interiors.'},azure:{t:'Azure Lounge',c:'Living Space',k:'living',loc:'Spintex, Accra',y:'2021',a:'—',i:7,g:[3,8,11],d:'Explore this Spintex lounge through photographs of relaxed living spaces, architectural detail and contemporary interiors.'},foyer:{t:'Grand Foyer',c:'Living Space',k:'living',loc:'Aburi',y:'2020',a:'—',i:10,g:[9,12,3],d:'Explore this Aburi foyer through photographs of elegant interior spaces, sculptural forms and considered material details.'},marble:{t:'Marble Gallery House',c:'Living Space',k:'living',loc:'Adjiringanor',y:'2020',a:'—',i:12,g:[3,7,11],d:'Explore this Adjiringanor residence through photographs of polished surfaces, thoughtful proportions and contemporary living spaces.'}};
const ids=Object.keys(P);
const imageFiles={1:'01-dark-kitchen.jpg',2:'02-white-smart-kitchen.jpg',3:'living%20room%201.jpeg',4:'04-white-dining-pendants.jpg',5:'05-dark-dining-halo-lights.jpg',6:'chefs-atelier.jpg',7:'07-modern-living-blue-curtains.jpg',8:'interior%201.jpeg',9:'living%20room%202.jpeg',10:'10-grand-hall-chandelier.jpg',11:'kyoto-suite.jpg',12:'12-marble-floor-living.jpg',14:'14-white-and-charcoal-kitchen.png',15:'15-solstice-lounge.jpg',16:'16-lumina-master-suite.jpg',17:'17-glass-spa-ensuite.jpg',18:'18-atelier-dressing-gallery.jpg'};
const imagePath=id=>`images/${imageFiles[id]}`;
const viewer=$('#gallery-viewer'),viewerImage=$('#viewer-image'),viewerTitle=$('#viewer-title'),viewerCount=$('#viewer-count'),viewerCaption=$('#viewer-caption'),viewerThumbs=$('#viewer-thumbs');
let galleryImages=[],galleryIndex=0,galleryTitle='';
function renderGallery(){
  const image=galleryImages[galleryIndex];
  viewerImage.src=imagePath(image);
  viewerImage.alt=`${galleryTitle}, interior photo ${galleryIndex+1} of ${galleryImages.length}`;
  viewerTitle.textContent=galleryTitle;
  viewerCount.textContent=`${String(galleryIndex+1).padStart(2,'0')} / ${String(galleryImages.length).padStart(2,'0')}`;
  viewerCaption.textContent=`${galleryTitle} · Photo ${galleryIndex+1}`;
  viewerThumbs.innerHTML=galleryImages.map((photo,index)=>`<button class="viewer-thumb${index===galleryIndex?' active':''}" type="button" data-viewer-index="${index}" aria-label="Show photo ${index+1}" aria-pressed="${index===galleryIndex}"><img src="${imagePath(photo)}" alt="" loading="lazy"></button>`).join('');
}
function moveGallery(step){galleryIndex=(galleryIndex+step+galleryImages.length)%galleryImages.length;renderGallery()}
function openGallery(index){
  galleryIndex=index;
  renderGallery();
  viewer.showModal();
}
$('#pj-open').addEventListener('click',()=>openGallery(0));
$('#pj-g').addEventListener('click',e=>{const photo=e.target.closest('[data-gallery-index]');if(photo)openGallery(Number(photo.dataset.galleryIndex))});
$('#viewer-close').addEventListener('click',()=>viewer.close());
$('#viewer-prev').addEventListener('click',()=>moveGallery(-1));
$('#viewer-next').addEventListener('click',()=>moveGallery(1));
viewerThumbs.addEventListener('click',e=>{const thumb=e.target.closest('[data-viewer-index]');if(thumb){galleryIndex=Number(thumb.dataset.viewerIndex);renderGallery()}});
viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});
$('#track').innerHTML=ids.slice(0,4).map(id=>`<a class="card" href="#/project/${id}"><div class="ph im${P[id].i}"></div><small>${P[id].c} \u00b7 ${P[id].y}</small><h3 class="serif">${P[id].t}</h3></a>`).join('');
$('.grid').innerHTML=ids.map(id=>`<a class="it rv" data-c="${P[id].k}" href="#/project/${id}"><div class="w"><div class="ph im${P[id].i}"></div></div><small>${P[id].c} \u00b7 ${P[id].y}</small><h3 class="serif">${P[id].t}</h3></a>`).join('');
$$('.grid .it').forEach(e=>io.observe(e));
// ── Senawa-style Pinned Hero Controller ────────────────────────
const heroPin = document.getElementById('hero-pin');
const heroTrack = document.getElementById('hero-track');
const heroStrip = document.getElementById('hero-strip');
const heroBarProg = document.getElementById('hero-bar-prog');

const heroProjectKeys = ['skyline', 'noir', 'halo', 'atelier', 'spiral', 'kyoto'];
const heroProjects = heroProjectKeys.map(k => ({ id: k, ...P[k], imgSrc: imagePath(P[k].i) }));

if (heroTrack && heroStrip) {
  // Render hero slides
  heroTrack.innerHTML = heroProjects.map((p, idx) => `
    <div class="hero-slide${idx === 0 ? ' active' : ''}" data-hero-index="${idx}">
      <img class="hero-slide-img" src="${p.imgSrc}" alt="${p.t}" loading="${idx < 2 ? 'eager' : 'lazy'}">
      <div class="hero-slide-overlay"></div>
      <div class="hero-slide-card">
        <span class="hero-slide-tag">${p.y} &nbsp;·&nbsp; ${p.c} &nbsp;·&nbsp; ${p.loc}</span>
        <h2 class="hero-slide-name">${p.t}</h2>
        <a class="hero-slide-cta" href="#/project/${p.id}">View Project <span>→</span></a>
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
  updateHeroScroll = function() {
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
const AR=ids.map(id=>({id,t:P[id].t,ty:P[id].c,loc:P[id].loc,y:P[id].y,i:P[id].i})).sort((a,b)=>b.y-a.y);
const archEl=$('#arch');
if(archEl){
  archEl.innerHTML=AR.map(r=>`<a href="#/project/${r.id}" class="row" data-i="${r.i}"><span>${r.y}</span><b>${r.t}</b><span>${r.ty}</span><span>${r.loc}</span><span>\u2197</span></a>`).join('');
  $$('.arch .row').forEach(a=>{a.onmouseenter=()=>{hov.className='ph on im'+a.dataset.i};a.onmouseleave=()=>hov.classList.remove('on')});
}
const menu=$('#menu'),mt=o=>{menu.classList.toggle('open',o);document.body.style.overflow=o?'hidden':''};
$('#mbtn').onclick=()=>mt(true);$('#mx').onclick=()=>mt(false);menu.addEventListener('click',e=>{if(e.target.closest('li a'))mt(false)});
addEventListener('keydown',e=>{if(e.key==='Escape')mt(false);if(viewer.open&&e.key==='ArrowLeft'){e.preventDefault();moveGallery(-1)}if(viewer.open&&e.key==='ArrowRight'){e.preventDefault();moveGallery(1)}});
function fill(id){
  const p=P[id],i=ids.indexOf(id),n=(i+1)%ids.length;
  $('#pj-img').className='ph im'+p.i;
  $('#pj-c').textContent=p.c;
  $('#pj-tt').textContent=p.t;
  $('#pj-l').textContent=p.loc;
  $('#pj-y').textContent=p.y;
  $('#pj-a').textContent=p.a;
  $('#pj-k').textContent=p.c;
  $('#pj-d').textContent=p.d;
  galleryImages=[p.i,...p.g];
  galleryTitle=p.t;
  $('#pj-g').innerHTML=galleryImages.map((k,index)=>`<button class="gallery-thumb" type="button" data-gallery-index="${index}" aria-label="Open photo ${index+1} of ${galleryImages.length} for ${p.t}"><img class="gallery-photo" src="${imagePath(k)}" alt="${p.t}, interior photo ${index+1}" loading="${index<2?'eager':'lazy'}"></button>`).join('');
  $('#pj-n').href='#/project/'+ids[n];
  $('#pj-nt').textContent=P[ids[n]].t;
}
const cur=$('#cur'),R=['','about','projects','clientele','archive','services','contact'];let now=null;
const cio=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){
  const el=x.target,to=+el.dataset.count,sfx=el.dataset.suffix||'',pfx=el.dataset.prefix||'',s=performance.now();
  (function u(t){const k=Math.min(1,(t-s)/1800);el.textContent=pfx+Math.round(to*(1-Math.pow(1-k,3)))+sfx;if(k<1)requestAnimationFrame(u)})(s);
  cio.unobserve(el);
}}));
$$('[data-count]').forEach(el=>cio.observe(el));
function show(r){
  if(viewer.open)viewer.close();
  const pr=r.startsWith('project/');
  const isClientele=r==='clientele'||r==='archive';
  $$('.links a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#/'+(pr?'projects':(isClientele?'clientele':r))));
  if(pr)fill(r.slice(8));
  const id=pr?'project':(isClientele?'clientele':r);
  $$('.page').forEach(p=>p.classList.toggle('on',p.id==='p-'+id));
  if(pr)$$('#p-project .rv').forEach(el=>el.classList.add('in'));
  if(id==='contact')$$('#p-contact .rv').forEach(el=>el.classList.add('in'));
  scrollTo(0,0);
  updateNav();
  if(id==='projects'){
    const pvid=document.getElementById('projects-hero-video');
    if(pvid)pvid.play().catch(()=>{});
  }
  const h=$('#p-'+id+' .pho h1');
  if(h){h.classList.remove('in');setTimeout(()=>h.classList.add('in'),80)}
}
function route(){let r=location.hash.replace('#/','').replace('#','');if(!R.includes(r)&&!(r.startsWith('project/')&&P[r.slice(8)]))r='';if(r===now)return;const first=now===null;now=r;if(first){show(r);return}
 cur.className='cur c';setTimeout(()=>{show(r);cur.className='cur o';setTimeout(()=>{cur.style.transition='none';cur.className='cur';requestAnimationFrame(()=>requestAnimationFrame(()=>cur.style.transition=''))},800)},780)}
addEventListener('hashchange',route);route();
$$('.chips button').forEach(b=>b.onclick=()=>{$$('.chips button').forEach(x=>x.classList.toggle('on',x===b));$$('.it').forEach(i=>i.classList.toggle('h',b.dataset.f!=='all'&&i.dataset.c!==b.dataset.f))});
$$('.clientele-filters button').forEach(b=>{b.onclick=()=>{
  $$('.clientele-filters button').forEach(x=>x.classList.toggle('on',x===b));
  const f=b.dataset.cf;
  $$('.client-card').forEach(c=>c.classList.toggle('h',f!=='all'&&c.dataset.sector!==f));
}});
$('#form').addEventListener('submit',e=>{
  e.preventDefault();
  const form=e.currentTarget;
  if(!form.reportValidity())return;
  const details=[
    'Hello AMB Home of Interiors, I would like to discuss a project.',
    `Name: ${$('#fn').value.trim()}`,
    `Email: ${$('#fe').value.trim()}`,
    `Phone / WhatsApp: ${$('#fp').value.trim()||'Not provided'}`,
    `Project type: ${$('#fs').value}`,
    `Location: ${$('#fl').value.trim()||'Not provided'}`,
    `Approximate size: ${$('#fa').value.trim()||'Not provided'}`,
    `Project details: ${$('#fm').value.trim()}`
  ];
  const url=`https://wa.me/233599600001?text=${encodeURIComponent(details.join('\n'))}`;
  $('#ok').hidden=false;
  const whatsapp=window.open(url,'_blank');
  if(whatsapp)whatsapp.opener=null;
  else location.href=url;
});
$$('.card,.it').forEach(a=>{const g=a.classList.contains('card')?$$('.card'):$$('.it');a.href='#/project/'+ids[g.indexOf(a)]});

/* ── Modern Footer Interactive Features (ENA Ointing style) ── */
function updateGhanaClock(){
  const el=$('#footer-clock');
  if(!el)return;
  const d=new Date();
  const h=String(d.getUTCHours()).padStart(2,'0');
  const m=String(d.getUTCMinutes()).padStart(2,'0');
  el.textContent=`${h}:${m} GMT`;
}
updateGhanaClock();
setInterval(updateGhanaClock,10000);

const btt=$('#back-to-top');
if(btt){
  btt.addEventListener('click',e=>{
    e.preventDefault();
    window.scrollTo({top:0,behavior:'smooth'});
  });
  function toggleBtt(){
    const y=window.scrollY||document.documentElement.scrollTop||0;
    if(y>240){
      btt.classList.add('visible');
    }else{
      btt.classList.remove('visible');
    }
  }
  window.addEventListener('scroll',toggleBtt,{passive:true});
  window.addEventListener('resize',toggleBtt,{passive:true});
  toggleBtt();
}

const giantMark=$('#footer-giant-mark');
const siteFooter=$('#site-footer');
if(giantMark&&siteFooter){
  let mouseStretchX=1,mouseStretchY=1;
  function updateGiantMark(){
    if(window.innerWidth<=768){
      giantMark.style.transform='none';
      giantMark.style.opacity='1';
      return;
    }
    const rect=giantMark.getBoundingClientRect();
    const vh=window.innerHeight;
    if(rect.top<vh&&rect.bottom>0){
      const prog=Math.min(1,Math.max(0,(vh-rect.top)/(vh+rect.height*0.35)));
      const y=(1-prog)*35;
      const scrollScaleY=1+(1-prog)*0.16;
      const op=Math.min(1,prog*1.4);
      giantMark.style.transform=`translate3d(0,${y.toFixed(2)}%,0) scale(${mouseStretchX.toFixed(3)},${(scrollScaleY*mouseStretchY).toFixed(3)})`;
      giantMark.style.opacity=op.toFixed(3);
    }
  }
  window.addEventListener('scroll',updateGiantMark,{passive:true});
  window.addEventListener('resize',updateGiantMark,{passive:true});
  updateGiantMark();

  siteFooter.addEventListener('mousemove',e=>{
    const r=siteFooter.getBoundingClientRect();
    const nx=(e.clientX-r.left)/r.width-0.5;
    const ny=(e.clientY-r.top)/r.height-0.5;
    mouseStretchX=1+Math.abs(nx)*0.03;
    mouseStretchY=1+Math.abs(ny)*0.04;
    updateGiantMark();
  });
  siteFooter.addEventListener('mouseleave',()=>{
    mouseStretchX=1;
    mouseStretchY=1;
    updateGiantMark();
  });
}

