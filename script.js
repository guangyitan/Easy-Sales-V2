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
        case 'customer-info':
            setupCustomerForm();
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

function navigateToCustomerInfo() {
    // Check if this is a PO order
    const isPOOrder = sessionStorage.getItem('isPOOrder');
    
    if (isPOOrder && isPOOrder === 'true') {
        // For PO orders, redirect to branch selection page
        navigateToPage('branch.html');
    } else {
        // For regular orders, go to customer info page
        navigateToPage('customer-info.html');
    }
}

function navigateToPayment() {
    navigateToPage('payment.html');
}

function goBackToProducts() {
    navigateToPage('products.html');
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
    
    // Navigate back to products page
    setTimeout(() => {
        navigateToPage('products.html');
    }, 1000);
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
        requestOTP('email', email, false); // false = not signup
    });
    
    // Setup phone login form
    document.getElementById('phoneLogin').addEventListener('submit', function(e) {
        e.preventDefault();
        const phone = document.getElementById('phoneNumber').value;
        requestOTP('phone', phone, false); // false = not signup
    });
    
    // Setup email signup form
    document.getElementById('emailSignup').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('signupEmail').value;
        requestOTP('email', email, true); // true = signup
    });
    
    // Setup phone signup form
    document.getElementById('phoneSignup').addEventListener('submit', function(e) {
        e.preventDefault();
        const phone = document.getElementById('signupPhone').value;
        requestOTP('phone', phone, true); // true = signup
    });
    
    // Setup name and IC form
    document.getElementById('nameICForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleNameICSubmission();
    });
    
    // Setup secondary contact form
    document.getElementById('secondaryContactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        requestSecondaryOTP();
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
let isSignupFlow = false;
let signupStep = 0; // 0: initial, 1: name/IC, 2: secondary contact, 3: complete
let primaryContactVerified = false;
let signupData = {};

function showLoginMethod(method) {
    currentLoginMethod = method;
    isSignupFlow = false;
    
    // Hide all forms
    document.getElementById('loginMethodSelection').style.display = 'none';
    document.getElementById('signupMethodSelection').style.display = 'none';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('emailSignupForm').style.display = 'none';
    document.getElementById('phoneSignupForm').style.display = 'none';
    document.getElementById('signupBasicInfoForm').style.display = 'none';
    document.getElementById('secondaryContactForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'none';
    
    // Show selected form
    if (method === 'email') {
        document.getElementById('emailLoginForm').style.display = 'block';
    } else if (method === 'phone') {
        document.getElementById('phoneLoginForm').style.display = 'block';
    }
}

function showSignupMethodSelection() {
    // Hide all forms
    document.getElementById('loginMethodSelection').style.display = 'none';
    document.getElementById('signupMethodSelection').style.display = 'block';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('emailSignupForm').style.display = 'none';
    document.getElementById('phoneSignupForm').style.display = 'none';
    document.getElementById('signupBasicInfoForm').style.display = 'none';
    document.getElementById('secondaryContactForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'none';
}

function showSignupMethod(method) {
    currentLoginMethod = method;
    isSignupFlow = true;
    signupStep = 0;
    primaryContactVerified = false;
    signupData = {};
    
    // Hide all forms
    document.getElementById('loginMethodSelection').style.display = 'none';
    document.getElementById('signupMethodSelection').style.display = 'none';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('emailSignupForm').style.display = 'none';
    document.getElementById('phoneSignupForm').style.display = 'none';
    document.getElementById('signupBasicInfoForm').style.display = 'none';
    document.getElementById('secondaryContactForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'none';
    
    // Show selected form
    if (method === 'email') {
        document.getElementById('emailSignupForm').style.display = 'block';
    } else if (method === 'phone') {
        document.getElementById('phoneSignupForm').style.display = 'block';
    }
}

function showLoginMethodSelection() {
    // Hide all forms
    document.getElementById('loginMethodSelection').style.display = 'block';
    document.getElementById('signupMethodSelection').style.display = 'none';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('emailSignupForm').style.display = 'none';
    document.getElementById('phoneSignupForm').style.display = 'none';
    document.getElementById('signupBasicInfoForm').style.display = 'none';
    document.getElementById('secondaryContactForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'none';
}

function requestOTP(method, value, isSignup) {
    currentLoginValue = value;
    isSignupFlow = isSignup;
    
    // Simulate OTP request (in real app, this would call backend)
    const action = isSignup ? 'Sign up' : 'Login';
    showNotification(`${action} OTP sent to your ${method}`, 'success');
    
    if (isSignup) {
        // For signup, show OTP form directly for initial contact verification
        showOTPForm(method, value);
    } else {
        // For login, show OTP form directly
        showOTPForm(method, value);
    }
}

function showOTPForm(method, value) {
    // Hide all forms
    document.getElementById('loginMethodSelection').style.display = 'none';
    document.getElementById('signupMethodSelection').style.display = 'none';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('emailSignupForm').style.display = 'none';
    document.getElementById('phoneSignupForm').style.display = 'none';
    document.getElementById('signupBasicInfoForm').style.display = 'none';
    document.getElementById('secondaryContactForm').style.display = 'none';
    
    // Show OTP form
    document.getElementById('otpForm').style.display = 'block';
    
    // Update OTP target text
    document.getElementById('otpTarget').textContent = method === 'email' ? `email: ${value}` : `phone: ${value}`;
    
    // Clear OTP inputs
    document.querySelectorAll('.otp-digit').forEach(input => input.value = '');
    document.querySelector('.otp-digit').focus();
}

function showNameICForm() {
    // Hide all forms
    document.getElementById('loginMethodSelection').style.display = 'none';
    document.getElementById('signupMethodSelection').style.display = 'none';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('emailSignupForm').style.display = 'none';
    document.getElementById('phoneSignupForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'none';
    document.getElementById('secondaryContactForm').style.display = 'none';
    
    // Show name/IC form
    document.getElementById('signupBasicInfoForm').style.display = 'block';
    
    // Pre-fill verified contact info
    document.getElementById('verifiedContactInfo').value = currentLoginMethod === 'email' ? 
        `Email: ${currentLoginValue}` : `Phone: ${currentLoginValue}`;
}

function handleNameICSubmission() {
    const fullName = document.getElementById('signupFullName').value;
    const icNumber = document.getElementById('signupICNumber').value;
    
    // Store signup data with consistent keys
    signupData.name = fullName;
    signupData.icNumber = icNumber;
    
    // Store primary contact with consistent keys
    if (currentLoginMethod === 'email') {
        signupData.email = currentLoginValue;
    } else if (currentLoginMethod === 'phone') {
        signupData.phone = currentLoginValue;
    }
    
    // Debug: Check data after name/IC submission
    console.log('After name/IC submission:', signupData);
    
    // Show secondary contact form
    showSecondaryContactForm();
}

function showSecondaryContactForm() {
    // Hide all forms
    document.getElementById('loginMethodSelection').style.display = 'none';
    document.getElementById('signupMethodSelection').style.display = 'none';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('emailSignupForm').style.display = 'none';
    document.getElementById('phoneSignupForm').style.display = 'none';
    document.getElementById('signupBasicInfoForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'none';
    
    // Show secondary contact form
    document.getElementById('secondaryContactForm').style.display = 'block';
    
    // Set up secondary contact prompt and label
    if (currentLoginMethod === 'email') {
        document.getElementById('secondaryContactPrompt').textContent = 'Please provide your phone number';
        document.getElementById('secondaryContactLabel').textContent = 'Phone Number';
        document.getElementById('secondaryContact').placeholder = '+60 12-3456789';
        document.getElementById('secondaryContact').type = 'tel';
    } else {
        document.getElementById('secondaryContactPrompt').textContent = 'Please provide your email address';
        document.getElementById('secondaryContactLabel').textContent = 'Email Address';
        document.getElementById('secondaryContact').placeholder = 'Enter your email address';
        document.getElementById('secondaryContact').type = 'email';
    }
}

function goBackToNameIC() {
    showNameICForm();
}

function requestSecondaryOTP() {
    const secondaryContact = document.getElementById('secondaryContact').value;
    const secondaryMethod = currentLoginMethod === 'email' ? 'phone' : 'email';
    
    // Store secondary contact with consistent keys
    if (secondaryMethod === 'email') {
        signupData.email = secondaryContact;
    } else if (secondaryMethod === 'phone') {
        signupData.phone = secondaryContact;
    }
    
    // Debug: Check data after secondary contact
    console.log('After secondary contact:', signupData);
    
    // Request OTP for secondary contact
    showNotification(`OTP sent to your ${secondaryMethod}`, 'success');
    showOTPForm(secondaryMethod, secondaryContact);
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

function handleSignupBasicInfo() {
    const fullName = document.getElementById('signupFullName').value;
    const icNumber = document.getElementById('signupICNumber').value;
    
    // Store signup data
    sessionStorage.setItem('signupData', JSON.stringify({
        name: fullName,
        icNumber: icNumber,
        [currentLoginMethod]: currentLoginValue
    }));
    
    // Show OTP form for verification
    showOTPForm(currentLoginMethod, currentLoginValue);
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
        if (isSignupFlow) {
            if (!primaryContactVerified) {
                // First OTP verification - primary contact verified
                primaryContactVerified = true;
                showNotification('Primary contact verified! Please provide your basic information.', 'success');
                setTimeout(() => {
                    showNameICForm();
                }, 1000);
            } else {
                // Second OTP verification - secondary contact verified, signup complete
                showNotification('Sign up successful!', 'success');
                
                // Debug: Check signup data before storing
                console.log('Storing signup data:', signupData);
                
                // Store complete signup data
                sessionStorage.setItem('signupData', JSON.stringify(signupData));
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('loginMethod', currentLoginMethod);
                sessionStorage.setItem('loginValue', currentLoginValue);
                sessionStorage.removeItem('isGuest'); // Clear guest flag
                
                // Debug: Verify it was stored
                console.log('Stored signupData:', sessionStorage.getItem('signupData'));
                
                // Navigate to customer info page
                setTimeout(() => {
                    navigateToPage('customer-info.html');
                }, 1000);
            }
        } else {
            // Login flow
            showNotification('Login successful!', 'success');
            
            // Store login data
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('loginMethod', currentLoginMethod);
            sessionStorage.setItem('loginValue', currentLoginValue);
            sessionStorage.removeItem('isGuest'); // Clear guest flag
            
            // Navigate to customer info page
            setTimeout(() => {
                navigateToPage('customer-info.html');
            }, 1000);
        }
    } else {
        showNotification('Invalid OTP. Please try again.', 'danger');
        // Clear OTP inputs
        otpInputs.forEach(input => input.value = '');
        document.querySelector('.otp-digit').focus();
    }
}

function proceedAsGuest() {
    // Set guest mode
    sessionStorage.setItem('isGuest', 'true');
    sessionStorage.setItem('isLoggedIn', 'false');
    
    showNotification('Continuing as guest', 'info');
    
    // Navigate directly to customer info page
    setTimeout(() => {
        navigateToPage('customer-info.html');
    }, 1000);
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
    
    // Debug: Check what's in sessionStorage
    console.log('SessionStorage Debug:');
    console.log('isLoggedIn:', sessionStorage.getItem('isLoggedIn'));
    console.log('isGuest:', sessionStorage.getItem('isGuest'));
    console.log('loginMethod:', sessionStorage.getItem('loginMethod'));
    console.log('loginValue:', sessionStorage.getItem('loginValue'));
    console.log('signupData:', sessionStorage.getItem('signupData'));
    
    // Check user status
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const isGuest = sessionStorage.getItem('isGuest') === 'true';
    const loginMethod = sessionStorage.getItem('loginMethod');
    const loginValue = sessionStorage.getItem('loginValue');
    const signupData = sessionStorage.getItem('signupData');
    
    // Update user status display
    const userStatusElement = document.getElementById('userStatus');
    const userStatusText = document.getElementById('userStatusText');
    const existingCustomerInfo = document.getElementById('existingCustomerInfo');
    const editCustomerInfo = document.getElementById('editCustomerInfo');
    
    if (isGuest) {
        userStatusElement.className = 'alert alert-warning mb-4';
        userStatusText.textContent = 'You are continuing as Guest';
        existingCustomerInfo.style.display = 'none';
        editCustomerInfo.style.display = 'block';
    } else if (isLoggedIn && signupData) {
        const data = JSON.parse(signupData);
        console.log('Parsed signup data:', data); // Debug log
        
        userStatusElement.className = 'alert alert-success mb-4';
        userStatusText.textContent = `Welcome back! Logged in via ${loginMethod}`;
        
        // Show the edit form for all users (including signed up users)
        existingCustomerInfo.style.display = 'none';
        editCustomerInfo.style.display = 'block';
        
        // Pre-fill form fields with signup data
        document.getElementById('customerName').value = data.name || '';
        document.getElementById('customerPhone').value = data.phone || '';
        document.getElementById('customerEmail').value = data.email || '';
        document.getElementById('customerAddress').value = '';
        document.getElementById('deliveryAddress').value = '';
        
    } else if (isLoggedIn) {
        userStatusElement.className = 'alert alert-success mb-4';
        userStatusText.textContent = `Logged in via ${loginMethod}`;
        existingCustomerInfo.style.display = 'none';
        editCustomerInfo.style.display = 'block';
        
        // Pre-fill login information
        if (loginMethod === 'email') {
            document.getElementById('customerEmail').value = loginValue;
        } else if (loginMethod === 'phone') {
            document.getElementById('customerPhone').value = loginValue;
        }
    } else {
        userStatusElement.className = 'alert alert-info mb-4';
        userStatusText.textContent = 'Please provide your information';
        existingCustomerInfo.style.display = 'none';
        editCustomerInfo.style.display = 'block';
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
        
        // For guest flow, go directly to SO number display
        if (isGuest) {
            showOrderConfirmation();
        } else {
            navigateToPayment();
        }
    });
}

function addNewAddress() {
    const address = prompt('Enter new address:');
    if (address) {
        const addressList = document.getElementById('addressList');
        const addressDiv = document.createElement('div');
        addressDiv.className = 'form-check mb-2';
        addressDiv.innerHTML = `
            <input class="form-check-input" type="radio" name="address" id="address${Date.now()}" value="${address}">
            <label class="form-check-label" for="address${Date.now()}">
                ${address}
            </label>
        `;
        addressList.appendChild(addressDiv);
    }
}

function skipAddress() {
    document.getElementById('customerAddress').value = '';
    document.getElementById('deliveryAddress').value = '';
    showNotification('Address skipped', 'info');
}

function showOrderConfirmation() {
    // Generate SO number
    const soNumber = 'SO' + Date.now().toString().slice(-8);
    
    // Create confirmation modal
    const modalHtml = `
        <div class="modal fade" id="orderConfirmationModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Order Confirmation</h5>
                    </div>
                    <div class="modal-body text-center">
                        <i class="bi bi-check-circle text-success" style="font-size: 3rem;"></i>
                        <h4 class="mt-3">Order Placed Successfully!</h4>
                        <p class="lead">Your SO Number: <strong>${soNumber}</strong></p>
                        <p>Please proceed to the payment counter to complete your order.</p>
                        <div class="alert alert-info">
                            <i class="bi bi-info-circle me-2"></i>
                            Show this SO number at the payment counter
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="printOrder('${soNumber}')">
                            <i class="bi bi-printer me-2"></i>Print Order
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="goToHome()">
                            <i class="bi bi-house me-2"></i>Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page and show it
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('orderConfirmationModal'));
    modal.show();
    
    // Store SO number
    sessionStorage.setItem('currentSO', soNumber);
}

function goToHome() {
    // Clear cart and go to home
    sessionStorage.removeItem('cart');
    sessionStorage.removeItem('customerData');
    sessionStorage.removeItem('isGuest');
    navigateToPage('index.html');
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
    
    // Clear all session data
    sessionStorage.clear();
    
    // Close modal if it exists
    const modal = document.getElementById('orderModal');
    if (modal) {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
            modalInstance.hide();
        }
    }
    
    // Navigate to home page
    navigateToPage('index.html');
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
    // ESC key to go back - only for single page app (index.html)
    if (window.location.pathname.includes('index.html')) {
        if (e.key === 'Escape') {
            const currentPage = document.querySelector('.page.active');
            
            if (currentPage) {
                switch(currentPage.id) {
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
