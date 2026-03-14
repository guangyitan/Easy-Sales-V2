// Payment page specific functions

// Payment page functions
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
                <span>${item.name} (${item.variation}) x ${item.quantity}</span>
                <span>RM ${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });
    
    // Add delivery fee if delivery method is selected
    const deliveryMethod = sessionStorage.getItem('deliveryMethod');
    let deliveryFee = 0;
    
    if (deliveryMethod === 'delivery') {
        // Mock delivery fee calculation (can be made dynamic with postcode lookup later)
        deliveryFee = calculateDeliveryFee();
        
        html += `
            <div class="d-flex justify-content-between mb-2 text-success">
                <span><i class="bi bi-truck me-1"></i>Delivery Fee</span>
                <span>RM ${deliveryFee.toFixed(2)}</span>
            </div>
        `;
        
        total += deliveryFee;
    }
    
    orderSummaryItems.innerHTML = html;
    orderTotal.textContent = total.toFixed(2);
}

function completeOrder() {
    // Check if this is a PO order
    const isPOOrder = sessionStorage.getItem('isPOOrder');
    
    // For PO orders, set payment method to 'po' (internal transfer)
    // For regular orders, get selected payment method
    let paymentMethod;
    
    if (isPOOrder && isPOOrder === 'true') {
        paymentMethod = 'po'; // Internal PO transfer
    } else {
        const paymentMethodElement = document.querySelector('input[name="paymentMethod"]:checked');
        if (!paymentMethodElement) {
            showNotification('Please select a payment method', 'warning');
            return;
        }
        paymentMethod = paymentMethodElement.value;
    }
    
    // Store payment method
    customerData.paymentMethod = paymentMethod;
    sessionStorage.setItem('customerData', JSON.stringify(customerData));
    
    // Generate order number
    let orderNumber;
    let orderType;
    
    if (isPOOrder && isPOOrder === 'true') {
        orderNumber = 'PO' + Date.now().toString().slice(-8);
        orderType = 'Purchase Order';
    } else {
        orderNumber = 'ORD' + Date.now().toString().slice(-8);
        orderType = 'Sales Order';
    }
    
    sessionStorage.setItem('orderNumber', orderNumber);
    sessionStorage.setItem('orderType', orderType);
    
    // Show confirmation modal
    const modal = new bootstrap.Modal(document.getElementById('orderModal'));
    
    // Update modal content
    document.getElementById('orderNumber').textContent = orderNumber;
    
    // Update modal title and message based on order type
    const modalTitle = document.querySelector('#orderModal .modal-title');
    const modalMessage = document.querySelector('#orderModal .modal-body h5.text-center');
    const modalSubMessage = document.querySelector('#orderModal .modal-body p.text-center');
    const printButton = document.querySelector('#orderModal .modal-body button[onclick="printOrder()"]');
    
    if (isPOOrder && isPOOrder === 'true') {
        modalTitle.textContent = 'Purchase Order Confirmation';
        modalMessage.textContent = 'Purchase Order Created Successfully!';
        modalSubMessage.textContent = 'Purchase Order has been created and sent to the selected branch.';
        printButton.innerHTML = '<i class="bi bi-printer me-2"></i>Print Purchase Order';
    } else {
        modalTitle.textContent = 'Order Confirmation';
        modalMessage.textContent = 'Order Placed Successfully!';
        modalSubMessage.textContent = 'Please proceed to the counter to complete payment.';
        printButton.innerHTML = '<i class="bi bi-printer me-2"></i>Print Sales Order';
    }
    
    modal.show();
}

function printOrder() {
    const orderNumber = sessionStorage.getItem('orderNumber');
    const customerData = JSON.parse(sessionStorage.getItem('customerData') || '{}');
    
    // Create print content
    const printContent = `
        <html>
        <head>
            <title>Sales Order - ${orderNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .info { margin-bottom: 20px; }
                .items { margin-bottom: 20px; }
                .total { font-weight: bold; font-size: 18px; }
                .footer { margin-top: 30px; text-align: center; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>SALES ORDER</h1>
                <h2>${orderNumber}</h2>
                <p>${new Date().toLocaleString()}</p>
            </div>
            
            <div class="info">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> ${customerData.name || 'N/A'}</p>
                <p><strong>Phone:</strong> ${customerData.phone || 'N/A'}</p>
                <p><strong>Email:</strong> ${customerData.email || 'N/A'}</p>
                <p><strong>Order Type:</strong> ${customerData.orderType || 'N/A'}</p>
                <p><strong>Payment Method:</strong> ${customerData.paymentMethod || 'N/A'}</p>
            </div>
            
            <div class="items">
                <h3>Order Items</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Variation</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        printContent += `
            <tr>
                <td>${item.name}</td>
                <td>${item.variation || 'Standard'}</td>
                <td>${item.quantity}</td>
                <td>RM ${item.price.toFixed(2)}</td>
                <td>RM ${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });
    
    printContent += `
                    </tbody>
                </table>
            </div>
            
            <div class="total">
                <h3>Total Amount: RM ${total.toFixed(2)}</h3>
            </div>
            
            <div class="footer">
                <p>Thank you for your business!</p>
                <p>Please proceed to the payment counter.</p>
            </div>
        </body>
        </html>
    `;
    
    // Create print window
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

// Mock delivery fee calculation function
function calculateDeliveryFee() {
    // Mock delivery fee calculation based on cart total
    // In real implementation, this would look up postcode in delivery-fee-management data
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Simple mock calculation:
    // - Orders below RM 100: RM 10
    // - Orders RM 100-500: RM 15  
    // - Orders above RM 500: RM 20
    if (cartTotal < 100) {
        return 10.00;
    } else if (cartTotal < 500) {
        return 15.00;
    } else {
        return 20.00;
    }
    
    // Alternative: Fixed fee
    // return 15.00;
}

// Payment page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the payment page
    if (window.location.pathname.includes('payment.html')) {
        updateOrderSummary();
    }
});
