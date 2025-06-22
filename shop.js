// Shop Page JavaScript Functionality

// Product data structure
const products = [
    {
        id: 1,
        name: "Oupidatat non",
        price: 250.00,
        image: "shop_01.jpg",
        sizes: ["M", "L", "X", "XL"],
        rating: 3,
        category: "men",
        featured: true
    },
    {
        id: 2,
        name: "Oupidatat non",
        price: 250.00,
        image: "shop_02.jpg",
        sizes: ["M", "L", "X", "XL"],
        rating: 3,
        category: "women",
        featured: true
    },
    {
        id: 3,
        name: "Oupidatat non",
        price: 250.00,
        image: "shop_03.jpg",
        sizes: ["M", "L", "X", "XL"],
        rating: 3,
        category: "men",
        featured: false
    }
    // Add more products as needed
];

// Shopping cart
let cart = [];

// DOM elements
const searchInput = document.querySelector('.fa-magnifying-glass');
const cartIcon = document.querySelector('.fa-cart-arrow-down');
const userIcon = document.querySelector('.fa-user');
const categoryDropdowns = document.querySelectorAll('.Gender, .Gender1, .Gender2');
const featuredButton = document.querySelector('button[style*="Featured"]');
const productGrid = document.querySelector('.image, .image1, .research');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeShop();
    setupEventListeners();
    displayProducts(products);
    updateCartCount();
});

// Initialize shop functionality
function initializeShop() {
    // Create search modal
    createSearchModal();
    
    // Create cart sidebar
    createCartSidebar();
    
    // Create mobile menu
    createMobileMenu();
    
    // Setup category filters
    setupCategoryFilters();
}

// Create search modal
function createSearchModal() {
    const searchModal = document.createElement('div');
    searchModal.className = 'search-modal';
    searchModal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 1000;
        justify-content: center;
        align-items: center;
    `;
    
    searchModal.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 10px; width: 90%; max-width: 500px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2>Search Products</h2>
                <span class="close-search" style="cursor: pointer; font-size: 1.5rem;">&times;</span>
            </div>
            <input type="text" id="searchInput" placeholder="Search for products..." 
                   style="width: 100%; padding: 1rem; border: 1px solid #ddd; border-radius: 5px; margin-bottom: 1rem;">
            <div id="searchResults"></div>
        </div>
    `;
    
    document.body.appendChild(searchModal);
    
    // Search functionality
    const searchInputField = searchModal.querySelector('#searchInput');
    const searchResults = searchModal.querySelector('#searchResults');
    
    searchInputField.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        if (query.length > 0) {
            const filtered = products.filter(product => 
                product.name.toLowerCase().includes(query)
            );
            displaySearchResults(filtered, searchResults);
        } else {
            searchResults.innerHTML = '';
        }
    });
    
    // Close search modal
    searchModal.querySelector('.close-search').addEventListener('click', function() {
        searchModal.style.display = 'none';
    });
    
    searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            searchModal.style.display = 'none';
        }
    });
}

