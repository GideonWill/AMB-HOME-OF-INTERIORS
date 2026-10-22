
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const nav=$('nav');
function updateNav(){nav.classList.toggle('nav-scrolled',scrollY>24)}
addEventListener('scroll',updateNav,{passive:true});
updateNav();

// preloader
let n=0;const cnt=$('#cnt'),t=setInterval(()=>{n+=Math.ceil(Math.random()*9);if(n>=100){n=100;clearInterval(t);setTimeout(()=>{$('#pre').classList.add('done');$('#h1').classList.add('in')},300)}cnt.textContent=n},60);
// reveal on scroll
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.15});
$$('.rv').forEach(el=>io.observe(el));
// scroll-linked: parallax + pinned horizontal track
const track=$('#track'),pin=$('#work'),prog=$('#prog'),par=$$('[data-par]'),hero=$('#heroimg');
function tick(){
  const y=scrollY,vh=innerHeight;
  par.forEach(el=>{const r=el.getBoundingClientRect();el.style.transform=`translateY(${(r.top-vh/2)*-el.dataset.par}px)`});
  const r=pin.getBoundingClientRect(),max=pin.offsetHeight-vh,p=Math.min(1,Math.max(0,-r.top/max));
  track.style.transform=`translateX(${-p*(track.scrollWidth-innerWidth)}px)`;prog.style.width=p*100+'%';
  requestAnimationFrame(tick)}
