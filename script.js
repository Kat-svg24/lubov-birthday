'use strict';
const photoWishes = [
  {title:'Спасибо за твою любовь',body:'Мамочка, спасибо за каждое нежное слово, за заботу и тепло. Твоей любви хватает на всех нас. Пусть она возвращается к тебе счастьем, добром и самыми тёплыми объятиями!'},
  {title:'Ты — наша опора',body:'Ты умеешь поддержать, успокоить и подарить уверенность даже в непростые дни. Пусть и тебя всегда окружают забота, понимание и люди, готовые обнять в любую минуту.'},
  {title:'За твою доброту и заботу',body:'Пусть твои глаза сияют радостью, улыбка никогда не исчезает, а каждый новый день приносит что-то светлое. Ты заслуживаешь самого прекрасного!'},
  {title:'Спасибо за нашу семью',body:'Ты — наше родное сердце, которое всех объединяет. Спасибо за семейные традиции, уют и любовь. Пусть впереди будет много счастливых встреч, праздников и прекрасных воспоминаний!'}
];
const heartWishes = [
  {title:'Ты самая добрая мама на свете!',message:'Спасибо за твою нежность, терпение и бесконечную любовь. Пусть вокруг тебя распускаются только самые красивые цветы!',effect:'flowers',symbols:['🌸','🌺','🌷','🌼','🌹','🌸'],motion:'bloom'},
  {title:'Спасибо за жизнь ♡',message:'Спасибо, что подарила нам жизнь, научила любить и верить в лучшее. Шлём тебе целую охапку любви!',effect:'hearts',symbols:['💗','💕','💖','❤️','💞','💘'],motion:'burst'},
  {title:'Здоровья на долгие годы!',message:'Пусть каждый день приносит силы, бодрость и радость, а здоровье будет крепким-крепким!',effect:'stars',symbols:['⭐','🌟','✨','💫','⭐'],motion:'burst'},
  {title:'Ты наше вдохновение',message:'Ты вдохновляешь нас своей добротой, стойкостью и светом. Пусть к тебе летят самые красивые бабочки счастья!',effect:'butterflies',symbols:['🦋','🦋','🌸','🦋','✨'],motion:'flutter'},
  {title:'Ты лучшая бабушка!',message:'Пусть внуки чаще обнимают тебя, радуют улыбками, а каждый день будет похож на маленький праздник!',effect:'balloons',symbols:['🎈','🎈','💗','🎈','🎉'],motion:'float'},
  {title:'Счастья каждый день!',message:'Пусть каждый день дарит добрые вести, неожиданные подарки, приятные события и отличное настроение!',effect:'confetti',symbols:['🎊','🎉','🎀','💝','🎊'],motion:'burst'},
  {title:'Мы тобой гордимся!',message:'Ты наш пример любви, силы и доброты. Ты заслуживаешь самых ярких побед и самых красивых праздничных флажков!',effect:'flags',symbols:['🚩','🎏','🎀','🏳️‍🌈','🎉'],motion:'burst'},
  {title:'Ты всегда веришь в нас',message:'Спасибо за поддержку, веру и добрые слова. Пусть и твои мечты окрыляются и сбываются!',effect:'doves',symbols:['🕊️','🕊️','🤍','✨','🕊️'],motion:'flutter'},
  {title:'Ты делаешь наш дом уютным',message:'Дом — это не стены. Дом — это там, где тепло твоей души. Пусть тебя окружают уют, спокойствие и любимые люди!',effect:'ribbons',symbols:['🎀','🎗️','💝','🎀','💗'],motion:'burst'},
  {title:'Спасибо за заботу!',message:'Спасибо за каждый добрый совет, за тёплые объятия и за то, что всегда рядом сердцем!',effect:'petals',symbols:['🌷','🌸','🍃','🌺','🌸'],motion:'bloom'},
  {title:'Мы всегда рядом ♡',message:'Даже если мы далеко, наша любовь всегда с тобой. Желаем тебе света, улыбок и солнечных дней!',effect:'sunshine',symbols:['☀️','🌞','✨','🌻','💛'],motion:'burst'},
  {title:'Пусть сбываются все мечты!',message:'Пусть жизнь удивляет тебя волшебством, исполняет желания и дарит тысячу прекрасных мгновений!',effect:'magic',symbols:['🪄','✨','💫','🌟','🦋'],motion:'flutter'}
];
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalImg = document.getElementById('modalImg');
let previousFocus = null;
function openModal(title,body,img=null,alt=''){
  previousFocus=document.activeElement;
  modalTitle.textContent=title;modalBody.textContent=body;
  if(img){modalImg.src='assets/'+img;modalImg.alt=alt;modalImg.hidden=false;}else{modalImg.hidden=true;}
  modal.classList.add('active');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');document.getElementById('modalClose').focus();
}
function closeModal(){if(!modal.classList.contains('active'))return;modal.classList.remove('active');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');previousFocus?.focus();}
document.getElementById('modalClose').addEventListener('click',closeModal);
document.getElementById('modalOk').addEventListener('click',closeModal);
document.getElementById('modalBackdrop').addEventListener('click',closeModal);
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeModal();if(event.key==='Tab'&&modal.classList.contains('active')){const els=Array.from(modal.querySelectorAll('button:not([disabled])'));const first=els[0],last=els[els.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
const photoOpened=new Set();
document.querySelectorAll('[data-wish]').forEach(button=>button.addEventListener('click',()=>{const id=Number(button.dataset.wish);photoOpened.add(id);const wish=photoWishes[id];openModal(wish.title,wish.body);document.getElementById('photoProgress').textContent=photoOpened.size===4?'Все четыре пожелания открыты! Обнимаем тебя, мамочка! ♡':`Открыто пожеланий: ${photoOpened.size} из 4 ♡`;}));
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>openModal(button.dataset.title || 'Наше прекрасное воспоминание',button.dataset.message || 'Любимые фотографии сохраняют самые тёплые моменты. Спасибо, что ты есть в нашей жизни! ♡',button.dataset.photo,button.dataset.alt)));
const heartGrid=document.getElementById('heartGrid');
heartWishes.forEach((item,i)=>{const b=document.createElement('button');b.type='button';b.className='wish-heart';b.dataset.id=String(i);b.setAttribute('aria-label',item.title+'. Открыть поздравление');const text=document.createElement('span');text.textContent=item.title;b.appendChild(text);heartGrid.appendChild(b)});
const isReduced=window.matchMedia('(prefers-reduced-motion: reduce)');
function releaseParticles(element,kind,amount=26){
 if(isReduced.matches)return;
 const conf=heartWishes.find(w=>w.effect===kind)||{symbols:['💖','🌸','✨'],motion:'burst'};
 const r=element.getBoundingClientRect();const x=r.left+r.width/2,y=r.top+r.height/2;
 const root=document.getElementById('particles');
 for(let i=0;i<amount;i++){
  const angle=i*2*Math.PI/amount+(Math.random()-.5)*.4;
  const distance=105+Math.random()*260;
  const p=document.createElement('span');p.className='particle '+(conf.motion==='flutter'?'flutter':conf.motion==='bloom'?'bloom':conf.motion==='float'?'float':'');
  p.textContent=conf.symbols[i%conf.symbols.length];
  p.style.left=x+'px';p.style.top=y+'px';p.style.setProperty('--dx',Math.cos(angle)*distance+'px');
  p.style.setProperty('--dy',(Math.sin(angle)*distance-70)+'px');
  p.style.setProperty('--rotation',(Math.random()*750-375)+'deg');
  p.style.setProperty('--scale',(0.8+Math.random()*.8).toFixed(2));
  p.style.setProperty('--size',(24+Math.random()*19)+'px');
  p.style.setProperty('--duration',(1700+Math.random()*1000)+'ms');
  root.appendChild(p);
  p.addEventListener('animationend',()=>p.remove(),{once:true});
  setTimeout(()=>p.remove(),3100);
 }
}
heartGrid.addEventListener('click',e=>{
 const button=e.target.closest('button[data-id]');if(!button)return;
 const item=heartWishes[Number(button.dataset.id)];
 button.classList.add('activated');releaseParticles(button,item.effect,30);
 const panel=document.getElementById('heartMessage');
 document.getElementById('heartMessageText').textContent=item.message;
 panel.classList.remove('revealed');void panel.offsetWidth;panel.classList.add('revealed');
});
const stage=document.getElementById('cakeStage');const candle=document.getElementById('candleButton');const cakeStatus=document.getElementById('cakeStatus');
let smokeTimer=null;
candle.addEventListener('click',()=>{
 if(stage.classList.contains('blown'))return;
 clearTimeout(smokeTimer);stage.classList.add('blown');
 cakeStatus.textContent='Желание загадано! Пусть оно обязательно сбудется! ♡';
 // Smoke emanates from the wick; floating petals celebrate the wish.
 releaseParticles(candle,'flowers',20);
 smokeTimer=setTimeout(()=>{stage.querySelectorAll('.smoke i').forEach(x=>{x.style.animation='none';});},2900);
});
document.getElementById('relight').addEventListener('click',()=>{
 clearTimeout(smokeTimer);stage.classList.remove('blown');stage.querySelectorAll('.smoke i').forEach(x=>{x.style.animation='';});
 cakeStatus.textContent='Свеча горит — загадывай желание ♡';
});
const music=document.getElementById('birthdaySong');const musicButton=document.getElementById('musicBtn');
musicButton.addEventListener('click',async()=>{
 if(!music.paused){music.pause();musicButton.classList.remove('playing');musicButton.setAttribute('aria-pressed','false');musicButton.setAttribute('aria-label','Включить музыку');document.getElementById('musicTitle').textContent='Включить песню';return;}
 try{await music.play();musicButton.classList.add('playing');musicButton.setAttribute('aria-pressed','true');musicButton.setAttribute('aria-label','Приостановить музыку');document.getElementById('musicTitle').textContent='Пауза';}
 catch(err){musicButton.classList.remove('playing');document.getElementById('musicTitle').textContent='Не удалось включить';console.error('Music playback failed:',err);}
});
music.addEventListener('pause',()=>{musicButton.classList.remove('playing');musicButton.setAttribute('aria-pressed','false');document.getElementById('musicTitle').textContent='Включить песню';});
