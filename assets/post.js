(() => {
  const prose = document.querySelector('.post-content .prose');
  for (const link of prose.querySelectorAll('a[href]')) {
    const opensPage = link.protocol === 'https:' || link.protocol === 'http:';
    const samePage = link.origin === window.location.origin &&
      link.pathname === window.location.pathname && link.search === window.location.search;
    if (opensPage && !samePage && !link.hasAttribute('download')) {
      link.target = '_blank';
      link.relList.add('noopener', 'noreferrer');
    }
  }

  const toc = document.querySelector('.post-toc');
  const headings = Array.from(prose.querySelectorAll(':is(h2, h3)[id]'));
  if (headings.length === 0) return;

  const list = toc.querySelector('.post-toc-list');
  const desktop = window.matchMedia('(min-width: 54rem)');
  let section;
  let subsections;
  const links = headings.map((heading) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${encodeURIComponent(heading.id)}`;
    link.textContent = heading.textContent.trim();
    item.append(link);
    if (!heading.hasAttribute('tabindex')) heading.tabIndex = -1;

    if (heading.tagName === 'H3' && section) {
      if (!subsections) {
        subsections = document.createElement('ol');
        section.append(subsections);
      }
      subsections.append(item);
    } else {
      list.append(item);
      section = item;
      subsections = null;
    }
    return link;
  });

  const syncDisclosure = () => { toc.open = desktop.matches; };
  desktop.addEventListener('change', syncDisclosure);
  syncDisclosure();
  toc.hidden = false;
  document.documentElement.classList.add('has-post-toc');

  list.addEventListener('click', (event) => {
    if (!desktop.matches && event.target.closest('a') &&
        !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      toc.open = false;
    }
  });

  let current;
  const updateCurrent = () => {
    const readingLine = parseFloat(getComputedStyle(headings[0]).scrollMarginTop) + 8;
    const atEnd = window.scrollY > 0 &&
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    let index = 0;
    if (atEnd) {
      index = headings.length - 1;
    } else {
      while (index + 1 < headings.length && headings[index + 1].getBoundingClientRect().top <= readingLine) {
        index += 1;
      }
    }

    const active = links[index];
    if (active === current) return;
    current?.removeAttribute('aria-current');
    active.setAttribute('aria-current', 'location');
    current = active;

    if (desktop.matches) {
      const item = active.getBoundingClientRect();
      const viewport = list.getBoundingClientRect();
      if (item.top < viewport.top) list.scrollTop += item.top - viewport.top;
      if (item.bottom > viewport.bottom) list.scrollTop += item.bottom - viewport.bottom;
    }
  };

  let frame = 0;
  const scheduleUpdate = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      updateCurrent();
    });
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  const initial = links.findIndex((link) => link.hash === window.location.hash);
  if (initial >= 0) headings[initial].scrollIntoView();
  updateCurrent();
})();
