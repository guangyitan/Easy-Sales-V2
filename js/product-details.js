// Product details page specific functions

// Product details page variables
let selectedVariation = null;
let selectedQuantity = 1;
let selectedPricingOption = 'regular'; // 'regular' or 'pwp'

// Product details page functions
function loadProductDetails() {
    const productId = parseInt(sessionStorage.getItem('selectedProductId'));
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Update product info
    document.getElementById('productImage').src = product.image;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productPrice').textContent = `RM ${product.price.toFixed(2)}`;
    
    // Show/hide PWP indicator and options
    const pwpIndicator = document.getElementById('pwpIndicator');
    const pwpPriceSection = document.getElementById('pwpPriceSection');
    const pwpOptionSection = document.getElementById('pwpOptionSection');
    
    if (product.pwp === true) {
        pwpIndicator.style.display = 'block';
        pwpPriceSection.style.display = 'block';
        pwpOptionSection.style.display = 'block';
        
        // Update PWP price displays
        document.getElementById('pwpPrice').textContent = `RM ${product.pwpPrice.toFixed(2)}`;
        document.getElementById('regularPriceDisplay').textContent = product.price.toFixed(2);
        document.getElementById('pwpPriceDisplay').textContent = product.pwpPrice.toFixed(2);
        
        // Add event listeners for pricing options
        document.getElementById('regularPrice').addEventListener('change', () => {
            selectedPricingOption = 'regular';
        });
        document.getElementById('pwpPriceOption').addEventListener('change', () => {
            selectedPricingOption = 'pwp';
        });
    } else {
        pwpIndicator.style.display = 'none';
        pwpPriceSection.style.display = 'none';
        pwpOptionSection.style.display = 'none';
    }
    
    // Load variations
    const variationsContainer = document.getElementById('productVariations');
    variationsContainer.innerHTML = '';
    
    product.variations.forEach(variation => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary me-2 mb-2';
        button.textContent = variation;
        button.onclick = () => selectVariation(variation, button);
        variationsContainer.appendChild(button);
    });
    
    // Select first variation by default
    if (product.variations.length > 0) {
        selectVariation(product.variations[0], variationsContainer.firstChild);
    }
}

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
    
    // Determine price based on PWP selection
    let itemPrice = product.price;
    let isPWP = false;
    
    if (product.pwp === true && selectedPricingOption === 'pwp') {
        itemPrice = product.pwpPrice;
        isPWP = true;
    }
    
    const cartItem = {
        id: product.id,
        name: product.name,
        price: itemPrice,
        image: product.image,
        variation: variation,
        quantity: selectedQuantity,
        isPWP: isPWP,
        regularPrice: product.price,
        pwpPrice: product.pwpPrice
    };
    
    // Check if item with same variation and pricing option already exists
    const existingItem = cart.find(item => 
        item.id === product.id && 
        item.variation === variation && 
        item.isPWP === isPWP
    );
    
    if (existingItem) {
        existingItem.quantity += selectedQuantity;
    } else {
        cart.push(cartItem);
    }
    
    saveCartToStorage();
    
    const pricingText = isPWP ? ' (PWP Price)' : '';
    showNotification(`${product.name} (${variation})${pricingText} added to cart!`, 'success');
    
    // Reset selection
    selectedQuantity = 1;
    selectedVariation = null;
    selectedPricingOption = 'regular';
    document.getElementById('quantityDisplay').textContent = '1';
    
    // Navigate back to products page
    setTimeout(() => {
        navigateToPage('products.html');
    }, 1000);
}

// Product details page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the product details page
    if (window.location.pathname.includes('product-details.html')) {
        loadProductDetails();
    }
});
