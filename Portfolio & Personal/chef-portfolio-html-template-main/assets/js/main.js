/* CHEFER — bespoke interactions */
(function(){
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if(burger && nav){
    burger.addEventListener('click', function(){
      var isOpen = nav.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Active nav via location.pathname
  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if(path === '') path = 'index.html';
  document.querySelectorAll('.nav a').forEach(function(a){
    var href = (a.getAttribute('href')||'').toLowerCase();
    if(href === path || (path==='index.html' && href==='index.html')) a.classList.add('is-active');
    // also handle tasting vs menu alias
    if((path==='menu.html' || path==='tasting.html') && (href==='menu.html' || href==='tasting.html')) a.classList.add('is-active');
  });

  // Year
  document.querySelectorAll('[data-year]').forEach(function(el){
    el.textContent = String(new Date().getFullYear());
  });

  // IntersectionObserver reveals
  var revealEls = document.querySelectorAll('.reveal, .plate-reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:0.14});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  // Forms — [data-form] with .form-ok / .form-err (never alert)
  document.querySelectorAll('[data-form]').forEach(function(form){
    var ok = form.querySelector('.form-ok');
    var err = form.querySelector('.form-err');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var valid = true;
      var required = form.querySelectorAll('[required]');
      required.forEach(function(inp){
        if(!inp.value.trim()) valid = false;
        // email check
        if(inp.type==='email' && inp.value){
          var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if(!re.test(inp.value.trim())) valid = false;
        }
      });
      if(ok) ok.classList.remove('show');
      if(err) err.classList.remove('show');
      if(!valid){
        if(err){ err.textContent = 'Please complete the highlighted fields with a valid email.'; err.classList.add('show'); }
        return;
      }
      if(ok){ ok.textContent = 'Thank you — your request has been received. We will reply shortly.'; ok.classList.add('show'); }
      form.reset();
    });
  });
})();
