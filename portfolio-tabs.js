(() => {
  const list = document.querySelector('.portfolio-tablist');
  if (!list) return;
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
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
  select(valid(hashId()) ? hashId() : 'education');
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

// Personal interests switch independently of the background/work tabs below.
(() => {
  const list = document.querySelector('.interest-tabs');
  if (!list) return;
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  function select(index) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
  }
  panels.forEach((panel, i) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabs[i].id);
    panel.tabIndex = 0;
  });
  list.hidden = false;
  select(0);
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      select(next);
      tabs[next].focus();
    });
  });
})();
