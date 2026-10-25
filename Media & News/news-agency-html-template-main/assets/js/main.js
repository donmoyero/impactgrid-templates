/* ============================================================
   NEWSERS — Main JavaScript
   Vanilla JS, no dependencies
   ============================================================ */

(function () {
  'use strict';

  /* ---- Scroll Reveal (IntersectionObserver) ---- */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---- Header scroll state ---- */
  var header = document.querySelector('.header');
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Active nav link via location.pathname ---- */
  var current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header__nav-link, .mobile-nav__link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.header__toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Footer year ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Form handling [data-form] with .form-ok / .form-err ---- */
  document.querySelectorAll('[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = form.querySelector('.form-ok');
      var err = form.querySelector('.form-err');
      if (ok) ok.classList.remove('show');
      if (err) err.classList.remove('show');

      /* Basic validation */
      var required = form.querySelectorAll('[required]');
      var valid = true;
      required.forEach(function (input) {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = 'var(--c-red)';
        } else {
          input.style.borderColor = '';
        }
      });

      if (valid) {
        if (ok) ok.classList.add('show');
        form.reset();
        setTimeout(function () {
          if (ok) ok.classList.remove('show');
        }, 5000);
      } else {
        if (err) err.classList.add('show');
      }
    });
  });

  /* ---- Ticker duplication for seamless scroll ---- */
  var tickerTrack = document.querySelector('.ticker__track');
  if (tickerTrack) {
    var items = tickerTrack.innerHTML;
    tickerTrack.innerHTML = items + items;
  }

})();
