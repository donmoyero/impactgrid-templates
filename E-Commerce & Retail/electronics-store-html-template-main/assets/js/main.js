/* ============================================
   ELECTRO — Tech Store JS
   Pure Vanilla JS · No Frameworks
   ============================================ */
(function () {
  'use strict';

  /* --- Mobile Nav Toggle --- */
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
    });
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  /* --- Active Nav Link --- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- IntersectionObserver: Reveal on Scroll (threshold 0.12) --- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  }

  /* --- data-year Auto-fill --- */
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* --- Cart Demo [data-add] --- */
  let cartCount = 0;
  const badge = document.querySelector('.cart-badge');
  const toast = document.getElementById('toast');

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2400);
  }

  document.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cartCount++;
      if (badge) badge.textContent = cartCount;
      const name = btn.getAttribute('data-add') || 'Item';
      showToast(name + ' added to cart');
    });
  });

  /* --- Contact Form Validation [data-form] --- */
  const form = document.querySelector('[data-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(input => {
        input.classList.remove('form-ok', 'form-err');
        const msg = input.parentElement.querySelector('.form-msg');
        if (msg) { msg.textContent = ''; msg.className = 'form-msg'; }

        if (!input.value.trim()) {
          input.classList.add('form-err');
          if (msg) { msg.textContent = 'This field is required'; msg.className = 'form-msg err'; }
          valid = false;
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          input.classList.add('form-err');
          if (msg) { msg.textContent = 'Enter a valid email'; msg.className = 'form-msg err'; }
          valid = false;
        } else {
          input.classList.add('form-ok');
        }
      });

      if (valid) {
        showToast('Message sent successfully!');
        form.reset();
        form.querySelectorAll('.form-ok').forEach(el => el.classList.remove('form-ok'));
      }
    });

    form.querySelectorAll('[required]').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('form-err');
        const msg = input.parentElement.querySelector('.form-msg');
        if (msg && msg.classList.contains('err')) { msg.textContent = ''; msg.className = 'form-msg'; }
      });
    });
  }

  /* --- Product Filter (products.html) --- */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card[data-category]');
  if (filterTabs.length && productCards.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.getAttribute('data-filter');
        productCards.forEach(card => {
          if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

})();
