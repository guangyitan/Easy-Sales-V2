// Sales Order page specific functions

// Sample sales order data (in real app, this would come from backend)
let salesOrders = [
    {
        id: 'SO-20240314001',
        customerName: 'Ahmad bin Ismail',
        customerPhone: '+60 12-3456789',
        customerEmail: 'ahmad@email.com',
        address: 'No. 123, Jalan Merdeka, Taman Seri Setia, 43000 Kajang',
        deliveryAddress: 'No. 123, Jalan Merdeka, Taman Seri Setia, 43000 Kajang',
        orderDate: '2024-03-14',
        orderType: 'Delivery',
        items: [
            { name: 'Genting Konkrit Contour', quantity: 2, variation: 'Standard', price: 45.99, image: 'images/roof/genting-konkrit-contour.png' },
            { name: 'U-Drain 300x300mm', quantity: 5, variation: '300mm', price: 35.99, image: 'images/precast-drain/u-drain-300x300mm.png' },
            { name: 'Sudut Hip Starter', quantity: 3, variation: 'Basic', price: 125.99, image: 'images/roof/sudut-hip-starter.png' }
        ],
        totalAmount: 651.90,
        status: 'unpaid',
        payments: []
    },
    {
        id: 'SO-20240314002',
        customerName: 'Siti Aminah binti Omar',
        customerPhone: '+60 19-8765432',
        customerEmail: 'siti@email.com',
        address: 'Lot 456, Jalan Industri 2, Kawasan Perindustrian, 47300 Puchong',
        deliveryAddress: 'Lot 456, Jalan Industri 2, Kawasan Perindustrian, 47300 Puchong',
        orderDate: '2024-03-14',
        orderType: 'Pickup',
        items: [
            { name: 'Perabung Saga Ridge Tiles', quantity: 10, variation: 'Red', price: 89.99, image: 'images/roof/perabung-saga-ridge-tiles.png' },
            { name: 'Tiang Pagar Simen 3x3', quantity: 8, variation: '3m', price: 75.99, image: 'images/precast-post/tiang-pagar-simen-3x3.png' },
            { name: 'Permentong 3x3', quantity: 4, variation: '3m', price: 89.99, image: 'images/pipe-culvert/permentong-3x3.png' },
            { name: 'UDrain 375x375mm', quantity: 6, variation: '375mm', price: 42.99, image: 'images/precast-drain/u-drain-375x375mm.png' }
        ],
        totalAmount: 2156.81,
        status: 'partial',
        payments: [
            { amount: 1000.00, method: 'Cash', date: '2024-03-14', time: '10:30 AM' }
        ]
    },
    {
        id: 'SO-20240314003',
        customerName: 'Mohamed bin Hassan',
        customerPhone: '+60 16-2345678',
        customerEmail: 'mohamed@email.com',
        address: 'No. 789, Persiaran Teknologi, Cyberjaya, 63000 Selangor',
        deliveryAddress: 'No. 789, Persiaran Teknologi, Cyberjaya, 63000 Selangor',
        orderDate: '2024-03-14',
        orderType: 'Delivery',
        items: [
            { name: 'Permentong 3x3', quantity: 3, variation: '3m', price: 89.99, image: 'images/pipe-culvert/permentong-3x3.png' },
            { name: 'Penutup Permentong 3x3', quantity: 3, variation: '3m', price: 95.99, image: 'images/pipe-culvert/penutup-permentong-3x3.png' },
            { name: 'Genting Konkrit Contour', quantity: 2, variation: 'Premium', price: 45.99, image: 'images/roof/genting-konkrit-contour.png' }
        ],
        totalAmount: 735.93,
        status: 'paid',
        payments: [
            { amount: 735.93, method: 'E-Wallet', date: '2024-03-14', time: '11:15 AM' }
        ]
    },
    {
        id: 'SO-20240314004',
        customerName: 'Fatimah binti Ali',
        customerPhone: '+60 14-9876543',
        customerEmail: 'fatimah@email.com',
        address: 'No. 321, Jalan Raya Cheras, 56000 Kuala Lumpur',
        deliveryAddress: 'No. 321, Jalan Raya Cheras, 56000 Kuala Lumpur',
        orderDate: '2024-03-14',
        orderType: 'Pickup',
        items: [
            { name: 'Sudut Hip Starter', quantity: 6, variation: 'Deluxe', price: 125.99, image: 'images/roof/sudut-hip-starter.png' },
            { name: 'UDrain 375x375mm', quantity: 4, variation: '375mm', price: 42.99, image: 'images/precast-drain/u-drain-375x375mm.png' },
            { name: 'Tiang Pagar Simen 4x4', quantity: 5, variation: '4m', price: 125.99, image: 'images/precast-post/tiang-pagar-simen-4x4.png' },
            { name: 'Perabung Saga Ridge Tiles', quantity: 8, variation: 'Gray', price: 89.99, image: 'images/roof/perabung-saga-ridge-tiles.png' }
        ],
        totalAmount: 1791.85,
        status: 'unpaid',
        payments: []
    },
    {
        id: 'SO-20240314005',
        customerName: 'Razak bin Mohamad',
        customerPhone: '+60 11-2345678',
        customerEmail: 'razak@email.com',
        address: 'No. 654, Jalan Sultan Abdul Samad, 50000 Kuala Lumpur',
        deliveryAddress: 'No. 654, Jalan Sultan Abdul Samad, 50000 Kuala Lumpur',
        orderDate: '2024-03-14',
        orderType: 'Delivery',
        items: [
            { name: 'Genting Konkrit Contour', quantity: 4, variation: 'Premium', price: 45.99, image: 'images/roof/genting-konkrit-contour.png' },
            { name: 'Tiang Pagar Simen 4x4', quantity: 6, variation: '4m', price: 125.99, image: 'images/precast-post/tiang-pagar-simen-4x4.png' },
            { name: 'U-Drain 300x300mm', quantity: 8, variation: '450mm', price: 35.99, image: 'images/precast-drain/u-drain-300x300mm.png' }
        ],
        totalAmount: 1319.82,
        status: 'paid',
        payments: [
            { amount: 1319.82, method: 'Credit Card', date: '2024-03-14', time: '09:45 AM' }
        ]
    }
];

