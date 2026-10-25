/* ============================================
   ESTORE — Digital Store HTML Template
   Vanilla JS: IntersectionObserver, burger,
   active nav, data-year, data-form, data-add
   ============================================ */
(function () {
  'use strict';

  /* ---- IntersectionObserver: reveal on scroll ---- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---- Burger toggle ---- */
  var burger = document.querySelector('.burger');
  var navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on link click (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---- Active nav link based on current page ---- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ---- data-year: set current year ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- data-form: form validation ---- */
  document.querySelectorAll('[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var okEl = form.querySelector('.form-ok');
      var errEl = form.querySelector('.form-err');
      if (okEl) okEl.classList.remove('show');
      if (errEl) errEl.classList.remove('show');

      var valid = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#EF4444';
        } else {
          input.style.borderColor = '';
        }
        if (input.type === 'email' && input.value.trim()) {
          var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRe.test(input.value.trim())) {
            valid = false;
            input.style.borderColor = '#EF4444';
          }
        }
      });

      if (valid && okEl) {
        okEl.classList.add('show');
        form.reset();
      } else if (!valid && errEl) {
        errEl.classList.add('show');
      }
    });
  });

  /* ---- data-add: cart demo ---- */
  var cartCountEl = document.querySelector('[data-cart-count]');
  var cartCount = 0;
  document.querySelectorAll('[data-add]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      cartCount++;
      if (cartCountEl) {
        cartCountEl.textContent = cartCount;
        // Brief scale animation
        cartCountEl.style.transform = 'scale(1.3)';
        setTimeout(function () {
          cartCountEl.style.transform = 'scale(1)';
        }, 200);
      }
      // Button feedback
      var originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fa fa-check"></i> Added';
      btn.style.background = '#065F46';
      setTimeout(function () {
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 1200);
    });
  });

  /* ---- Hero slider ---- */
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dots button');
  var currentSlide = 0;
  function showSlide(index) {
    slides.forEach(function (s, i) {
      s.classList.toggle('active', i === index);
    });
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }
  if (slides.length > 0) {
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        showSlide(i);
      });
    });
    setInterval(function () {
      showSlide((currentSlide + 1) % slides.length);
    }, 5000);
  }

  /* ---- Spec accordion ---- */
  document.querySelectorAll('.spec-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var content = toggle.nextElementSibling;
      toggle.classList.toggle('open');
      content.classList.toggle('open');
    });
  });

  /* ---- Back to top ---- */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Filter tags (products page) ---- */
  document.querySelectorAll('.filter-tag').forEach(function (tag) {
    tag.addEventListener('click', function () {
      document.querySelectorAll('.filter-tag').forEach(function (t) {
        t.classList.remove('active');
      });
      tag.classList.add('active');
    });
  });

})();
