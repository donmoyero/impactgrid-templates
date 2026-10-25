/* ============================================================
   KIDKINDER — Main JavaScript
   "Where Learning Meets Play"
   ============================================================ */
(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. DOM READY
     ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initBurger();
    initStickyHeader();
    initActiveNav();
    initScrollYear();
    initRevealAnimations();
    initFormHandler();
    initSmoothScroll();
  }

  /* ----------------------------------------------------------
     2. BURGER / MOBILE NAV
     ---------------------------------------------------------- */
  function initBurger() {
    var burger = document.querySelector('.burger');
    var nav = document.querySelector('.header__nav');
    var overlay = document.querySelector('.nav-overlay');

    if (!burger || !nav) return;

    burger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      burger.classList.toggle('is-active', isOpen);

      if (overlay) {
        overlay.classList.toggle('is-active', isOpen);
      }

      // Prevent body scroll when nav is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on overlay click
    if (overlay) {
      overlay.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.classList.remove('is-active');
        overlay.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    }

    // Close on link click (mobile)
    var navLinks = nav.querySelectorAll('.header__nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.classList.remove('is-active');
        if (overlay) overlay.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----------------------------------------------------------
     3. STICKY HEADER (SCROLL SHADOW)
     ---------------------------------------------------------- */
  function initStickyHeader() {
    var header = document.querySelector('.header');
    if (!header) return;

    var scrollThreshold = 50;

    function onScroll() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------
     4. ACTIVE NAV LINK (BASED ON CURRENT PAGE)
     ---------------------------------------------------------- */
  function initActiveNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.header__nav-link');

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
  }

  /* ----------------------------------------------------------
     5. SCROLL YEAR / DATA-YEAR ATTRIBUTES
     ---------------------------------------------------------- */
  function initScrollYear() {
    var yearElements = document.querySelectorAll('[data-year]');
    var currentYear = new Date().getFullYear();

    yearElements.forEach(function (el) {
      el.textContent = currentYear;
    });
  }

  /* ----------------------------------------------------------
     6. REVEAL ON SCROLL (INTERSECTION OBSERVER)
     ---------------------------------------------------------- */
  function initRevealAnimations() {
    var reveals = document.querySelectorAll('.reveal');

    if (!reveals.length) return;

    // Check for reduced motion preference
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Show all elements immediately if reduced motion is preferred
      reveals.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -60px 0px',
          threshold: 0.1,
        }
      );

      reveals.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show all elements for older browsers
      reveals.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  }

  /* ----------------------------------------------------------
     7. FORM HANDLER (data-form)
     ---------------------------------------------------------- */
  function initFormHandler() {
    var forms = document.querySelectorAll('[data-form]');

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var formEl = form;
        var formWrapper = formEl.closest('[data-form]') || formEl;
        var okMsg = formWrapper.querySelector('.form-ok');
        var errMsg = formWrapper.querySelector('.form-err');

        // Hide previous messages
        if (okMsg) okMsg.classList.remove('form-ok');
        if (errMsg) errMsg.classList.remove('form-err');

        // Basic validation
        var requiredFields = formEl.querySelectorAll('[required]');
        var isValid = true;

        requiredFields.forEach(function (field) {
          if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'var(--clr-error)';
          } else {
            field.style.borderColor = '';
          }
        });

        // Email validation
        var emailField = formEl.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(emailField.value)) {
            isValid = false;
            emailField.style.borderColor = 'var(--clr-error)';
          }
        }

        if (!isValid) {
          if (errMsg) {
            errMsg.classList.add('form-err');
            errMsg.style.display = 'block';
          }
          return;
        }

        // Simulate successful submission
        if (okMsg) {
          okMsg.classList.add('form-ok');
          okMsg.style.display = 'block';
        }

        // Reset form
        formEl.reset();

        // Hide success message after 5 seconds
        setTimeout(function () {
          if (okMsg) {
            okMsg.classList.remove('form-ok');
            okMsg.style.display = 'none';
          }
        }, 5000);
      });

      // Clear error styling on input
      var inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(function (input) {
        input.addEventListener('focus', function () {
          this.style.borderColor = '';
        });
      });
    });
  }

  /* ----------------------------------------------------------
     8. SMOOTH SCROLL FOR ANCHOR LINKS
     ---------------------------------------------------------- */
  function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var headerOffset = 80;
          var elementPosition = target.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      });
    });
  }
})();
