(() => {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  function syncTheme() {
    const dark = document.documentElement.dataset.theme === 'dark';
    toggle.textContent = dark ? 'Light' : 'Dark';
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.setAttribute('aria-pressed', String(dark));
  }
  syncTheme();
  toggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('research-theme', next); } catch (_) {}
    syncTheme();
  });
})();

(() => {
  const dialog = document.querySelector('#dsgd-figure-dialog');
  const open = document.querySelector('[data-figure-open]');
  const close = document.querySelector('[data-figure-close]');
  if (!dialog || !open || !close) return;
  open.addEventListener('click', () => dialog.showModal());
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
})();

// Mark the active archive without changing the homepage layout.
for (const link of document.querySelectorAll('.site-header nav a')) {
 const path = location.pathname;
 if ((path.startsWith('/publications/') && link.pathname === '/publications/') || (path.startsWith('/blog/') && link.pathname === '/blog/') || (path.startsWith('/teaching/') && link.pathname === '/teaching/')) link.setAttribute('aria-current', 'page');
}
