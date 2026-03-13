// Cart page specific functions

// Cart page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the cart page
    if (window.location.pathname.includes('cart.html')) {
        updateCartDisplay();
    }
});