let currentSalesOrderId = null;
let currentStatusFilter = 'all';

// Load sales orders on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the sales order page
    if (window.location.pathname.includes('sales-order.html')) {
        loadSalesOrders();
    }
});

function loadSalesOrders() {
    const container = document.getElementById('salesOrderCardsContainer');
    const emptyState = document.getElementById('emptyState');
    
    // Clear existing content
    container.innerHTML = '';
    
    // Filter orders by status
    let filteredOrders = salesOrders;
    if (currentStatusFilter !== 'all') {
        filteredOrders = salesOrders.filter(order => order.status === currentStatusFilter);
    }
    
    if (filteredOrders.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        
        // Update empty state message based on filter
        const emptyStateMessage = document.querySelector('#emptyState p.text-muted');
        const emptyStateTitle = document.querySelector('#emptyState h4');
        
        if (currentStatusFilter === 'all') {
            emptyStateTitle.textContent = 'No Sales Orders';
            emptyStateMessage.textContent = 'No orders have been placed yet!';
        } else {
            emptyStateTitle.textContent = `No ${currentStatusFilter.charAt(0).toUpperCase() + currentStatusFilter.slice(1)} Orders`;
            emptyStateMessage.textContent = `No orders with ${currentStatusFilter} status found!`;
        }
        return;
    }
    
    container.style.display = 'flex';
    emptyState.style.display = 'none';
    
    // Create sales order cards
    filteredOrders.forEach(salesOrder => {
        const card = createSalesOrderCard(salesOrder);
        container.appendChild(card);
    });
}

