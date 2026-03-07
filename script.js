// Self-Service Ordering Kiosk JavaScript

// Global variables
let cart = [];
let currentOrderType = '';
let customerData = {};
let currentCategory = 'all';

// Sample product data with variations
const products = [
    // Tools
    { id: 1, name: 'Power Drill', price: 299.99, category: 'tools', image: 'https://via.placeholder.com/200x200/4CAF50/white?text=Drill', description: 'Professional power drill with variable speed control', variations: ['Corded', 'Cordless', 'Heavy Duty'] },
    { id: 2, name: 'Hammer Set', price: 89.99, category: 'tools', image: 'https://via.placeholder.com/200x200/2196F3/white?text=Hammer', description: 'Complete hammer set for various applications', variations: ['Standard', 'Professional', 'Mini'] },
    { id: 3, name: 'Screwdriver Kit', price: 129.99, category: 'tools', image: 'https://via.placeholder.com/200x200/FF9800/white?text=Screwdriver', description: '120-piece screwdriver set with magnetic tips', variations: ['Basic Set', 'Professional Set', 'Deluxe Set'] },
    { id: 4, name: 'Wrench Set', price: 199.99, category: 'tools', image: 'https://via.placeholder.com/200x200/9C27B0/white?text=Wrench', description: 'Adjustable wrench set with different sizes', variations: ['Metric', 'Imperial', 'Combined'] },
    
    // Materials
    { id: 5, name: 'Steel Rods', price: 459.99, category: 'materials', image: 'https://via.placeholder.com/200x200/607D8B/white?text=Steel', description: 'High-quality steel rods for construction', variations: ['10mm', '20mm', '30mm'] },
    { id: 6, name: 'Aluminum Sheets', price: 329.99, category: 'materials', image: 'https://via.placeholder.com/200x200/795548/white?text=Aluminum', description: 'Lightweight aluminum sheets for fabrication', variations: ['1mm', '2mm', '3mm'] },
    { id: 7, name: 'PVC Pipes', price: 189.99, category: 'materials', image: 'https://via.placeholder.com/200x200/00BCD4/white?text=PVC', description: 'Durable PVC pipes for plumbing', variations: ['1/2"', '1"', '2"'] },
    { id: 8, name: 'Copper Wire', price: 279.99, category: 'materials', image: 'https://via.placeholder.com/200x200/FF5722/white?text=Copper', description: 'Electrical grade copper wire', variations: ['1mm', '2mm', '4mm'] },
    
    // Safety Equipment
    { id: 9, name: 'Safety Helmet', price: 79.99, category: 'safety', image: 'https://via.placeholder.com/200x200/F44336/white?text=Helmet', description: 'Industrial safety helmet with adjustable strap', variations: ['Standard', 'Ventilated', 'Full Protection'] },
    { id: 10, name: 'Safety Gloves', price: 39.99, category: 'safety', image: 'https://via.placeholder.com/200x200/E91E63/white?text=Gloves', description: 'Protective gloves for industrial use', variations: ['Small', 'Medium', 'Large'] },
    { id: 11, name: 'Safety Glasses', price: 49.99, category: 'safety', image: 'https://via.placeholder.com/200x200/3F51B5/white?text=Glasses', description: 'Anti-fog safety glasses with UV protection', variations: ['Clear', 'Tinted', 'Prescription'] },
    { id: 12, name: 'Safety Boots', price: 159.99, category: 'safety', image: 'https://via.placeholder.com/200x200/009688/white?text=Boots', description: 'Steel-toe safety boots with slip resistance', variations: ['Size 8', 'Size 9', 'Size 10'] },
    
    // Electronics
    { id: 13, name: 'Multimeter', price: 199.99, category: 'electronics', image: 'https://via.placeholder.com/200x200/FFC107/white?text=Multimeter', description: 'Digital multimeter with multiple functions', variations: ['Basic', 'Professional', 'Industrial'] },
    { id: 14, name: 'Oscilloscope', price: 899.99, category: 'electronics', image: 'https://via.placeholder.com/200x200/8BC34A/white?text=Oscilloscope', description: 'Digital oscilloscope for signal analysis', variations: ['2 Channel', '4 Channel', '8 Channel'] },
    { id: 15, name: 'Soldering Iron', price: 119.99, category: 'electronics', image: 'https://via.placeholder.com/200x200/FFEB3B/white?text=Soldering', description: 'Temperature controlled soldering iron', variations: ['30W', '60W', '100W'] },
    { id: 16, name: 'LED Lights Set', price: 69.99, category: 'electronics', image: 'https://via.placeholder.com/200x200/CDDC39/white?text=LED', description: 'Energy-efficient LED light strips', variations: ['Warm White', 'Cool White', 'RGB'] }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Load cart from sessionStorage
    loadCartFromStorage();
    
    // Page-specific initialization
    switch(currentPage) {
        case 'products':
            loadProducts();
            updateCartDisplay();
            // Update cart total specifically for products page
            updateProductsPageCartTotal();
            break;
        case 'product-details':
            loadProductDetails();
            break;
        case 'cart':
            updateCartDisplay();
            break;
        case 'login':
            setupLoginPage();
            break;
        case 'payment':
            updateOrderSummary();
            break;
    }
});

