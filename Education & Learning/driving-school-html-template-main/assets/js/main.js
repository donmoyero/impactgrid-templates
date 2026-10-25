/* ============================================
   DRIVIN — Main JavaScript
   Vanilla JS: IntersectionObserver, burger,
   active nav, data-year, data-form
   ============================================ */
(function () {
  'use strict';

  /* ---------- IntersectionObserver reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Speedometer stat counters ---------- */
  function initStats() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCounter(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    counters.forEach(function (el) { io.observe(el); });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = 1800;
    var start = 0;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var current = Math.floor(ease * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    // Animate speedometer ring
    var ring = el.closest('.stat-item');
    if (ring) {
      var pct = Math.min(target / 500 * 100, 92);
      var sm = ring.querySelector('.stat-speedometer');
      if (sm) sm.style.setProperty('--pct', pct + '%');
    }
  }

  /* ---------- Burger toggle ---------- */
  function initBurger() {
    var burger = document.querySelector('.burger');
    var links = document.querySelector('.nav-links');
    var overlay = document.querySelector('.nav-overlay');
    if (!burger || !links) return;

    function toggleMenu() {
      burger.classList.toggle('open');
      links.classList.toggle('open');
      if (overlay) overlay.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    }

    burger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (links.classList.contains('open')) toggleMenu();
      });
    });
  }

  /* ---------- Active nav link ---------- */
  function initActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === path) {
        a.classList.add('active');
      }
    });
  }

  /* ---------- data-year ---------- */
  function initYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Testimonial carousel ---------- */
  function initCarousel() {
    var track = document.querySelector('.testimonial-track');
    var dots = document.querySelectorAll('.carousel-dot');
    var prev = document.querySelector('.carousel-prev');
    var next = document.querySelector('.carousel-next');
    if (!track || !dots.length) return;

    var current = 0;
    var total = dots.length;

    function goTo(i) {
      current = (i + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, idx) {
        d.classList.toggle('active', idx === current);
      });
    }

    dots.forEach(function (d, idx) {
      d.addEventListener('click', function () { goTo(idx); });
    });
    if (prev) prev.addEventListener('click', function () { goTo(current - 1); });
    if (next) next.addEventListener('click', function () { goTo(current + 1); });

    // Auto-advance
    setInterval(function () { goTo(current + 1); }, 5000);
  }

  /* ---------- data-form ---------- */
  function initForms() {
    document.querySelectorAll('[data-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = true;
        form.querySelectorAll('[required]').forEach(function (field) {
          if (!field.value.trim()) { ok = false; }
          if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
            ok = false;
          }
        });
        var msgEl = form.querySelector('.form-msg');
        if (msgEl) {
          msgEl.remove();
        }
        var msg = document.createElement('div');
        msg.className = ok ? 'form-ok' : 'form-err';
        msg.textContent = ok ? 'Thank you! Your message has been sent.' : 'Please fill in all required fields correctly.';
        form.appendChild(msg);
        if (ok) form.reset();
      });
    });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initStats();
    initBurger();
    initActiveNav();
    initYear();
    initCarousel();
    initForms();
    initBackToTop();
  });
})();
