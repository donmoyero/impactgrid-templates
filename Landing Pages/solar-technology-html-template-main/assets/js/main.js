/* ==========================================================================
   SOLARTEC Main JavaScript
   Pure vanilla JS — no frameworks
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- DOM Ready ---------- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initRevealAnimations();
    initBurgerMenu();
    initActiveNav();
    initFooterYear();
    initFormValidation();
    initCarousels();
    initTestimonialSlider();
    initCounters();
    initBackToTop();
  }

  /* ========================================================
     1. REVEAL ON SCROLL (IntersectionObserver)
     ======================================================== */
  function initRevealAnimations() {
    var elements = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ========================================================
     2. BURGER MENU TOGGLE
     ======================================================== */
  function initBurgerMenu() {
    var burger = document.querySelector('.burger');
    var nav = document.querySelector('.main-nav');
    var overlay = document.querySelector('.nav-overlay');
    if (!burger || !nav) return;

    function openNav() {
      burger.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      nav.classList.add('open');
      if (overlay) overlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      if (overlay) overlay.classList.remove('show');
      document.body.style.overflow = '';
    }

    burger.addEventListener('click', function () {
      if (burger.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close on overlay click
    if (overlay) {
      overlay.addEventListener('click', closeNav);
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.classList.contains('open')) {
        closeNav();
        burger.focus();
      }
    });

    // Close nav on link click (mobile)
    var navLinks = nav.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 720) {
          closeNav();
        }
      });
    });
  }

  /* ========================================================
     3. ACTIVE NAV LINK VIA location.pathname
     ======================================================== */
  function initActiveNav() {
    var path = window.location.pathname;
    var filename = path.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var linkFile = href.split('/').pop();
      if (linkFile === filename) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* ========================================================
     4. FOOTER YEAR [data-year]
     ======================================================== */
  function initFooterYear() {
    var yearEls = document.querySelectorAll('[data-year]');
    var year = new Date().getFullYear();
    yearEls.forEach(function (el) {
      el.textContent = year;
    });
  }

  /* ========================================================
     5. FORM VALIDATION [data-form]
     ======================================================== */
  function initFormValidation() {
    var forms = document.querySelectorAll('[data-form]');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors(form);

        var valid = true;
        var firstInvalid = null;

        // Required fields
        var requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(function (field) {
          var val = field.value.trim();
          var group = field.closest('.form-group');
          var errorMsg = group ? group.querySelector('.error-msg') : null;

          if (!val) {
            valid = false;
            if (group) group.classList.add('show');
            field.classList.add('error');
            if (!firstInvalid) firstInvalid = field;
          } else {
            // Email validation
            if (field.type === 'email' && !isValidEmail(val)) {
              valid = false;
              if (group) group.classList.add('show');
              field.classList.add('error');
              if (!firstInvalid) firstInvalid = field;
            }
            // Phone validation (if provided)
            if (field.type === 'tel' && val && !isValidPhone(val)) {
              valid = false;
              if (group) group.classList.add('show');
              field.classList.add('error');
              if (!firstInvalid) firstInvalid = field;
            }
          }
        });

        // Select validation
        var selectFields = form.querySelectorAll('select[required]');
        selectFields.forEach(function (field) {
          if (!field.value) {
            valid = false;
            var group = field.closest('.form-group');
            if (group) group.classList.add('show');
            field.classList.add('error');
            if (!firstInvalid) firstInvalid = field;
          }
        });

        var statusEl = form.querySelector('.form-status');

        if (!valid) {
          if (firstInvalid) firstInvalid.focus();
          if (statusEl) {
            statusEl.className = 'form-status form-err';
            statusEl.textContent = 'Please fill in all required fields correctly.';
          }
          return;
        }

        // Simulate successful submission (no alert, no server)
        if (statusEl) {
          statusEl.className = 'form-status form-ok';
          statusEl.textContent = 'Thank you! Your message has been sent. We will get back to you within 24 hours.';
        }
        form.reset();
      });

      // Live validation: clear error on input
      var inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(function (input) {
        input.addEventListener('input', function () {
          var group = input.closest('.form-group');
          if (group) {
            group.classList.remove('show');
            input.classList.remove('error');
          }
          var statusEl = form.querySelector('.form-status');
          if (statusEl) {
            statusEl.className = 'form-status';
            statusEl.textContent = '';
          }
        });
      });
    });
  }

  function clearErrors(form) {
    var groups = form.querySelectorAll('.form-group');
    groups.forEach(function (g) {
      g.classList.remove('show');
      var input = g.querySelector('input, textarea, select');
      if (input) input.classList.remove('error');
    });
    var statusEl = form.querySelector('.form-status');
    if (statusEl) {
      statusEl.className = 'form-status';
      statusEl.textContent = '';
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    // Accepts digits, spaces, dashes, parens, plus
    return /^[\d\s\-+()]{7,}$/.test(phone);
  }

  /* ========================================================
     6. CAROUSEL (index gallery)
     ======================================================== */
  function initCarousels() {
    var wrappers = document.querySelectorAll('[data-carousel]');
    wrappers.forEach(function (track) {
      var wrapper = track.closest('.carousel-wrapper');
      if (!wrapper) return;
      var slides = track.children;
      var count = slides.length;
      if (count <= 1) return;
      var current = 0;
      var prevBtn = wrapper.querySelector('.prev');
      var nextBtn = wrapper.querySelector('.next');
      var dotsContainer = wrapper.parentElement.querySelector('[data-carousel-dots]');
      var dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];

      function goTo(index) {
        current = (index + count) % count;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dots.forEach(function (d, i) {
          d.classList.toggle('active', i === current);
        });
      }

      if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
      if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

      dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () { goTo(i); });
      });

      // Auto-play
      var timer = setInterval(function () { goTo(current + 1); }, 5000);
      wrapper.addEventListener('mouseenter', function () { clearInterval(timer); });
      wrapper.addEventListener('mouseleave', function () {
        timer = setInterval(function () { goTo(current + 1); }, 5000);
      });
    });
  }

  /* ========================================================
     7. TESTIMONIAL SLIDER
     ======================================================== */
  function initTestimonialSlider() {
    var slider = document.querySelector('[data-testimonial-slider]');
    if (!slider) return;
    var slides = slider.querySelectorAll('.testimonial-slide');
    var dotsContainer = document.querySelector('[data-testimonial-dots]');
    var dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];
    var current = 0;
    var count = slides.length;

    function goTo(index) {
      current = (index + count) % count;
      slides.forEach(function (s, i) {
        s.classList.toggle('active', i === current);
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    // Auto-advance
    setInterval(function () { goTo(current + 1); }, 6000);
  }

  /* ========================================================
     8. STAT COUNTERS
     ======================================================== */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out quad
      var eased = 1 - (1 - progress) * (1 - progress);
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

  /* ========================================================
     9. BACK TO TOP BUTTON
     ======================================================== */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
