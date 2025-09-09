// Initialize Particles.js with subtle effect
particlesJS('particles-js', {
  particles: {
    number: { value: 30 },
    color: { value: '#DAA520' },
    shape: { type: 'circle' },
    opacity: { 
      value: 0.1,
      random: true
    },
    size: { 
      value: 3,
      random: true
    },
    line_linked: { 
      enable: false
    },
    move: { 
      enable: true, 
      speed: 0.8,
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

// Initialize Lenis for smooth scrolling
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

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('nav');
  if (window.scrollY > 100) {
    navbar.classList.add('backdrop-blur-lg');
  } else {
    navbar.classList.remove('backdrop-blur-lg');
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      // Add loading animation for images
      const img = entry.target.querySelector('img');
      if (img && !img.classList.contains('loaded')) {
        img.classList.add('progressive-load');
        img.addEventListener('load', function() {
          this.classList.add('loaded');
        });
      }
    }
  });
}, observerOptions);

// Observe all scroll-animate elements
document.querySelectorAll('.scroll-animate').forEach(el => {
  observer.observe(el);
});

// Enhanced scroll animations with stagger effect
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll('.scroll-animate');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('animate-in');
        }, index * 100); // Stagger delay
      });
    }
  });
}, { threshold: 0.2 });

// Observe sections for staggered animations
document.querySelectorAll('section').forEach(section => {
  staggerObserver.observe(section);
});

// Number counter animation
function animateCounter(element) {
  const target = parseInt(element.textContent.replace('RM', ''));
  const increment = target / 30; // Animation duration control
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = `RM${target}`;
      clearInterval(timer);
    } else {
      element.textContent = `RM${Math.ceil(current)}`;
    }
  }, 50);
}

// Counter animation observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      animateCounter(entry.target);
    }
  });
});

document.querySelectorAll('.counter').forEach(counter => {
  counterObserver.observe(counter);
});

// Progressive image loading with fade effect
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

// Form submission handling
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(this);
  const name = formData.get('name') || document.getElementById('name').value;
  const email = formData.get('email') || document.getElementById('email').value;
  const message = formData.get('message') || document.getElementById('message').value;
  
  // Simple validation
  if (!name || !email || !message) {
    alert('Please fill in all fields');
    return;
  }
  
  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    alert('Thank you for your message! We\'ll get back to you soon.');
    this.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

// Add loading animation to images
handleImageLoad();

// Enhanced menu item hover effects
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-12px) scale(1.03)';
    this.style.boxShadow = '0 25px 50px rgba(139, 69, 19, 0.2)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 10px 25px rgba(139, 69, 19, 0.1)';
  });
});

// Parallax scrolling effect for hero section
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector('#home');
  const heroImage = heroSection.querySelector('img');
  
  if (heroImage) {
    const rate = scrolled * 0.5;
    heroImage.style.transform = `translateY(${rate}px)`;
  }
  
  // Parallax for particles
  const particles = document.querySelector('#particles-js canvas');
  if (particles) {
    particles.style.transform = `translate3d(0, ${scrolled * 0.1}px, 0)`;
  }
  
  ticking = false;
}

function requestParallax() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener('scroll', requestParallax);

// Enhanced form interactions
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
    this.style.transform = 'translateY(-2px)';
    this.style.boxShadow = '0 8px 25px rgba(218, 165, 32, 0.15)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.classList.remove('focused');
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = 'none';
  });
});

// Loading screen effect (optional)
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  
  // Trigger hero animations after load
  setTimeout(() => {
    const heroElements = document.querySelectorAll('#home h1, #home p, #home button');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }, 500);
});

// Smooth reveal animations on scroll
const revealElements = document.querySelectorAll('.scroll-animate');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('animate-in');
      }, delay);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});
