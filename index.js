// Zay eCommerce JavaScript Enhancement
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    function initMobileMenu() {
        const nav = document.querySelector('.mad');
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        mobileMenuBtn.style.display = 'none';
        
        nav.appendChild(mobileMenuBtn);
        
        // Show/hide mobile menu button based on screen size
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
            } else {
                mobileMenuBtn.style.display = 'none';
            }
        }
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('mobile-active');
        });
    }
    
    // Product Image Slider/Carousel
    function initImageSlider() {
        const sliderImages = [
            'template-559-zay-shop.jpg',
            'shoes.jpg',
            'watches.jpg',
            'accessories.jpg'
        ];
        
        const sliderContainer = document.querySelector('.slider-container');
        const existingImg = sliderContainer.querySelector('img');
        
        if (existingImg) {
            let currentIndex = 0;
            
            // Create navigation buttons
            const prevBtn = document.createElement('button');
            prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
            prevBtn.className = 'slider-btn prev-btn';
            
            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
            nextBtn.className = 'slider-btn next-btn';
            
            // Add CSS for slider buttons
            const sliderBtnStyle = document.createElement('style');
            sliderBtnStyle.textContent = `
                .slider-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(0,0,0,0.5);
                    color: white;
                    border: none;
                    padding: 15px 20px;
                    font-size: 20px;
                    cursor: pointer;
                    border-radius: 50%;
                    z-index: 10;
                    transition: background 0.3s ease;
                }
                .slider-btn:hover {
                    background: rgba(0,0,0,0.8);
                }
                .prev-btn {
                    left: 20px;
                }
                .next-btn {
                    right: 20px;
                }
                .slider-container {
                    position: relative;
                }
            `;
            document.head.appendChild(sliderBtnStyle);
            
            sliderContainer.style.position = 'relative';
            sliderContainer.appendChild(prevBtn);
            sliderContainer.appendChild(nextBtn);
            
            function updateSlider() {
                existingImg.src = sliderImages[currentIndex];
                existingImg.style.opacity = '0';
                setTimeout(() => {
                    existingImg.style.opacity = '1';
                }, 100);
            }
            
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
                updateSlider();
            });
            
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % sliderImages.length;
                updateSlider();
            });
            
            // Auto-slide every 5 seconds
            setInterval(function() {
                currentIndex = (currentIndex + 1) % sliderImages.length;
                updateSlider();
            }, 5000);
        }
    }
    
    // Shopping Cart Functionality
    function initShoppingCart() {
        let cartItems = [];
        let cartCount = 0;
        
        const cartIcon = document.querySelector('.fa-cart-arrow-down');
        const cartCountElement = document.createElement('span');
        cartCountElement.className = 'cart-count';
        cartCountElement.textContent = '0';
        cartCountElement.style.cssText = `
            position: absolute;
            top: -8px;
            right: -8px;
            background: red;
            color: white;
            border-radius: 50%;
            padding: 2px 6px;
            font-size: 12px;
            min-width: 18px;
            text-align: center;
        `;
        
        if (cartIcon) {
            cartIcon.parentElement.style.position = 'relative';
            cartIcon.parentElement.appendChild(cartCountElement);
        }
        
        // Add to cart functionality for "Go Shop" buttons
        const shopButtons = document.querySelectorAll('button');
        shopButtons.forEach(button => {
            if (button.textContent.includes('Go Shop')) {
                button.addEventListener('click', function() {
                    const productCard = this.closest('.shoes, .watches, .accessories');
                    const productName = productCard.querySelector('h2').textContent;
                    
                    cartItems.push({
                        name: productName,
                        price: Math.floor(Math.random() * 500) + 100, // Random price
                        id: Date.now()
                    });
                    
                    cartCount++;
                    cartCountElement.textContent = cartCount;
                    
                    // Show success message
                    showNotification(`${productName} added to cart!`, 'success');
                });
            }
        });
        
        // Cart click handler
        if (cartIcon) {
            cartIcon.addEventListener('click', function() {
                showCartModal();
            });
        }
        
        function showCartModal() {
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'cart-modal';
            modal.innerHTML = `
                <div class="cart-modal-content">
                    <div class="cart-header">
                        <h3>Shopping Cart</h3>
                        <button class="close-cart">&times;</button>
                    </div>
                    <div class="cart-items">
                        ${cartItems.length === 0 ? '<p>Your cart is empty</p>' : 
                          cartItems.map(item => `
                            <div class="cart-item">
                                <span>${item.name}</span>
                                <span>$${item.price}</span>
                                <button class="remove-item" data-id="${item.id}">Remove</button>
                            </div>
                          `).join('')}
                    </div>
                    <div class="cart-total">
                        <strong>Total: $${cartItems.reduce((sum, item) => sum + item.price, 0)}</strong>
                    </div>
                    <button class="checkout-btn">Checkout</button>
                </div>
            `;
            
            // Add modal styles
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            `;
            
            const modalContent = modal.querySelector('.cart-modal-content');
            modalContent.style.cssText = `
                background: white;
                padding: 20px;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                max-height: 70vh;
                overflow-y: auto;
            `;
            
            document.body.appendChild(modal);
            
            // Close modal
            modal.querySelector('.close-cart').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            // Remove items
            modal.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemId = parseInt(this.dataset.id);
                    cartItems = cartItems.filter(item => item.id !== itemId);
                    cartCount--;
                    cartCountElement.textContent = cartCount;
                    document.body.removeChild(modal);
                    showNotification('Item removed from cart', 'info');
                });
            });
        }
    }
    
    // Newsletter Subscription
    function initNewsletter() {
        const subscribeBtn = document.querySelector('.button1 button');
        const emailInput = document.querySelector('.button1 input[type="email"]');
        
        if (subscribeBtn && emailInput) {
            subscribeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const email = emailInput.value.trim();
                
                if (email && isValidEmail(email)) {
                    showNotification('Successfully subscribed to newsletter!', 'success');
                    emailInput.value = '';
                } else {
                    showNotification('Please enter a valid email address', 'error');
                }
            });
        }
    }
    
    // Product Rating Interaction
    function initProductRatings() {
        const starContainers = document.querySelectorAll('.fa-star1');
        
        starContainers.forEach(container => {
            const stars = container.querySelectorAll('.fa-star');
            
            stars.forEach((star, index) => {
                star.addEventListener('mouseenter', function() {
                    highlightStars(stars, index);
                });
                
                star.addEventListener('click', function() {
                    setRating(stars, index + 1);
                    showNotification(`Rated ${index + 1} stars!`, 'success');
                });
            });
            
            container.addEventListener('mouseleave', function() {
                resetStars(stars);
            });
        });
        
        function highlightStars(stars, index) {
            stars.forEach((star, i) => {
                if (i <= index) {
                    star.style.color = 'gold';
                } else {
                    star.style.color = 'lightgray';
                }
            });
        }
        
        function setRating(stars, rating) {
            stars.forEach((star, i) => {
                if (i < rating) {
                    star.style.color = 'gold';
                    star.classList.add('rated');
                } else {
                    star.style.color = 'lightgray';
                    star.classList.remove('rated');
                }
            });
        }
        
        function resetStars(stars) {
            stars.forEach(star => {
                if (!star.classList.contains('rated')) {
                    const originalColor = star.classList.contains('text-warning') ? 'gold' : 'lightgray';
                    star.style.color = originalColor;
                }
            });
        }
    }
    
    // Smooth Scrolling for Navigation
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Search Functionality
    function initSearch() {
        const searchIcon = document.querySelector('.fa-magnifying-glass');
        
        if (searchIcon) {
            searchIcon.addEventListener('click', function() {
                const searchModal = document.createElement('div');
                searchModal.className = 'search-modal';
                searchModal.innerHTML = `
                    <div class="search-modal-content">
                        <input type="text" placeholder="Search products..." class="search-input">
                        <button class="search-btn">Search</button>
                        <button class="close-search">&times;</button>
                    </div>
                `;
                
                searchModal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                `;
                
                const modalContent = searchModal.querySelector('.search-modal-content');
                modalContent.style.cssText = `
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    display: flex;
                    gap: 10px;
                    position: relative;
                `;
                
                document.body.appendChild(searchModal);
                
                const searchInput = searchModal.querySelector('.search-input');
                searchInput.focus();
                
                searchModal.querySelector('.close-search').addEventListener('click', () => {
                    document.body.removeChild(searchModal);
                });
                
                searchModal.querySelector('.search-btn').addEventListener('click', () => {
                    const query = searchInput.value.trim();
                    if (query) {
                        showNotification(`Searching for: ${query}`, 'info');
                        document.body.removeChild(searchModal);
                    }
                });
            });
        }
    }
    
    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            info: '#2196F3'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${colors[type]};
            color: white;
            border-radius: 5px;
            z-index: 1001;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Utility Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Scroll to Top Button
    function initScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: green;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.style.display = 'block';
            } else {
                scrollBtn.style.display = 'none';
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Product Image Hover Effects
    function initProductHoverEffects() {
        const productImages = document.querySelectorAll('.img1 img, .circle');
        
        productImages.forEach(img => {
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Initialize all functions
    initMobileMenu();
    initImageSlider();
    initShoppingCart();
    initNewsletter();
    initProductRatings();
    initSmoothScrolling();
    initSearch();
    initScrollToTop();
    initProductHoverEffects();
    
    // Global notification for successful initialization
    setTimeout(() => {
        showNotification('Zay eCommerce features loaded successfully!', 'success');
    }, 1000);
    
    console.log('Zay eCommerce JavaScript initialized successfully!');
});

// Additional CSS for responsive design
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @media (max-width: 768px) {
        .mad {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .mad.mobile-active {
            height: auto;
        }
        
        .mobile-menu-btn {
            position: absolute;
            right: 20px;
            top: 20px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }
        
        .reviews {
            flex-direction: column;
            align-items: center;
        }
        
        .img {
            flex-direction: column;
            align-items: center;
        }
        
        .slider img {
            width: 95vw;
            height: auto;
        }
    }
    
    .notification {
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }
    
    .cart-item button {
        background: #f44336;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
    }
    
    .checkout-btn {
        width: 100%;
        padding: 15px;
        background: green;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        margin-top: 15px;
    }
    
    .search-input {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
        width: 300px;
    }
    
    .search-btn {
        padding: 10px 20px;
        background: green;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    
    .close-search {
        position: absolute;
        top: -10px;
        right: -10px;
        background: #f44336;
        color: white;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
`;

document.head.appendChild(additionalStyles);