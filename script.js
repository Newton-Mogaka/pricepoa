const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
},{threshold:0.15});
revealEls.forEach(el=>io.observe(el));

// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const answer = faqItem.querySelector('.faq-answer');
      const toggle = faqItem.querySelector('.faq-toggle');

      // Close all other open answers
      document.querySelectorAll('.faq-answer.show').forEach(openAnswer => {
        if (openAnswer !== answer) {
          openAnswer.classList.remove('show');
          openAnswer.parentElement.querySelector('.faq-toggle').classList.remove('rotate');
        }
      });

      // Toggle current answer
      answer.classList.toggle('show');
      toggle.classList.toggle('rotate');
    });
  });
});

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.classList.add('glass-hover-lift');
    });

    button.addEventListener('mouseleave', function() {
      this.classList.remove('glass-hover-lift');
    });
  });
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for sticky header
            behavior: 'smooth'
          });
        }
      }
    });
  });
});

// WhatsApp link tracking (placeholder for analytics)
document.addEventListener('DOMContentLoaded', function() {
  const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"]');

  whatsappLinks.forEach(link => {
    link.addEventListener('click', function() {
      // In a real implementation, you would send analytics events here
      console.log('WhatsApp link clicked:', this.href);

      // Example: gtag('event', 'whatsapp_click', {
      //   'event_category': 'engagement',
      //   'event_label': 'price_comparison_cta'
      // });
    });
  });
});

// Form validation (placeholder for future forms)
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Basic validation - prevent actual submission for demo
      e.preventDefault();

      // In real implementation, validate form fields
      alert('Form submitted! (Demo only - actual implementation would process this)');

      return false;
    });
  });
});

// Lazy loading for images (if any are added later)
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.removeAttribute('data-src');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(lazyImage => {
      lazyImageObserver.observe(lazyImage);
    });
  }
});

// Footer Navigation Dropdown Toggles (Mobile)
document.addEventListener('DOMContentLoaded', function() {
  const toggles = document.querySelectorAll('.nav-column-toggle');
  const headers = document.querySelectorAll('.nav-column-header');

  function toggleDropdown(toggle) {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    const controlsId = toggle.getAttribute('aria-controls');
    const links = document.getElementById(controlsId);

    if (!links) return;

    // Close all other open dropdowns
    document.querySelectorAll('.nav-column-toggle[aria-expanded="true"]').forEach(otherToggle => {
      if (otherToggle !== toggle) {
        otherToggle.setAttribute('aria-expanded', 'false');
        const otherLinksId = otherToggle.getAttribute('aria-controls');
        const otherLinks = document.getElementById(otherLinksId);
        if (otherLinks) {
          otherLinks.classList.remove('is-open');
        }
      }
    });

    // Toggle current dropdown
    toggle.setAttribute('aria-expanded', !isExpanded);
    links.classList.toggle('is-open');
  }

  // Toggle via button click
  toggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleDropdown(this);
    });
  });

  // Toggle via header click (mobile only - header is clickable area)
  headers.forEach(header => {
    header.addEventListener('click', function() {
      const toggle = this.querySelector('.nav-column-toggle');
      if (toggle) {
        toggleDropdown(toggle);
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-column')) {
      document.querySelectorAll('.nav-column-toggle[aria-expanded="true"]').forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'false');
        const linksId = toggle.getAttribute('aria-controls');
        const links = document.getElementById(linksId);
        if (links) {
          links.classList.remove('is-open');
        }
      });
    }
  });

  // Close dropdowns on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-column-toggle[aria-expanded="true"]').forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'false');
        const linksId = toggle.getAttribute('aria-controls');
        const links = document.getElementById(linksId);
        if (links) {
          links.classList.remove('is-open');
        }
        toggle.focus();
      });
    }
  });
});

// Hero Background Slider
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.hero-bg-slide');
  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds per slide
  const transitionDuration = 1200; // 1.2s transition

  if (slides.length === 0) return;

  function nextSlide() {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');

    // Move to next slide
    currentSlide = (currentSlide + 1) % slides.length;

    // Add active class to new slide
    slides[currentSlide].classList.add('active');
  }

  // Start the slider
  let sliderInterval = setInterval(nextSlide, slideInterval);

  // Pause on hover for better UX
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
      clearInterval(sliderInterval);
    });

    heroSection.addEventListener('mouseleave', () => {
      sliderInterval = setInterval(nextSlide, slideInterval);
    });
  }

  // Handle visibility change (pause when tab is not active)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(sliderInterval);
    } else {
      sliderInterval = setInterval(nextSlide, slideInterval);
    }
  });
});

// Hamburger-to-Basket SVG Path Morphing
const HAMBURGER_PATH = "M 4 7 L 20 7 M 4 14 L 20 14 M 4 21 L 20 21";
const BASKET_PATH = "M 4 8 Q 4 5, 7 5 L 17 5 Q 20 5, 20 8 L 20 22 Q 20 25, 17 25 L 7 25 Q 4 25, 4 22 Z M 12 5 Q 12 2, 15 2 Q 18 2, 18 5";

function morphHamburgerToBasket(pathEl, toBasket) {
  if (!pathEl) return;

  // Check for prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    pathEl.setAttribute('d', toBasket ? BASKET_PATH : HAMBURGER_PATH);
    pathEl.style.stroke = toBasket ? 'var(--mango)' : 'var(--text-dark)';
    return;
  }

  // Use Web Animations API for smooth morphing
  try {
    const animation = pathEl.animate(
      [
        { d: pathEl.getAttribute('d') || HAMBURGER_PATH },
        { d: toBasket ? BASKET_PATH : HAMBURGER_PATH }
      ],
      {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }
    );

    // Animate stroke color change
    pathEl.animate(
      [
        { stroke: pathEl.style.stroke || 'var(--text-dark)' },
        { stroke: toBasket ? 'var(--mango)' : 'var(--text-dark)' }
      ],
      {
        duration: 200,
        easing: 'ease',
        fill: 'forwards'
      }
    );
  } catch (e) {
    // Fallback for browsers without WAAPI path support
    pathEl.setAttribute('d', toBasket ? BASKET_PATH : HAMBURGER_PATH);
    pathEl.style.stroke = toBasket ? 'var(--mango)' : 'var(--text-dark)';
  }
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const hamburgerPath = document.querySelector('.hamburger-path');

  if (!navToggle || !navMenu) return;

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function openMenu() {
    navToggle.setAttribute('aria-expanded', 'true');
    navMenu.hidden = false;
    // Force reflow for animation
    navMenu.offsetHeight;
    navMenu.classList.add('is-open');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    // Morph hamburger to basket
    morphHamburgerToBasket(hamburgerPath, true);
  }

  function closeMenu() {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
    // Morph basket back to hamburger
    morphHamburgerToBasket(hamburgerPath, false);
    // Wait for transition to finish before hiding
    setTimeout(() => {
      if (!navMenu.classList.contains('is-open')) {
        navMenu.hidden = true;
      }
    }, 300);
  }

  function toggleMenu() {
    if (navToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Toggle button click
  navToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking overlay
  overlay.addEventListener('click', closeMenu);

  // Close menu when clicking a link inside the menu
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      navToggle.focus();
    }
  });

  // Close menu on resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 860 && navToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });
});