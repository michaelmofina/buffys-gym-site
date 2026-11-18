function advanceTennisBall(s, dt, bounds, gravity) {
  // Keep momentum in flight. Ground contacts absorb more energy so a throw
  // finishes with a short roll instead of a long sequence of tiny bounces.
  const drag = Math.exp(-.10 * dt);
  s.vx = (s.vx + gravity.x * dt) * drag;
  s.vy = (s.vy + gravity.y * dt) * drag;
  s.x += s.vx * dt; s.y += s.vy * dt;
  for (const [pos, vel, max] of [['x', 'vx', bounds.x], ['y', 'vy', bounds.y]]) {
    if (s[pos] < bounds.r) {
      s[pos] = bounds.r;
      if (s[vel] < 0) s[vel] = -s[vel] * .78;
    }
    if (s[pos] > max) {
      s[pos] = max;
      if (s[vel] > 0) s[vel] = pos === 'y'
        ? (s[vel] < 140 ? 0 : -s[vel] * .55)
        : -s[vel] * .78;
    }
  }
  if (s.y === bounds.y && s.vy === 0) {
    const speed = Math.max(0, Math.abs(s.vx) - 420 * dt);
    s.vx = Math.sign(s.vx) * speed;
  }
}

function tennisDragPosition(point, offset, bounds) {
  // An absolute grab offset survives clamping at the screen edges.
  return {x:Math.max(bounds.r,Math.min(bounds.x,point.x-offset.x)),
    y:Math.max(bounds.r,Math.min(bounds.y,point.y-offset.y))};
}

