'use strict';
const svgPaths={home:'<path d="m4 10 8-6 8 6v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>',about:'<circle cx="12" cy="8" r="3.5"/><path d="M5 20v-1a7 7 0 0 1 14 0v1"/>',work:'<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M8 7V4h8v3M3 12a24 24 0 0 0 18 0M12 11v4"/>',services:'<path d="m12 3 2.8 6.2L21 12l-6.2 2.8L12 21l-2.8-6.2L3 12l6.2-2.8z"/>',store:'<rect x="4" y="8" width="16" height="13" rx="4"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',notes:'<rect x="5" y="3" width="14" height="18" rx="3"/><path d="M9 8h6M9 12h6M9 16h4"/>',search:'<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/>',sun:'<circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>',heart:'<path d="M19.8 5.3a5 5 0 0 0-7.1 0l-.7.7-.7-.7a5 5 0 0 0-7.1 7.1L12 20l7.8-7.6a5 5 0 0 0 0-7.1z"/>',grid:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',list:'<path d="M9 6h11M9 12h11M9 18h11M4 6h.1M4 12h.1M4 18h.1"/>',check:'<path d="m6 12 4 4 8-9"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="4"/><path d="m4 7 8 6 8-6"/>',link:'<path d="m10 14 4-4M8 16l-1 1a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m0 2 1-1a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0"/>',more:'<circle cx="5" cy="12" r=".8"/><circle cx="12" cy="12" r=".8"/><circle cx="19" cy="12" r=".8"/>'};
const icon=name=>`<svg viewBox="0 0 24 24" aria-hidden="true">${svgPaths[name]||svgPaths.services}</svg>`;
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
const items=[['Agency Starter','Template','Studio website',79,'fVGivzFXQoz0zOnsl0jG4H8auQI.jpg',true],['Studio Folio','Template','Portfolio site',69,'dxjqn8XQifGPfW3axanUsDTxKR0.jpg',false],['Motion Blocks','Component','Scroll effects',29,'CO5pN4LUSwciGPz6IQtZEtOTVc.jpg',false],['Core UI Kit','UI Kit','Interface kit',49,'gaxRdhHkdMqfvaZlOFyUCSmGPcw.jpg',false],['Form Kit','Component','Website forms',19,'HvrZcpa2rvnSDCNaeekAMGUu0yc.jpg',false],['Wireframe Kit','UI Kit','Fast wireframes',39,'beolGvIyj2vUPdLyziDvJbBCKU.jpg',false]];
function renderCollection(filter='All'){
  const root=document.querySelector('#products');if(!root)return;
  const result=items.filter(p=>filter==='All'||p[1]===filter);
  // The board intentionally shows two specimens: a first-viewport design study.
  root.innerHTML=result.slice(0,2).map(p=>`<article class="product"><div class="product-image"><img src="../sidefolio/dist/assets/${p[4]}" alt="${p[0]} preview"><span class="product-badge"><svg viewBox="0 0 12 18" aria-hidden="true"><path d="M1 1h10v5H6l5 5H6v6l-5-5V7h5L1 2z"/></svg> ${p[1]==='UI Kit'?'Figma':'Framer'}</span>${p[5]?'<span class="product-badge new">New</span>':''}<span class="image-arrow">↗</span></div><div class="product-info"><div><h2>${p[0]}</h2><p>${p[1]} &nbsp;·&nbsp; ${p[2]}</p></div><span class="price">$${p[3]}</span></div></article>`).join('');
  document.querySelector('#result-count').textContent=String(result.length).padStart(2,'0')+' objects';
}
renderCollection();
let toastTimer;
function notice(message){const el=document.querySelector('.demo-toast');if(!el)return;el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2400)}
document.addEventListener('click',e=>{
  const button=e.target.closest('button');if(!button)return;
  if(button.dataset.filter){document.querySelectorAll('[data-filter]').forEach(el=>{el.classList.toggle('active',el===button);el.setAttribute('aria-pressed',el===button)});renderCollection(button.dataset.filter)}
  if(button.dataset.view){document.querySelectorAll('[data-view]').forEach(el=>{el.classList.toggle('active',el===button);el.setAttribute('aria-pressed',el===button)});document.querySelector('#products')?.classList.toggle('list',button.dataset.view==='list')}
  if(button.dataset.nav)notice(`${button.dataset.nav} — navigation style preview`);
  if(button.dataset.notice)notice(button.dataset.notice);
  if(button.hasAttribute('data-open-contact'))document.querySelector('#contact-concept')?.showModal();
  if(button.hasAttribute('data-open-search'))document.querySelector('#search-concept')?.showModal();
});
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
