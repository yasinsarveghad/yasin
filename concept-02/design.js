'use strict';
function icons(root=document){root.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon))}
const products=[
  {id:'agency-starter',name:'Agency Starter',type:'Template',detail:'Studio website',price:79,image:'fVGivzFXQoz0zOnsl0jG4H8auQI.jpg'},
  {id:'studio-folio',name:'Studio Folio',type:'Template',detail:'Portfolio site',price:69,image:'dxjqn8XQifGPfW3axanUsDTxKR0.jpg'},
  {id:'motion-blocks',name:'Motion Blocks',type:'Component',detail:'Scroll effects',price:29,image:'CO5pN4LUSwciGPz6IQtZEtOTVc.jpg'},
  {id:'core-ui-kit',name:'Core UI Kit',type:'UI Kit',detail:'Interface kit',price:49,image:'gaxRdhHkdMqfvaZlOFyUCSmGPcw.jpg'},
  {id:'form-kit',name:'Form Kit',type:'Component',detail:'Website forms',price:19,image:'HvrZcpa2rvnSDCNaeekAMGUu0yc.jpg'},
  {id:'wireframe-kit',name:'Wireframe Kit',type:'UI Kit',detail:'Fast wireframes',price:39,image:'beolGvIyj2vUPdLyziDvJbBCKU.jpg'}
];
const assets='../sidefolio/dist/assets/';
const navItems=[{id:'home',label:'Home'},{id:'work',label:'Work'},{id:'store',label:'Store'},{id:'about',label:'About'},{id:'more',label:'More'}];
const destinations=[['home','Home'],['about','About'],['work','Selected work'],['services','Services'],['store','The collection'],['blog','Journal'],['contact','Contact']];
const dock=document.querySelector('[data-dock]'),main=document.querySelector('main');
const compact=matchMedia('(max-width:1099px)'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
const routeFromHash=()=>{const r=location.hash.replace(/^#\/?/,'');return ['home','work','store','about','services','blog','contact'].includes(r)?r:'home'};
let section=routeFromHash(),category='All',view='grid',keyboard=false,moreOpen=false,searchIndex=-1;
const saved=new Set();
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Port of the exact Titana liquidSlots geometry; the vertical adaptation applies
// this single axis to Y, and reserves the source's 92px minimum for the lens.
function liquidSlots(width,count,active,labelWidth,rtl=false){
  const pad=6,gap=2,inner=Math.max(0,width-pad*2-gap*Math.max(0,count-1));
  const base=inner/Math.max(1,count);
  const selected=active<0?base:Math.min(Math.max(92,labelWidth+54),Math.max(base,inner-Math.max(0,count-1)*40));
  const other=count>1?(inner-(active>=0?selected:base))/(count-1):inner;
  let cursor=pad;
  return Array.from({length:count},(_,i)=>{const w=active<0?base:i===active?selected:other;const left=rtl?width-cursor-w:cursor;cursor+=w+gap;return {left,width:w}});
}

let expanded=false;
const allItems=[...navItems.slice(0,4),{id:'services',label:'Services'},{id:'blog',label:'Journal'},{id:'contact',label:'Contact'}];
const navIcon=id=>id==='blog'?'notes':id==='contact'?'mail':id;
function buildDock(){
 const items=expanded?allItems:navItems;
 dock.dataset.expanded=expanded;dock.querySelector('.dock-extra').inert=!expanded;
 dock.querySelector('.dock-buttons').innerHTML=items.map(item=>`<button type="button" class="liquid-nav-item" data-route="${item.id}" aria-label="${item.label}" title="${item.label}" ${item.id==='more'?'aria-controls="more-panel" aria-expanded="false"':''}><span class="nav-icon">${icon(navIcon(item.id))}</span><span class="liquid-label" aria-hidden="true"><span>${item.label}</span></span></button>`).join('');
}
dock.insertAdjacentHTML('beforeend','<div class="dock-heading" aria-hidden="true">Explore your space</div><div class="dock-extra"><button data-search aria-label="Search">'+icon('search')+'</button><button data-theme aria-label="Switch appearance">'+icon('sun')+'</button><button data-collapse aria-label="Collapse navigation">'+icon('close')+'</button></div>');
function setExpanded(value,focus=false){
 expanded=value&&!compact.matches;buildDock();layoutDock();
 if(focus)(dock.querySelector('[data-selected=true]')||dock.querySelector('[data-route=more]'))?.focus({preventScroll:true});
}
function layoutDock(){
 const axis=compact.matches?'horizontal':'vertical';dock.dataset.axis=axis;
 const items=expanded?allItems:navItems;
 const value=moreOpen?'more':items.some(n=>n.id===section)?section:'more';
 const active=Math.max(0,items.findIndex(n=>n.id===value)),buttons=[...dock.querySelectorAll('.liquid-nav-item')];
 if(!buttons.length)return;
 const extent=axis==='vertical'?dock.clientHeight:dock.clientWidth;
 const textWidth=buttons[active].querySelector('.liquid-label>span').scrollWidth;
 const expandedRow=Math.min(58,(extent-120)/7);
 const slots=expanded?buttons.map((_,i)=>({left:52+i*expandedRow,width:expandedRow-2})):liquidSlots(extent,buttons.length,active,axis==='vertical'?0:textWidth);
 const lens=dock.querySelector('.liquid-lens');
 if(axis==='vertical'){
  lens.style.width=(expanded?dock.clientWidth-14:62)+'px';lens.style.height=slots[active].width+'px';lens.style.transform='translateY('+slots[active].left+'px)';
 }else{
  lens.style.height='52px';lens.style.width=slots[active].width+'px';lens.style.transform='translateX('+slots[active].left+'px)';
 }
 buttons.forEach((button,i)=>{
  button.dataset.selected=i===active;
  if(i===active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
  if(button.dataset.route==='more')button.setAttribute('aria-expanded',moreOpen);
  button.style.height=expanded?slots[i].width+'px':axis==='vertical'?'62px':'52px';
  button.style.width=(axis==='vertical'?(expanded?dock.clientWidth-14:62):slots[i].width)+'px';
  button.style.transform=axis==='vertical'?'translateY('+(expanded?slots[i].left:slots[i].left+(slots[i].width-62)/2)+'px)':'translateX('+slots[i].left+'px)';
 });dock.dataset.ready='true';
}
buildDock();
new ResizeObserver(layoutDock).observe(dock);
compact.addEventListener('change',()=>{setExpanded(false);if(document.querySelector('#more-panel').open)document.querySelector('#more-panel').close();layoutDock()});
document.fonts.ready.then(()=>{layoutDock();requestAnimationFrame(()=>requestAnimationFrame(()=>document.body.classList.add('ui-ready')))});
dock.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&expanded){setExpanded(false);dock.querySelector('[data-route=more]').focus();return}
 const button=e.target.closest('.liquid-nav-item');if(!button)return;
 const buttons=[...dock.querySelectorAll('.liquid-nav-item')],i=buttons.indexOf(button);let next=i;
 const previous=compact.matches?'ArrowLeft':'ArrowUp',following=compact.matches?'ArrowRight':'ArrowDown';
 if(e.key==='Home')next=0;else if(e.key==='End')next=buttons.length-1;
 else if(e.key===previous)next=(i-1+buttons.length)%buttons.length;
 else if(e.key===following)next=(i+1)%buttons.length;else return;
 e.preventDefault();buttons[next].focus();
});
document.addEventListener('pointerdown',e=>{if(expanded&&!dock.contains(e.target))setExpanded(false)});
document.addEventListener('keydown',()=>{keyboard=true},true);
document.addEventListener('pointerdown',()=>{keyboard=false},true);
const hero=(eyebrow,title,description,aside='')=>`<section class="hero"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${description}</p>${aside?`<span class="hero-aside">${aside}</span>`:''}</section>`;
function productCard(p){return `<article class="product-card"><button class="product-photo" data-product="${p.id}" aria-label="Preview ${p.name}"><img src="${assets+p.image}" alt="${p.name} product preview" loading="lazy" width="1000" height="747"><span class="corner-arrow">↗</span></button><div class="product-caption"><div><h2><button data-product="${p.id}">${p.name}</button></h2><p>${p.type} &nbsp;·&nbsp; ${p.detail}</p></div><span class="price">$${p.price}</span></div></article>`}
function collectionTools(){return `<div class="toolbar"><div class="filters" role="group" aria-label="Product category">${['All','Template','Component','UI Kit'].map((x,i)=>`<button data-filter="${x}" class="${category===x?'active':''}" aria-pressed="${category===x}">${['All','Templates','Components','UI kits'][i]}</button>`).join('')}</div><div class="collection-controls"><span class="count" role="status"></span><div class="view-toggle" role="group" aria-label="Product layout">${['grid','list'].map(x=>`<button data-view="${x}" aria-label="${x} view" aria-pressed="${view===x}" class="${view===x?'active':''}">${icon(x)}</button>`).join('')}</div></div></div><div class="product-grid ${view}" id="product-grid"></div>`}
const contactStrip=()=>`<section class="contact-strip"><div><h2>Make the complex work simply.</h2><p>AI systems, connected workflows, and websites built around your business.</p></div><button class="simple-link" data-route="contact">Plan a project <span>↗</span></button></section>`;
function contact(){return profileContact()}
function render(){
  if(section==='home'){location.reload();return;}
  WorkFolders.unmount();
  const labels={home:'Home',work:'Work',store:'Store',about:'About',services:'Services',blog:'Journal',contact:'Contact'};
  document.title=(labels[section]||'Store')+' — Yasin Sarveghad / Concept 02';
  if(section==='store')main.innerHTML=hero('THE COLLECTION / 06','Tools from<br><span>my own workflow.</span>','Templates, components and kits I built for client work,<br class="desktop-only"> ready for yours.','A considered starting point.')+collectionTools()+'<div class="quiet-note">Thoughtfully made. Ready to make your own.</div>'+contactStrip();
  else if(section==='home')main.innerHTML=profileHome();
  else if(section==='work')main.innerHTML=profileWork();
  else if(section==='about')main.innerHTML=profileAbout();
  else if(section==='services')main.innerHTML=profileServices();
  else if(section==='blog')main.innerHTML=profileNotes();
  else main.innerHTML=contact();
  icons(main);if(section==='work')WorkFolders.mount(main.querySelector('.work-collection'));if(section==='store')renderProducts();
  document.querySelectorAll('.more-links [data-route]').forEach(b=>{if(b.dataset.route===section)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
  layoutDock();
}
function renderProducts(){
  const grid=document.querySelector('#product-grid');if(!grid)return;
  const items=products.filter(p=>category==='All'||category===p.type);
  grid.innerHTML=items.map(productCard).join('');grid.className='product-grid '+view;
  document.querySelector('.count').textContent=String(items.length).padStart(2,'0')+' objects';
}
function navigate(route){
  section=route;history.replaceState(null,'',location.pathname+location.search+'#/'+route);if(expanded)setExpanded(false);document.querySelectorAll('dialog[open]').forEach(d=>d.id==='more-panel'?dismissDialog(d):d.close());moreOpen=false;render();window.scrollTo({top:0,behavior:'instant'});
  if(keyboard)main.focus({preventScroll:true});
  else if(!reduce.matches)main.animate([{opacity:.85},{opacity:1}],{duration:180,easing:'ease'});
}
function openDialog(id){
  document.querySelectorAll('dialog[open]').forEach(d=>d.close());
  if(id==='more-panel'&&!compact.matches){setExpanded(!expanded,true);return}
  if(expanded)setExpanded(false);
  if(id==='more-panel'){moreOpen=true;layoutDock()}
  const d=document.getElementById(id);d.showModal();document.body.style.overflow='hidden';if(id==='more-panel')presentCard();
}
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.addEventListener('close',()=>{
    if(dialog.id==='more-panel'){moreOpen=false;layoutDock()}
    if(!document.querySelector('dialog[open]'))document.body.style.overflow='';
  });
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dismissDialog(dialog)}});
});
function openProduct(id){const p=products.find(x=>x.id===id);if(!p)return;document.querySelector('#product-content').innerHTML=`<img src="${assets+p.image}" alt="${p.name} enlarged preview"><div class="preview-caption"><div><h2>${p.name}</h2><p>${p.type} · ${p.detail} · $${p.price}<br>Design study. Product files and checkout are not connected.</p></div><button data-save="${p.id}" aria-pressed="${saved.has(p.id)}">${saved.has(p.id)?'Saved ✓':'Save for later'}</button></div>`;openDialog('product-panel')}
function pulseIcon(button){playSymbol(button)}
let toastTimer;
function toast(text){const t=document.querySelector('#toast');t.textContent=text;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2800)}
function search(q=''){
  const items=[...destinations.map(([id,name])=>({kind:'Page',id,name})),...products.map(p=>({kind:p.type,id:p.id,name:p.name}))].filter(x=>(x.name+' '+x.kind).toLowerCase().includes(q.trim().toLowerCase()));
  document.querySelector('#search-results').innerHTML=items.length?items.map(x=>`<button ${x.kind==='Page'?'data-route':'data-product'}="${x.id}"><span>${escapeHTML(x.name)}</span><small>${x.kind} ↗</small></button>`).join(''):'<button disabled>No results. Try “template” or “about”.</button>';searchIndex=-1;
}
function openSearch(){search();document.querySelector('#search-input').value='';openDialog('search-panel');document.querySelector('#search-input').focus()}
document.querySelector('#search-input').addEventListener('input',e=>search(e.target.value));
document.querySelector('#search-input').addEventListener('keydown',e=>{
  const options=[...document.querySelectorAll('#search-results button:not(:disabled)')];
  if(['ArrowDown','ArrowUp'].includes(e.key)){
    e.preventDefault();if(!options.length)return;
    searchIndex=searchIndex<0?(e.key==='ArrowDown'?0:options.length-1):(searchIndex+(e.key==='ArrowDown'?1:-1)+options.length)%options.length;
    options.forEach((el,i)=>el.classList.toggle('selected',i===searchIndex));options[searchIndex].scrollIntoView({block:'nearest'});
  }
  if(e.key==='Enter'){e.preventDefault();options[Math.max(0,searchIndex)]?.click()}
});
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();document.querySelector('#search-panel').open?document.querySelector('#search-panel').close():openSearch()}});
document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.route){
    const route=b.dataset.route;route==='more'?openDialog('more-panel'):navigate(route);
    const persistent=dock.querySelector('[data-route="'+route+'"]')||dock.querySelector('[data-route=more]')||dock.querySelector('[data-collapse]');
    const trigger=b.isConnected&&b.querySelector('svg.interface-symbol')?b:persistent;
    pulseIcon(trigger);
    if(b.closest('dialog')&&persistent&&persistent!==trigger)pulseIcon(persistent);
  }
  if(b.dataset.filter){category=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(el=>{el.classList.toggle('active',el===b);el.setAttribute('aria-pressed',el===b)});renderProducts()}
  if(b.dataset.view){playSymbol(b);view=b.dataset.view;document.querySelectorAll('[data-view]').forEach(el=>{el.classList.toggle('active',el===b);el.setAttribute('aria-pressed',el===b)});document.querySelector('#product-grid').className='product-grid '+view}
  if(b.dataset.product)openProduct(b.dataset.product);
  if(b.dataset.save){saved.has(b.dataset.save)?saved.delete(b.dataset.save):saved.add(b.dataset.save);b.textContent=saved.has(b.dataset.save)?'Saved ✓':'Save for later';b.setAttribute('aria-pressed',saved.has(b.dataset.save))}
  if(b.hasAttribute('data-close')){playSymbol(b);dismissDialog(b.closest('dialog'))}
  if(b.hasAttribute('data-collapse')){setExpanded(false);const more=dock.querySelector('[data-route=more]');more.focus();playSymbol(more)}
  if(b.hasAttribute('data-search')){playSymbol(b);openSearch()}
  if(b.hasAttribute('data-details'))openDialog('details-panel');
  if(b.hasAttribute('data-theme'))switchTheme(b);
});
document.addEventListener('submit',e=>{if(e.target.matches('.contact-form')){e.preventDefault();previewBrief(e.target)}});
document.querySelector('.skip-link').addEventListener('click',e=>{e.preventDefault();main.focus()});
icons();render();

