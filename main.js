/**
 * TUPITER v2.0 — Premium Interactions
 */

(function () {
  'use strict';

  // --- Mobile Menu Toggle ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-item, .nav-btn');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      
      // Toggle body scroll
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : 'auto';
    });

    // Close on link click
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }

  // --- Navbar Scroll State ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // --- Smooth Scroll for Anchors ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offset = 80; // nav height
        const top = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Services Carousel ---
  const carousel = document.getElementById('services-carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const nextBtn = carousel.querySelector('.c-next');
    const prevBtn = carousel.querySelector('.c-prev');
    const dotsNav = carousel.querySelector('.c-dots');
    
    let currentIndex = 0;

    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoPlay();
      });
      dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.querySelectorAll('.dot'));
    
    // Create Progress Bar
    const progressBar = document.createElement('div');
    progressBar.classList.add('carousel-progress-bar');
    carousel.closest('.carousel-wrapper').appendChild(progressBar);

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });

      // Reset progress bar
      progressBar.style.transition = 'none';
      progressBar.style.width = '0';
      setTimeout(() => {
        progressBar.style.transition = 'width 5s linear';
        progressBar.style.width = '200px';
      }, 50);
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
      resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
      resetAutoPlay();
    });

    // Auto-play logic
    let autoPlayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }, 5000);

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      }, 5000);
    }

    // Initialize first slide progress
    setTimeout(() => {
      progressBar.style.transition = 'width 5s linear';
      progressBar.style.width = '200px';
    }, 100);

    // Touch Support
    let startX = 0;
    carousel.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      clearInterval(autoPlayInterval);
    });
    carousel.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) nextBtn.click();
      if (endX - startX > 50) prevBtn.click();
      resetAutoPlay();
    });
  }

  // --- Startup / Splash Animation ---
  window.addEventListener('load', () => {
    const splash = document.getElementById('intro-splash');
    const splashLogo = document.getElementById('splash-logo');
    const navbar = document.getElementById('navbar');
    const navLogo = document.getElementById('nav-logo');
    const brand = document.querySelector('.brand');

    if (!splash || !splashLogo || !navLogo) return;

    // Step 1: Reveal logo in center
    setTimeout(() => {
      splashLogo.classList.add('active');
    }, 400);

    // Step 2: Animate to Navbar
    setTimeout(() => {
      // Re-measure in case of resize or late layout
      const splashRect = splashLogo.getBoundingClientRect();
      const navRect = navLogo.getBoundingClientRect();

      // Calculate translation relative to current center
      const deltaX = navRect.left + (navRect.width / 2) - (splashRect.left + (splashRect.width / 2));
      const deltaY = navRect.top + (navRect.height / 2) - (splashRect.top + (splashRect.height / 2));
      
      const scale = navRect.height / splashRect.height;

      splashLogo.style.setProperty('--target-x', `${deltaX}px`);
      splashLogo.style.setProperty('--target-y', `${deltaY}px`);
      splashLogo.style.setProperty('--target-scale', scale);
      
      splashLogo.classList.add('move');
      navbar.classList.add('visible');
    }, 1600);

    // Step 3: Handoff and Fade Splash
    setTimeout(() => {
      brand.classList.add('visible');
      splash.classList.add('hidden');
    }, 2400);
  });

})();