// Page navigation functions
function navigateToPage(page) {
    window.location.href = page;
}

function navigateToProducts(orderType) {
    if (orderType) {
        sessionStorage.setItem('orderType', orderType);
    }
    navigateToPage('products.html');
}

function showProductDetails(productId) {
    sessionStorage.setItem('selectedProductId', productId);
    navigateToPage('product-details.html');
}

function showCart() {
    navigateToPage('cart.html');
}

function navigateToLogin() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    navigateToPage('login.html');
}

function goBackToCart() {
    navigateToPage('cart.html');
}

function navigateToPayment() {
    navigateToPage('payment.html');
}

function goBackToProducts() {
    navigateToPage('products.html');
}

function resetToHome() {
    // Clear all session data
    sessionStorage.clear();
    cart = [];
    customerData = {};
    navigateToPage('home.html');
}

// Product management functions
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 col-xl-3';
    
    col.innerHTML = `
        <div class="product-card" onclick="showProductDetails(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <h5 class="product-name">${product.name}</h5>
                <div class="product-price">RM ${product.price.toFixed(2)}</div>
                <div class="text-muted small">Click to view details</div>
            </div>
        </div>
    `;
    
    return col;
}

function filterProducts(category) {
    currentCategory = category;
    
    // Update active category button
    document.querySelectorAll('.category-sidebar .list-group-item').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadProducts();
}

// Product details page functions
function loadProductDetails() {
    const productId = parseInt(sessionStorage.getItem('selectedProductId'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        navigateToPage('products.html');
        return;
    }
    
    document.getElementById('productImage').src = product.image;
    document.getElementById('productImage').alt = product.name;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = `RM ${product.price.toFixed(2)}`;
    document.getElementById('productDescription').textContent = product.description;
    
    // Load variations
    const variationsContainer = document.getElementById('productVariations');
    variationsContainer.innerHTML = '';
    
    product.variations.forEach((variation, index) => {
        const variationBtn = document.createElement('button');
        variationBtn.className = `btn ${index === 0 ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`;
        variationBtn.textContent = variation;
        variationBtn.onclick = () => selectVariation(variation, variationBtn);
        variationsContainer.appendChild(variationBtn);
    });
    
    // Set default quantity
    document.getElementById('quantityDisplay').textContent = '1';
}

let selectedVariation = null;
let selectedQuantity = 1;

function selectVariation(variation, button) {
    selectedVariation = variation;
    
    // Update button styles
    document.querySelectorAll('.variation-options button').forEach(btn => {
        btn.className = 'btn btn-outline-primary me-2 mb-2';
    });
    button.className = 'btn btn-primary me-2 mb-2';
}

function increaseQuantity() {
    selectedQuantity++;
    document.getElementById('quantityDisplay').textContent = selectedQuantity;
}

function decreaseQuantity() {
    if (selectedQuantity > 1) {
        selectedQuantity--;
        document.getElementById('quantityDisplay').textContent = selectedQuantity;
    }
}

function addToCartFromDetails() {
    const productId = parseInt(sessionStorage.getItem('selectedProductId'));
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Use first variation if none selected
    const variation = selectedVariation || product.variations[0];
    
    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        variation: variation,
        quantity: selectedQuantity
    };
    
    // Check if item with same variation already exists
    const existingItem = cart.find(item => item.id === product.id && item.variation === variation);
    
    if (existingItem) {
        existingItem.quantity += selectedQuantity;
    } else {
        cart.push(cartItem);
    }
    
    saveCartToStorage();
    showNotification(`${product.name} (${variation}) added to cart!`, 'success');
    
    // Reset selection
    selectedQuantity = 1;
    selectedVariation = null;
    document.getElementById('quantityDisplay').textContent = '1';
}

