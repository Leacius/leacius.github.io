(() => {
  const list = document.querySelector('.portfolio-tablist');
  if (!list) return;
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  const interestPanels = panels.filter(panel => panel.classList.contains('profile-interest'));
  // Match the two interest panels without reserving a tall project-sized space.
  function sizeInterests() {
    const heights = interestPanels.map(panel => {
      const clone = panel.cloneNode(true);
      clone.hidden = false;
      clone.removeAttribute('id');
      clone.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
      clone.setAttribute('aria-hidden', 'true');
      clone.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;top:0;left:0;min-height:0;';
      panel.parentElement.appendChild(clone);
      const height = clone.getBoundingClientRect().height;
      clone.remove();
      return height;
    });
    const height = Math.ceil(Math.max(...heights));
    interestPanels.forEach(panel => { panel.style.minHeight = height + 'px'; });
  }
  function select(id, focus = false) {
    tabs.forEach((tab, index) => {
      const active = panels[index].id === id;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[index].hidden = !active;
      panels[index].querySelectorAll('video').forEach(video => {
        if (active) video.play().catch(() => {});
        else video.pause();
      });
      if (active && focus) tab.focus();
    });
  }
  panels.forEach((panel, index) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabs[index].id);
    panel.tabIndex = 0;
  });
  const hashId = () => location.hash.slice(1);
  const valid = id => panels.some(panel => panel.id === id);
  list.hidden = false;
  sizeInterests();
  select(valid(hashId()) ? hashId() : 'education');
  window.addEventListener('resize', sizeInterests);
  if (document.fonts) document.fonts.ready.then(sizeInterests);
  panels.forEach(panel => panel.querySelectorAll('video').forEach(video => {
    video.addEventListener('play', () => { if (panel.hidden) video.pause(); });
  }));
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      const id = panels[index].id;
      select(id);
      history.replaceState(null, '', '#' + id);
    });
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      tabs[next].click();
      tabs[next].focus();
    });
  });
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const id = link.getAttribute('href').slice(1);
      if (!valid(id)) return;
      event.preventDefault();
      select(id);
      history.pushState(null, '', '#' + id);
      list.scrollIntoView({ block: 'start' });
    });
  });
  window.addEventListener('hashchange', () => {
    if (valid(hashId())) select(hashId());
  });
})();
