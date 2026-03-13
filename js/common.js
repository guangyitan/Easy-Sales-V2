// Common functions and data shared across all pages

// Product data
const products = [
    // Tools
    { id: 1, name: 'Hammer', price: 25.99, category: 'tools', image: 'https://via.placeholder.com/200x200/FF5722/white?text=Hammer', description: 'Professional claw hammer with comfortable grip', variations: ['16oz', '20oz', '24oz'] },
    { id: 2, name: 'Screwdriver Set', price: 45.99, category: 'tools', image: 'https://via.placeholder.com/200x200/2196F3/white?text=Screwdriver', description: 'Complete screwdriver set with multiple bits', variations: ['Basic Set', 'Professional Set', 'Magnetic Set'] },
    { id: 3, name: 'Wrench Set', price: 89.99, category: 'tools', image: 'https://via.placeholder.com/200x200/4CAF50/white?text=Wrench', description: 'Metric and standard wrench set', variations: ['8-19mm', '10-32mm', 'Adjustable'] },
    { id: 4, name: 'Power Drill', price: 199.99, category: 'tools', image: 'https://via.placeholder.com/200x200/FF9800/white?text=Drill', description: 'Cordless power drill with battery', variations: ['12V', '18V', '20V'] },
    
    // Materials
    { id: 5, name: 'Nails', price: 12.99, category: 'materials', image: 'https://via.placeholder.com/200x200/795548/white?text=Nails', description: 'Assorted nails for construction', variations: ['1 inch', '2 inch', '3 inch'] },
    { id: 6, name: 'Screws', price: 15.99, category: 'materials', image: 'https://via.placeholder.com/200x200/607D8B/white?text=Screws', description: 'Various screw types and sizes', variations: ['Wood Screws', 'Machine Screws', 'Deck Screws'] },
    { id: 7, name: 'Paint', price: 35.99, category: 'materials', image: 'https://via.placeholder.com/200x200/E91E63/white?text=Paint', description: 'Interior and exterior paint', variations: ['White', 'Gray', 'Blue'] },
    { id: 8, name: 'Wood Planks', price: 45.99, category: 'materials', image: 'https://via.placeholder.com/200x200/8D6E63/white?text=Wood', description: 'Pine wood planks for construction', variations: ['2x4', '2x6', '4x4'] },
    
    // Safety Equipment
    { id: 9, name: 'Safety Helmet', price: 29.99, category: 'safety', image: 'https://via.placeholder.com/200x200/F44336/white?text=Helmet', description: 'Construction safety helmet', variations: ['Standard', 'Ventilated', 'Full Brim'] },
    { id: 10, name: 'Safety Glasses', price: 19.99, category: 'safety', image: 'https://via.placeholder.com/200x200/9C27B0/white?text=Glasses', description: 'Protective safety glasses', variations: ['Clear', 'Tinted', 'Prescription'] },
    { id: 11, name: 'Gloves', price: 15.99, category: 'safety', image: 'https://via.placeholder.com/200x200/00BCD4/white?text=Gloves', description: 'Work gloves with grip', variations: ['Leather', 'Nitrile', 'Cut-Resistant'] },
    { id: 12, name: 'Safety Boots', price: 159.99, category: 'safety', image: 'https://via.placeholder.com/200x200/009688/white?text=Boots', description: 'Steel-toe safety boots with slip resistance', variations: ['Size 8', 'Size 9', 'Size 10'] },
    
    // Electronics
    { id: 13, name: 'Multimeter', price: 199.99, category: 'electronics', image: 'https://via.placeholder.com/200x200/FFC107/white?text=Multimeter', description: 'Digital multimeter with multiple functions', variations: ['Basic', 'Professional', 'Industrial'] },
    { id: 14, name: 'Oscilloscope', price: 899.99, category: 'electronics', image: 'https://via.placeholder.com/200x200/8BC34A/white?text=Oscilloscope', description: 'Digital oscilloscope for signal analysis', variations: ['2 Channel', '4 Channel', '8 Channel'] },
    { id: 15, name: 'Soldering Iron', price: 119.99, category: 'electronics', image: 'https://via.placeholder.com/200x200/FFEB3B/white?text=Soldering', description: 'Temperature controlled soldering iron', variations: ['30W', '60W', '100W'] },
    { id: 16, name: 'LED Lights Set', price: 69.99, category: 'electronics', image: 'https://via.placeholder.com/200x200/CDDC39/white?text=LED', description: 'Energy-efficient LED light strips', variations: ['Warm White', 'Cool White', 'RGB'] }
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