function updateProductsPageCartTotal() {
    const cartTotalElement = document.getElementById('cartTotal');
    if (cartTotalElement) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = total.toFixed(2);
    }
}

// Cart storage functions
function saveCartToStorage() {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    const savedOrderType = sessionStorage.getItem('orderType');
    if (savedOrderType) {
        currentOrderType = savedOrderType;
    }
}

// Login page functions
function setupLoginPage() {
    // Setup email login form
    document.getElementById('emailLogin').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        requestOTP('email', email);
    });
    
    // Setup phone login form
    document.getElementById('phoneLogin').addEventListener('submit', function(e) {
        e.preventDefault();
        const phone = document.getElementById('phoneNumber').value;
        requestOTP('phone', phone);
    });
    
    // Setup OTP verification form
    document.getElementById('otpVerification').addEventListener('submit', function(e) {
        e.preventDefault();
        verifyOTP();
    });
    
    // Setup OTP input auto-focus
    setupOTPInputs();
}

let currentLoginMethod = '';
let currentLoginValue = '';

function showLoginMethod(method) {
    currentLoginMethod = method;
    
    // Hide all forms
    document.getElementById('loginMethodSelection').style.display = 'none';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'none';
    
    // Show selected form
    if (method === 'email') {
        document.getElementById('emailLoginForm').style.display = 'block';
    } else if (method === 'phone') {
        document.getElementById('phoneLoginForm').style.display = 'block';
    }
}

function showLoginMethodSelection() {
    // Hide all forms
    document.getElementById('loginMethodSelection').style.display = 'block';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'none';
}

function requestOTP(method, value) {
    currentLoginValue = value;
    
    // Simulate OTP request (in real app, this would call backend)
    showNotification(`OTP sent to your ${method}`, 'success');
    
    // Show OTP form
    document.getElementById('loginMethodSelection').style.display = 'none';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'block';
    
    // Update OTP target text
    document.getElementById('otpTarget').textContent = method === 'email' ? `email: ${value}` : `phone: ${value}`;
    
    // Clear OTP inputs
    document.querySelectorAll('.otp-digit').forEach(input => input.value = '');
    document.querySelector('.otp-digit').focus();
}

function setupOTPInputs() {
    const otpInputs = document.querySelectorAll('.otp-digit');
    
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');
            
            if (this.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', function(e) {
            // Handle backspace
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
        
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').slice(0, 6);
            const digits = pastedData.replace(/[^0-9]/g, '');
            
            digits.split('').forEach((digit, i) => {
                if (i < otpInputs.length) {
                    otpInputs[i].value = digit;
                }
            });
            
            // Focus on the next empty input or the last one
            const nextEmpty = Array.from(otpInputs).findIndex(input => !input.value);
            if (nextEmpty !== -1) {
                otpInputs[nextEmpty].focus();
            } else {
                otpInputs[otpInputs.length - 1].focus();
            }
        });
    });
}