function tennisThrowVelocity(samples, releasedAt) {
  if(samples.length<2)return {vx:0,vy:0};
  let end=samples.length-1;
  // Compare with the release position, not each adjacent sample: high-polling
  // mice can move less than half a pixel per event while still moving quickly.
  const releasePoint=samples[end];
  while(end>0 && Math.hypot(releasePoint.x-samples[end-1].x,releasePoint.y-samples[end-1].y)<.5)end--;
  if(end===0)return {vx:0,vy:0};
  const idle=Math.max(0,releasedAt-samples[end].t);
  // Mouse-up often follows the last movement by several frames. Preserve that
  // throw, then fade only for a deliberate hold so placing the ball still works.
  if(idle>=220)return {vx:0,vy:0};
  const cutoff=samples[end].t-70;
  let start=end;
  while(start>0 && samples[start-1].t>=cutoff)start--;
  const recent=samples.slice(start,end+1);
  if(start>0 && recent[0].t>cutoff){
    const before=samples[start-1],after=recent[0];
    const time=Math.max(cutoff,before.t),fraction=(time-before.t)/(after.t-before.t);
    if(after.t>before.t)recent.unshift({x:before.x+(after.x-before.x)*fraction,y:before.y+(after.y-before.y)*fraction,t:time});
  }
  if(recent.length<2 || recent[recent.length-1].t-recent[0].t<8)return {vx:0,vy:0};
  let weight=0,time=0,x=0,y=0;
  for(const p of recent){
    const t=(p.t-samples[end].t)/1000,w=Math.exp(t/.035);
    weight+=w;time+=t*w;x+=p.x*w;y+=p.y*w;
  }
  time/=weight;x/=weight;y/=weight;
  let variance=0,covX=0,covY=0;
  for(const p of recent){
    const t=(p.t-samples[end].t)/1000,w=Math.exp(t/.035),delta=t-time;
    variance+=w*delta*delta;covX+=w*delta*(p.x-x);covY+=w*delta*(p.y-y);
  }
  if(variance<1e-8)return {vx:0,vy:0};
  const gain=1.25*Math.min(1,(220-idle)/120);
  let vx=covX/variance*gain,vy=covY/variance*gain;
  const speed=Math.hypot(vx,vy),cap=3000;
  if(speed>cap){vx*=cap/speed;vy*=cap/speed;}
  return {vx,vy};
}
(() => {
  const layer = document.querySelector('.ball-layer'), ball = layer?.querySelector('.ball');
  if (!ball) return;
  const home = layer.parentElement;
  function roam(){
    if(layer.classList.contains('is-roaming'))return;
    const rect=ball.getBoundingClientRect();
    document.body.append(layer);layer.classList.add('is-roaming');
    state.x=rect.left+R;state.y=rect.top+R;draw();
  }
  function returnHome(){layer.classList.remove('is-roaming');home.append(layer);}
  const dog = layer.querySelector('.fetcher');
  // Prepare the photographic stickers as the footer approaches, then cycle
  // through every pose before repeating one. Keep the images off the hero load.
  const stickerSources = [
    'assets/stickers/buffy-ball.webp',
    'assets/stickers/buffy-red-toy.webp',
    'assets/stickers/buffy-bandana.webp'
  ];
  let stickerCursor = Math.floor(Math.random() * stickerSources.length);
  let stickerReady;
  const loadStickers = () => stickerReady ||= Promise.all(stickerSources.map(src => {
    const image = new Image();
    image.src = src;
    return image.decode().then(() => image).catch(() => null);
  })).then(images => images.filter(Boolean));
  const stickerObserver = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    loadStickers();
    stickerObserver.disconnect();
  }, { rootMargin: '300px' });
  stickerObserver.observe(home);

  const canvas = ball.querySelector('canvas');
  const status = layer.querySelector('.ball-status');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let R = ball.getBoundingClientRect().width / 2;
  const state = {x:80,y:80,vx:0,vy:0};
  let raf = 0, previous = 0, held = false, pointer = null, grabOffset = null, pointerSamples = [];
  let paused = reduced.matches;
  const gravity = {x:0,y:1050};
  let q = [.12,.08,.40,.90], gl, program, rotationUniform;
  let thrown=false, fetching=false, fetchTimers=[], fetchVersion=0, settledFetchTimer=0;
  const later=(fn,ms)=>{const id=setTimeout(fn,ms);fetchTimers.push(id);};
  function resetFetch(){
    clearTimeout(settledFetchTimer);settledFetchTimer=0;
    fetchVersion++;
    fetchTimers.forEach(clearTimeout);fetchTimers=[];fetching=false;thrown=false;
    dog?.classList.remove('is-fetching');ball.classList.remove('is-gone');
  }
  async function fetchBall(){
    if(!dog||fetching||paused||held||document.hidden||reduced.matches)return;
    fetching=true;thrown=false;stop();
    const version=++fetchVersion;
    const stickers=await loadStickers();
    if(version!==fetchVersion)return;
    if(paused||held||document.hidden||reduced.matches){resetFetch();return;}
    if(stickers.length){
      dog.src=stickers[stickerCursor % stickers.length].src;
      stickerCursor++;
    }
    state.y=bounds().y;draw();
    const halfSticker=dog.getBoundingClientRect().width/2;
    dog.style.left=clamp(state.x,halfSticker,layer.clientWidth-halfSticker)+'px';
    dog.classList.add('is-fetching');status.textContent='Here comes Buffy!';
    later(()=>{ball.classList.add('is-gone');status.textContent='Buffy got the ball.';},650);
    later(()=>dog.classList.remove('is-fetching'),1600);
    later(()=>{
      returnHome();state.x=clamp(layer.clientWidth*.72,R,bounds().x);state.y=bounds().y;
      resetFetch();draw();status.textContent='Good dog. Throw it again!';
    },2200);
  }
  const clamp = (v,min,max) => Math.min(max,Math.max(min,v));
  const bounds = () => {
    const {width,height}=layer.getBoundingClientRect();
    // The shader leaves a transparent rim around the sphere; align its visible edge with the page floor.
    const visibleRadius = gl ? R / 1.08 : R;
    return {r:R,x:Math.max(R,width-R),y:Math.max(R,height-visibleRadius)};
  };
  // A ray-sphere intersection in the fragment shader gives a smooth true 3D
  // surface; the inverse orientation locks felt and seam to the rotating ball.
  try {
    gl = canvas.getContext('webgl', {alpha:true, antialias:true, premultipliedAlpha:false});
    if (!gl) throw new Error('No WebGL');
    const vertex = `attribute vec2 position; varying vec2 uv;
      void main(){uv=position*1.08;gl_Position=vec4(position,0.,1.);}`;
    const fragment = `precision highp float;
      varying vec2 uv; uniform mat3 rotation;
      float hash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
      void main(){
        float r2=dot(uv,uv);
        float fuzz=hash(vec3(floor(uv*230.),1.));
        if(r2>1.0+fuzz*.012) discard;
        r2=min(r2,.9999);
        vec3 n=vec3(uv,sqrt(1.-r2)); vec3 p=rotation*n;
        float longitude=atan(p.z,p.x);
        float seamDistance=abs(p.y-.52*cos(2.*longitude));
        float seam=1.-smoothstep(.025,.042,seamDistance+(.5-hash(floor(p*250.)))*.008);
        float groove=1.-smoothstep(.047,.067,seamDistance);
        float fiber=hash(floor(p*380.));
        float mottling=hash(floor(p*36.));
        vec3 felt=vec3(.77,.86,.17)*(0.85+fiber*.24+mottling*.07);
        vec3 material=mix(felt,vec3(.92,.92,.79),seam);
        float diffuse=max(0.,dot(n,normalize(vec3(-.6,.8,1.3))));
        float shade=.52+.48*diffuse;
        float roughHighlight=pow(max(0.,dot(n,normalize(vec3(-.35,.5,1.6)))),8.)*.018;
        material*=1.-.12*groove*(1.-seam);
        vec3 color=material*shade+roughHighlight;
        float edge=(1.-smoothstep(.98+fuzz*.008,1.008,r2));
        gl_FragColor=vec4(color,edge);
      }`;
    function compile(type, source) {
      const shader=gl.createShader(type); gl.shaderSource(shader,source); gl.compileShader(shader);
      if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
      return shader;
    }
    program=gl.createProgram(); gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));
    gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment)); gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)) throw new Error('Ball shader link failed');
    gl.useProgram(program);
    const buffer=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    const position=gl.getAttribLocation(program,'position'); gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    rotationUniform=gl.getUniformLocation(program,'rotation');
    ball.classList.add('has-3d');
  } catch (_) { gl=null; canvas.hidden=true; }
  function roll(dx,dy) {
    const distance=Math.hypot(dx,dy); if(distance<.001) return;
    const half=distance/R/2, k=Math.sin(half)/distance;
    const a=dy*k,b=dx*k,c=Math.cos(half),[x,y,z,w]=q;
    q=[c*x+a*w+b*z,c*y+b*w-a*z,c*z+a*y-b*x,c*w-a*x-b*y];
    const length=Math.hypot(...q); q=q.map(v=>v/length);
  }
  function draw() {
    ball.style.transform=`translate3d(${state.x-R}px,${state.y-R}px,0)`;
    if(!gl || gl.isContextLost()) return;
    const [x,y,z,w]=q;
    // Column-major inverse quaternion matrix.
    const matrix=[1-2*(y*y+z*z),2*(x*y-z*w),2*(x*z+y*w),2*(x*y+z*w),1-2*(x*x+z*z),2*(y*z-x*w),2*(x*z-y*w),2*(y*z+x*w),1-2*(x*x+y*y)];
    gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniformMatrix3fv(rotationUniform,false,new Float32Array(matrix)); gl.drawArrays(gl.TRIANGLES,0,6);
  }
  function isBallStill() {
    const speed=Math.hypot(state.vx,state.vy);
    return speed<3 && state.y===bounds().y;
  }
  function step(now) {
    raf=0;
    if(paused || held || fetching || document.hidden) return;
    const dt=Math.min((now-previous)/1000||1/60,.05); previous=now;
    const oldX=state.x,oldY=state.y;
    const steps=Math.ceil(dt*240),b=bounds();
    for(let i=0;i<steps;i++) advanceTennisBall(state,dt/steps,b,gravity);
    roll(state.x-oldX,state.y-oldY);draw();
    if(!isBallStill()) {
      clearTimeout(settledFetchTimer);settledFetchTimer=0;
      raf=requestAnimationFrame(step);
    } else {
      state.vx=0;state.vy=0;
      if(thrown&&!settledFetchTimer) settledFetchTimer=setTimeout(()=>{
        // Clear the guard even if motion resumed, so the next rest can schedule again.
        settledFetchTimer=0;
        if(!thrown||held||paused||fetching||document.hidden||reduced.matches)return;
        if(isBallStill())fetchBall();else run();
      },250);
    }
  }
  function run(){if(!raf&&!paused&&!held&&!fetching&&!document.hidden){previous=performance.now();raf=requestAnimationFrame(step);}}
  function stop(){cancelAnimationFrame(raf);raf=0;state.vx=0;state.vy=0;}
  function setPause(value){
    paused=value;stop();resetFetch();
    ball.classList.toggle('is-paused',paused);
    if(!paused)run();
  }
  ball.addEventListener('pointerdown',e=>{
    if(paused || fetching || held || e.button!==0) return;
    e.preventDefault();resetFetch();roam();stop();held=true;pointer=e.pointerId;ball.setPointerCapture(pointer);
    grabOffset={x:e.clientX-state.x,y:e.clientY-state.y};
    pointerSamples=[{x:e.clientX,y:e.clientY,t:e.timeStamp}];ball.classList.add('is-held');
  });
  function moveToPointer(e){
    const oldX=state.x,oldY=state.y;
    Object.assign(state,tennisDragPosition({x:e.clientX,y:e.clientY},grabOffset,bounds()));
    roll(state.x-oldX,state.y-oldY);draw();
  }
  ball.addEventListener('pointermove',e=>{
    if(!held||e.pointerId!==pointer)return;
    moveToPointer(e);
    const points=e.getCoalescedEvents?.()||[];
    for(const point of points.length?points:[e])pointerSamples.push({x:point.clientX,y:point.clientY,t:point.timeStamp});
    pointerSamples=pointerSamples.filter(p=>e.timeStamp-p.t<=160);
  });
  function release(e){
    if(!held||e.pointerId!==pointer)return;
    if(e.type==='pointerup'){
      moveToPointer(e);
      pointerSamples.push({x:e.clientX,y:e.clientY,t:e.timeStamp});
      Object.assign(state,tennisThrowVelocity(pointerSamples,e.timeStamp));
    }else{state.vx=0;state.vy=0;}
    const releasedPointer=pointer;
    pointerSamples=[];grabOffset=null;held=false;pointer=null;ball.classList.remove('is-held');
    if(ball.hasPointerCapture(releasedPointer))ball.releasePointerCapture(releasedPointer);
    // Even a cancelled touch should settle and return the ball to its footer.
    thrown=true;run();
  }
  ['pointerup','pointercancel','lostpointercapture'].forEach(name=>ball.addEventListener(name,release));
  ball.addEventListener('keydown',e=>{
    if(paused||fetching)return;
    const directions={ArrowLeft:[-700,-180],ArrowRight:[700,-180],ArrowUp:[0,-1050],ArrowDown:[0,700],' ':[700,-1050],Enter:[700,-1050]};
    if(!directions[e.key])return;e.preventDefault();resetFetch();roam();[state.vx,state.vy]=directions[e.key];thrown=true;run();
  });
  reduced.addEventListener('change',e=>setPause(e.matches));
  document.addEventListener('visibilitychange',()=>{stop();resetFetch();if(!document.hidden)run();});
  new ResizeObserver(()=>{
    const oldRadius=R; R=ball.getBoundingClientRect().width/2;
    const b=bounds();state.x=clamp(state.x,R,b.x);state.y=clamp(state.y,R,b.y);
    if(oldRadius!==R&&!held)state.y=b.y;
    draw();run();
  }).observe(layer);
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();ball.classList.remove('has-3d');canvas.hidden=true;gl=null;});
  state.x=clamp(layer.clientWidth*.72,R,bounds().x);state.y=bounds().y;
  setPause(paused);draw();
})();


