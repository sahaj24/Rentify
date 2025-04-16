// AI Tools Page JavaScript - Client-side functionality
document.addEventListener('DOMContentLoaded', function() {
    // All AI tools data (this would normally come from a server/database)
    const aiTools = [
        {
            id: 1,
            name: "ChatGPT Plus (GPT-4)",
            category: "Conversational AI",
            image: "https://cdn-icons-png.flaticon.com/512/8637/8637457.png",
            rating: 4.9,
            price: 1.99,
            description: "Premium version of ChatGPT with faster response times, GPT-4 capabilities, and priority access during high traffic periods.",
            features: ["GPT-4 Model", "Priority Access", "Web Browsing"],
        },
        {
            id: 2,
            name: "Midjourney (Standard)",
            category: "Image Generation",
            image: "https://cdn-icons-png.flaticon.com/512/6295/6295417.png",
            rating: 4.8,
            price: 1.49,
            description: "AI image generation tool that creates stunning, artistic images from text descriptions with incredible detail and creativity.",
            features: ["High Resolution", "Fast Generation", "Commercial Usage"],
        },
        {
            id: 3,
            name: "GitHub Copilot",
            category: "Code Assistant",
            image: "https://cdn-icons-png.flaticon.com/512/6295/6295405.png",
            rating: 4.7,
            price: 1.29,
            description: "AI pair programmer that helps write better code faster with context-aware suggestions across multiple programming languages.",
            features: ["Multi-language", "Auto-completion", "IDE Integration"],
        },
        {
            id: 4,
            name: "DALL-E 3",
            category: "Image Creation",
            image: "https://cdn-icons-png.flaticon.com/512/9073/9073031.png",
            rating: 4.9,
            price: 1.79,
            description: "Advanced AI system that creates realistic images and art from natural language descriptions with remarkable accuracy.",
            features: ["Photorealistic", "Style Control", "High Resolution"],
        },
        {
            id: 5,
            name: "Claude 3 Opus",
            category: "AI Assistant",
            image: "https://cdn-icons-png.flaticon.com/512/8637/8637558.png",
            rating: 4.8,
            price: 1.89,
            description: "Anthropic's most capable AI assistant with advanced reasoning, document analysis, and nuanced conversation capabilities.",
            features: ["100K Context", "Document Analysis", "Code Support"],
        },
        {
            id: 6,
            name: "Jasper AI",
            category: "Content Creation",
            image: "https://cdn-icons-png.flaticon.com/512/8637/8637685.png",
            rating: 4.6,
            price: 1.19,
            description: "AI content platform specializing in marketing content generation with templates for blogs, social media, emails, and ads.",
            features: ["50+ Templates", "Brand Voice", "SEO Integration"],
        },
        {
            id: 7,
            name: "Stable Diffusion XL",
            category: "Image Generation",
            image: "https://cdn-icons-png.flaticon.com/512/6295/6295453.png",
            rating: 4.7,
            price: 1.59,
            description: "Open-source AI image generation model that creates detailed images from text prompts with extensive customization options.",
            features: ["Custom Models", "Local Hosting", "API Access"],
        },
        {
            id: 8,
            name: "Runway Gen-2",
            category: "Video Generation",
            image: "https://cdn-icons-png.flaticon.com/512/2329/2329087.png",
            rating: 4.5,
            price: 2.49,
            description: "AI video generation tool that creates dynamic video content from text prompts and image inputs with professional quality.",
            features: ["Text-to-Video", "Image-to-Video", "Editing Tools"],
        },
        {
            id: 9,
            name: "Google Gemini Pro",
            category: "AI Assistant",
            image: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
            rating: 4.8,
            price: 1.99,
            description: "Google's multimodal AI capable of understanding and generating text, code, audio, and images with broad capabilities.",
            features: ["Multimodal", "Data Analysis", "Code Generation"],
        }
    ];

    // Cart array to store selected items
    let cart = JSON.parse(localStorage.getItem('aiToolsCart')) || [];
    updateCartCount();

    // References to DOM elements
    const searchInput = document.querySelector('.ai-tools-search input');
    const searchButton = document.querySelector('.ai-tools-search button');
    const categoryButtons = document.querySelectorAll('.tool-category');
    const productsGrid = document.querySelector('.products-grid');
    const cartToggle = document.querySelector('.cart-toggle');
    const cartCountElement = document.querySelector('.cart-count');

    // Initialize the grid with all tools
    renderTools(aiTools);
    
    // Search functionality
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === '') {
            renderTools(aiTools);
            return;
        }
        
        const filteredTools = aiTools.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm) || 
            tool.description.toLowerCase().includes(searchTerm) ||
            tool.category.toLowerCase().includes(searchTerm) ||
            tool.features.some(feature => feature.toLowerCase().includes(searchTerm))
        );
        
        renderTools(filteredTools);
    }

    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active status
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.textContent.trim();
            
            if (category === 'All Tools') {
                renderTools(aiTools);
                return;
            }
            
            const filteredTools = aiTools.filter(tool => 
                tool.category.includes(category.replace(' Tools', '').replace(' Analysis', ''))
            );
            
            renderTools(filteredTools);
        });
    });

    // Render tools to the grid
    function renderTools(toolsArray) {
        productsGrid.innerHTML = '';
        
        if (toolsArray.length === 0) {
            productsGrid.innerHTML = '<div class="no-results"><h3>No tools found</h3><p>Try a different search term or category</p></div>';
            return;
        }
        
        toolsArray.forEach(tool => {
            const toolCard = createToolCard(tool);
            productsGrid.appendChild(toolCard);
        });
    }

    // Create a tool card element
    function createToolCard(tool) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Create star rating HTML
        let starsHTML = '';
        const fullStars = Math.floor(tool.rating);
        const hasHalfStar = tool.rating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }
        
        // Create features HTML
        let featuresHTML = '';
        tool.features.forEach(feature => {
            featuresHTML += `<span class="feature-item">${feature}</span>`;
        });
        
        // Build the card HTML
        card.innerHTML = `
            <div class="product-image">
                <img src="${tool.image}" alt="${tool.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${tool.name}</h3>
                <p class="product-category">${tool.category}</p>
                <div class="product-rating">
                    ${starsHTML}
                    <span>(${tool.rating})</span>
                </div>
                <div class="product-price">$${tool.price.toFixed(2)}/day</div>
                <p class="product-description">${tool.description}</p>
                
                <div class="product-features">
                    <div class="feature-list">
                        ${featuresHTML}
                    </div>
                </div>
                
                <div class="product-actions">
                    <a href="javascript:void(0);" class="rent-button" data-id="${tool.id}">Rent Now</a>
                    <a href="product-details.html?id=${tool.id}" class="details-button">Details</a>
                </div>
            </div>
        `;
        
        // Add click event for the rent button
        card.querySelector('.rent-button').addEventListener('click', function() {
            addToCart(tool);
        });
        
        return card;
    }

    // Add item to cart
    function addToCart(tool) {
        // Check if item is already in cart
        const existingItem = cart.find(item => item.id === tool.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: tool.id,
                name: tool.name,
                price: tool.price,
                image: tool.image,
                quantity: 1
            });
        }
        
        // Save to localStorage
        localStorage.setItem('aiToolsCart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        // Show notification
        showNotification(`${tool.name} added to cart!`);
        
        // Show cart sidebar
        toggleCart();
    }

    // Update cart count
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }

    // Show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `<p>${message}</p>`;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Cart sidebar functionality
    let cartSidebar;
    
    function createCartSidebar() {
        if (document.querySelector('.cart-sidebar')) {
            return;
        }
        
        // Create cart sidebar element
        cartSidebar = document.createElement('div');
        cartSidebar.className = 'cart-sidebar';
        
        // Add HTML content
        cartSidebar.innerHTML = `
            <div class="cart-header">
                <h3>Your Cart</h3>
                <button class="close-cart"><i class="fas fa-times"></i></button>
            </div>
            <div class="cart-items">
                <!-- Items will be added dynamically -->
            </div>
            <div class="cart-total">
                <p>Total: <span class="total-amount">$0.00</span></p>
                <button class="checkout-button">Proceed to Checkout</button>
            </div>
        `;
        
        // Add to DOM
        document.body.appendChild(cartSidebar);
        
        // Add event listeners
        cartSidebar.querySelector('.close-cart').addEventListener('click', toggleCart);
        cartSidebar.querySelector('.checkout-button').addEventListener('click', checkout);
        
        // Add CSS for cart sidebar
        const style = document.createElement('style');
        style.textContent = `
            .cart-sidebar {
                position: fixed;
                top: 0;
                right: -400px;
                width: 380px;
                height: 100vh;
                background: #1e1e1e;
                box-shadow: -5px 0 15px rgba(0,0,0,0.3);
                z-index: 1000;
                transition: right 0.3s ease;
                color: white;
                display: flex;
                flex-direction: column;
            }
            
            .cart-sidebar.open {
                right: 0;
            }
            
            .cart-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0,0,0,0.5);
                z-index: 999;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .cart-overlay.open {
                opacity: 1;
                visibility: visible;
            }
            
            .cart-header {
                padding: 20px;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .cart-header h3 {
                margin: 0;
                font-size: 1.4rem;
            }
            
            .close-cart {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
            }
            
            .cart-items {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
            }
            
            .cart-item {
                display: flex;
                margin-bottom: 20px;
                padding-bottom: 20px;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }
            
            .cart-item-image {
                width: 70px;
                height: 70px;
                background: #252525;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                margin-right: 15px;
            }
            
            .cart-item-image img {
                max-width: 80%;
                max-height: 80%;
                object-fit: contain;
            }
            
            .cart-item-details {
                flex: 1;
            }
            
            .cart-item-title {
                font-weight: 600;
                margin: 0 0 5px 0;
            }
            
            .cart-item-price {
                color: var(--primary-color);
                font-weight: 600;
                margin: 0 0 10px 0;
            }
            
            .cart-item-controls {
                display: flex;
                align-items: center;
            }
            
            .quantity-control {
                display: flex;
                align-items: center;
                margin-right: 15px;
            }
            
            .quantity-btn {
                background: #333;
                color: white;
                border: none;
                width: 25px;
                height: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 3px;
                cursor: pointer;
            }
            
            .quantity-value {
                margin: 0 10px;
            }
            
            .remove-item {
                background: none;
                border: none;
                color: rgba(255,255,255,0.6);
                cursor: pointer;
                font-size: 0.9rem;
            }
            
            .remove-item:hover {
                color: var(--primary-color);
            }
            
            .cart-total {
                padding: 20px;
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            
            .total-amount {
                font-weight: 700;
                font-size: 1.2rem;
                color: var(--primary-color);
            }
            
            .checkout-button {
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 12px;
                border-radius: 8px;
                width: 100%;
                margin-top: 15px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .checkout-button:hover {
                background: #d30813;
            }
            
            .empty-cart {
                text-align: center;
                padding: 30px;
                color: rgba(255,255,255,0.6);
            }
            
            .empty-cart i {
                font-size: 3rem;
                margin-bottom: 15px;
                color: rgba(255,255,255,0.2);
            }
            
            .notification {
                position: fixed;
                top: 20px;
                right: -300px;
                background: var(--primary-color);
                color: white;
                padding: 15px 25px;
                border-radius: 5px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
                z-index: 1001;
            }
            
            .notification p {
                margin: 0;
            }
            
            .notification.show {
                right: 20px;
            }
            
            .no-results {
                text-align: center;
                padding: 40px;
                color: rgba(255,255,255,0.7);
            }
            
            @media screen and (max-width: 576px) {
                .cart-sidebar {
                    width: 100%;
                    right: -100%;
                }
                
                .notification {
                    width: 80%;
                    right: -100%;
                }
                
                .notification.show {
                    right: 10%;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Create cart overlay
    function createCartOverlay() {
        if (document.querySelector('.cart-overlay')) {
            return;
        }
        
        const overlay = document.createElement('div');
        overlay.className = 'cart-overlay';
        
        // Add to DOM
        document.body.appendChild(overlay);
        
        // Add event listener
        overlay.addEventListener('click', toggleCart);
    }
    
    // Toggle cart sidebar
    function toggleCart() {
        createCartSidebar();
        createCartOverlay();
        
        const cartSidebar = document.querySelector('.cart-sidebar');
        const cartOverlay = document.querySelector('.cart-overlay');
        
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('open');
        
        // If opening the cart, update its contents
        if (cartSidebar.classList.contains('open')) {
            updateCartItems();
        }
    }
    
    // Update cart items
    function updateCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items');
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some AI tools to get started!</p>
                </div>
            `;
            document.querySelector('.total-amount').textContent = '$0.00';
            return;
        }
        
        let cartHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(2)}/day</p>
                        <div class="cart-item-controls">
                            <div class="quantity-control">
                                <button class="quantity-btn decrease">-</button>
                                <span class="quantity-value">${item.quantity}</span>
                                <button class="quantity-btn increase">+</button>
                            </div>
                            <button class="remove-item">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = cartHTML;
        document.querySelector('.total-amount').textContent = `$${total.toFixed(2)}`;
        
        // Add event listeners to buttons
        document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.closest('.cart-item').dataset.id);
                updateItemQuantity(itemId, -1);
            });
        });
        
        document.querySelectorAll('.quantity-btn.increase').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.closest('.cart-item').dataset.id);
                updateItemQuantity(itemId, 1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.closest('.cart-item').dataset.id);
                removeFromCart(itemId);
            });
        });
    }
    
    // Update item quantity
    function updateItemQuantity(itemId, change) {
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        if (itemIndex === -1) return;
        
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        // Save to localStorage
        localStorage.setItem('aiToolsCart', JSON.stringify(cart));
        
        // Update UI
        updateCartCount();
        updateCartItems();
    }
    
    // Remove item from cart
    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        
        // Save to localStorage
        localStorage.setItem('aiToolsCart', JSON.stringify(cart));
        
        // Update UI
        updateCartCount();
        updateCartItems();
    }
    
    // Checkout functionality
    function checkout() {
        if (cart.length === 0) {
            showNotification('Your cart is empty');
            return;
        }
        
        // In a real application, this would redirect to a checkout page
        // For demo purposes, we'll just clear the cart and show a notification
        showNotification('Checkout complete! Rental approved.');
        
        // Clear cart
        cart = [];
        localStorage.setItem('aiToolsCart', JSON.stringify(cart));
        updateCartCount();
        updateCartItems();
    }
    
    // Add cart toggling functionality
    cartToggle.addEventListener('click', toggleCart);
    
    // Smooth scroll back to top
    document.getElementById('back-to-top').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}); 