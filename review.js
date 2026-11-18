(() => {
 // The selected production pairing is Anton + Inter, with Archivo body text.
 // The separate local comparison page keeps the earlier typography studies.
 document.documentElement.dataset.type = 'mixed';
 for (const href of ['fonts.css', 'reference-type.css']) {
  if (document.querySelector(`link[rel="stylesheet"][href^="${href}"]`)) continue;
  const sheet = document.createElement('link');
  sheet.rel = 'stylesheet';
  sheet.href = href;
  document.head.append(sheet);
 }
})();
