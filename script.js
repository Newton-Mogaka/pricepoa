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