function createSalesOrderCard(salesOrder) {
    const card = document.createElement('div');
    card.className = 'sales-order-card';
    
    // Calculate payment status
    const totalPaid = salesOrder.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const remainingAmount = salesOrder.totalAmount - totalPaid;
    
    // Determine status badge
    let statusBadge = '';
    let statusClass = '';
    
    switch(salesOrder.status) {
        case 'unpaid':
            statusBadge = 'Unpaid';
            statusClass = 'status-unpaid';
            break;
        case 'partial':
            statusBadge = 'Partial';
            statusClass = 'status-partial';
            break;
        case 'paid':
            statusBadge = 'Paid';
            statusClass = 'status-paid';
            break;
        default:
            statusBadge = 'Unknown';
            statusClass = 'status-pending';
    }
    
    // Determine order type badge
    const orderTypeBadge = salesOrder.orderType === 'Delivery' ? 'Delivery' : 'Pickup';
    const orderTypeClass = salesOrder.orderType === 'Delivery' ? 'delivery-type' : 'pickup-type';
    
    card.innerHTML = `
        <div class="sales-order-card-header">
            <div class="sales-order-info">
                <h5 class="sales-order-so-number">${salesOrder.id}</h5>
                <span class="payment-badge badge ${statusClass}">${statusBadge}</span>
                <span class="order-type-badge badge ${orderTypeClass}">${orderTypeBadge}</span>
            </div>
            <div class="sales-order-actions">
                <button class="btn btn-sm btn-outline-primary" onclick="showSalesOrderDetails('${salesOrder.id}')">
                    <i class="bi bi-eye"></i>
                </button>
            </div>
        </div>
        
        <div class="sales-order-customer-info">
            <div class="customer-section">
                <h6><i class="bi bi-person-fill me-2"></i>Customer Information</h6>
                <div class="customer-details">
                    <p><strong>Name:</strong> ${salesOrder.customerName}</p>
                    <p><strong>Phone:</strong> ${salesOrder.customerPhone}</p>
                    <p><strong>Email:</strong> ${salesOrder.customerEmail}</p>
                    <p><strong>Address:</strong></p>
                    <p class="address-text">${salesOrder.address}</p>
                </div>
            </div>
        </div>
        
        <div class="sales-order-summary">
            <div class="summary-row">
                <span><i class="bi bi-calendar3 me-2"></i>Order Date:</span>
                <span>${salesOrder.orderDate}</span>
            </div>
            <div class="summary-row">
                <span><i class="bi bi-box-seam me-2"></i>Items:</span>
                <span>${salesOrder.items.length} items</span>
            </div>
            <div class="summary-row">
                <span><i class="bi bi-cash me-2"></i>Total Amount:</span>
                <span>RM ${salesOrder.totalAmount.toFixed(2)}</span>
            </div>
            ${totalPaid > 0 ? `
                <div class="summary-row">
                    <span><i class="bi bi-check-circle me-2"></i>Amount Paid:</span>
                    <span>RM ${totalPaid.toFixed(2)}</span>
                </div>
            ` : ''}
            ${remainingAmount > 0 ? `
                <div class="summary-row">
                    <span><i class="bi bi-exclamation-triangle me-2"></i>Remaining:</span>
                    <span class="text-danger">RM ${remainingAmount.toFixed(2)}</span>
                </div>
            ` : ''}
        </div>
    `;
    
    return card;
}