// Create cart sidebar
function createCartSidebar() {
    const cartSidebar = document.createElement('div');
    cartSidebar.className = 'cart-sidebar';
    cartSidebar.style.cssText = `
        position: fixed;
        top: 0;
        right: -400px;
        width: 400px;
        height: 100%;
        background: white;
        box-shadow: -2px 0 10px rgba(0,0,0,0.1);
        z-index: 1000;
        transition: right 0.3s ease;
        padding: 2rem;
        overflow-y: auto;
    `;
    
    cartSidebar.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <h2>Shopping Cart</h2>
            <span class="close-cart" style="cursor: pointer; font-size: 1.5rem;">&times;</span>
        </div>
        <div id="cartItems"></div>
        <div id="cartTotal" style="border-top: 1px solid #ddd; padding-top: 1rem; margin-top: 1rem;">
            <strong>Total: $0.00</strong>
        </div>
        <button id="checkoutBtn" style="width: 100%; padding: 1rem; background: green; color: white; border: none; border-radius: 5px; margin-top: 1rem; cursor: pointer;">
            Checkout
        </button>
    `;
    
    document.body.appendChild(cartSidebar);
    
    // Close cart sidebar
    cartSidebar.querySelector('.close-cart').addEventListener('click', function() {
        cartSidebar.style.right = '-400px';
    });
    
    // Checkout functionality
    cartSidebar.querySelector('#checkoutBtn').addEventListener('click', function() {
        if (cart.length > 0) {
            alert('Proceeding to checkout...');
            // Implement checkout logic here
        } else {
            alert('Your cart is empty!');
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search icon click
    searchInput.addEventListener('click', function() {
        document.querySelector('.search-modal').style.display = 'flex';
    });
    
    // Cart icon click
    cartIcon.addEventListener('click', function() {
        document.querySelector('.cart-sidebar').style.right = '0';
        displayCartItems();
    });
    
    // User icon click
    userIcon.addEventListener('click', function() {
        alert('User login functionality would be implemented here');
    });
    
    // Category dropdown toggles
    categoryDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            toggleCategoryDropdown(this);
        });
    });
    
    // Featured button click
    if (featuredButton) {
        featuredButton.addEventListener('click', function() {
            toggleFeaturedFilter();
        });
    }
    
    // Newsletter subscription
    const subscribeBtn = document.querySelector('.button1 button');
    const emailInput = document.querySelector('.button1 input');
    
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', function() {
            const email = emailInput.value.trim();
            if (email && isValidEmail(email)) {
                alert('Thank you for subscribing!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Category filter setup
function setupCategoryFilters() {
    // Add filter options to dropdowns
    const genderDropdown = document.querySelector('.Gender');
    const salesDropdown = document.querySelector('.Gender1');
    const productDropdown = document.querySelector('.Gender2');
    
    // Create filter options
    addFilterOptions(genderDropdown, ['Men', 'Women', 'Unisex']);
    addFilterOptions(salesDropdown, ['On Sale', 'New Arrivals', 'Clearance']);
    addFilterOptions(productDropdown, ['Clothing', 'Shoes', 'Accessories']);
}

// Add filter options to dropdown
function addFilterOptions(dropdown, options) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'filter-options';
    optionsContainer.style.cssText = `
        display: none;
        background: white;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-top: 10px;
        padding: 10px;
    `;
    
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.textContent = option;
        optionElement.style.cssText = `
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 3px;
        `;
        
        optionElement.addEventListener('mouseover', function() {
            this.style.background = '#f0f0f0';
        });
        
        optionElement.addEventListener('mouseout', function() {
            this.style.background = 'transparent';
        });
        
        optionElement.addEventListener('click', function() {
            applyFilter(option.toLowerCase());
            optionsContainer.style.display = 'none';
        });
        
        optionsContainer.appendChild(optionElement);
    });
    
    dropdown.appendChild(optionsContainer);
}

// Toggle category dropdown
function toggleCategoryDropdown(dropdown) {
    const options = dropdown.querySelector('.filter-options');
    if (options) {
        options.style.display = options.style.display === 'none' ? 'block' : 'none';
    }
}

// Apply filter
function applyFilter(filterType) {
    // Filter logic based on filterType
    let filteredProducts = products;
    
    switch(filterType) {
        case 'men':
            filteredProducts = products.filter(p => p.category === 'men');
            break;
        case 'women':
            filteredProducts = products.filter(p => p.category === 'women');
            break;
        case 'on sale':
            filteredProducts = products.filter(p => p.onSale);
            break;
        // Add more filter cases as needed
    }
    
    displayProducts(filteredProducts);
}

// Toggle featured filter
function toggleFeaturedFilter() {
    const button = featuredButton;
    const isFeatured = button.textContent === 'Featured';
    
    if (isFeatured) {
        const featuredProducts = products.filter(p => p.featured);
        displayProducts(featuredProducts);
        button.textContent = 'Show All';
    } else {
        displayProducts(products);
        button.textContent = 'Featured';
    }
}

// Display products in grid
function displayProducts(productsToShow) {
    // This would update the existing product grid
    // For now, we'll just log the products
    console.log('Displaying products:', productsToShow);
}

// Display search results
function displaySearchResults(results, container) {
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
    }
    
    results.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.style.cssText = `
            display: flex;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
        `;
        
        resultItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; margin-right: 10px;">
            <div>
                <h4>${product.name}</h4>
                <p>$${product.price.toFixed(2)}</p>
            </div>
        `;
        
        resultItem.addEventListener('click', function() {
            addToCart(product);
            document.querySelector('.search-modal').style.display = 'none';
        });
        
        container.appendChild(resultItem);
    });
}

