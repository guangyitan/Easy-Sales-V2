// Product details page specific functions

// Product details page variables
let selectedVariation = null;
let selectedQuantity = 1;

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
    
    // Load variations
    const variationsContainer = document.getElementById('variationsContainer');
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

// Product details page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the product details page
    if (window.location.pathname.includes('product-details.html')) {
        loadProductDetails();
    }
});
