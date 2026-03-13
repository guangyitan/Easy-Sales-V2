// Common functions and data shared across all pages

// Product data
const products = [
    
    // Roof
    { id: 17, name: 'Genting Konkrit Contour', price: 45.99, category: 'roof', image: 'images/roof/genting-konkrit-contour.png', description: 'High-quality Genting concrete contour for roofing', variations: ['Standard', 'Premium', 'Quick Set'] },
    { id: 18, name: 'Perabung Saga Ridge Tiles', price: 89.99, category: 'roof', image: 'images/roof/perabung-saga-ridge-tiles.png', description: 'Durable ridge tiles for roofing', variations: ['Red', 'Brown', 'Gray'] },
    { id: 19, name: 'Sudut Hip Starter', price: 125.99, category: 'roof', image: 'images/roof/sudut-hip-starter.png', description: 'Hip starter components for roofing system', variations: ['Basic', 'Deluxe', 'Premium'] },
    
    // Precast Drain
    { id: 20, name: 'U-Drain 300x300mm', price: 35.99, category: 'precast-drain', image: 'images/precast-drain/u-drain-300x300mm.png', description: 'U-channel drainage system without DWf', variations: ['300mm', '450mm', '600mm'] },
    { id: 21, name: 'UDrain 375x375mm', price: 42.99, category: 'precast-drain', image: 'images/precast-drain/u-drain-375x375mm.png', description: 'U-channel drainage with outlet', variations: ['375mm', '450mm', '600mm'] },
    
    // Pipe Culvert
    { id: 22, name: 'Permentong 3x3', price: 89.99, category: 'pipe-culvert', image: 'images/pipe-culvert/permentong-3x3.png', description: 'Permentong class B concrete pipes', variations: ['3m', '6m', '9m'] },
    { id: 23, name: 'Penutup Permentong 3x3', price: 95.99, category: 'pipe-culvert', image: 'images/pipe-culvert/penutup-permentong-3x3.png', description: 'Penutup class B concrete pipes', variations: ['3m', '6m', '9m'] },
    
    // Precast Post
    { id: 24, name: 'Tiang Pagar Simen 3x3', price: 75.99, category: 'precast-post', image: 'images/precast-post/tiang-pagar-simen-3x3.png', description: 'Reinforced concrete posts for fencing', variations: ['3m', '4m', '5m'] },
    { id: 25, name: 'Tiang Pagar Simen 4x4', price: 125.99, category: 'precast-post', image: 'images/precast-post/tiang-pagar-simen-4x4.png', description: 'Heavy-duty concrete posts for security', variations: ['4m', '5m', '6m'] },
    
    
];

// Global variables
let cart = [];
let customerData = {};
let currentOrderType = '';
let currentCategory = 'all';

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

// Cart management functions
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        if (cartItems) {
            cartItems.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-cart-x" style="font-size: 3rem; color: #ccc;"></i>
                    <h5 class="mt-3 text-muted">Your cart is empty</h5>
                    <p class="text-muted">Add some items to get started!</p>
                    <button class="btn btn-primary mt-3" onclick="navigateToPage('products.html')">
                        <i class="bi bi-shop me-2"></i>Continue Shopping
                    </button>
                </div>
            `;
        }
        if (cartCount) cartCount.textContent = '0';
        if (cartTotal) cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    let html = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item mb-3 pb-3 border-bottom">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                    </div>
                    <div class="col-md-4">
                        <h6 class="mb-1">${item.name}</h6>
                        <small class="text-muted">${item.variation || 'Standard'}</small>
                        <div class="text-primary">RM ${item.price.toFixed(2)} each</div>
                    </div>
                    <div class="col-md-3">
                        <div class="d-flex align-items-center">
                            <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, '${item.variation || 'Standard'}', -1)">
                                <i class="bi bi-dash"></i>
                            </button>
                            <span class="mx-2">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, '${item.variation || 'Standard'}', 1)">
                                <i class="bi bi-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-2 text-end">
                        <strong>RM ${itemTotal.toFixed(2)}</strong>
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
    if (cartCount) cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartTotal) cartTotal.textContent = total.toFixed(2);
}

function updateQuantity(productId, variation, change) {
    const item = cart.find(item => item.id === productId && item.variation === variation);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId, variation);
        } else {
            saveCartToStorage();
            updateCartDisplay();
        }
    }
}

function removeFromCart(productId, variation) {
    cart = cart.filter(item => !(item.id === productId && item.variation === variation));
    saveCartToStorage();
    updateCartDisplay();
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

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromStorage();
});
