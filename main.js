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

  // --- Contact Form ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      const originalText = btn.textContent;
      
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        alert('Thank you! Your message has been sent.');
        contactForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1500);
    });
  }
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
      dot.addEventListener('click', () => goToSlide(index));
      dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.querySelectorAll('.dot'));

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    // Touch Support
    let startX = 0;
    carousel.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    carousel.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) nextBtn.click();
      if (endX - startX > 50) prevBtn.click();
    });
  }

})();
