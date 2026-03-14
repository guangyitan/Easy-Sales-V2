// Customer info page specific functions

// Customer form setup
function setupCustomerForm() {
    // Check if this is a PO order and display branch info
    const isPOOrder = sessionStorage.getItem('isPOOrder');
    const selectedPOBranch = sessionStorage.getItem('selectedPOBranch');
    const selectedPOCustomer = sessionStorage.getItem('selectedPOCustomer');
    
    if (isPOOrder && isPOOrder === 'true' && selectedPOBranch) {
        // Update page title for PO order
        document.querySelector('h2').textContent = 'Purchase Order Information';
        
        // Show PO branch information
        const poBranchInfo = document.getElementById('poBranchInfo');
        const selectedPOBranchDisplay = document.getElementById('selectedPOBranchDisplay');
        
        poBranchInfo.style.display = 'block';
        selectedPOBranchDisplay.textContent = selectedPOBranch;
        
        // If PO customer is selected, pre-fill the form
        if (selectedPOCustomer) {
            const customer = JSON.parse(selectedPOCustomer);
            
            // Pre-fill form fields
            document.getElementById('customerName').value = customer.name || '';
            document.getElementById('customerPhone').value = customer.phone || '';
            document.getElementById('customerEmail').value = customer.email || '';
            document.getElementById('customerAddress').value = customer.address || '';
            document.getElementById('deliveryAddress').value = '';
            
            // Make fields readonly for PO orders
            document.getElementById('customerName').readOnly = true;
            document.getElementById('customerPhone').readOnly = true;
            document.getElementById('customerEmail').readOnly = true;
            document.getElementById('customerAddress').readOnly = true;
        }
    }
    
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
        
        // For guest flow, go directly to payment page
        if (isGuest) {
            navigateToPayment();
        } else {
            showOrderConfirmation();
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
    sessionStorage.removeItem('isPOOrder');
    sessionStorage.removeItem('selectedPOBranch');
    sessionStorage.removeItem('selectedPOCustomer');
    navigateToPage('index.html');
}

// Customer info page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the customer info page
    if (window.location.pathname.includes('customer-info.html')) {
        setupCustomerForm();
    }
});