const card=document.querySelector('#more-panel');
let cardY=0,cardV=0,cardTarget=0,cardFrame=0,cardLast=0,cardClosing=false,drag=null;
function paintCard(){card.style.transform='translateY('+cardY+'px)';card.style.setProperty('--card-progress',Math.max(0,Math.min(1,1-cardY/(card.offsetHeight+30))))}
function cardTick(now){
 const dt=Math.min((now-cardLast)/1000,.032);cardLast=now;
 // Exact critically damped integration (omega=21), independent of refresh rate.
 const displacement=cardY-cardTarget,c=cardV+21*displacement,decay=Math.exp(-21*dt);
 cardY=cardTarget+(displacement+c*dt)*decay;
 cardV=(cardV-21*c*dt)*decay;paintCard();
 if(Math.abs(cardY-cardTarget)<.3&&Math.abs(cardV)<3){
  cardY=cardTarget;cardV=0;paintCard();cardFrame=0;
  if(cardClosing)card.close();return;
 }
 cardFrame=requestAnimationFrame(cardTick);
}
function springCard(target,closing=false){
 cardTarget=target;cardClosing=closing;
 if(reduce.matches){cancelAnimationFrame(cardFrame);cardFrame=0;cardY=target;cardV=0;paintCard();if(closing)card.close();return}
 if(!cardFrame){cardLast=performance.now();cardFrame=requestAnimationFrame(cardTick)}
}
function presentCard(){cancelAnimationFrame(cardFrame);cardFrame=0;cardY=card.offsetHeight+30;cardV=0;paintCard();springCard(0)}
function dismissDialog(dialog){if(dialog===card)springCard(card.offsetHeight+30,true);else dialog.close()}
card.addEventListener('cancel',e=>{e.preventDefault();dismissDialog(card)});
card.addEventListener('close',()=>{cancelAnimationFrame(cardFrame);cardFrame=0;cardClosing=false});
const handle=card.querySelector('.card-drag');
handle.addEventListener('pointerdown',e=>{
 if(e.button!==0)return;cancelAnimationFrame(cardFrame);cardFrame=0;cardClosing=false;
 handle.setPointerCapture(e.pointerId);drag={id:e.pointerId,start:e.clientY,offset:cardY,last:e.clientY,time:e.timeStamp};cardV=0;
});
handle.addEventListener('pointermove',e=>{
 if(!drag||drag.id!==e.pointerId)return;
 const next=drag.offset+e.clientY-drag.start;cardY=next<0?next*.18:next;
 const dt=(e.timeStamp-drag.time)/1000;if(dt>0)cardV=(e.clientY-drag.last)/dt;
 drag.last=e.clientY;drag.time=e.timeStamp;paintCard();
});
function releaseCard(e){
 if(!drag||drag.id!==e.pointerId)return;
 if(e.timeStamp-drag.time>90)cardV=0;
 const close=e.type!=='pointercancel'&&cardY+cardV*.18>card.offsetHeight*.23;
 drag=null;springCard(close?card.offsetHeight+30:0,close);
}
handle.addEventListener('pointerup',releaseCard);handle.addEventListener('pointercancel',releaseCard);



window.addEventListener('hashchange',()=>{const route=routeFromHash();if(route!==section)navigate(route)});
