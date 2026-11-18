// Keep these per-session rates aligned with the training choices in pricing.js.
function trainingQuote(search) {
 const params = new URLSearchParams(search);
 const training = params.get('training');
 const sessions = params.get('sessions');
 if (!['solo', 'partner'].includes(training) || !['1', '4', '8', '12'].includes(sessions)) return null;
 const rates = training === 'partner' ? {1:160, 4:160, 8:150, 12:140} : {1:120, 4:110, 8:105, 12:100};
 return {training, sessions:Number(sessions), rate:rates[sessions], total:rates[sessions] * Number(sessions), title:training === 'partner' ? 'Partner training' : 'Personal training'};
}

function trainingQuoteText(quote) {
 if (!quote) return '';
 const money = value => '$' + value.toLocaleString('en-CA');
 return `${quote.title} · ${quote.sessions} ${quote.sessions === 1 ? 'session' : 'sessions'} · ${money(quote.rate)} per session · ${money(quote.total)} total CAD`;
}

function enquiryEmailLink(fields, quote) {
 const subject = quote ? `Personal training inquiry — ${quote.title}, ${quote.sessions} sessions` : 'Buffy’s Gym enquiry';
 const body = [trainingQuoteText(quote), fields.message, `Name: ${fields.name || ''}`, `Email: ${fields.email || ''}`, fields.phone ? `Phone: ${fields.phone}` : ''].filter(Boolean).join('\n\n');
 return `mailto:buffysgym@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

if (typeof module !== 'undefined' && module.exports) module.exports = {trainingQuote, trainingQuoteText, enquiryEmailLink};

(() => {
 if (typeof document === 'undefined') return;
 const form = document.querySelector('.contact-form');
 if (!form) return;
 const quote = trainingQuote(window.location.search);
 const quotePanel = document.querySelector('#contact-quote');
 const status = document.querySelector('#contact-status');
 const emailLink = document.querySelector('#contact-email-draft');
 const submit = form.querySelector('[type="submit"]');
 const field = name => form.elements.namedItem(name);
 if (quote) {
  const money = value => '$' + value.toLocaleString('en-CA');
  quotePanel.hidden = false;
  document.querySelector('#contact-quote-title').textContent = quote.title;
  document.querySelector('#contact-quote-sessions').textContent = `${quote.sessions} ${quote.sessions === 1 ? 'session' : 'sessions'}`;
  document.querySelector('#contact-quote-rate').textContent = `${money(quote.rate)} per session`;
  document.querySelector('#contact-quote-total').textContent = `${money(quote.total)} CAD`;
  document.querySelector('#contact-intro').textContent = 'Tell us when you’d like to train, or ask us a question. We’ll be in touch to arrange your sessions.';
  field('Selected plan').value = trainingQuoteText(quote);
  field('Selected plan').disabled = false;
  field('_subject').value = `Personal training inquiry — ${quote.title}, ${quote.sessions} ${quote.sessions === 1 ? 'session' : 'sessions'}`;
 }
 // FormSubmit uses this for provenance; never include typed contact details in a URL.
 field('_url').value = window.location.origin + window.location.pathname;
 const updateEmailLink = () => {
  emailLink.href = enquiryEmailLink({name:field('name').value, email:field('email').value, phone:field('phone').value, message:field('message').value}, quote);
 };
 form.addEventListener('input', updateEmailLink);
 emailLink.addEventListener('click', updateEmailLink);
 updateEmailLink();
 const configured = /^https:\/\/formsubmit\.co\/[^/?#]+$/.test(form.getAttribute('action') || '');
 if (!configured) {
  submit.disabled = true;
  status.textContent = 'The enquiry form is unavailable right now. You can email your enquiry below.';
 }
 form.addEventListener('submit', event => {
  if (!configured) {
   event.preventDefault();
   status.textContent = 'The enquiry form is unavailable right now. You can email your enquiry below.';
   return;
  }
  // Use FormSubmit’s normal POST so its security check and any activation notice remain visible.
  // Do not report delivery here: only the provider can confirm the submission outcome.
  status.textContent = 'Opening the security check to finish sending your enquiry…';
 });
})();
