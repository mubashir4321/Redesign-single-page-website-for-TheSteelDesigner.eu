// Set current year in footer and handle preloader
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Preloader
  window.addEventListener('load', function() {
    setTimeout(function() {
      document.body.classList.add('loaded');
    }, 1000);
  });
  
  // Theme switching
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
  
  // Set initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Toggle theme
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
});

// Portfolio infinite scroll
(function() {
  const items = Array.from(document.querySelectorAll('.portfolio-item'));
  const batchSize = 6;
  let visibleCount = 9;

  function updateVisibility() {
    items.forEach((item, index) => {
      if (index < visibleCount) {
        item.style.display = 'block';
      }
    });
  }

  function onScroll() {
    if (visibleCount >= items.length) return;
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 200;
    if (scrollPosition >= threshold) {
      visibleCount = Math.min(visibleCount + batchSize, items.length);
      updateVisibility();
    }
  }

  updateVisibility();
  window.addEventListener('scroll', onScroll);
})();

// Lightbox functionality
(function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.querySelector('.lightbox-close');
  const images = document.querySelectorAll('.portfolio-item img');

  function openLightbox(src, caption) {
    lightboxImage.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  images.forEach(img => {
    img.addEventListener('click', () => {
      const caption = img.parentElement.querySelector('.portfolio-caption')?.textContent || '';
      openLightbox(img.src, caption);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
})();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});