// Fit the visible glyph edges, including the font's side bearings.
(() => {
  const wordmark = document.querySelector('.footer-wordmark');
  if (!wordmark) return;
  const context = document.createElement('canvas').getContext('2d');
  if (!context) return;
  const font = style => `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const fit = () => {
    const style = getComputedStyle(wordmark);
    context.font = font(style);
    context.fontKerning = style.fontKerning;
    context.letterSpacing = style.letterSpacing === 'normal' ? '0px' : style.letterSpacing;
    context.wordSpacing = style.wordSpacing === 'normal' ? '0px' : style.wordSpacing;
    context.textAlign = 'left';
    context.direction = style.direction;
    const metrics = context.measureText(wordmark.textContent.trim());
    const inkWidth = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    if (!inkWidth) return;
    const scale = document.documentElement.clientWidth / inkWidth;
    wordmark.style.transform = 'none';
    const origin = wordmark.getBoundingClientRect().left;
    wordmark.style.transform = `translateX(${metrics.actualBoundingBoxLeft * scale - origin}px) scaleX(${scale})`;
  };
  const refresh = async () => {
    const style=getComputedStyle(wordmark);
    await document.fonts.load(font(style),wordmark.textContent.trim());
    requestAnimationFrame(fit);
  };
  document.fonts.ready.then(refresh);
  new ResizeObserver(refresh).observe(wordmark.parentElement);
  new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['class','data-type','data-reference-fonts','style']});
  window.addEventListener('load',refresh);
  document.fonts.addEventListener('loadingdone', fit);
  window.addEventListener('resize', fit);
})();
