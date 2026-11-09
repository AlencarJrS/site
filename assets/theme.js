(() => {
  const storageKey = 'jekyll-blog-theme';
  const root = document.documentElement;

  try {
    if (localStorage.getItem(storageKey) === 'light') {
      root.dataset.theme = 'light';
    }
  } catch {
    // The switch still works when the browser blocks local storage.
  }

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');

    toggle.setAttribute('aria-pressed', String(root.dataset.theme === 'light'));
    toggle.hidden = false;

    toggle.addEventListener('click', () => {
      const theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = theme;
      toggle.setAttribute('aria-pressed', String(theme === 'light'));

      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // The selection still applies to the current page.
      }
    });
  });
})();
