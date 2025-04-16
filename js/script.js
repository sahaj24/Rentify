// Rentify JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.getElementById('main-navigation');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      const isExpanded = mainNav.classList.contains('active');
      this.setAttribute('aria-expanded', isExpanded);
      this.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
  }
  
  // Back to top button
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Featured Products Slider functionality
  const featuredSlider = document.querySelector('.featured-slider');
  const sliderPrev = document.querySelector('.slider-prev');
  const sliderNext = document.querySelector('.slider-next');
  
  if (featuredSlider && sliderPrev && sliderNext) {
    const cardWidth = featuredSlider.querySelector('.product-card')?.offsetWidth || 300;
    const gap = 20; // Gap between cards
    const scrollAmount = cardWidth + gap;
    let currentPosition = 0;
    
    sliderNext.addEventListener('click', function() {
      currentPosition = Math.min(currentPosition + scrollAmount, 
        featuredSlider.scrollWidth - featuredSlider.clientWidth);
      featuredSlider.scroll({
        left: currentPosition,
        behavior: 'smooth'
      });
      updateSliderButtons();
    });
    
    sliderPrev.addEventListener('click', function() {
      currentPosition = Math.max(currentPosition - scrollAmount, 0);
      featuredSlider.scroll({
        left: currentPosition,
        behavior: 'smooth'
      });
      updateSliderButtons();
    });
    
    function updateSliderButtons() {
      sliderPrev.classList.toggle('disabled', currentPosition <= 0);
      sliderNext.classList.toggle('disabled', 
        currentPosition >= featuredSlider.scrollWidth - featuredSlider.clientWidth);
    }
    
    // Initialize button states
    updateSliderButtons();
    
    // Update on window resize
    window.addEventListener('resize', function() {
      const newCardWidth = featuredSlider.querySelector('.product-card')?.offsetWidth || 300;
      if (newCardWidth !== cardWidth) {
        // Reset position on resize
        currentPosition = 0;
        featuredSlider.scrollLeft = 0;
        updateSliderButtons();
      }
    });
  }

  // Product card hover effects
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });

    // Add to cart functionality
    const addToCartBtn = card.querySelector('.add-to-cart');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const productName = card.querySelector('.product-title').textContent;
        alert(`Added ${productName} to your cart!`);
      });
    }

    // View details functionality
    const viewDetailsBtn = card.querySelector('.view-details');
    if (viewDetailsBtn) {
      viewDetailsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = 'product-details.html';
      });
    }
  });
  
  // Equipment and Category card hover effects
  const equipmentCards = document.querySelectorAll('.equipment-card, .category-card');
  equipmentCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      const img = this.querySelector('img');
      if (img) img.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      const img = this.querySelector('img');
      if (img) img.style.transform = 'scale(1)';
    });
    
    // Make cards clickable to product details
    card.addEventListener('click', function() {
      window.location.href = 'product-details.html';
    });
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') return;
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mainNav && mainNav.classList.contains('active') && mobileMenuToggle) {
          mainNav.classList.remove('active');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        // Update URL without page reload
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // Cart toggle functionality
  const cartToggle = document.querySelector('.cart-toggle');
  const cartSidebar = document.querySelector('.cart-sidebar');
  const cartClose = document.querySelector('.cart-close');
  
  if (cartToggle && cartSidebar && cartClose) {
    cartToggle.addEventListener('click', function(e) {
      e.preventDefault();
      cartSidebar.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    cartClose.addEventListener('click', function() {
      cartSidebar.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (cartSidebar.classList.contains('active') && 
          !cartSidebar.contains(e.target) && 
          e.target !== cartToggle) {
        cartSidebar.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Rent button click
  const rentButtons = document.querySelectorAll('.rent-button');
  rentButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productName = this.closest('.product-card').querySelector('.product-title').textContent;
      alert(`You have selected to rent: ${productName}. Redirecting to product details.`);
      window.location.href = 'product-details.html';
    });
  });
  
  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        alert(`Thank you for subscribing with: ${emailInput.value}`);
        emailInput.value = '';
      }
    });
  }
  
  // Horizontal scrolling for category rows with keyboard navigation
  const categoryRows = document.querySelectorAll('.categories-row');
  categoryRows.forEach(row => {
    // Mouse drag scrolling
    let isDown = false;
    let startX;
    let scrollLeft;
    
    row.addEventListener('mousedown', (e) => {
      isDown = true;
      row.style.cursor = 'grabbing';
      startX = e.pageX - row.offsetLeft;
      scrollLeft = row.scrollLeft;
      e.preventDefault(); // Prevent text selection during drag
    });
    
    row.addEventListener('mouseleave', () => {
      isDown = false;
      row.style.cursor = 'grab';
    });
    
    row.addEventListener('mouseup', () => {
      isDown = false;
      row.style.cursor = 'grab';
    });
    
    row.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - row.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      row.scrollLeft = scrollLeft - walk;
    });
    
    // Keyboard navigation
    row.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        row.scrollLeft += 300; // Scroll by 300px right
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        row.scrollLeft -= 300; // Scroll by 300px left
        e.preventDefault();
      }
    });
  });

  // Set initial cursor for horizontally scrollable elements
  categoryRows.forEach(row => {
    row.style.cursor = 'grab';
  });
  
  // Fix image loading issues
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      // If image fails to load, replace with a placeholder
      this.src = 'https://placehold.co/600x400/333/white?text=Image+Not+Found';
      this.alt = 'Image could not be loaded';
    });
  });
  
  // Add active state to navigation links based on scroll position
  window.addEventListener('scroll', highlightNavOnScroll);
  
  function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navigationLink = document.querySelector(`nav a[href="#${sectionId}"]`);
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom && navigationLink) {
        document.querySelectorAll('nav a').forEach(link => {
          link.classList.remove('active');
        });
        navigationLink.classList.add('active');
      }
    });
  }
  
  // Initialize active state for navigation
  highlightNavOnScroll();
}); 