function showSalesOrderDetails(salesOrderId) {
    const salesOrder = salesOrders.find(so => so.id === salesOrderId);
    if (!salesOrder) return;
    
    currentSalesOrderId = salesOrderId;
    
    // Calculate payment status
    const totalPaid = salesOrder.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const remainingAmount = salesOrder.totalAmount - totalPaid;
    
    const detailsContainer = document.getElementById('salesOrderDetails');
    detailsContainer.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6><i class="bi bi-person-fill me-2"></i>Customer Information</h6>
                <table class="table table-sm">
                    <tr>
                        <td><strong>Name:</strong></td>
                        <td>${salesOrder.customerName}</td>
                    </tr>
                    <tr>
                        <td><strong>Phone:</strong></td>
                        <td>${salesOrder.customerPhone}</td>
                    </tr>
                    <tr>
                        <td><strong>Email:</strong></td>
                        <td>${salesOrder.customerEmail}</td>
                    </tr>
                    <tr>
                        <td><strong>Address:</strong></td>
                        <td>${salesOrder.address}</td>
                    </tr>
                    ${salesOrder.orderType === 'Delivery' ? `
                        <tr>
                            <td><strong>Delivery Address:</strong></td>
                            <td>${salesOrder.deliveryAddress}</td>
                        </tr>
                    ` : ''}
                </table>
            </div>
            <div class="col-md-6">
                <h6><i class="bi bi-receipt me-2"></i>Order Information</h6>
                <table class="table table-sm">
                    <tr>
                        <td><strong>Order ID:</strong></td>
                        <td>${salesOrder.id}</td>
                    </tr>
                    <tr>
                        <td><strong>Order Date:</strong></td>
                        <td>${salesOrder.orderDate}</td>
                    </tr>
                    <tr>
                        <td><strong>Order Type:</strong></td>
                        <td>${salesOrder.orderType}</td>
                    </tr>
                    <tr>
                        <td><strong>Status:</strong></td>
                        <td><span class="badge bg-${getStatusColor(salesOrder.status)}">${salesOrder.status.toUpperCase()}</span></td>
                    </tr>
                    <tr>
                        <td><strong>Total Amount:</strong></td>
                        <td class="text-success fw-bold">RM ${salesOrder.totalAmount.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td><strong>Amount Paid:</strong></td>
                        <td class="text-info fw-bold">RM ${totalPaid.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td><strong>Remaining:</strong></td>
                        <td class="${remainingAmount > 0 ? 'text-danger' : 'text-success'} fw-bold">RM ${remainingAmount.toFixed(2)}</td>
                    </tr>
                </table>
            </div>
        </div>
        
        <h6 class="mt-3"><i class="bi bi-box-seam me-2"></i>Order Items</h6>
        <div class="table-responsive">
            <table class="table table-sm">
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
                    ${salesOrder.items.map(item => `
                        <tr>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img src="https://guangyitan.github.io/Easy-Sales-V2/${item.image}" alt="${item.name}" style="width: 40px; height: 40px; margin-right: 8px; border-radius: 4px; object-fit: cover;">
                                    <span>${item.name}</span>
                                </div>
                            </td>
                            <td>${item.variation}</td>
                            <td>${item.quantity}</td>
                            <td>RM ${item.price.toFixed(2)}</td>
                            <td>RM ${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr class="table-success">
                        <td colspan="4" class="text-end fw-bold">Total:</td>
                        <td class="fw-bold">RM ${salesOrder.totalAmount.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
        
        ${salesOrder.payments.length > 0 ? `
            <h6 class="mt-3"><i class="bi bi-cash-stack me-2"></i>Payment History</h6>
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Method</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${salesOrder.payments.map(payment => `
                            <tr>
                                <td>${payment.date}</td>
                                <td>${payment.time}</td>
                                <td>${payment.method}</td>
                                <td class="fw-bold">RM ${payment.amount.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr class="table-info">
                            <td colspan="3" class="text-end fw-bold">Total Paid:</td>
                            <td class="fw-bold">RM ${totalPaid.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        ` : ''}
    `;
    
    // Update receive payment button based on status
    const receivePaymentBtn = document.querySelector('button[onclick="receivePayment()"]');
    if (remainingAmount <= 0) {
        receivePaymentBtn.disabled = true;
        receivePaymentBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Fully Paid';
        receivePaymentBtn.className = 'btn btn-success';
    } else {
        receivePaymentBtn.disabled = false;
        receivePaymentBtn.innerHTML = '<i class="bi bi-cash me-2"></i>Receive Payment';
        receivePaymentBtn.className = 'btn btn-primary';
    }
    
    const modal = new bootstrap.Modal(document.getElementById('salesOrderModal'));
    modal.show();
}

function getStatusColor(status) {
    switch(status) {
        case 'unpaid': return 'danger';
        case 'partial': return 'warning';
        case 'paid': return 'success';
        default: return 'secondary';
    }
}

function receivePayment() {
    const salesOrder = salesOrders.find(so => so.id === currentSalesOrderId);
    if (!salesOrder) return;
    
    const totalPaid = salesOrder.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const remainingAmount = salesOrder.totalAmount - totalPaid;
    
    if (remainingAmount <= 0) {
        showNotification('Order is already fully paid', 'warning');
        return;
    }
    
    const paymentDetailsContainer = document.getElementById('paymentDetails');
    paymentDetailsContainer.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6>Order Information</h6>
                <table class="table table-sm">
                    <tr>
                        <td><strong>Order ID:</strong></td>
                        <td>${salesOrder.id}</td>
                    </tr>
                    <tr>
                        <td><strong>Customer:</strong></td>
                        <td>${salesOrder.customerName}</td>
                    </tr>
                    <tr>
                        <td><strong>Total Amount:</strong></td>
                        <td>RM ${salesOrder.totalAmount.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td><strong>Amount Paid:</strong></td>
                        <td>RM ${totalPaid.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td><strong>Remaining:</strong></td>
                        <td class="text-danger fw-bold">RM ${remainingAmount.toFixed(2)}</td>
                    </tr>
                </table>
            </div>
            <div class="col-md-6">
                <h6>Payment Details</h6>
                <form id="paymentForm">
                    <div class="mb-3">
                        <label for="paymentAmount" class="form-label">Payment Amount (RM)</label>
                        <input type="number" class="form-control" id="paymentAmount" min="0.01" max="${remainingAmount}" step="0.01" value="${remainingAmount}" required>
                        <small class="text-muted">Maximum amount: RM ${remainingAmount.toFixed(2)}</small>
                    </div>
                    <div class="mb-3">
                        <label for="paymentMethod" class="form-label">Payment Method</label>
                        <select class="form-select" id="paymentMethod" required>
                            <option value="">Select Payment Method</option>
                            <option value="Cash">Cash</option>
                            <option value="E-Wallet">E-Wallet</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="DuitNow QR">DuitNow QR</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="paymentNotes" class="form-label">Notes (Optional)</label>
                        <textarea class="form-control" id="paymentNotes" rows="2" placeholder="Add any payment notes..."></textarea>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Close sales order modal and open payment modal
    const salesOrderModal = bootstrap.Modal.getInstance(document.getElementById('salesOrderModal'));
    salesOrderModal.hide();
    
    setTimeout(() => {
        const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
        paymentModal.show();
    }, 300);
}

function processPayment() {
    const salesOrder = salesOrders.find(so => so.id === currentSalesOrderId);
    if (!salesOrder) return;
    
    const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);
    const paymentMethod = document.getElementById('paymentMethod').value;
    const paymentNotes = document.getElementById('paymentNotes').value;
    
    // Validation
    if (!paymentAmount || paymentAmount <= 0) {
        showNotification('Please enter a valid payment amount', 'warning');
        return;
    }
    
    if (!paymentMethod) {
        showNotification('Please select a payment method', 'warning');
        return;
    }
    
    const totalPaid = salesOrder.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const remainingAmount = salesOrder.totalAmount - totalPaid;
    
    if (paymentAmount > remainingAmount) {
        showNotification('Payment amount cannot exceed remaining amount', 'warning');
        return;
    }
    
    // Add payment
    const now = new Date();
    const payment = {
        amount: paymentAmount,
        method: paymentMethod,
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        notes: paymentNotes
    };
    
    salesOrder.payments.push(payment);
    
    // Update status
    const newTotalPaid = salesOrder.payments.reduce((sum, p) => sum + p.amount, 0);
    if (newTotalPaid >= salesOrder.totalAmount) {
        salesOrder.status = 'paid';
    } else {
        salesOrder.status = 'partial';
    }
    
    // Save to completed orders (in real app, this would be sent to backend)
    const completedOrders = JSON.parse(localStorage.getItem('completedOrders') || '[]');
    const existingOrderIndex = completedOrders.findIndex(order => order.id === salesOrder.id);
    
    if (existingOrderIndex !== -1) {
        completedOrders[existingOrderIndex] = salesOrder;
    } else {
        completedOrders.push(salesOrder);
    }
    
    localStorage.setItem('completedOrders', JSON.stringify(completedOrders));
    
    // Show success message
    showNotification(`Payment of RM ${paymentAmount.toFixed(2)} received successfully!`, 'success');
    
    // Close payment modal
    const paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
    paymentModal.hide();
    
    // Refresh sales orders display
    loadSalesOrders();
    
    // Show updated order details
    setTimeout(() => {
        showSalesOrderDetails(currentSalesOrderId);
    }, 500);
}

function refreshSalesOrders() {
    loadSalesOrders();
    showNotification('Sales orders refreshed', 'info');
}

function filterByStatus(status) {
    currentStatusFilter = status;
    loadSalesOrders();
    
    // Update dropdown button text
    const dropdownButton = document.getElementById('statusFilterDropdown');
    let filterText = 'Filter Status';
    
    switch(status) {
        case 'all':
            filterText = 'All Orders';
            break;
        case 'unpaid':
            filterText = 'Unpaid';
            break;
        case 'partial':
            filterText = 'Partial';
            break;
        case 'paid':
            filterText = 'Paid';
            break;
    }
    
    dropdownButton.innerHTML = `<i class="bi bi-funnel me-2"></i>${filterText}`;
    
    // Show notification
    if (status === 'all') {
        showNotification('Showing all sales orders', 'info');
    } else {
        const orderCount = salesOrders.filter(order => order.status === status).length;
        showNotification(`Showing ${orderCount} ${status} order${orderCount !== 1 ? 's' : ''}`, 'info');
    }
}
