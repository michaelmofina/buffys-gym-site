const HEAP_PHOTOS = [
  { src: "assets/Actual/Selected/scan-1-photo-05.jpg", alt: "Buffy on the couch with a blue and orange ball" },
  { src: "assets/Actual/Selected/scan-1-photo-06.jpg", alt: "Friends posing together at the gym" },
  { src: "assets/Actual/Selected/scan-2-photo-02.jpg", alt: "A smiling gym member sitting beside a bench" },
  { src: "assets/Actual/Selected/scan-photo-06.jpg", alt: "A gym member lifting a barbell at the rack" },
  { src: "assets/Actual/Selected/scan-2-photo-04.jpg", alt: "A gym member holding a dumbbell" },
  { src: "assets/Actual/Selected/scan-photo-01.jpg", alt: "Buffy relaxing in her round bed" },
  { src: "assets/Actual/Selected/scan-3-photo-01.jpg", alt: "A gym member practising a bodybuilding pose" },
  { src: "assets/Actual/Selected/scan-2-photo-06.jpg", alt: "Two gym members flexing together" },
  { src: "assets/Actual/Selected/scan-2-photo-01.jpg", alt: "A gym member exercising with a weight overhead" },
  {"src": "assets/Actual/Selected/scan-4-photo-01.jpg", "alt": "Gym member holding dumbbells at the rack"},
  {"src": "assets/Actual/Selected/scan-4-photo-02.jpg", "alt": "Buffy beneath a gym member doing an inverted exercise"},
  {"src": "assets/Actual/Selected/scan-4-photo-03.jpg", "alt": "Members training together by the barbell rack"},
  {"src": "assets/Actual/Selected/scan-4-photo-04.jpg", "alt": "Gym member hanging from the overhead bar"},
  {"src": "assets/Actual/Selected/scan-4-photo-05.jpg", "alt": "Gym member flexing beneath the pull-up bars"},
  {"src": "assets/Actual/Selected/scan-4-photo-06.jpg", "alt": "Buffy holding a red ball", "portrait": true},
  {"src": "assets/Actual/Selected/scan-5-photo-01.jpg", "alt": "Friends posing together after class"},
  {"src": "assets/Actual/Selected/scan-5-photo-02.jpg", "alt": "Members lifting dumbbells together"},
  {"src": "assets/Actual/Selected/scan-5-photo-03.jpg", "alt": "Gym member pressing dumbbells on a bench"},
  {"src": "assets/Actual/Selected/scan-5-photo-04.jpg", "alt": "Members at the pull-up rack"},
  {"src": "assets/Actual/Selected/scan-5-photo-05.jpg", "alt": "Gym member pressing a barbell on an incline bench"},
  {"src": "assets/Actual/Selected/scan-5-photo-06.jpg", "alt": "Friends smiling together at the gym"},
  {"src": "assets/Actual/Selected/scan-6-photo-01.jpg", "alt": "Gym member pressing dumbbells overhead"},
  {"src": "assets/Actual/Selected/scan-6-photo-02.jpg", "alt": "Buffy and a friend relaxing on the couch"},
  {"src": "assets/Actual/Selected/scan-6-photo-03.jpg", "alt": "Gym member posing in a blue cap"},
  {"src": "assets/Actual/Selected/scan-6-photo-04.jpg", "alt": "Gym member lifting a barbell"},
  {"src": "assets/Actual/Selected/scan-6-photo-05.jpg", "alt": "Gym member doing a push-up"},
  {"src": "assets/Actual/Selected/scan-6-photo-06.jpg", "alt": "Smiling gym member seated with a dumbbell"},
  {"src": "assets/Actual/Selected/scan-7-photo-01.jpg", "alt": "Gym member flexing beside the front window"},
  {"src": "assets/Actual/Selected/scan-8-photo-01.jpg", "alt": "Buffy looking up with a red ball", "portrait": true},
  {"src": "assets/Actual/Selected/scan-8-photo-02.jpg", "alt": "Gym member pressing a pair of dumbbells"},
  {"src": "assets/Actual/Selected/scan-8-photo-03.jpg", "alt": "Gym member doing a split squat with dumbbells"},
  {"src": "assets/Actual/Selected/scan-8-photo-04.jpg", "alt": "Friends chatting beside the racks"},
  {"src": "assets/Actual/Selected/scan-8-photo-05.jpg", "alt": "Gym member crouching beside Buffy with a ball"},
  {"src": "assets/Actual/Selected/scan-8-photo-06.jpg", "alt": "Buffy wearing a yellow bandana"},
  {"src": "assets/Actual/Selected/scan-9-photo-01.jpg", "alt": "Five gym members posing together"},
  {"src": "assets/Actual/Selected/scan-9-photo-02.jpg", "alt": "Gym member preparing to lift a barbell"},
  {"src": "assets/Actual/Selected/scan-9-photo-03.jpg", "alt": "Gym member lifting at the rack"},
  {"src": "assets/Actual/Selected/scan-9-photo-04.jpg", "alt": "Two friends smiling behind a bench"},
  {"src": "assets/Actual/Selected/scan-9-photo-05.jpg", "alt": "Friends posing with dumbbells"},
  {"src": "assets/Actual/Selected/scan-9-photo-06.jpg", "alt": "Two dogs playing together at the gym"},
  {"src": "assets/Actual/Selected/scan-10-photo-01.jpg", "alt": "Three members hanging from the pull-up bars"},
  {"src": "assets/Actual/Selected/scan-10-photo-02.jpg", "alt": "Two friends posing with a dumbbell and barbell"},
  {"src": "assets/Actual/Selected/scan-10-photo-03.jpg", "alt": "Gym member flexing beside the gym entrance"},
  {"src": "assets/Actual/Selected/scan-10-photo-04.jpg", "alt": "A group of friends posing after class"},
  {"src": "assets/Actual/Selected/scan-10-photo-05.jpg", "alt": "Buffy and a friend cuddling on the couch"},
  {"src": "assets/Actual/Selected/scan-10-photo-06.jpg", "alt": "Buffy relaxing on the couch with a gym member"},
  {"src": "assets/Actual/Selected/scan-11-photo-01.jpg", "alt": "Smiling gym member holding a dumbbell"},
  {"src": "assets/Actual/Selected/scan-11-photo-02.jpg", "alt": "Gym member training with dumbbells"},
  {"src": "assets/Actual/Selected/scan-11-photo-03.jpg", "alt": "Three friends posing in front of the windows"},
  {"src": "assets/Actual/Selected/scan-11-photo-04.jpg", "alt": "Gym member seated with dumbbells"},
  {"src": "assets/Actual/Selected/scan-11-photo-05.jpg", "alt": "Gym member crouching in front of the rack"},
  {"src": "assets/Actual/Selected/scan-12-photo-01.jpg", "alt": "Six gym members posing together by the racks"},
  {"src": "assets/Actual/Selected/scan-13-photo-01.jpg", "alt": "Two gym members training with dumbbells"},
  {"src": "assets/Actual/Selected/scan-12-photo-02.jpg", "alt": "Gym member in a black shirt holding an overhead bar"},
  {"src": "assets/Actual/Selected/scan-14-photo-01.jpg", "alt": "Gym member lifting a barbell from the floor"},
  {"src": "assets/Actual/Selected/scan-14-photo-03.jpg", "alt": "Two friends sitting together in the lounge"},
  {"src": "assets/Actual/Selected/scan-14-photo-06.jpg", "alt": "Smiling gym member posing in front of the racks"},
  {"src": "assets/Actual/Selected/scan-13-photo-05.jpg", "alt": "Members relaxing on the floor and couch with Buffy"},
  {"src": "assets/Actual/Selected/scan-13-photo-06.jpg", "alt": "A group of members posing across the gym floor"},
  {"src": "assets/Actual/Selected/scan-15-photo-01.jpg", "alt": "Two gym members taking a break on the class floor"},
  {"src": "assets/Actual/Selected/scan-14-photo-02.jpg", "alt": "Gym member in an orange shirt posing beside a bench"},
  {"src": "assets/Actual/Selected/scan-14-photo-04.jpg", "alt": "Gym member preparing to lift a barbell at the rack"},
  {"src": "assets/Actual/Selected/scan-12-photo-04.jpg", "alt": "Gym member leaning on a bench during an exercise"},
  {"src": "assets/Actual/Selected/scan-13-photo-02.jpg", "alt": "Gym member seated by stacks of weight plates"},
  {"src": "assets/Actual/Selected/scan-13-photo-03.jpg", "alt": "Gym member squatting with a barbell at the rack"},
  {"src": "assets/Actual/Selected/scan-12-photo-03.jpg", "alt": "Buffy with a gym member beside the weight rack"},
  {"src": "assets/Actual/Selected/scan-14-photo-05.jpg", "alt": "Gym member leaning over a loaded barbell"},
  {"src": "assets/Actual/Selected/scan-12-photo-05.jpg", "alt": "Two members training together at a bench"},
  {"src": "assets/Actual/Selected/scan-12-photo-06.jpg", "alt": "Gym member holding a dumbbell in a deep squat"},
  {"src": "assets/Actual/Selected/scan-13-photo-04.jpg", "alt": "Buffy rolling on her back on the gym floor"},
  {"src": "assets/Actual/Selected/scan-16-photo-03.jpg", "alt": "Gym member stretching both arms overhead beside the wooden wall"},
  {"src": "assets/Actual/Selected/scan-16-photo-05.jpg", "alt": "Two members taking a break beside the bright gym windows"},
  {"src": "assets/Actual/Selected/scan-17-photo-02.jpg", "alt": "Close-up of a member reaching toward the camera"},
  {"src": "assets/Actual/Selected/scan-18-photo-01.jpg", "alt": "Two members sharing a playful hug with arms outstretched"},
  {"src": "assets/Actual/Selected/scan-17-photo-01.jpg", "alt": "Gym member crouching behind a loaded barbell"},
  {"src": "assets/Actual/Selected/scan-18-photo-05.jpg", "alt": "Close-up of a member smiling behind their hands"},
  {"src": "assets/Actual/Selected/scan-18-photo-03.jpg", "alt": "Three members posing together beneath the overhead bars"},
  {"src": "assets/Actual/Selected/scan-19-photo-02.jpg", "alt": "Gym member sitting back with hands playfully raised beside their head"},
  {"src": "assets/Actual/Selected/scan-16-photo-04.jpg", "alt": "Smiling member standing with arms crossed after class"},
  {"src": "assets/Actual/Selected/scan-17-photo-05.jpg", "alt": "Member leaning forward during a break by the windows"},
  {"src": "assets/Actual/Selected/scan-18-photo-02.jpg", "alt": "Members doing handstands with their feet supported by the overhead bars"},
  {"src": "assets/Actual/Selected/scan-16-photo-01.jpg", "alt": "Two members striking playful poses beside the gym racks"},
  {"src": "assets/Actual/Selected/scan-16-photo-02.jpg", "alt": "Gym member in glasses posing on the class floor"},
  {"src": "assets/Actual/Selected/scan-16-photo-06.jpg", "alt": "Gym member holding a loaded barbell at shoulder height in a rack"},
  {"src": "assets/Actual/Selected/scan-17-photo-03.jpg", "alt": "Smiling member sitting on the gym floor with arms outstretched"},
  {"src": "assets/Actual/Selected/scan-17-photo-04.jpg", "alt": "Gym member pressing a barbell from a bench"},
  {"src": "assets/Actual/Selected/scan-17-photo-06.jpg", "alt": "Member smiling and making a peace sign on the class floor"},
  {"src": "assets/Actual/Selected/scan-18-photo-04.jpg", "alt": "Two friends posing for a close-up, one wearing sunglasses"},
  {"src": "assets/Actual/Selected/scan-18-photo-06.jpg", "alt": "Gym member holding a pair of dumbbells at shoulder height"},
  {"src": "assets/Actual/Selected/scan-19-photo-01.jpg", "alt": "Member with glasses holding a dumbbell in a split stance"},
  {"src": "assets/Actual/Selected/scan-19-photo-03.jpg", "alt": "Two members standing together after a workout"},
];
const pool=[...HEAP_PHOTOS];
for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
const gallery=document.querySelector('.pricing-photos');
const draggablePricingPhotos=matchMedia('(min-width: 761px) and (pointer: fine)');
pool.slice(0,3).forEach(photo=>{
 const print=document.createElement('figure');print.className='pricing-print scattered-print';
 const image=document.createElement('img');image.src=photo.src;image.alt=photo.alt;image.draggable=false;print.append(image);gallery.append(print);
 let drag=null,x=0,y=0;
 const stop=()=>{
  const pointerId=drag?.pointerId;drag=null;
  if(pointerId!==undefined&&print.hasPointerCapture(pointerId))print.releasePointerCapture(pointerId);
 };
 print.addEventListener('pointerdown',e=>{
  if(e.button!==0||e.pointerType==='touch'||!draggablePricingPhotos.matches)return;
  drag={x:e.clientX-x,y:e.clientY-y,pointerId:e.pointerId};print.setPointerCapture(e.pointerId);print.style.zIndex=5;
 });
 print.addEventListener('pointermove',e=>{if(!drag)return;x=e.clientX-drag.x;y=e.clientY-drag.y;print.style.translate=`${x}px ${y}px`;});
 print.addEventListener('pointerup',stop);print.addEventListener('pointercancel',stop);print.addEventListener('lostpointercapture',stop);
 draggablePricingPhotos.addEventListener('change',()=>{
  if(draggablePricingPhotos.matches)return;
  stop();x=0;y=0;print.style.removeProperty('translate');print.style.removeProperty('z-index');
 });
});

