(()=>{'use strict';
const realDocument=window.document;
const host=realDocument.createElement('div');host.id='portfolio-navigation';host.dataset.portfolioNavigation='';realDocument.body.append(host);
const root=host.attachShadow({mode:'open'});
const stylesheet=realDocument.createElement('link');stylesheet.rel='stylesheet';stylesheet.href='portfolio-nav.css?revision=1';root.append(stylesheet);
const content=realDocument.createElement('div');content.innerHTML="<div class=\"nav-skin\"><nav class=\"liquid-nav\" aria-label=\"Primary navigation\" data-dock><span class=\"liquid-lens\" aria-hidden=\"true\"></span><div class=\"dock-buttons\"></div></nav><dialog class=\"more-panel\" id=\"more-panel\" aria-labelledby=\"more-title\"><div class=\"card-drag\" aria-hidden=\"true\"><span></span></div><button class=\"round-button card-close\" data-close aria-label=\"Close menu\" data-icon=\"close\"></button><header class=\"pairing-heading\"><span class=\"pairing-portrait\"><img src=\"../sidefolio/dist/assets/yasin-sarveghad.png\" alt=\"\"></span><h2 id=\"more-title\">Your space. Within reach.</h2><p>Yasin Sarveghad</p></header><nav class=\"more-links\" aria-label=\"All pages\"><button data-route=\"home\"><span data-icon=\"home\"></span><span>Home</span></button><button data-route=\"work\"><span data-icon=\"work\"></span><span>Work</span></button><button data-route=\"store\"><span data-icon=\"store\"></span><span>Store</span></button><button data-route=\"about\"><span data-icon=\"about\"></span><span>About</span></button><button data-route=\"services\"><span data-icon=\"services\"></span><span>Services</span></button><button data-route=\"blog\"><span data-icon=\"notes\"></span><span>Journal</span></button><button data-route=\"contact\"><span data-icon=\"mail\"></span><span>Let\u2019s talk</span></button></nav><footer class=\"pairing-footer\"><button class=\"round-button\" data-search aria-label=\"Search\" data-icon=\"search\"></button><button class=\"round-button\" data-theme aria-label=\"Switch appearance\" data-icon=\"sun\"></button><button class=\"card-done\" data-close>Done</button></footer></dialog><dialog class=\"search-panel\" id=\"search-panel\" aria-label=\"Search pages and products\"><form method=\"dialog\"><span data-icon=\"search\"></span><input id=\"search-input\" placeholder=\"Find your next starting point\u2026\" aria-label=\"Search the concept\" autocomplete=\"off\"><button aria-label=\"Close search\">esc</button></form><div class=\"search-results\" id=\"search-results\"></div><footer><span>\u2191 \u2193 to explore</span><span>\u21b5 to open</span></footer></dialog><div class=\"toast\" id=\"toast\" role=\"status\"></div></div>";root.append(content);
const skin=root.querySelector('.nav-skin');
const document={querySelector:root.querySelector.bind(root),querySelectorAll:root.querySelectorAll.bind(root),getElementById:root.getElementById.bind(root),addEventListener:(type,listener,...options)=>(type==='visibilitychange'?realDocument:root).addEventListener(type,listener,...options),createElement:realDocument.createElement.bind(realDocument),body:skin,documentElement:skin,fonts:realDocument.fonts,timeline:realDocument.timeline,get hidden(){return realDocument.hidden}};
// Original portfolio symbols, revision 06. Reduced detail, consistent geometry.
const symbolPaths={"home":"<path d=\"M4.5 10.2 10.8 4.8a1.85 1.85 0 0 1 2.4 0l6.3 5.4v8.3a2 2 0 0 1-2 2h-3.2v-5.6H9.7v5.6H6.5a2 2 0 0 1-2-2Z\"/>","work":"<path d=\"M3 8V6.5a2 2 0 0 1 2-2h4.1c.6 0 1.1.2 1.5.6l1.3 1.3c.4.4.9.6 1.5.6H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z\"/>","store":"<rect x=\"5\" y=\"7\" width=\"14\" height=\"14\" rx=\"2.3\"/><path d=\"M8.5 7V6a3.5 3.5 0 0 1 7 0v1\"/>","about":"<circle cx=\"12\" cy=\"7.2\" r=\"3.2\"/><path d=\"M5.5 20v-1.2c0-3 2.6-5.1 6.5-5.1s6.5 2.1 6.5 5.1V20\"/>","more":"<g fill=\"currentColor\" stroke=\"none\"><circle cx=\"5.5\" cy=\"12\" r=\"1.5\"/><circle cx=\"12\" cy=\"12\" r=\"1.5\"/><circle cx=\"18.5\" cy=\"12\" r=\"1.5\"/></g>","services":"<rect x=\"8\" y=\"4\" width=\"12\" height=\"12\" rx=\"2.2\"/><path d=\"M4 8v9.8A2.2 2.2 0 0 0 6.2 20H16\"/>","notes":"<rect x=\"5\" y=\"3\" width=\"14\" height=\"18\" rx=\"2.2\"/><path d=\"M9 9h6M9 14h4\"/>","mail":"<rect x=\"3\" y=\"5.5\" width=\"18\" height=\"13\" rx=\"2.3\"/><path d=\"m3.7 7 7 5.2a2.1 2.1 0 0 0 2.6 0l7-5.2\"/>","search":"<circle cx=\"10.5\" cy=\"10.5\" r=\"6\"/><path d=\"m15 15 4.8 4.8\"/>","close":"<path d=\"m6 6 12 12M6 18 18 6\"/>","sun":"<path d=\"M20.2 14.1A8.3 8.3 0 0 1 9.9 3.8 8.4 8.4 0 1 0 20.2 14.1Z\"/>","grid":"<rect x=\"4\" y=\"4\" width=\"6\" height=\"6\" rx=\"1.2\"/><rect x=\"14\" y=\"4\" width=\"6\" height=\"6\" rx=\"1.2\"/><rect x=\"4\" y=\"14\" width=\"6\" height=\"6\" rx=\"1.2\"/><rect x=\"14\" y=\"14\" width=\"6\" height=\"6\" rx=\"1.2\"/>","list":"<path d=\"M4 6h16M4 12h16M4 18h16\"/>"};
const motionSymbolPaths={"home":"<g data-part=\"home-shell\"><path d=\"M4.5 10.2 10.8 4.8a1.85 1.85 0 0 1 2.4 0l6.3 5.4v8.3a2 2 0 0 1-2 2h-3.2v-5.6H9.7v5.6H6.5a2 2 0 0 1-2-2Z\"/></g><path data-part=\"home-door\" class=\"motion-transient\" d=\"M12 15v5\"/>","work":"<g data-part=\"folder-back\"><path d=\"M3 8V6.5a2 2 0 0 1 2-2h4.1c.6 0 1.1.2 1.5.6l1.3 1.3c.4.4.9.6 1.5.6H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z\"/></g><rect data-part=\"folder-sheet\" class=\"motion-transient motion-paper\" x=\"7\" y=\"10\" width=\"10\" height=\"7\" rx=\"1\"/><path data-part=\"folder-front\" class=\"motion-transient motion-paper\" d=\"M3 10.5h18v7.4a2.1 2.1 0 0 1-2.1 2.1H5.1A2.1 2.1 0 0 1 3 17.9Z\"/>","store":"<g data-part=\"bag-body\"><rect x=\"5\" y=\"7\" width=\"14\" height=\"14\" rx=\"2.3\" /></g><g data-part=\"bag-handle\"><path d=\"M8.5 7V6a3.5 3.5 0 0 1 7 0v1\" /></g>","about":"<g data-part=\"person-head\"><circle cx=\"12\" cy=\"7.2\" r=\"3.2\" /></g><g data-part=\"person-body\"><path d=\"M5.5 20v-1.2c0-3 2.6-5.1 6.5-5.1s6.5 2.1 6.5 5.1V20\" /></g>","more":"<g fill=\"currentColor\" stroke=\"none\"><circle data-part=\"dot-0\" cx=\"5.5\" cy=\"12\" r=\"1.5\"/><circle data-part=\"dot-1\" cx=\"12\" cy=\"12\" r=\"1.5\"/><circle data-part=\"dot-2\" cx=\"18.5\" cy=\"12\" r=\"1.5\"/></g>","services":"<g data-part=\"stack-front\"><rect x=\"8\" y=\"4\" width=\"12\" height=\"12\" rx=\"2.2\" /></g><g data-part=\"stack-back\"><path d=\"M4 8v9.8A2.2 2.2 0 0 0 6.2 20H16\" /></g>","notes":"<g data-part=\"page-shell\"><rect x=\"5\" y=\"3\" width=\"14\" height=\"18\" rx=\"2.2\"/></g><path data-part=\"page-line-0\" d=\"M9 9h6\"/><path data-part=\"page-line-1\" d=\"M9 14h4\"/>","mail":"<rect data-part=\"mail-letter\" class=\"motion-transient motion-paper\" x=\"7\" y=\"8\" width=\"10\" height=\"7\" rx=\"1\"/><g data-part=\"mail-body\"><rect x=\"3\" y=\"5.5\" width=\"18\" height=\"13\" rx=\"2.3\" /></g><g data-part=\"mail-flap\"><path d=\"m3.7 7 7 5.2a2.1 2.1 0 0 0 2.6 0l7-5.2\" /></g>","search":"<g data-part=\"glass-ring\"><circle cx=\"10.5\" cy=\"10.5\" r=\"6\" /></g><g data-part=\"glass-handle\"><path d=\"m15 15 4.8 4.8\" /></g>","close":"<path data-part=\"cross-a\" d=\"m6 6 12 12\"/><path data-part=\"cross-b\" d=\"M6 18 18 6\"/>","sun":"<g data-part=\"theme-moon\"><path d=\"M20.2 14.1A8.3 8.3 0 0 1 9.9 3.8 8.4 8.4 0 1 0 20.2 14.1Z\"/></g><g data-part=\"theme-sun\"><circle cx=\"12\" cy=\"12\" r=\"3.5\"/><path d=\"M12 3v1.4m0 15.2V21M3 12h1.4m15.2 0H21M5.6 5.6l1 1m10.8 10.8 1 1M5.6 18.4l1-1M17.4 6.6l1-1\"/></g>","grid":"<g data-part=\"tile-0\"><rect x=\"4\" y=\"4\" width=\"6\" height=\"6\" rx=\"1.2\" /></g><g data-part=\"tile-1\"><rect x=\"14\" y=\"4\" width=\"6\" height=\"6\" rx=\"1.2\" /></g><g data-part=\"tile-2\"><rect x=\"4\" y=\"14\" width=\"6\" height=\"6\" rx=\"1.2\" /></g><g data-part=\"tile-3\"><rect x=\"14\" y=\"14\" width=\"6\" height=\"6\" rx=\"1.2\" /></g>","list":"<path data-part=\"line-0\" d=\"M4 6h16\"/><path data-part=\"line-1\" d=\"M4 12h16\"/><path data-part=\"line-2\" d=\"M4 18h16\"/>"};
const icon=name=>`<svg class="interface-symbol symbol-${name}" data-symbol="${name}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${motionSymbolPaths[name]||symbolPaths[name]||symbolPaths.services}</svg>`;

/* Continuous critically damped trajectories, sampled once and played by WAAPI. */
const symbolRuns=new WeakMap();
const symbolMotionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const symbolKeyboard=()=>typeof keyboard!=='undefined'&&keyboard;
const pose=(values={})=>[values.x||0,values.y||0,values.r||0,values.sx??1,values.sy??1,values.skew||0,values.o??1];
const symbolTransform=s=>`translate(${s[0]}px,${s[1]}px) rotate(${s[2]}deg) skewX(${s[5]}deg) scale(${s[3]},${s[4]})`;
function commitSymbolRest(record){
  record.node.style.transform=symbolTransform(record.rest);
  record.node.style.opacity=String(record.rest[6]);
  record.animation.cancel();
}
function samplePresentation(record){
  const position=Math.max(0,Number(record.animation.currentTime)||0)/record.step;
  const i=Math.min(Math.floor(position),record.samples.length-1),j=Math.min(i+1,record.samples.length-1),f=Math.min(1,position-i);
  const mix=key=>record.samples[i][key].map((v,k)=>v+(record.samples[j][key][k]-v)*f);
  return {state:mix('state'),velocity:mix('velocity')};
}
function playSymbol(button){
  const svg=button?.querySelector('svg.interface-symbol');
  if(!svg||symbolMotionPreference.matches||symbolKeyboard())return;
  const previous=symbolRuns.get(svg)||[];
  const presentation=new Map(previous.map(r=>[r.node,samplePresentation(r)]));
  previous.forEach(r=>r.animation.cancel());
  const running=[];
  function move(name,peak,hold=130,delay=0,omega=34){
    const node=svg.querySelector(`[data-part="${name}"]`);if(!node)return;
    const rest=pose({o:node.classList.contains('motion-transient')?0:1});
    const start=presentation.get(node)||{state:[...rest],velocity:Array(7).fill(0)};
    let state=[...start.state],velocity=[...start.velocity];
    const destination=pose(peak),samples=[{state:[...state],velocity:[...velocity]}];
    const step=1000/120,dt=step/1000,decay=Math.exp(-omega*dt);
    for(let frame=1;frame<150;frame++){
      const time=(frame-.5)*step,target=time>=delay&&time<delay+hold?destination:rest;
      for(let k=0;k<state.length;k++){
        const displacement=state[k]-target[k],c=velocity[k]+omega*displacement;
        state[k]=target[k]+(displacement+c*dt)*decay;
        velocity[k]=(velocity[k]-omega*c*dt)*decay;
      }
      samples.push({state:[...state],velocity:[...velocity]});
      if(time>delay+hold+180&&state.every((v,k)=>Math.abs(v-rest[k])<.008)&&velocity.every(v=>Math.abs(v)<.15))break;
    }
    samples.push({state:[...rest],velocity:Array(7).fill(0)});
    running.push({node,rest,samples,step,animation:null});
  }
  // Deliberate opening and a readable peak; navigation itself stays immediate.
  switch(svg.dataset.symbol){
    case 'ai':move('ai-core',{r:12,sx:1.08,sy:1.08},240,0,28);break;
    case 'link':move('link-a',{x:-1.25,y:1.25},235,0,28);move('link-b',{x:1.25,y:-1.25},235,20,28);break;
    case 'work':
      move('folder-back',{r:-4.5},300,0,26);
      move('folder-sheet',{y:-5.2,r:-4,o:1},350,25,26);
      move('folder-front',{y:1,skew:-9,sy:.72,o:1},350,0,26);break;
    case 'home':move('home-shell',{y:-1.6,sy:1.035},180,0,30);break;
    case 'store':
      move('bag-body',{r:-5.5},230,0,28);
      move('bag-handle',{y:-1.9,r:5.5},240,20,28);break;
    case 'about':
      move('person-head',{y:.9,r:-6},200,0,30);
      move('person-body',{sx:1.045},200,20,30);break;
    case 'more':['dot-0','dot-1','dot-2'].forEach((p,i)=>move(p,{y:-2.4},140,i*50,34));break;
    case 'services':
      move('stack-front',{x:1.2,y:-2.4},235,0,28);
      move('stack-back',{x:-.9,y:1.1},235,25,28);break;
    case 'notes':
      move('page-shell',{r:-3.5},220,0,30);
      move('page-line-0',{sx:.55,o:.65},170,20,32);
      move('page-line-1',{sx:.6,o:.7},170,70,32);break;
    case 'mail':
      move('mail-flap',{y:-1.4,sy:.35},270,0,27);
      move('mail-letter',{y:-4.3,o:1},280,30,27);break;
    case 'search':
      move('glass-ring',{sx:1.09,sy:1.09},180,0,32);
      move('glass-handle',{x:.8,y:.8},180,0,32);break;
    case 'close':
      move('cross-a',{r:20},160,0,34);
      move('cross-b',{r:-20},160,0,34);break;
    case 'grid':['tile-0','tile-1','tile-2','tile-3'].forEach((p,i)=>move(p,{y:-1.6},140,i*32,34));break;
    case 'list':['line-0','line-1','line-2'].forEach((p,i)=>move(p,{x:1.9},145,i*40,33));break;
  }
  if(!running.length){symbolRuns.delete(svg);return}
  // All parts land together. Hold the exact endpoint before committing it,
  // so dropping a WAAPI effect never swaps back to a different SVG renderer.
  const length=Math.max(...running.map(r=>r.samples.length))+12;
  svg.dataset.motionDuration=String(Math.round((length-1)*running[0].step));
  const startTime=document.timeline.currentTime;
  running.forEach(record=>{
    while(record.samples.length<length)record.samples.push({state:[...record.rest],velocity:Array(7).fill(0)});
    const frames=record.samples.map((s,i)=>({offset:i/(length-1),transform:symbolTransform(s.state),opacity:Math.max(0,Math.min(1,s.state[6]))}));
    record.animation=record.node.animate(frames,{duration:(length-1)*record.step,easing:'linear',fill:'both'});
    if(startTime!==null)record.animation.startTime=startTime;
  });
  symbolRuns.set(svg,running);svg.dataset.motion='running';
  Promise.allSettled(running.map(r=>r.animation.finished)).then(()=>{
    if(symbolRuns.get(svg)===running){running.forEach(commitSymbolRest);symbolRuns.delete(svg);svg.dataset.motion='idle'}
  });
}

/* Live colors reverse continuously. The non-interactive aura never captures input. */
let themeTarget=document.body.classList.contains('dark'),themeAura=null,themeAuraAnimation=null;
function switchTheme(button){
  if(window.PortfolioTheme){window.PortfolioTheme.set(window.PortfolioTheme.current==='dark'?'light':'dark');return;}
  themeTarget=!themeTarget;
  const instant=symbolMotionPreference.matches||symbolKeyboard();
  if(instant)document.body.classList.add('theme-instant');
  document.body.classList.toggle('dark',themeTarget);
  document.querySelectorAll('[data-theme]').forEach(b=>{
    b.setAttribute('aria-pressed',String(themeTarget));b.title=themeTarget?'Use light appearance':'Use dark appearance';
  });
  if(instant){
    themeAuraAnimation?.cancel();if(themeAura)themeAura.hidden=true;
    void document.body.offsetWidth;
    requestAnimationFrame(()=>document.body.classList.remove('theme-instant'));return;
  }
  if(!themeAura){themeAura=document.createElement('div');themeAura.className='theme-aura';themeAura.setAttribute('aria-hidden','true');const host=document.createElement('div');host.className='theme-aura-host';host.setAttribute('aria-hidden','true');host.append(themeAura);document.body.append(host)}
  let startScale=.04,startOpacity=0;
  if(themeAuraAnimation&&themeAuraAnimation.playState==='running'){
    const style=getComputedStyle(themeAura);
    startScale=new DOMMatrixReadOnly(style.transform).a;startOpacity=Number(style.opacity);
  }
  themeAuraAnimation?.cancel();
  const r=button.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
  const radius=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
  Object.assign(themeAura.style,{width:radius*2+'px',height:radius*2+'px',left:x-radius+'px',top:y-radius+'px',backgroundColor:themeTarget?'#16161b':'#ffffff'});
  themeAura.hidden=false;
  const animation=themeAura.animate([
    {transform:`scale(${startScale})`,opacity:startOpacity},
    {transform:`scale(${Math.max(startScale,.55)})`,opacity:.065,offset:.4},
    {transform:'scale(1)',opacity:0}
  ],{duration:420,easing:getComputedStyle(document.documentElement).getPropertyValue('--glass-ease').trim()});
  themeAuraAnimation=animation;
  animation.finished.then(()=>{if(themeAuraAnimation===animation){themeAura.hidden=true;themeAuraAnimation=null}}).catch(()=>{});
}
function stopSymbolMotion(){
  document.querySelectorAll('svg[data-motion=running]').forEach(svg=>{
    symbolRuns.get(svg)?.forEach(commitSymbolRest);symbolRuns.delete(svg);svg.dataset.motion='idle';
  });
  themeAuraAnimation?.cancel();themeAuraAnimation=null;if(themeAura)themeAura.hidden=true;
}
symbolMotionPreference.addEventListener('change',()=>{if(symbolMotionPreference.matches)stopSymbolMotion()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopSymbolMotion()});


'use strict';
function icons(root=document){root.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon))}
const products=[];
const assets='../sidefolio/dist/assets/';
const navItems=[{id:'home',label:'Home'},{id:'work',label:'Work'},{id:'store',label:'Store'},{id:'about',label:'About'},{id:'more',label:'More'}];
const destinations=[['home','Home'],['about','About'],['work','Selected work'],['services','Services'],['store','The collection'],['blog','Journal'],['contact','Contact']];
const dock=document.querySelector('[data-dock]'),main=document.querySelector('main');
const compact=matchMedia('(max-width:1099px)'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
const routeFromHash=()=>{const r=location.hash.replace(/^#\/?/,'');return ['home','work','store','about','services','blog','contact'].includes(r)?r:'home'};
let section="home",category='All',view='grid',keyboard=false,moreOpen=false,searchIndex=-1;
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
 const axis='horizontal';dock.dataset.axis=axis;
 const items=expanded?allItems:navItems;
 const value=moreOpen?'more':items.some(n=>n.id===section)?section:'more';
 const active=Math.max(0,items.findIndex(n=>n.id===value)),buttons=[...dock.querySelectorAll('.liquid-nav-item')];
 if(!buttons.length)return;
 const extent=axis==='vertical'?dock.clientHeight:dock.clientWidth;
 const textWidth=buttons[active].querySelector('.liquid-label>span').scrollWidth;
 const expandedRow=Math.min(58,(extent-120)/7);
 const slots=expanded?buttons.map((_,i)=>({left:6+i*((extent-150)/7),width:(extent-150)/7-2})):liquidSlots(extent,buttons.length,active,axis==='vertical'?0:textWidth);
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
  button.style.height='52px';
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
 const previous='ArrowLeft',following='ArrowRight';
 if(e.key==='Home')next=0;else if(e.key==='End')next=buttons.length-1;
 else if(e.key===previous)next=(i-1+buttons.length)%buttons.length;
 else if(e.key===following)next=(i+1)%buttons.length;else return;
 e.preventDefault();buttons[next].focus();
});
document.addEventListener('pointerdown',e=>{if(expanded&&!dock.contains(e.target))setExpanded(false)});
document.addEventListener('keydown',()=>{keyboard=true},true);
document.addEventListener('pointerdown',()=>{keyboard=false},true);
function navigate(route){
 if(route==='home'){
  if(expanded)setExpanded(false);
  document.querySelectorAll('dialog[open]').forEach(d=>dismissDialog(d));
  window.scrollTo({top:0,behavior:reduce.matches?'instant':'smooth'});
 }else window.location.href='../concept-02/index.html#/'+route;
}
function openDialog(id){
  document.querySelectorAll('dialog[open]').forEach(d=>d.close());
  if(id==='more-panel'&&!compact.matches){setExpanded(!expanded,true);return}
  if(expanded)setExpanded(false);
  if(id==='more-panel'){moreOpen=true;layoutDock()}
  const d=document.getElementById(id);d.showModal();realDocument.body.style.overflow='hidden';if(id==='more-panel')presentCard();
}
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.addEventListener('close',()=>{
    if(dialog.id==='more-panel'){moreOpen=false;layoutDock()}
    if(!document.querySelector('dialog[open]'))realDocument.body.style.overflow='';
  });
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dismissDialog(dialog)}});
});
function pulseIcon(button){playSymbol(button)}
let toastTimer;
function toast(text){const t=document.querySelector('#toast');t.textContent=text;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2800)}
function search(q=''){
  const items=[...destinations.map(([id,name])=>({kind:'Page',id,name})),...products.map(p=>({kind:p.type,id:p.id,name:p.name}))].filter(x=>(x.name+' '+x.kind+' '+(window.PortfolioLanguage?.text(x.name)||'')).toLowerCase().includes(q.trim().toLowerCase()));
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

icons();
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




})();
