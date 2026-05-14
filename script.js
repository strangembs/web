// ============================================
// NINHOVIEJO - Main JavaScript File
// Vanilla JS - All functionality organized
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }

  // ============================================
  // HEADER SCROLL EFFECT - ENHANCED ANIMATIONS
  // ============================================
  const header = document.getElementById('header');
  let lastScrollY = window.pageYOffset;
  let ticking = false;
  let scrollThreshold = 100;

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    
    if (header) {
      // Add/remove scrolled class for styling
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Hide/show header based on scroll direction
      if (currentScroll > scrollThreshold) {
        if (currentScroll > lastScrollY && currentScroll > 200) {
          // Scrolling down - hide header
          header.classList.add('hidden');
          header.classList.remove('visible');
        } else {
          // Scrolling up - show header
          header.classList.remove('hidden');
          header.classList.add('visible');
        }
      } else {
        header.classList.remove('hidden');
        header.classList.add('visible');
      }
      
      lastScrollY = currentScroll;
    }
    
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // ============================================
  // FAQ ACCORDION
  // ============================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');

    question?.addEventListener('click', function() {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove('active');
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ============================================
  // COUNTER ANIMATION FOR STATS
  // ============================================
  const counters = document.querySelectorAll('.stat-value[data-count]');
  let countersAnimated = false;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounters() {
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-count') || '0');
      const duration = 2500;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.floor(easedProgress * target);

        counter.textContent = current.toString();

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toString();
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // ============================================
  // STAT BAR ANIMATION
  // ============================================
  function animateStatBars() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card) => {
      card.classList.add('animated');
    });
  }

  // ============================================
  // INTERSECTION OBSERVER FOR STATS SECTION
  // ============================================
  const statsSection = document.querySelector('.stats-section');

  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            animateCounters();
            animateStatBars();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(statsSection);
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 120;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        
        // Close mobile menu after clicking
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenuBtn && mobileMenu) {
          mobileMenuBtn.classList.remove('active');
          mobileMenu.classList.remove('active');
        }
      }
    });
  });

  // ============================================
  // PARTICLE ANIMATION ENHANCEMENT
  // ============================================
  const particles = document.querySelectorAll('.particle');

  particles.forEach((particle) => {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const randomDelay = Math.random() * 5;
    const randomDuration = 8 + Math.random() * 4;

    particle.style.left = `${randomX}%`;
    particle.style.top = `${randomY}%`;
    particle.style.animationDelay = `${randomDelay}s`;
    particle.style.animationDuration = `${randomDuration}s`;
  });

  // ============================================
  // SCROLL PROGRESS INDICATOR
  // ============================================
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #00FFD9, #00E5FF, #CBFF00);
    z-index: 9999;
    transition: width 0.15s ease;
    box-shadow: 0 0 20px rgba(0, 255, 217, 0.6), 0 0 40px rgba(0, 229, 255, 0.4);
  `;
  document.body.appendChild(progressBar);

  const updateProgress = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  };

  window.addEventListener('scroll', updateProgress);

  // ============================================
  // TILT EFFECT ON STAT CARDS
  // ============================================
  const tiltCards = document.querySelectorAll('.stat-card');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', function(e) {
      if (window.innerWidth < 1024) return; // Disable on mobile

      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 12;
      const rotateY = (centerX - x) / 12;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ============================================
  // ACTIVE NAV LINK ON SCROLL - ENHANCED
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navPill = document.querySelector('.nav-pill');

  const updateActiveNav = () => {
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;

      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav);

  // ============================================
  // NAV LINK HOVER MAGNETIC EFFECT
  // ============================================
  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', function(e) {
      this.style.transform = 'scale(1.05)';
    });

    link.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // ============================================
  // NAV PILL SUBTLE FLOAT ANIMATION
  // ============================================
  if (navPill) {
    let floatAnimation;
    
    const startFloat = () => {
      let time = 0;
      floatAnimation = setInterval(() => {
        time += 0.05;
        const y = Math.sin(time) * 2;
        if (!header.classList.contains('scrolled')) {
          navPill.style.transform = `translateY(${y}px)`;
        }
      }, 50);
    };

    const stopFloat = () => {
      if (floatAnimation) {
        clearInterval(floatAnimation);
        navPill.style.transform = 'translateY(0)';
      }
    };

    // Start float animation when not scrolled
    startFloat();

    // Stop float when scrolled
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        stopFloat();
      } else {
        if (!floatAnimation) startFloat();
      }
    });
  }

  // ============================================
  // INTERSECTION OBSERVER FOR ABOUT SECTION CARDS
  // ============================================
  const aboutCards = document.querySelectorAll('.about-card');

  if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.2 }
    );

    aboutCards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      cardObserver.observe(card);
    });
  }

  // ============================================
  // IMAGE SWAP FUNCTIONALITY FOR ABOUT SECTION
  // ============================================
  const aboutImage = document.getElementById('aboutImage');
  
  if (aboutImage) {
    // You can update the image src dynamically later
    // Example: aboutImage.src = 'your-image-url.jpg';
  }

  // ============================================
  // CLEANUP ON PAGE UNLOAD
  // ============================================
  window.addEventListener('beforeunload', function() {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('scroll', updateProgress);
    window.removeEventListener('scroll', updateActiveNav);
  });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Update the about section image
 * Usage: updateAboutImage('https://your-image-url.jpg')
 */
function updateAboutImage(imageUrl) {
  const aboutImage = document.getElementById('aboutImage');
  if (aboutImage) {
    aboutImage.src = imageUrl;
  }
}

/**
 * Smooth scroll to a specific element
 * Usage: smoothScrollTo('#about-mi')
 */
function smoothScrollTo(selector) {
  const element = document.querySelector(selector);
  if (element) {
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}

/**
 * Toggle mobile menu manually
 * Usage: toggleMobileMenu()
 */
function toggleMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  }
}

/**
 * Open a specific FAQ item
 * Usage: openFAQItem(0) - opens first item
 */
function openFAQItem(index) {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach((item, i) => {
    if (i === index) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Export functions for external use if needed
window.NINHOVIEJO = {
  updateAboutImage,
  smoothScrollTo,
  toggleMobileMenu,
  openFAQItem,
};
