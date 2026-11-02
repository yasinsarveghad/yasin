try{document.body.classList.toggle('dark',localStorage.getItem('yasin-portfolio-theme')==='dark')}catch{}
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
  themeTarget=!themeTarget;try{localStorage.setItem('yasin-portfolio-theme',themeTarget?'dark':'light')}catch{}
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

