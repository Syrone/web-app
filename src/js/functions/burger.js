import scrollLock from 'scroll-lock';

(function(){
  const burger = document?.querySelector('[data-burger]');
  const menu = document?.querySelector('[data-menu]');
  const closes = document?.querySelectorAll('[data-menu-close]');
  const menuItems = document?.querySelectorAll('[data-menu-item]');
  const overlay = document?.querySelector('[data-menu-overlay]');

  burger?.addEventListener('click', (e) => {
    burger?.classList.toggle('burger--active');
    overlay?.setAttribute('data-menu-overlay', 'true');
    menu?.classList.toggle('menu--active');

    if (menu?.classList.contains('menu--active')) {
      burger?.setAttribute('aria-expanded', 'true');
      overlay?.setAttribute('data-menu-overlay', 'true');
      burger?.setAttribute('aria-label', 'Закрыть меню');
      scrollLock.disablePageScroll(menu);
    } else {
      burger?.setAttribute('aria-expanded', 'false');
      overlay?.setAttribute('data-menu-overlay', 'false');
      burger?.setAttribute('aria-label', 'Открыть меню');
      scrollLock.enablePageScroll(menu);
    }
  });

  overlay?.addEventListener('click', () => {
    burger?.setAttribute('aria-expanded', 'false');
    burger?.setAttribute('aria-label', 'Открыть меню');
    overlay?.setAttribute('data-menu-overlay', 'false');
    burger.classList.remove('burger--active');
    menu.classList.remove('menu--active');
    scrollLock.enablePageScroll(menu);
  });

  menuItems?.forEach(el => {
    el.addEventListener('click', () => {
      burger?.setAttribute('aria-expanded', 'false');
      burger?.setAttribute('aria-label', 'Открыть меню');
      overlay?.setAttribute('data-menu-overlay', 'false');
      burger.classList.remove('burger--active');
      menu.classList.remove('menu--active');
      scrollLock.enablePageScroll(menu);
    });
  });

  closes?.forEach((btn) => {
    btn.addEventListener('click', () => {
      burger?.setAttribute('aria-expanded', 'false');
      burger?.setAttribute('aria-label', 'Открыть меню');
      overlay?.setAttribute('data-menu-overlay', 'false');
      burger.classList.remove('burger--active');
      menu.classList.remove('menu--active');
      scrollLock.enablePageScroll(menu);
    })
  })
})();
