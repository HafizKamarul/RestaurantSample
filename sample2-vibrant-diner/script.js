// Urban Pizza Co. JavaScript

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  lerp: 0.1,
  smooth: true,
  smoothTouch: false
});

// Lenis animation frame
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Particles.js Configuration
particlesJS('particles-js', {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#DC2626'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      }
    },
    opacity: {
      value: 0.1,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.05,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#DC2626',
      opacity: 0.1,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 100,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  
  if (isOpen) {
    mobileMenu.classList.remove('open');
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl text-pizza-black"></i>';
  } else {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileMenuBtn.innerHTML = '<i class="fas fa-times text-xl text-pizza-black"></i>';
  }
});

// Close mobile menu when clicking on links
const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
mobileMenuLinks?.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl text-pizza-black"></i>';
  });
});

// Keyboard navigation for mobile menu
mobileMenuBtn?.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    mobileMenu.classList.remove('open');
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl text-pizza-black"></i>';
  }
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 100) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
  
  lastScrollY = currentScrollY;
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      entry.target.style.opacity = '1';
    }
  });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');
  animatedElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60 FPS
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };
      
      updateCounter();
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => {
  counterObserver.observe(counter);
});

// Parallax Effect for Hero Background
const heroBackground = document.getElementById('heroBackground');

window.addEventListener('scroll', () => {
  if (heroBackground && window.innerWidth > 768) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    heroBackground.style.transform = `translateY(${rate}px)`;
  }
});

// Form Handling (for contact/reservation pages)
const handleFormSubmission = (formSelector, successMessage) => {
  const form = document.querySelector(formSelector);
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('[role="alert"]').forEach(el => {
      el.classList.add('hidden');
      el.textContent = '';
    });
    
    // Get form data
    const formData = new FormData(this);
    let hasErrors = false;
    
    // Validation
    const requiredFields = this.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        showFieldError(field.id, `Please enter your ${field.name || field.id}`);
        hasErrors = true;
      }
      
      // Email validation
      if (field.type === 'email' && field.value.trim() && !isValidEmail(field.value)) {
        showFieldError(field.id, 'Please enter a valid email address');
        hasErrors = true;
      }
    });
    
    if (hasErrors) {
      // Focus first error field
      const firstError = document.querySelector('[role="alert"]:not(.hidden)');
      if (firstError) {
        const fieldId = firstError.id.replace('-error', '');
        document.getElementById(fieldId)?.focus();
      }
      return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const buttonText = submitBtn.querySelector('.button-text') || submitBtn;
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    
    if (loadingSpinner) {
      buttonText.classList.add('hidden');
      loadingSpinner.classList.remove('hidden');
    } else {
      submitBtn.textContent = 'Sending...';
    }
    
    submitBtn.disabled = true;
    submitBtn.classList.add('loading-state');
    
    // Simulate form submission
    setTimeout(() => {
      showSuccessMessage(successMessage);
      this.reset();
      
      // Reset button state
      if (loadingSpinner) {
        buttonText.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
      } else {
        submitBtn.textContent = 'Send Message';
      }
      
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading-state');
    }, 2000);
  });
};

// Initialize form handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  handleFormSubmission('#contactForm', 'Thank you for your message! We\'ll get back to you within 24 hours.');
  handleFormSubmission('#reservationForm', 'Table reserved successfully! We\'ll send you a confirmation email shortly.');
});

// Helper Functions
function showFieldError(fieldId, message) {
  const errorEl = document.getElementById(fieldId + '-error');
  const fieldEl = document.getElementById(fieldId);
  
  if (errorEl && fieldEl) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
    fieldEl.classList.add('border-red-500');
    fieldEl.setAttribute('aria-invalid', 'true');
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showSuccessMessage(message) {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.success-notification');
  existingNotifications.forEach(n => n.remove());
  
  // Create and show success notification
  const notification = document.createElement('div');
  notification.className = 'success-notification fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
  notification.textContent = message;
  notification.setAttribute('role', 'alert');
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 100);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
    const link = e.target.matches('a[href^="#"]') ? e.target : e.target.closest('a[href^="#"]');
    const targetId = link.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      lenis.scrollTo(targetElement, {
        offset: -80,
        duration: 1.2
      });
    }
  }
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('loading');
        imageObserver.unobserve(img);
      }
    });
  });
  
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
}

// Preload critical resources
const preloadResource = (href, as, type = null) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
};

// Preload fonts and critical images
document.addEventListener('DOMContentLoaded', () => {
  preloadResource('https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@400&family=Poppins:wght@300;400;500;600;700&display=swap', 'style');
});

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled Promise Rejection:', e.reason);
});
