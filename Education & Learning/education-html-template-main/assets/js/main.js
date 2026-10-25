/* ============================================
   EDUKATE - Education Platform Template JS
   Pure Vanilla JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ---- DOM Ready ---- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initScrollReveal();
    initBurger();
    initActiveNav();
    initStickyNav();
    initBackToTop();
    initCounters();
    initFormValidation();
    initDataYear();
    initProgressBars();
  }

  /* =============================================
     1. IntersectionObserver - Scroll Reveal
     threshold: 0.12
     ============================================= */
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything
      reveals.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* =============================================
     2. Burger Menu Toggle
     ============================================= */
  function initBurger() {
    var burger = document.querySelector('.navbar__burger');
    var nav = document.querySelector('.navbar__links');
    if (!burger || !nav) return;

    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
    });

    // Close on link click
    nav.querySelectorAll('.navbar__link').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('open');
        nav.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!burger.contains(e.target) && !nav.contains(e.target)) {
        burger.classList.remove('open');
        nav.classList.remove('open');
      }
    });
  }

  /* =============================================
     3. Active Nav Link
     ============================================= */
  function initActiveNav() {
    var links = document.querySelectorAll('.navbar__link');
    var current = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* =============================================
     4. Sticky Navbar Shadow
     ============================================= */
  function initStickyNav() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* =============================================
     5. Back to Top Button
     ============================================= */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    function onScroll() {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =============================================
     6. Counter Animation (data-count attribute)
     ============================================= */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var duration = 1800;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        el.textContent = current.toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString();
        }
      }

      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-count');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* =============================================
     7. Form Validation (data-form attribute)
     Adds .form-ok / .form-err classes
     ============================================= */
  function initFormValidation() {
    var forms = document.querySelectorAll('[data-form]');
    if (!forms.length) return;

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valid = true;

        // Clear previous states
        form.querySelectorAll('.form-group').forEach(function (g) {
          g.classList.remove('has-err', 'has-ok');
        });
        form.querySelectorAll('.form-input').forEach(function (input) {
          input.classList.remove('form-ok', 'form-err');
        });

        // Validate required fields
        var required = form.querySelectorAll('[required]');
        required.forEach(function (input) {
          var group = input.closest('.form-group');
          if (!input.value.trim()) {
            valid = false;
            input.classList.add('form-err');
            if (group) group.classList.add('has-err');
          } else {
            input.classList.add('form-ok');
            if (group) group.classList.add('has-ok');
          }

          // Email validation
          if (input.type === 'email' && input.value.trim()) {
            var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRe.test(input.value.trim())) {
              valid = false;
              input.classList.remove('form-ok');
              input.classList.add('form-err');
              if (group) {
                group.classList.remove('has-ok');
                group.classList.add('has-err');
              }
            }
          }
        });

        if (valid) {
          // Show success state
          var submitBtn = form.querySelector('button[type="submit"]');
          if (submitBtn) {
            var originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sent!';
            submitBtn.style.background = '#10B981';
            submitBtn.disabled = true;

            setTimeout(function () {
              submitBtn.textContent = originalText;
              submitBtn.style.background = '';
              submitBtn.disabled = false;
              form.reset();
              form.querySelectorAll('.form-input').forEach(function (input) {
                input.classList.remove('form-ok', 'form-err');
              });
              form.querySelectorAll('.form-group').forEach(function (g) {
                g.classList.remove('has-err', 'has-ok');
              });
            }, 2500);
          }
        }
      });

      // Live validation on blur
      form.querySelectorAll('.form-input[required]').forEach(function (input) {
        input.addEventListener('blur', function () {
          var group = input.closest('.form-group');
          if (!input.value.trim()) {
            input.classList.remove('form-ok');
            input.classList.add('form-err');
            if (group) {
              group.classList.remove('has-ok');
              group.classList.add('has-err');
            }
          } else {
            input.classList.remove('form-err');
            input.classList.add('form-ok');
            if (group) {
              group.classList.remove('has-err');
              group.classList.add('has-ok');
            }
          }
        });

        input.addEventListener('input', function () {
          if (input.classList.contains('form-err') && input.value.trim()) {
            input.classList.remove('form-err');
            input.classList.add('form-ok');
            var group = input.closest('.form-group');
            if (group) {
              group.classList.remove('has-err');
              group.classList.add('has-ok');
            }
          }
        });
      });
    });
  }

  /* =============================================
     8. data-year — Auto-fill current year
     ============================================= */
  function initDataYear() {
    var yearEls = document.querySelectorAll('[data-year]');
    var year = new Date().getFullYear();
    yearEls.forEach(function (el) {
      el.textContent = year;
    });
  }

  /* =============================================
     9. Progress Bars (animate on scroll)
     ============================================= */
  function initProgressBars() {
    var bars = document.querySelectorAll('.progress-deco');
    if (!bars.length) return;

    if (!('IntersectionObserver' in window)) {
      bars.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    bars.forEach(function (el) { observer.observe(el); });
  }

})();
