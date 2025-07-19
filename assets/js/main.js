// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize loader
  const loader = document.querySelector('.loader');
  
  // Hide loader after page loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1000);
  });
  
  // Typing effect
  const typingText = document.querySelector('.dynamic-text');
  const textArray = ["Developer", "Designer", "Creator"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 200;
  
  function typeText() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 100;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 200;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end of typing
      isDeleting = true;
      typingDelay = 1500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length;
      typingDelay = 500;
    }
    
    setTimeout(typeText, typingDelay);
  }
  
  // Start typing effect
  setTimeout(typeText, 1000);
  
  // Navigation scroll effect
  const navbar = document.querySelector('nav');
  const backToTop = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('show');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('show');
    }
    
    // Reveal animations on scroll
    revealElements();
  });
  
  // Back to top button
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
  
  // Reveal animations on scroll
  function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      // Get data-delay attribute or default to 0
      const delay = element.dataset.delay || 0;
      
      if (elementTop < windowHeight - elementVisible) {
        // Add delay based on data-delay attribute
        setTimeout(() => {
          element.classList.add('active');
        }, delay);
      }
    });
  }
  
  // Initialize reveal on page load
  revealElements();
  
  // Custom cursor
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Follower with a slight delay for nice effect
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    }, 100);
  });
  
  // Cursor effects on hover
  const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-item');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorFollower.style.backgroundColor = 'rgba(165, 165, 141, 0.2)';
      cursorFollower.style.borderWidth = '1px';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.backgroundColor = 'transparent';
      cursorFollower.style.borderWidth = '2px';
    });
  });
  
  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData.entries());
      
      // Simulate form submission (replace with actual form processing)
      alert(`Thank you for your message, ${formValues.name}! I'll get back to you soon.`);
      contactForm.reset();
    });
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed navbar
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Project hover effects
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-15px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(-10px)';
    });
  });
});
