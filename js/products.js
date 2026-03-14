// Products page specific functions

// Product management functions
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    let filteredProducts;
    
    if (currentCategory === 'all') {
        filteredProducts = products;
    } else if (currentCategory === 'pwp') {
        // Filter products that have PWP enabled
        filteredProducts = products.filter(p => p.pwp === true);
    } else {
        // Regular category filtering
        filteredProducts = products.filter(p => p.category === currentCategory);
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 col-xl-3';
    
    // Check if this product has PWP
    const hasPWP = product.pwp === true;
    
    col.innerHTML = `
        <div class="card h-100 product-card" onclick="showProductDetails(${product.id})" style="cursor: pointer;">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">
                    ${product.name}
                    ${hasPWP ? '<span class="badge bg-warning text-dark ms-2">PWP</span>' : ''}
                </h5>
                <p class="card-text text-muted">${product.description}</p>
                <div class="mt-auto">
                    <h4 class="text-primary">RM ${product.price.toFixed(2)}</h4>
                    ${hasPWP ? `<small class="text-success"><i class="bi bi-tag me-1"></i>PWP Price: RM ${product.pwpPrice.toFixed(2)}</small>` : ''}
                    <small class="text-muted d-block">Multiple variations available</small>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

function filterProducts(category) {
    currentCategory = category;
    
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadProducts();
}

function updateProductsPageCartTotal() {
    const cartTotalElement = document.getElementById('cartTotal');
    if (cartTotalElement) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = total.toFixed(2);
    }
}

// Products page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the products page
    if (window.location.pathname.includes('products.html')) {
        loadProducts();
        updateCartDisplay();
        updateProductsPageCartTotal();
    }
});
