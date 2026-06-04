/* =========================================================================
   MAIN — nav, mobile sheet, reveal-on-scroll, progress bar, skill bars, filter
   ========================================================================= */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- Nav: shadow on scroll + scroll progress -------------------------- */
  var nav = $('.nav');
  var progress = $('.progress-bar');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('is-scrolled', y > 8);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile sheet ----------------------------------------------------- */
  var sheet = $('.nav-sheet');
  var openBtn = $('.nav__toggle');
  var closeBtn = $('.nav-sheet__close');
  function setSheet(open) {
    if (!sheet) return;
    sheet.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (openBtn) openBtn.setAttribute('aria-expanded', String(open));
  }
  if (openBtn) openBtn.addEventListener('click', function () { setSheet(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setSheet(false); });
  if (sheet) $$('.nav-sheet__links a, .nav-sheet__cta a', sheet).forEach(function (a) {
    a.addEventListener('click', function () { setSheet(false); });
  });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') setSheet(false); });

  /* ---- Reveal on scroll ------------------------------------------------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); ro.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- Skill bars fill on view ------------------------------------------ */
  var skills = $$('.skill__fill');
  if ('IntersectionObserver' in window && skills.length) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var v = e.target.getAttribute('data-v') || '0';
          e.target.style.width = v + '%';
          so.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    skills.forEach(function (el) { so.observe(el); });
  } else {
    skills.forEach(function (el) { el.style.width = (el.getAttribute('data-v') || 0) + '%'; });
  }

  /* ---- Active nav link via section observer ----------------------------- */
  var links = $$('.nav__link[data-target]');
  var map = {};
  links.forEach(function (l) { map[l.getAttribute('data-target')] = l; });
  var sections = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var ao = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('is-active'); });
          var active = map[e.target.id];
          if (active) active.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { ao.observe(s); });
  }

  /* ---- Project filter --------------------------------------------------- */
  var tabs = $$('.proj-filters .tab');
  var cards = $$('.proj[data-cat]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      var cat = tab.getAttribute('data-filter');
      cards.forEach(function (c) {
        var show = cat === 'all' || c.getAttribute('data-cat') === cat;
        c.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---- Award evidence lightbox ------------------------------------------ */
  var lightbox = $('.award-lightbox');
  var lightboxImg = lightbox ? $('.award-lightbox__image img', lightbox) : null;
  var lightboxTitle = lightbox ? $('#awardLightboxTitle', lightbox) : null;
  var lightboxMeta = lightbox ? $('.award-lightbox__meta', lightbox) : null;
  var lightboxDesc = lightbox ? $('.award-lightbox__desc', lightbox) : null;
  var closeLightboxBtns = lightbox ? $$('.award-lightbox__close, .award-lightbox__backdrop', lightbox) : [];

  function openAwardLightbox(btn) {
    if (!lightbox || !lightboxImg) return;
    var title = btn.getAttribute('data-award-title') || '';
    var src = btn.getAttribute('data-award-image') || '';
    lightboxImg.src = src;
    lightboxImg.alt = title;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxMeta) lightboxMeta.textContent = btn.getAttribute('data-award-meta') || '';
    if (lightboxDesc) lightboxDesc.textContent = btn.getAttribute('data-award-desc') || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeAwardLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    if (lightboxImg) lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  $$('[data-award-image]').forEach(function (btn) {
    btn.addEventListener('click', function () { openAwardLightbox(btn); });
  });
  closeLightboxBtns.forEach(function (btn) {
    btn.addEventListener('click', closeAwardLightbox);
  });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeAwardLightbox();
  });

  /* ---- Footer year ------------------------------------------------------ */
  var yearEl = $('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
