/* ============================================================
   DS Partners — script.js
   Navbar scroll, hamburger menu, animações Intersection Observer
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------
     1. NAVBAR — ADICIONA SOMBRA AO SCROLL
  ---------------------------------------- */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // Verificar estado inicial (caso página abra com scroll)
  handleNavbarScroll();

  /* ----------------------------------------
     2. MENU HAMBURGUER — MOBILE
  ---------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Fechar menu ao clicar em um link
    navMenu.querySelectorAll('.navbar__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function (e) {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        navMenu.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ----------------------------------------
     3. ANIMAÇÕES DE ENTRADA — INTERSECTION OBSERVER
  ---------------------------------------- */
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window && animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Para de observar após animar (one-shot)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,       // Dispara quando 12% do elemento está visível
        rootMargin: '0px 0px -40px 0px' // Antecipa levemente antes do fim da viewport
      }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: exibir tudo de uma vez se IntersectionObserver não suportado
    animatedElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ----------------------------------------
     4. SCROLL SUAVE — LINKS DE ÂNCORA
     (complementa scroll-behavior: smooth do CSS)
  ---------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      // Ignorar links que são apenas "#"
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 12;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    });
  });

})();
