// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Easter Egg: Console Message
  console.log(`
    ╔══════════════════════════════════════╗
    ║  🎮 Hey there!    ║
    ║  Welcome to my portfolio's console   ║
    ║  Try to find all the Easter eggs!    ║
    ║  Hint: Try the Konami Code ;)        ║
    ╚══════════════════════════════════════╝
  `);
  
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

  // Easter Egg: Snake Game
  let typedKeys = '';
  const snakeWord = 'snake';
  
  document.addEventListener('keydown', (e) => {
    typedKeys += e.key.toLowerCase();
    typedKeys = typedKeys.slice(-snakeWord.length);
    
    if (typedKeys === snakeWord) {
      createSnakeGame();
    }
  });

  // Easter Egg: Matrix Rain
  let matrixWord = 'matrix';
  
  document.addEventListener('keydown', (e) => {
    typedKeys += e.key.toLowerCase();
    typedKeys = typedKeys.slice(-matrixWord.length);
    
    if (typedKeys === matrixWord) {
      createMatrixRain();
    }
  });

  function createMatrixRain() {
    if (document.getElementById('matrix-container')) return;

    const container = document.createElement('div');
    container.id = 'matrix-container';
    const canvas = document.createElement('canvas');
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.className = 'matrix-close';
    
    container.appendChild(canvas);
    container.appendChild(closeBtn);
    document.body.appendChild(container);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const raindrops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for(let i = 0; i < raindrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, raindrops[i] * fontSize);
        
        if(raindrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          raindrops[i] = 0;
        }
        raindrops[i]++;
      }
    }

    let matrixInterval = setInterval(draw, 30);

    closeBtn.addEventListener('click', () => {
      clearInterval(matrixInterval);
      container.remove();
    });

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      raindrops.length = Math.floor(canvas.width / fontSize);
      raindrops.fill(1);
    });
  }

  function createSnakeGame() {
    if (document.getElementById('snake-game')) return;

    const gameContainer = document.createElement('div');
    gameContainer.id = 'snake-game';
    gameContainer.innerHTML = `
      <div class="snake-header">
        <span class="snake-score">Score: 0</span>
        <button class="snake-close">&times;</button>
      </div>
      <canvas id="snake-canvas"></canvas>
    `;
    document.body.appendChild(gameContainer);

    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');
    const closeBtn = gameContainer.querySelector('.snake-close');
    const scoreDisplay = gameContainer.querySelector('.snake-score');

    canvas.width = 400;
    canvas.height = 400;
    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let direction = 'right';
    let score = 0;
    let gameLoop;

    function drawSnake() {
      ctx.fillStyle = '#4CAF50';
      snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
      });
    }

    function drawFood() {
      ctx.fillStyle = '#FF4081';
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    }

    function moveSnake() {
      const head = { ...snake[0] };
      switch (direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
      }

      if (head.x < 0) head.x = canvas.width / gridSize - 1;
      if (head.x >= canvas.width / gridSize) head.x = 0;
      if (head.y < 0) head.y = canvas.height / gridSize - 1;
      if (head.y >= canvas.height / gridSize) head.y = 0;

      if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = 'Score: ' + score;
        food = {
          x: Math.floor(Math.random() * (canvas.width / gridSize)),
          y: Math.floor(Math.random() * (canvas.height / gridSize))
        };
      } else {
        snake.pop();
      }

      if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
      }

      snake.unshift(head);
    }

    function endGame() {
      clearInterval(gameLoop);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over! Score: ' + score, canvas.width / 2, canvas.height / 2);
    }

    function updateGame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawFood();
      moveSnake();
      drawSnake();
    }

    document.addEventListener('keydown', function handleKeyPress(e) {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'down') direction = 'up'; break;
        case 'ArrowDown': if (direction !== 'up') direction = 'down'; break;
        case 'ArrowLeft': if (direction !== 'right') direction = 'left'; break;
        case 'ArrowRight': if (direction !== 'left') direction = 'right'; break;
      }
    });

    closeBtn.addEventListener('click', () => {
      clearInterval(gameLoop);
      gameContainer.remove();
    });

    gameLoop = setInterval(updateGame, 100);
  }
  
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
    }, 50);
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
    // Form validation function
    const validateForm = (formData) => {
      const errors = {};
      const email = formData.get('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!formData.get('name').trim()) {
        errors.name = 'Name is required';
      }
      
      if (!email.trim()) {
        errors.email = 'Email is required';
      } else if (!emailRegex.test(email)) {
        errors.email = 'Please enter a valid email address';
      }
      
      if (!formData.get('subject').trim()) {
        errors.subject = 'Subject is required';
      }
      
      if (!formData.get('message').trim()) {
        errors.message = 'Message is required';
      }
      
      return errors;
    };

    // Clear error messages
    const clearErrors = () => {
      document.querySelectorAll('.error-message').forEach(el => el.remove());
      document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));
    };

    // Show error message
    const showError = (inputElement, message) => {
      const formGroup = inputElement.closest('.form-group');
      formGroup.classList.add('error');
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = message;
      formGroup.appendChild(errorDiv);
    };

    // Show success message
    const showSuccess = () => {
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
      contactForm.insertBefore(successMessage, contactForm.firstChild);
      setTimeout(() => successMessage.remove(), 5000);
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();
      
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalBtnText = submitBtn.innerHTML;
      const formData = new FormData(contactForm);
      const errors = validateForm(formData);
      
      if (Object.keys(errors).length > 0) {
        for (const [field, message] of Object.entries(errors)) {
          const input = contactForm.querySelector(`[name="${field}"]`);
          showError(input, message);
        }
        return;
      }
      
      try {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Create the request body
        const requestData = {
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message')
        };

        // You can use a service like EmailJS, FormSpree, or your own backend
        // For this example, we'll use FormSpree (replace with your FormSpree endpoint)
        const response = await fetch('https://formspree.io/f/mgvlgbkp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        showSuccess();
        contactForm.reset();
      } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Failed to send message. Please try again later.';
        contactForm.insertBefore(errorMessage, contactForm.firstChild);
      } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }
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

  // DARK MODE TOGGLE
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  // Load dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });

  // Gallery code removed

  // SEARCH FUNCTIONALITY
  const siteSearch = document.getElementById('siteSearch');
  if (siteSearch) {
    siteSearch.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      // Blog posts
      document.querySelectorAll('.blog-post').forEach(post => {
        const title = post.getAttribute('data-title').toLowerCase();
        const tags = post.getAttribute('data-tags').toLowerCase();
        const text = post.textContent.toLowerCase();
        if (title.includes(query) || tags.includes(query) || text.includes(query)) {
          post.style.display = '';
          highlightSearch(post, query);
        } else {
          post.style.display = 'none';
        }
      });
      // Gallery search removed
      // Projects
      document.querySelectorAll('.project-card').forEach(card => {
        const title = card.querySelector('.project-title').textContent.toLowerCase();
        const desc = card.querySelector('.project-description').textContent.toLowerCase();
        if (title.includes(query) || desc.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
    function highlightSearch(element, query) {
      if (!query) {
        element.innerHTML = element.innerHTML.replace(/<span class="search-highlight">(.*?)<\/span>/g, '$1');
        return;
      }
      const regex = new RegExp(`(${query})`, 'gi');
      element.innerHTML = element.innerHTML.replace(/<span class="search-highlight">(.*?)<\/span>/g, '$1');
      element.innerHTML = element.innerHTML.replace(regex, '<span class="search-highlight">$1</span>');
    }
  }

  // NEWSLETTER FORM
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value;
      alert(`Thank you for subscribing, ${email}!`);
      newsletterForm.reset();
    });
  }

  // Easter Egg: Konami Code
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateKonamiCode();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function activateKonamiCode() {
    // Create floating game elements
    const gameElements = ['🎮', '👾', '🕹️', '🎲', '🎯', '🎪'];
    const container = document.createElement('div');
    container.className = 'konami-container';
    document.body.appendChild(container);

    // Add floating elements
    for (let i = 0; i < 20; i++) {
      const element = document.createElement('span');
      element.className = 'konami-element';
      element.textContent = gameElements[Math.floor(Math.random() * gameElements.length)];
      element.style.left = Math.random() * 100 + 'vw';
      element.style.animationDuration = (Math.random() * 3 + 2) + 's';
      element.style.animationDelay = (Math.random() * 2) + 's';
      container.appendChild(element);
    }

    // Play 8-bit sound
    const audio = new Audio('assets/audio/powerup.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {}); // Ignore if audio fails to play

    // Remove after animation
    setTimeout(() => {
      container.remove();
    }, 10000);
  }

  // Easter Egg: Secret Theme
  const logo = document.querySelector('.logo a');
  let clickCount = 0;
  let clickTimer;

  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      clickCount++;
      
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 3000);

      if (clickCount === 5) {
        activateSecretTheme();
        clickCount = 0;
      }
    });
  }

  function activateSecretTheme() {
    const root = document.documentElement;
    const isRetroActive = document.body.classList.toggle('retro-theme');
    
    if (isRetroActive) {
      // Save current theme
      const currentTheme = {
        primary: getComputedStyle(root).getPropertyValue('--primary-color'),
        secondary: getComputedStyle(root).getPropertyValue('--secondary-color'),
        accent: getComputedStyle(root).getPropertyValue('--accent-color'),
        dark: getComputedStyle(root).getPropertyValue('--dark-color')
      };
      
      localStorage.setItem('previous-theme', JSON.stringify(currentTheme));
      
      // Apply retro theme
      root.style.setProperty('--primary-color', '#ffd866');
      root.style.setProperty('--secondary-color', '#ff6188');
      root.style.setProperty('--accent-color', '#ab9df2');
      root.style.setProperty('--dark-color', '#2d2a2e');
      
      // Add retro effects
      document.body.classList.add('crt-effect');
      
      // Show retro mode message
      const message = document.createElement('div');
      message.className = 'retro-message';
      message.innerHTML = 'RETRO MODE ACTIVATED!';
      document.body.appendChild(message);
      
      setTimeout(() => message.remove(), 3000);
    } else {
      // Restore previous theme
      const previousTheme = JSON.parse(localStorage.getItem('previous-theme'));
      if (previousTheme) {
        Object.entries(previousTheme).forEach(([key, value]) => {
          root.style.setProperty(`--${key}-color`, value);
        });
      }
      
      // Remove retro effects
      document.body.classList.remove('crt-effect');
    }
  }
});
