// Sakura Sushi Bar JavaScript - Based on Sample 1's Working Approach

// Initialize Particles.js with sakura theme
particlesJS('particles-js', {
  particles: {
    number: { value: 40 },
    color: { value: '#D4AF37' },
    shape: { type: 'circle' },
    opacity: { 
      value: 0.15,
      random: true
    },
    size: { 
      value: 4,
      random: true
    },
    line_linked: { 
      enable: false
    },
    move: { 
      enable: true, 
      speed: 1.2,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: false },
      onclick: { enable: false }
    }
  },
  retina_detect: true
});

// Initialize Lenis for smooth scrolling (matching Samples 1 & 2)
const lenis = new Lenis({
  lerp: 0.1,
  smooth: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });
}

// Hero slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('#hero-slider .slide');
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

// Auto-advance slides
if (slides.length > 0) {
  setInterval(nextSlide, 5000);
}

// Smooth scroll for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      lenis.scrollTo(target, { offset: -80 });
    }
  });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('nav');
  if (window.scrollY > 100) {
    navbar.classList.add('backdrop-blur-lg');
  } else {
    navbar.classList.remove('backdrop-blur-lg');
  }
});

// Intersection Observer for animations (WORKING VERSION FROM SAMPLE 1)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add 'visible' class for CSS animations
      entry.target.classList.add('visible');
      entry.target.classList.add('animate-in');
      
      // Add loading animation for images
      const img = entry.target.querySelector('img');
      if (img && !img.classList.contains('loaded')) {
        img.addEventListener('load', function() {
          this.classList.add('loaded');
        });
      }
    }
  });
}, observerOptions);

// Observe all animated elements (works with both old and new class names)
document.querySelectorAll('.scroll-animate, .fade-in-up, .fade-in-left, .fade-in-right, .scale-in, [data-animate]').forEach(el => {
  observer.observe(el);
});

// Also observe elements by common selectors for animation
document.querySelectorAll('section, .menu-item, .gallery-item, .blog-post, .promotion-card').forEach(el => {
  if (!el.classList.contains('scroll-animate')) {
    el.classList.add('fade-in-up'); // Add default animation class
  }
  observer.observe(el);
});

// Progressive image loading
function handleImageLoad() {
  document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', function() {
        this.classList.add('loaded');
      });
    }
  });
}

// Initialize image loading
handleImageLoad();

// Enhanced menu item hover effects
document.querySelectorAll('.group').forEach(item => {
  item.addEventListener('mouseenter', function() {
    const img = this.querySelector('img');
    if (img) {
      img.style.transform = 'scale(1.1)';
    }
  });
  
  item.addEventListener('mouseleave', function() {
    const img = this.querySelector('img');
    if (img) {
      img.style.transform = 'scale(1)';
    }
  });
});

// Simple scroll listener for navbar effects
let ticking = false;

function updateScroll() {
  const scrolled = window.pageYOffset;
  const navbar = document.querySelector('nav');
  
  if (navbar) {
    if (scrolled > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  ticking = false;
}

function requestScroll() {
  if (!ticking) {
    requestAnimationFrame(updateScroll);
    ticking = true;
  }
}

window.addEventListener('scroll', requestScroll);

// Loading screen effect
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  
  // Trigger hero animations after load
  setTimeout(() => {
    const heroElements = document.querySelectorAll('#home h1, #home p');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 300);
    });
  }, 500);
});

// Enhanced stagger animations
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll('.scroll-animate');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('animate-in');
        }, index * 150);
      });
    }
  });
}, { threshold: 0.2 });

// Observe sections for staggered animations
document.querySelectorAll('section').forEach(section => {
  staggerObserver.observe(section);
});