// Add to cart functionality
function addToCart(product, size = 'M') {
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            size: size,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification('Product added to cart!');
}

// Remove from cart
function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    updateCartCount();
    displayCartItems();
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart icon with count
    let cartBadge = document.querySelector('.cart-badge');
    if (!cartBadge) {
        cartBadge = document.createElement('span');
        cartBadge.className = 'cart-badge';
        cartBadge.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            background: red;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        cartIcon.style.position = 'relative';
        cartIcon.appendChild(cartBadge);
    }
    
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Display cart items
function displayCartItems() {
    const cartItemsContainer = document.querySelector('#cartItems');
    const cartTotal = document.querySelector('#cartTotal');
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.innerHTML = '<strong>Total: $0.00</strong>';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.style.cssText = `
            display: flex;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        `;
        
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; margin-right: 10px;">
            <div style="flex: 1;">
                <h4>${item.name}</h4>
                <p>Size: ${item.size}</p>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id}, '${item.size}')" 
                    style="background: red; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">
                Remove
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: green;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Create mobile menu
function createMobileMenu() {
    // Add mobile menu toggle for responsive design
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    // Add responsive styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        
        @media (max-width: 768px) {
            .madd {
                flex-wrap: wrap;
            }
            
            .revies {
                flex-direction: column;
            }
            
            .side-section {
                width: 100%;
                margin-bottom: 20px;
            }
            
            .image, .image1, .research {
                flex-direction: column;
                align-items: center;
            }
            
            .image img, .image1 img, .research img {
                width: 280px;
                height: 280px;
                margin-bottom: 20px;
            }
            
            .cart-sidebar {
                width: 100%;
                right: -100%;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Add product click handlers to existing products
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to existing product images
    const productImages = document.querySelectorAll('.image img, .image1 img, .research img');
    
    productImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            // Show product details or add to cart
            const product = products[index % products.length];
            if (product) {
                showProductModal(product);
            }
        });
    });
});

// Show product modal
function showProductModal(product) {
    const modal = document.createElement('div');
    modal.style.cssText = `
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
    
    modal.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 10px; max-width: 500px; width: 90%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2>${product.name}</h2>
                <span style="cursor: pointer; font-size: 1.5rem;">&times;</span>
            </div>
            <img src="${product.image}" alt="${product.name}" style="width: 100%; max-width: 300px; margin-bottom: 1rem;">
            <p><strong>Price: $${product.price.toFixed(2)}</strong></p>
            <p>Available sizes: ${product.sizes.join(', ')}</p>
            <select id="sizeSelect" style="margin: 1rem 0; padding: 0.5rem;">
                ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
            </select>
            <br>
            <button id="addToCartBtn" style="background: green; color: white; padding: 1rem 2rem; border: none; border-radius: 5px; cursor: pointer;">
                Add to Cart
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('span').addEventListener('click', function() {
        modal.remove();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Add to cart from modal
    modal.querySelector('#addToCartBtn').addEventListener('click', function() {
        const selectedSize = modal.querySelector('#sizeSelect').value;
        addToCart(product, selectedSize);
        modal.remove();
    });
}