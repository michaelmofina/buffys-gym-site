(() => {
  const STORAGE_KEY = 'buffy-privacy-consent';
  const VERSION = 1;
  const PIXEL_ID = '29647713458168837';
  const parseChoice = value => {
    try {
      const saved = JSON.parse(value);
      return saved?.version === VERSION && ['allow','decline'].includes(saved.choice) ? saved.choice : null;
    } catch { return null; }
  };
  const readChoice = () => {
    try { return parseChoice(localStorage.getItem(STORAGE_KEY)); }
    catch { return null; }
  };
  const init = () => {
    if (document.getElementById('privacy-banner')) return;
    let choice = readChoice(), pixelState = 'idle', initialized = false, pageViewed = false, opener = null;
    const banner = document.createElement('section');
    banner.id = 'privacy-banner'; banner.className = 'privacy-banner';
    banner.setAttribute('role','region');
    banner.setAttribute('aria-labelledby','privacy-banner-title');
    banner.setAttribute('aria-describedby','privacy-banner-copy');
    banner.innerHTML = `<div class="privacy-banner-copy"><h2 id="privacy-banner-title" class="privacy-banner-title" tabindex="-1">Optional cookies</h2><p id="privacy-banner-copy">Allow Meta cookies to help us understand visits and measure ads? Meta will receive page-view information. You can keep browsing either way. <a href="privacy.html">Privacy details</a></p><p class="privacy-current-choice" data-consent-current hidden></p></div><div class="privacy-banner-actions"><button type="button" data-consent-choice="allow">Allow</button><button type="button" data-consent-choice="decline">Decline</button></div><button class="privacy-banner-close" type="button" data-consent-close aria-label="Close cookie settings" hidden>×</button>`;
    const status = document.createElement('p');
    status.className = 'sr-only'; status.setAttribute('role','status'); status.setAttribute('aria-live','polite');
    document.body.append(banner,status);
    const currentChoice = banner.querySelector('[data-consent-current]');
    const closeButton = banner.querySelector('[data-consent-close]');
    const updateCurrent = () => {
      currentChoice.hidden = !choice;
      currentChoice.textContent = choice ? `Current choice: ${choice === 'allow' ? 'Allowed' : 'Declined'}.` : '';
    };
    const closeBanner = () => {
      banner.hidden = true;
      if (opener?.isConnected) { opener.setAttribute('aria-expanded','false'); opener.focus({preventScroll:true}); }
      opener = null;
    };
    const clearMetaCookies = () => {
      const host = location.hostname, parts = host.split('.');
      const domains = new Set(['',host]);
      for (let i=1;i<parts.length-1;i++) domains.add(parts.slice(i).join('.'));
      const paths = new Set(['/']);
      const segments = location.pathname.split('/').filter(Boolean);
      for (let i=1;i<=segments.length;i++) {
        const path = '/' + segments.slice(0,i).join('/'); paths.add(path); paths.add(path+'/');
      }
      for (const name of ['_fbp','_fbc']) for (const domain of domains) for (const path of paths) {
        document.cookie = `${name}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=${path}${domain ? '; Domain='+domain : ''}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
      }
    };
    const revokeMeta = () => {
      if (typeof window.fbq === 'function') window.fbq('consent','revoke');
      clearMetaCookies();
    };
    const enableMeta = () => {
      if (choice !== 'allow' || pixelState !== 'ready') return;
      const fbq = window.fbq;
      fbq('consent','grant');
      if (!initialized) {
        // This site sends PageView only, without form fields or automatic events.
        fbq('set','autoConfig',false,PIXEL_ID);
        fbq('init',PIXEL_ID);
        initialized = true;
      }
      if (!pageViewed) { fbq('track','PageView'); pageViewed = true; }
    };
    const requestMeta = () => {
      if (choice !== 'allow') return;
      if (pixelState === 'ready') { enableMeta(); return; }
      if (pixelState === 'loading') return;
      if (!window.fbq) {
        const fbq = function() { fbq.callMethod ? fbq.callMethod.apply(fbq,arguments) : fbq.queue.push(arguments); };
        fbq.push = fbq; fbq.loaded = true; fbq.version = '2.0'; fbq.queue = [];
        window.fbq = fbq; window._fbq = fbq;
      }
      window.fbq.disablePushState = true;
      window.fbq('consent','revoke');
      if (window.fbq.callMethod) { pixelState = 'ready'; enableMeta(); return; }
      pixelState = 'loading';
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      script.addEventListener('load',() => {
        pixelState = 'ready';
        // Consent can be withdrawn while the network request is in flight.
        if (choice === 'allow') enableMeta(); else revokeMeta();
      });
      script.addEventListener('error',() => { pixelState = 'idle'; script.remove(); });
      document.head.append(script);
    };
    const applyChoice = next => {
      choice = next;
      updateCurrent();
      if (choice === 'allow') requestMeta(); else revokeMeta();
    };
    const choose = next => {
      try { localStorage.setItem(STORAGE_KEY,JSON.stringify({version:VERSION,choice:next,updatedAt:Date.now()})); } catch {}
      applyChoice(next);
      closeBanner();
      status.textContent = next === 'allow' ? 'Optional Meta cookies allowed.' : 'Optional Meta cookies declined.';
    };
    banner.querySelectorAll('[data-consent-choice]').forEach(button => {
      button.addEventListener('click',() => choose(button.dataset.consentChoice));
    });
    closeButton.addEventListener('click',closeBanner);
    banner.addEventListener('keydown',event => {
      if (event.key === 'Escape' && opener) { event.preventDefault(); closeBanner(); }
    });
    document.addEventListener('click',event => {
      const trigger = event.target.closest?.('[data-cookie-settings]');
      if (!trigger) return;
      event.preventDefault(); opener = trigger;
      trigger.setAttribute('aria-controls','privacy-banner'); trigger.setAttribute('aria-expanded','true');
      updateCurrent(); closeButton.hidden = false; banner.hidden = false;
      banner.querySelector('#privacy-banner-title').focus({preventScroll:true});
    });
    window.addEventListener('storage',event => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      applyChoice(event.key === null ? null : parseChoice(event.newValue));
      if (choice) closeBanner(); else { closeButton.hidden = true; banner.hidden = false; }
    });
    updateCurrent();
    banner.hidden = Boolean(choice);
    if (choice === 'allow') requestMeta(); else revokeMeta();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
