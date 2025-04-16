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
        
        // Get product details
        const productName = card.querySelector('.product-title')?.textContent || 
                          card.querySelector('h3')?.textContent || 
                          'Product';
        const productPrice = card.querySelector('.price')?.textContent || 
                           card.querySelector('.product-price')?.textContent || 
                           '$19.99';
        const productImage = card.querySelector('img')?.src || 
                           'https://source.unsplash.com/random/100x100/?software';
        
        // Save to localStorage for checkout page
        const cartItem = {
            name: productName,
            price: productPrice,
            period: '7-day rental', // Default rental period
            image: productImage
        };
        
        // Add to cart
        let cart = JSON.parse(localStorage.getItem('rentifyCart')) || [];
        cart.push(cartItem);
        localStorage.setItem('rentifyCart', JSON.stringify(cart));
        
        // Update cart count display
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
        
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
  
  // Update cart count on page load
  const updateCartCount = () => {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      const cart = JSON.parse(localStorage.getItem('rentifyCart')) || [];
      cartCount.textContent = cart.length;
    }
  };
  
  // Call this when page loads
  updateCartCount();
  
  // Universal Rent Button Functionality
  function setupRentButtons() {
    // Rent button click for all types of rent buttons
    const rentButtons = document.querySelectorAll('.rent-button, .rent-btn, .rent-now, .rent-now-btn');
    
    rentButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Find the product container (might be a card, div, or other element)
        const productContainer = this.closest('.product-card') || 
                                this.closest('.game-card') || 
                                this.closest('.tool-card') || 
                                this.closest('.product-item') ||
                                this.closest('article') || 
                                this.closest('section');
        
        // Get product details
        let productName = 'Software Subscription';
        let productPrice = '$19.99';
        let productImage = 'https://source.unsplash.com/random/100x100/?software';
        
        // Try to extract product information from different possible HTML structures
        if (productContainer) {
          productName = productContainer.querySelector('.product-title')?.textContent || 
                        productContainer.querySelector('h3')?.textContent || 
                        productContainer.querySelector('h2')?.textContent || 
                        productName;
                        
          productPrice = productContainer.querySelector('.price')?.textContent || 
                         productContainer.querySelector('.product-price')?.textContent || 
                         productPrice;
                         
          productImage = productContainer.querySelector('img')?.src || productImage;
        }
        
        // Save to localStorage for checkout page
        const cartItem = {
          name: productName,
          price: productPrice,
          period: '7-day rental', // Default rental period
          image: productImage
        };
        
        // Save to cart
        let cart = JSON.parse(localStorage.getItem('rentifyCart')) || [];
        cart.push(cartItem);
        localStorage.setItem('rentifyCart', JSON.stringify(cart));
        
        // Redirect to checkout
        window.location.href = 'checkout.html';
      });
    });
  }
  
  // Setup all rent buttons on page
  setupRentButtons();
  
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
      const walk = (x - startX) * 2; // Scroll speed multiplier
      row.scrollLeft = scrollLeft - walk;
    });
    
    // Keyboard navigation
    row.setAttribute('tabindex', '0'); // Make focusable
    row.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        row.scrollLeft += scrollAmount;
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        row.scrollLeft -= scrollAmount;
        e.preventDefault();
      }
    });
  });
  
  // Highlight active nav item based on scroll position
  function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavOnScroll);
  highlightNavOnScroll(); // Run once on page load
}); 