function verifyOTP() {
    const otpInputs = document.querySelectorAll('.otp-digit');
    const otpCode = Array.from(otpInputs).map(input => input.value).join('');
    
    if (otpCode.length !== 6) {
        showNotification('Please enter all 6 digits', 'warning');
        return;
    }
    
    // Simulate OTP verification (in real app, this would verify with backend)
    if (otpCode === '123456') { // Demo OTP
        showNotification('OTP verified successfully!', 'success');
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('loginMethod', currentLoginMethod);
        sessionStorage.setItem('loginValue', currentLoginValue);
        
        // Navigate to customer info page
        setTimeout(() => {
            navigateToPage('customer-info.html');
        }, 1000);
    } else {
        showNotification('Invalid OTP. Please try again.', 'danger');
        // Clear OTP inputs
        otpInputs.forEach(input => input.value = '');
        document.querySelector('.otp-digit').focus();
    }
}

function resendOTP() {
    if (currentLoginValue) {
        showNotification('OTP resent successfully!', 'info');
        // Clear OTP inputs and focus first one
        document.querySelectorAll('.otp-digit').forEach(input => input.value = '');
        document.querySelector('.otp-digit').focus();
    }
}

// Customer form setup
function setupCustomerForm() {
    const orderType = sessionStorage.getItem('orderType') || 'Pickup';
    document.getElementById('orderType').value = orderType.charAt(0).toUpperCase() + orderType.slice(1);
    
    // Pre-fill login information if logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const loginMethod = sessionStorage.getItem('loginMethod');
    const loginValue = sessionStorage.getItem('loginValue');
    
    if (isLoggedIn && loginMethod && loginValue) {
        if (loginMethod === 'email') {
            document.getElementById('customerEmail').value = loginValue;
        } else if (loginMethod === 'phone') {
            document.getElementById('customerPhone').value = loginValue;
        }
    }
    
    document.getElementById('customerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        customerData = {
            name: document.getElementById('customerName').value,
            phone: document.getElementById('customerPhone').value,
            email: document.getElementById('customerEmail').value,
            address: document.getElementById('customerAddress').value,
            deliveryAddress: document.getElementById('deliveryAddress').value,
            orderType: sessionStorage.getItem('orderType')
        };
        
        sessionStorage.setItem('customerData', JSON.stringify(customerData));
        navigateToPayment();
    });
}
// Cart management functions
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        if (cartItems) {
            cartItems.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-cart-x" style="font-size: 3rem; color: #6c757d;"></i>
                    <h4 class="mt-3">Your cart is empty</h4>
                    <p class="text-muted">Add some products to get started!</p>
                </div>
            `;
        }
        if (cartCount) cartCount.textContent = '0';
        if (cartTotal) cartTotal.textContent = '0.00';
        return;
    }
    
    let html = '';
    let total = 0;
    let itemCount = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemCount += item.quantity;
        
        html += `
            <div class="cart-item">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <h5>${item.name}</h5>
                        <p class="text-muted mb-0">${item.variation || 'Standard'}</p>
                        <p class="text-muted mb-0">RM ${item.price.toFixed(2)} each</p>
                    </div>
                    <div class="col-md-3">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.variation || 'Standard'}', -1)">
                                <i class="bi bi-dash"></i>
                            </button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.variation || 'Standard'}', 1)">
                                <i class="bi bi-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-2 text-end">
                        <h5>RM ${itemTotal.toFixed(2)}</h5>
                    </div>
                    <div class="col-md-1 text-end">
                        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id}, '${item.variation || 'Standard'}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    if (cartItems) cartItems.innerHTML = html;
    if (cartCount) cartCount.textContent = itemCount;
    if (cartTotal) cartTotal.textContent = total.toFixed(2);
    
    // Also update products page cart total if on products page
    updateProductsPageCartTotal();
}

function removeFromCart(productId, variation) {
    cart = cart.filter(item => !(item.id === productId && item.variation === variation));
    saveCartToStorage();
    updateCartDisplay();
    showNotification('Item removed from cart', 'info');
}

function updateQuantity(productId, variation, change) {
    const item = cart.find(item => item.id === productId && item.variation === variation);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId, variation);
    } else {
        saveCartToStorage();
        updateCartDisplay();
    }
}

