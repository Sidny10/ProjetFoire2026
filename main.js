/* ============================================================
   COLLÈGE SAINT LOUIS DE BOURDON — JavaScript principal
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Navigation burger ---- */
  const burger = document.querySelector('.burger');
  const nav    = document.querySelector('header nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
    });
    // Fermer au clic sur lien
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  /* ---- Lien actif selon la section visible ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('header nav a[href^="#"]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---- Scroll vers section au clic ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Bouton retour en haut ---- */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Animation fade-up au scroll (IntersectionObserver) ---- */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => obs.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ---- Formulaire de contact (visuel) ---- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      showNotif('✅ Message reçu ! Nous vous contacterons bientôt.');
      form.reset();
    });
  }

  /* ---- Galerie : lightbox simple ---- */
  document.querySelectorAll('.gal-item').forEach(item => {
    item.addEventListener('click', function () {
      const label = this.querySelector('.label')?.textContent || 'Photo';
      showNotif('🖼️ ' + label);
    });
  });

  /* ---- Notification toast ---- */
  function showNotif(msg) {
    let notif = document.querySelector('.notif');
    if (!notif) {
      notif = document.createElement('div');
      notif.className = 'notif';
      document.body.appendChild(notif);
    }
    notif.textContent = msg;
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 3200);
  }

  /* ---- Compteur animé (stats hero) ---- */
  function animateCounter(el, target, duration) {
    const start = 0;
    const step  = target / (duration / 16);
    let   cur   = 0;
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = Math.floor(cur) + (el.dataset.suffix || '');
    }, 16);
  }

  const counterEls = document.querySelectorAll('[data-count]');
  if (counterEls.length && 'IntersectionObserver' in window) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          animateCounter(el, parseInt(el.dataset.count), 1200);
          cObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => cObs.observe(el));
  }

  /* ---- Accordéon filières (si utilisé) ---- */
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const panel = this.nextElementSibling;
      const isOpen = panel.style.maxHeight;
      document.querySelectorAll('.accordion-panel').forEach(p => p.style.maxHeight = '');
      document.querySelectorAll('.accordion-btn').forEach(b => b.classList.remove('open'));
      if (!isOpen) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        this.classList.add('open');
      }
    });
  });

  /* ---- Filtre actualités par catégorie ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const cat = this.dataset.cat;
      document.querySelectorAll('.actu-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

});
