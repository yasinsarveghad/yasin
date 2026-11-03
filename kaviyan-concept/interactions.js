(()=>{'use strict';
const $=(s,root=document)=>root.querySelector(s),$$=(s,root=document)=>[...root.querySelectorAll(s)];
let assets={};fetch('asset-map.json').then(r=>r.json()).then(map=>{assets=map});
const image=key=>Object.entries(assets).find(([url])=>url.includes(key))?.[1]||'';
const reduce=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
function reveal(el){if(el&&!reduce())el.animate([{opacity:.35,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,easing:'cubic-bezier(.23,1,.32,1)'})}
const albums=[
['Neon Outerwear','CAMPAIGN STILLS','Stills from a fashion campaign video for a weatherproof outerwear launch. Shot in a day on neon gels, graded by Hue in an afternoon.','HUE AND CUT',['y35dDStx','JgZ1F5','uPX0dae','y35dDStx','VdWjPP']],
['Loops and Gradients','MOTION STUDIES','Material, colour and movement. A collection of soft forms and seamless loops, built to explore a different kind of motion.','FLOW AND HUE',['uHuND0','ivJAdY','F8fmc','VRtDm','u2k3zj']],
['Product on Color','PRODUCT STUDIES','Everyday products, unexpected palettes. Studio compositions for the small details that make a launch feel distinctive.','HUE AND NOVA',['hW1QHX','jcrd1wx','3xSrY2','5km3V9','hW1QHX']],
['Inside the Edit Bay','BEHIND THE SCENES','The people, tools and timelines behind the final frame. A closer look at the studio, from first assembly to final mix.','CUT AND ECHO',['uxBpcy','oMxes2','xgPcTT','ELr5AL','K4buNI']],
['Sneaker Drops','CAMPAIGN STILLS','New colours, new releases. Product details and running stories, brought together in one reusable campaign system.','CUT AND FLOW',['cn0YBl','CNHD8A','dAm5vV','oGl80l','cn0YBl']],
['Halftone and Neon','DESIGN EXPLORATIONS','Bold type, saturated colour and a little controlled chaos. Graphic experiments that turn into a motion language.','HUE AND FLOW',['fhDZj8','M9DSut','2WUUB2','K4buNI','fhDZj8']]
];
let annual=false;
function billing(toggle){annual=!annual;toggle.setAttribute('role','switch');toggle.setAttribute('aria-checked',String(annual));const thumb=$('[data-framer-name="Thumb"]',toggle);if(thumb)thumb.style.transform=annual?'translateX(18px)':'translateX(0)';const track=$('[data-framer-name="Track"]',toggle);if(track)track.style.background=annual?'#74747c':'#e4e4e4';$$('#pricing [data-framer-name="Amount"]').forEach((el,i)=>{($('p',el)||el).textContent=String((annual?[15,39,119]:[19,49,149])[i]);reveal(el)})}
function gallery(index){const root=$('[data-framer-name="Album Tab"]')?.closest('section')||$('#gallery'),front=$('[data-framer-name="Front"]',root),data=albums[index];const tabs=$$('[data-framer-name="Album Tab"] [tabindex]',root);tabs.forEach((t,i)=>{t.classList.toggle('concept-gallery-selected',i===index);t.setAttribute('aria-selected',String(i===index));t.dataset.framerName=i===index?'Active':'Default'});for(const[name,text]of [['Title',data[0]],['Category',data[1]],['Description',data[2]],['Made With',data[3]]]){const el=$(`[data-framer-name="${name}"] p,[data-framer-name="${name}"] h3,[data-framer-name="${name}"] h4`,front);if(el)el.textContent=text}const imgs=[$('img',front),...$$('[data-framer-name="Floating Frames"] img',root)];imgs.forEach((img,i)=>{const src=image(data[4][i]);if(img&&src){img.removeAttribute('srcset');img.src=src;img.alt=data[0]+' / frame '+(i+1)}});reveal(front)}
const selector='#pricing [data-framer-name="Billing Toggle"],[data-framer-name="Album Tab"] [tabindex]';
let pointerTarget=null,pointerTime=0;
window.addEventListener('pointerdown',e=>{if(e.button===0&&e.target.closest(selector)){act(e)}},true);
window.addEventListener('pointerup',e=>{if(e.target.closest(selector))e.stopImmediatePropagation()},true);
function act(e){const el=e.target.closest(selector);if(!el)return;e.preventDefault();e.stopImmediatePropagation();if(e.type==='click'&&e.detail&&pointerTarget===el&&performance.now()-pointerTime<700)return;if(e.type==='pointerdown'){pointerTarget=el;pointerTime=performance.now()}if(el.closest('#pricing'))billing(el);else{const index=$$('[data-framer-name="Album Tab"] [tabindex]').indexOf(el);gallery(index);clearTimeout(window.__albumSettle);window.__albumSettle=setTimeout(()=>gallery(index),450)}}
window.addEventListener('click',act,true);window.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key))act(e)},true);
})();