function updateOrderSummary() {
    const orderSummaryItems = document.getElementById('orderSummaryItems');
    const orderTotal = document.getElementById('orderTotal');
    
    if (!orderSummaryItems || !orderTotal) return;
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="d-flex justify-content-between mb-2">
                <span>${item.name} (${item.variation || 'Standard'}) x${item.quantity}</span>
                <span>RM ${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });
    
    orderSummaryItems.innerHTML = html;
    orderTotal.textContent = total.toFixed(2);
}

// Order completion
function completeOrder() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    // Load customer data from sessionStorage
    const savedCustomerData = sessionStorage.getItem('customerData');
    if (savedCustomerData) {
        customerData = JSON.parse(savedCustomerData);
    }
    
    // Generate order number
    const orderNumber = 'ORD' + Date.now().toString().slice(-8);
    
    // Show order confirmation modal
    document.getElementById('orderNumber').textContent = orderNumber;
    const modal = new bootstrap.Modal(document.getElementById('orderModal'));
    modal.show();
    
    // Log order data (in real app, this would be sent to backend)
    console.log('Order completed:', {
        orderNumber,
        customerData,
        cart,
        paymentMethod,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    });
}

function printOrder() {
    // Load customer data from sessionStorage
    const savedCustomerData = sessionStorage.getItem('customerData');
    if (savedCustomerData) {
        customerData = JSON.parse(savedCustomerData);
    }
    
    // Create print content
    const orderNumber = document.getElementById('orderNumber').textContent;
    let printContent = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h2 style="text-align: center;">Sales Order</h2>
            <p style="text-align: center;">Order Number: ${orderNumber}</p>
            <hr>
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${customerData.name || 'N/A'}</p>
            <p><strong>Phone:</strong> ${customerData.phone || 'N/A'}</p>
            <p><strong>Email:</strong> ${customerData.email || 'N/A'}</p>
            <p><strong>Order Type:</strong> ${customerData.orderType || 'N/A'}</p>
            ${customerData.address ? `<p><strong>Address:</strong> ${customerData.address}</p>` : ''}
            ${customerData.deliveryAddress ? `<p><strong>Delivery Address:</strong> ${customerData.deliveryAddress}</p>` : ''}
            <hr>
            <h3>Order Items</h3>
    `;
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        printContent += `
            <p>${item.name} (${item.variation || 'Standard'}) x${item.quantity} - RM ${itemTotal.toFixed(2)}</p>
        `;
    });
    
    printContent += `
            <hr>
            <h3>Total: RM ${total.toFixed(2)}</h3>
            <p style="text-align: center; margin-top: 30px;">Please proceed to counter for payment.</p>
        </div>
    `;
    
    // Open print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}

function resetToHome() {
    // Clear cart and data
    cart = [];
    customerData = {};
    currentOrderType = '';
    currentCategory = 'all';
    
    // Reset form
    document.getElementById('customerForm').reset();
    
    // Update displays
    updateCartDisplay();
    loadProducts();
    
    // Close modal and go to home
    const modal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
    modal.hide();
    showPage('homePage');
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to go back
    if (e.key === 'Escape') {
        const currentPage = document.querySelector('.page.active').id;
        
        switch(currentPage) {
            case 'productsPage':
                showPage('homePage');
                break;
            case 'cartPage':
                showPage('productsPage');
                break;
            case 'customerPage':
                showCart();
                break;
            case 'paymentPage':
                navigateToCustomerInfo();
                break;
        }
    }
});

// Touch gesture support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 100;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) < swipeThreshold) return;
    
    const currentPage = document.querySelector('.page.active').id;
    
    // Swipe left (next page)
    if (diff > 0) {
        switch(currentPage) {
            case 'homePage':
                // Can't go forward from home without selection
                break;
            case 'productsPage':
                if (cart.length > 0) showCart();
                break;
            case 'cartPage':
                navigateToCustomerInfo();
                break;
            case 'customerPage':
                navigateToPayment();
                break;
        }
    }
    // Swipe right (previous page)
    else {
        switch(currentPage) {
            case 'productsPage':
                showPage('homePage');
                break;
            case 'cartPage':
                showPage('productsPage');
                break;
            case 'customerPage':
                showCart();
                break;
            case 'paymentPage':
                navigateToCustomerInfo();
                break;
        }
    }
}