const BOOKING_LINKS = {
  "free": "https://momence.com/Buffy's-Gym/membership/Free-Class/404834",
  "intro": "https://momence.com/Buffy's-Gym/membership/Buff-21-Pass-(Intro-Offer)/401193",
  "twice": "https://momence.com/Buffy's-Gym/membership/-Buffy%E2%80%99s-2X-Club-(Bi-Weekly)/463942",
  "monthly": "https://momence.com/Buffy's-Gym/membership/Buffy%E2%80%99s-Babe's-Tier-2-Monthly-Membership.--Most-cost-effective-option-for-committed-members/565863",
  "fortnight": "https://momence.com/Buffy's-Gym/membership/Buffy%E2%80%99s-Babe's-Tier-2-Bi-Weekly-Membership.--Most-cost-effective-option-for-committed-members/565867",
  "10": "https://momence.com/Buffy's-Gym/membership/10-Class-Pack--%2433%2FClass/398571",
  "20": "https://momence.com/Buffy's-Gym/membership/20-Class-Pack--%2427%2Fclass/398575",
  "coaching": "https://momence.com/u/buffy%27s-gym-cSF0dy",
  "schedule": "https://momence.com/u/buffy%27s-gym-cSF0dy"
};

(() => {
 const form = document.querySelector('.plan-questions');
 if (!form) return;
 const answer = name => form.elements[name].value;
 const show = (name, visible) => {
  const fieldset = form.querySelector(`[data-question="${name}"]`);
  fieldset.hidden = !visible;
  fieldset.disabled = !visible;
 };
 function currentPlan() {
  const personal = answer('service') === 'personal';
  const mode = answer('classMode');
  show('classMode', !personal);
  show('pack', !personal && mode === 'pack');
  show('intro', !personal && mode === 'intro');
  show('frequency', !personal && mode === 'membership');
  show('billing', !personal && mode === 'membership' && answer('frequency') === 'unlimited');
  show('people', personal);
  show('sessions', personal);
  if (personal) {
   const partner = answer('people') === 'partner';
   const count = answer('sessions');
   const prices = partner ? {1:160,4:640,8:1220,12:1740} : {1:120,4:440,8:840,12:1200};
   return {title:partner?'Partner training':'Personal training',subtitle:`${count} ${count === '1'?'session':'sessions'}`,price:prices[count],term:'One-time payment',benefits:[partner?'Two people, one coach':'One-on-one coaching',`${count} ${count === '1'?'coached session':'coached sessions'}`,'Book by appointment'],cta:'View booking options',href:BOOKING_LINKS.coaching};
  }
  if (mode === 'intro') {
   if (answer('intro') === 'free') return {title:'Your first class',subtitle:'Try small group training',price:0,term:'For new members',benefits:['One small group class','Up to 10 people, led by a coach'],cta:'Book a free class',href:BOOKING_LINKS.free};
   return {title:'Buff 21 Pass',subtitle:'Your introduction to Buffy’s',price:150,term:'One-time payment',benefits:['Unlimited classes for 21 days','1 partner pass to bring a friend to a class'],cta:'Get the intro pass',href:BOOKING_LINKS.intro};
  }
  if (mode === 'pack') {
   const count = answer('pack');
   if (count === '1') return {title:'Drop-in class',subtitle:'Small group training',price:35,term:'One class',benefits:['One coach-led class','Book a time on the class schedule'],cta:'Book a class',href:BOOKING_LINKS.schedule};
   return {title:`${count}-class pack`,subtitle:'Small group classes',price:count==='10'?330:540,term:'One-time payment',benefits:[`${count} small group classes`,count==='10'?'$33 per class':'$27 per class',count==='10'?'Expires after 3 months':'Expires after 4 months'],cta:`Buy ${count} classes`,href:BOOKING_LINKS[count]};
  }
  if (answer('frequency') === 'twice') return {title:'Buffy’s 2X Club',subtitle:'Two classes a week',price:128,term:'Every 14 days',benefits:['2 classes each week','Access to all class types','No commitment'],cta:'Join the 2X Club',href:BOOKING_LINKS.twice};
  const monthly = answer('billing') === 'monthly';
  return {title:'Unlimited classes',subtitle:'Buffy’s Babes membership',price:monthly?310:155,term:monthly?'Every month':'Every 15 days',benefits:['Unlimited access to classes',monthly?'Renews every month':'Renews every 15 days'],cta:'Join unlimited',href:monthly?BOOKING_LINKS.monthly:BOOKING_LINKS.fortnight};
 }
 function render(announce = true) {
  const plan = currentPlan();
  const price = plan.price === 0 ? 'Free' : '$' + plan.price.toLocaleString('en-CA');
  document.querySelector('#plan-title').textContent = plan.title;
  document.querySelector('#plan-subtitle').textContent = plan.subtitle;
  document.querySelector('#plan-price').textContent = price;
  document.querySelector('#plan-term').textContent = plan.term;
  document.querySelector('#plan-benefits').replaceChildren(...plan.benefits.map(text => {const li=document.createElement('li');li.textContent=text;return li;}));
  const purchase = document.querySelector('#plan-purchase');
  purchase.href = plan.href;
  purchase.textContent = plan.cta;
  document.querySelector('#mobile-plan-title').textContent = plan.title;
  document.querySelector('#mobile-plan-price').textContent = price;
  document.querySelector('#mobile-plan-term').textContent = plan.term;
  const mobilePurchase = document.querySelector('#mobile-plan-purchase');
  mobilePurchase.href = plan.href;
  mobilePurchase.textContent = plan.cta;
  document.querySelector('.mobile-plan-toggle').setAttribute('aria-label', `View plan details: ${plan.title}, ${price}, ${plan.term}`);
  if (announce) document.querySelector('#plan-announcement').textContent = `${plan.title}. ${plan.subtitle}. ${price} Canadian dollars. ${plan.term}.`;
 }
 form.addEventListener('change', () => render());
 form.addEventListener('submit', event => event.preventDefault());
 render(false);

 // Move the same summary into a native modal on mobile, so every view uses one plan.
 const summary = document.querySelector('.plan-summary');
 const summaryHome = document.createComment('Plan summary desktop position');
 summary.before(summaryHome);
 const bar = document.querySelector('.mobile-plan-bar');
 const toggle = document.querySelector('.mobile-plan-toggle');
 const sheet = document.querySelector('#plan-sheet');
 const mobile = matchMedia('(max-width: 760px)');
 let savedScroll = null;
 let closeTimer = null;
 const restorePage = () => {
  clearTimeout(closeTimer);
  sheet.classList.remove('is-closing');
  toggle.setAttribute('aria-expanded', 'false');
  if (savedScroll) {
   const { x, y, styles } = savedScroll;
   Object.assign(document.body.style, styles);
   savedScroll = null;
   window.scrollTo({left:x, top:y, behavior:'instant'});
  }
 };
 const finishClose = () => { if (sheet.open) sheet.close(); restorePage(); };
 const closeSheet = () => {
  if (!sheet.open || sheet.classList.contains('is-closing')) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { finishClose(); return; }
  sheet.classList.add('is-closing');
  closeTimer = setTimeout(finishClose, 240);
 };
 toggle.addEventListener('click', () => {
  if (!mobile.matches || sheet.open) return;
  const styles = Object.fromEntries(['position','top','left','width','overflow'].map(key => [key, document.body.style[key]]));
  savedScroll = {x:window.scrollX, y:window.scrollY, styles};
  Object.assign(document.body.style, {position:'fixed', top:`-${savedScroll.y}px`, left:`-${savedScroll.x}px`, width:'100%', overflow:'hidden'});
  sheet.showModal();
  toggle.setAttribute('aria-expanded', 'true');
 });
 sheet.querySelector('.plan-sheet-close').addEventListener('click', closeSheet);
 sheet.addEventListener('cancel', event => { event.preventDefault(); closeSheet(); });
 sheet.addEventListener('close', restorePage);
 sheet.addEventListener('click', event => {
  if (event.target !== sheet) return;
  const rect = sheet.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeSheet();
 });
 const syncLayout = () => {
  if (!mobile.matches) finishClose();
  if (mobile.matches) sheet.append(summary);
  else summaryHome.after(summary);
  bar.hidden = !mobile.matches;
  document.documentElement.classList.toggle('mobile-plan-active', mobile.matches);
 };
 mobile.addEventListener('change', syncLayout);
 new ResizeObserver(() => {
  if (mobile.matches) document.documentElement.style.setProperty('--mobile-plan-height', `${bar.offsetHeight}px`);
 }).observe(bar);
 syncLayout();
})();
