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
    
    orderSummaryItems.innerHTML = html;
    orderTotal.textContent = total.toFixed(2);
}

function completeOrder() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    // Store payment method
    customerData.paymentMethod = paymentMethod;
    sessionStorage.setItem('customerData', JSON.stringify(customerData));
    
    // Generate order number
    const orderNumber = 'ORD' + Date.now().toString().slice(-8);
    sessionStorage.setItem('orderNumber', orderNumber);
    
    // Show confirmation modal
    const modal = new bootstrap.Modal(document.getElementById('orderModal'));
    
    // Update modal content
    document.getElementById('orderNumber').textContent = orderNumber;
    
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

// Payment page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the payment page
    if (window.location.pathname.includes('payment.html')) {
        updateOrderSummary();
    }
});