tick();
// service hover image follows cursor
const hov=$('#hov');let mx=0,my=0,cx=0,cy=0;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function f(){cx+=(mx-cx)*.12;cy+=(my-cy)*.12;hov.style.left=cx+'px';hov.style.top=cy+'px';requestAnimationFrame(f)})();
$$('.svc a').forEach(a=>{a.onmouseenter=()=>{if(a.dataset.g)hov.className='ph on '+a.dataset.g};a.onmouseleave=()=>hov.classList.remove('on')});
// router with curtain transition
const P={skyline:{t:'Skyline Residence',c:'Living Space',k:'living',loc:'East Legon, Accra',y:'2025',a:'780 m\u00b2',i:3,g:[12,7,4,1],d:'A residence composed around a panoramic city view, layered with sculpted seating, a sculptural glass chandelier and a fireplace wall in stone.'},noir:{t:'Noir Dining Room',c:'Dining Room',k:'dining',loc:'Airport Residential, Accra',y:'2025',a:'120 m\u00b2',i:5,g:[1,4,10,2],d:'Charcoal panelling, herringbone walnut and halo lighting create a dining room that feels like an evening in itself.'},halo:{t:'Halo Penthouse',c:'Living Space',k:'living',loc:'Cantonments, Accra',y:'2024',a:'540 m\u00b2',i:8,g:[7,12,2,10],d:'A starlit ceiling, glass staircase and a fireplace set into white stone turn a penthouse lounge into a night-sky retreat.'},atelier:{t:"Chef's Atelier",c:'Kitchen',k:'kitchen',loc:'Labone, Accra',y:'2024',a:'210 m\u00b2',i:6,g:[1,2,12,4],d:'A waterfall marble island, matte black cabinetry and a crystal light bar make this kitchen a stage for entertaining.'},spiral:{t:'Spiral House',c:'Living Space',k:'living',loc:'Trasacco Valley, Accra',y:'2023',a:'960 m\u00b2',i:9,g:[10,12,7,4],d:'A sculpted timber staircase sweeps through a double-height lounge, polished marble floors carrying light through every room.'},kyoto:{t:'Kyoto Suite',c:'Living Space',k:'living',loc:'Osu, Accra',y:'2023',a:'320 m\u00b2',i:11,g:[12,7,2,10],d:'Timber lattice screens, warm cove lighting and a mirror-polished floor bring quiet Japanese restraint to an Accra apartment.'},ember:{t:'Ember Kitchen',c:'Kitchen',k:'kitchen',loc:'Dzorwulu, Accra',y:'2022',a:'—',i:1,g:[6,2],d:'Explore this Dzorwulu kitchen through photographs of considered cabinetry, natural finishes and contemporary kitchen design.'},aura:{t:'Aura Smart Kitchen',c:'Kitchen',k:'kitchen',loc:'Tema, Community 25',y:'2022',a:'—',i:2,g:[6,1],d:'Explore this Tema kitchen through photographs of bright, modern interiors and refined kitchen detailing.'},blossom:{t:'Blossom Dining',c:'Dining Room',k:'dining',loc:'Weija, Accra',y:'2021',a:'—',i:4,g:[5],d:'Explore this Weija dining room through photographs of considered dining spaces, warm lighting and contemporary interiors.'},azure:{t:'Azure Lounge',c:'Living Space',k:'living',loc:'Spintex, Accra',y:'2021',a:'—',i:7,g:[3,8,11],d:'Explore this Spintex lounge through photographs of relaxed living spaces, architectural detail and contemporary interiors.'},foyer:{t:'Grand Foyer',c:'Living Space',k:'living',loc:'Aburi',y:'2020',a:'—',i:10,g:[9,12,3],d:'Explore this Aburi foyer through photographs of elegant interior spaces, sculptural forms and considered material details.'},marble:{t:'Marble Gallery House',c:'Living Space',k:'living',loc:'Adjiringanor',y:'2020',a:'—',i:12,g:[3,7,11],d:'Explore this Adjiringanor residence through photographs of polished surfaces, thoughtful proportions and contemporary living spaces.'}};
const ids=Object.keys(P);
const viewer=$('#gallery-viewer'),viewerImage=$('#viewer-image'),viewerTitle=$('#viewer-title'),viewerCount=$('#viewer-count'),viewerCaption=$('#viewer-caption'),viewerThumbs=$('#viewer-thumbs');
let galleryImages=[],galleryIndex=0,galleryTitle='';
function renderGallery(){
  const image=galleryImages[galleryIndex];
  viewerImage.className='ph im'+image;
  viewerImage.setAttribute('aria-label',`${galleryTitle}, photo ${galleryIndex+1} of ${galleryImages.length}`);
  viewerTitle.textContent=galleryTitle;
  viewerCount.textContent=`${String(galleryIndex+1).padStart(2,'0')} / ${String(galleryImages.length).padStart(2,'0')}`;
  viewerCaption.textContent=`${galleryTitle} · Photo ${galleryIndex+1}`;
  viewerThumbs.innerHTML=galleryImages.map((photo,index)=>`<button class="viewer-thumb${index===galleryIndex?' active':''}" type="button" data-viewer-index="${index}" aria-label="Show photo ${index+1}" aria-pressed="${index===galleryIndex}"><span class="ph im${photo}" aria-hidden="true"></span></button>`).join('');
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
$('#idx').innerHTML=ids.slice(0,6).map((id,k)=>`<a href="#/project/${id}" data-i="${P[id].i}"><span>0${k+1}</span><b>${P[id].t}</b><em>${P[id].c}</em></a>`).join('');
const h2=$('#heroimg2');$$('#idx a').forEach(a=>{a.onmouseenter=()=>{h2.className='ph on im'+a.dataset.i};a.onmouseleave=()=>h2.classList.remove('on')});
const AR=ids.map(id=>({id,t:P[id].t,ty:P[id].c,loc:P[id].loc,y:P[id].y,i:P[id].i})).sort((a,b)=>b.y-a.y);
$('#arch').innerHTML=AR.map(r=>`<a href="#/project/${r.id}" class="row" data-i="${r.i}"><span>${r.y}</span><b>${r.t}</b><span>${r.ty}</span><span>${r.loc}</span><span>\u2197</span></a>`).join('');
$$('.arch .row').forEach(a=>{a.onmouseenter=()=>{hov.className='ph on im'+a.dataset.i};a.onmouseleave=()=>hov.classList.remove('on')});
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
  $('#pj-g').innerHTML=galleryImages.map((k,index)=>`<button class="gallery-thumb" type="button" data-gallery-index="${index}" aria-label="Open photo ${index+1} of ${galleryImages.length} for ${p.t}"><span class="ph im${k}" aria-hidden="true"></span></button>`).join('');
  $('#pj-n').href='#/project/'+ids[n];
  $('#pj-nt').textContent=P[ids[n]].t;
}
const cur=$('#cur'),R=['','about','projects','archive','services','contact'];let now=null;
const cio=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){const el=x.target,to=+el.dataset.count,s=performance.now();(function u(t){const k=Math.min(1,(t-s)/1800);el.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(u)})(s);cio.unobserve(el)}}));
$$('[data-count]').forEach(el=>cio.observe(el));
function show(r){
  if(viewer.open)viewer.close();
  const pr=r.startsWith('project/');
  $$('.links a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#/'+(pr?'projects':r)));
  if(pr)fill(r.slice(8));
  const id=pr?'project':r;
  $$('.page').forEach(p=>p.classList.toggle('on',p.id==='p-'+id));
  if(pr)$$('#p-project .rv').forEach(el=>el.classList.add('in'));
  if(id==='contact')$$('#p-contact .rv').forEach(el=>el.classList.add('in'));
  scrollTo(0,0);
  const h=$('#p-'+id+' .pho h1');
  if(h){h.classList.remove('in');setTimeout(()=>h.classList.add('in'),80)}
}
function route(){let r=location.hash.replace('#/','').replace('#','');if(!R.includes(r)&&!(r.startsWith('project/')&&P[r.slice(8)]))r='';if(r===now)return;const first=now===null;now=r;if(first){show(r);return}
 cur.className='cur c';setTimeout(()=>{show(r);cur.className='cur o';setTimeout(()=>{cur.style.transition='none';cur.className='cur';requestAnimationFrame(()=>requestAnimationFrame(()=>cur.style.transition=''))},800)},780)}
addEventListener('hashchange',route);route();
$$('.chips button').forEach(b=>b.onclick=()=>{$$('.chips button').forEach(x=>x.classList.toggle('on',x===b));$$('.it').forEach(i=>i.classList.toggle('h',b.dataset.f!=='all'&&i.dataset.c!==b.dataset.f))});
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
