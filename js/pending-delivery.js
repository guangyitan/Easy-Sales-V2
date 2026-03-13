// Pending Delivery page specific functions

// Sample pending delivery data (in real app, this would come from backend)
let pendingDeliveries = [
    {
        id: 'ORD20240313001',
        customerName: 'Ahmad bin Ismail',
        customerPhone: '+60 12-3456789',
        deliveryAddress: 'No. 123, Jalan Merdeka, Taman Seri Setia, 43000 Kajang',
        orderDate: '2024-03-13',
        deliveryDate: '2024-03-15',
        items: [
            { name: 'Genting Konkrit Contour', quantity: 2, variation: 'Standard', price: 45.99 },
            { name: 'U-Drain 300x300mm', quantity: 5, variation: '300mm', price: 35.99 },
            { name: 'Sudut Hip Starter', quantity: 3, variation: 'Basic', price: 125.99 }
        ],
        totalAmount: 651.90,
        status: 'pending',
        orderType: 'Delivery'
    },
    {
        id: 'ORD20240313002',
        customerName: 'Siti Aminah binti Omar',
        customerPhone: '+60 19-8765432',
        deliveryAddress: 'Lot 456, Jalan Industri 2, Kawasan Perindustrian, 47300 Puchong',
        orderDate: '2024-03-13',
        deliveryDate: '2024-03-16',
        items: [
            { name: 'Perabung Saga Ridge Tiles', quantity: 10, variation: 'Red', price: 89.99 },
            { name: 'Tiang Pagar Simen 3x3', quantity: 8, variation: '3m', price: 75.99 },
            { name: 'Permentong 3x3', quantity: 4, variation: '3m', price: 89.99 },
            { name: 'UDrain 375x375mm', quantity: 6, variation: '375mm', price: 42.99 }
        ],
        totalAmount: 2156.81,
        status: 'pending',
        orderType: 'Delivery'
    },
    {
        id: 'ORD20240313003',
        customerName: 'Mohamed bin Hassan',
        customerPhone: '+60 16-2345678',
        deliveryAddress: 'No. 789, Persiaran Teknologi, Cyberjaya, 63000 Selangor',
        orderDate: '2024-03-13',
        deliveryDate: '2024-03-17',
        items: [
            { name: 'Permentong 3x3', quantity: 3, variation: '3m', price: 89.99 },
            { name: 'Penutup Permentong 3x3', quantity: 3, variation: '3m', price: 95.99 },
            { name: 'Genting Konkrit Contour', quantity: 2, variation: 'Premium', price: 45.99 }
        ],
        totalAmount: 735.93,
        status: 'pending',
        orderType: 'Delivery'
    },
    {
        id: 'ORD20240313004',
        customerName: 'Fatimah binti Ali',
        customerPhone: '+60 14-9876543',
        deliveryAddress: 'No. 321, Jalan Raya Cheras, 56000 Kuala Lumpur',
        orderDate: '2024-03-13',
        deliveryDate: '2024-03-18',
        items: [
            { name: 'Sudut Hip Starter', quantity: 6, variation: 'Deluxe', price: 125.99 },
            { name: 'UDrain 375x375mm', quantity: 4, variation: '375mm', price: 42.99 },
            { name: 'Tiang Pagar Simen 4x4', quantity: 5, variation: '4m', price: 125.99 },
            { name: 'Perabung Saga Ridge Tiles', quantity: 8, variation: 'Gray', price: 89.99 }
        ],
        totalAmount: 1791.85,
        status: 'pending',
        orderType: 'Delivery'
    },
    {
        id: 'ORD20240313005',
        customerName: 'Razak bin Mohamad',
        customerPhone: '+60 11-2345678',
        deliveryAddress: 'No. 654, Jalan Sultan Abdul Samad, 50000 Kuala Lumpur',
        orderDate: '2024-03-13',
        deliveryDate: '2024-03-19',
        items: [
            { name: 'Genting Konkrit Contour', quantity: 4, variation: 'Premium', price: 45.99 },
            { name: 'Tiang Pagar Simen 4x4', quantity: 6, variation: '4m', price: 125.99 },
            { name: 'U-Drain 300x300mm', quantity: 8, variation: '450mm', price: 35.99 }
        ],
        totalAmount: 1319.82,
        status: 'pending',
        orderType: 'Delivery'
    },
    {
        id: 'ORD20240313006',
        customerName: 'Norhayati binti Ibrahim',
        customerPhone: '+60 13-8765432',
        deliveryAddress: 'No. 987, Jalan Ampang Hilir, 55000 Kuala Lumpur',
        orderDate: '2024-03-13',
        deliveryDate: '2024-03-20',
        items: [
            { name: 'Perabung Saga Ridge Tiles', quantity: 15, variation: 'Brown', price: 89.99 },
            { name: 'Permentong 3x3', quantity: 5, variation: '6m', price: 89.99 },
            { name: 'Penutup Permentong 3x3', quantity: 5, variation: '6m', price: 95.99 },
            { name: 'Tiang Pagar Simen 3x3', quantity: 4, variation: '5m', price: 75.99 }
        ],
        totalAmount: 2549.80,
        status: 'pending',
        orderType: 'Delivery'
    },
    {
        id: 'ORD20240313007',
        customerName: 'Abdul Rahman bin Yusof',
        customerPhone: '+60 17-3456789',
        deliveryAddress: 'No. 246, Jalan Damansara, 47810 Petaling Jaya',
        orderDate: '2024-03-13',
        deliveryDate: '2024-03-21',
        items: [
            { name: 'U-Drain 300x300mm', quantity: 8, variation: '450mm', price: 35.99 },
            { name: 'Sudut Hip Starter', quantity: 4, variation: 'Premium', price: 125.99 },
            { name: 'Genting Konkrit Contour', quantity: 3, variation: 'Quick Set', price: 45.99 },
            { name: 'Tiang Pagar Simen 4x4', quantity: 2, variation: '6m', price: 125.99 },
            { name: 'Perabung Saga Ridge Tiles', quantity: 6, variation: 'Red', price: 89.99 }
        ],
        totalAmount: 1239.80,
        status: 'pending',
        orderType: 'Delivery'
    }
];

let currentDeliveryId = null;

// Load pending deliveries on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the pending delivery page
    if (window.location.pathname.includes('pending-delivery.html')) {
        loadPendingDeliveries();
    }
});

function loadPendingDeliveries() {
    const container = document.getElementById('deliveryCardsContainer');
    const emptyState = document.getElementById('emptyState');
    
    // Clear existing content
    container.innerHTML = '';
    
    if (pendingDeliveries.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    container.style.display = 'flex';
    emptyState.style.display = 'none';
    
    // Create delivery cards
    pendingDeliveries.forEach(delivery => {
        const card = createDeliveryCard(delivery);
        container.appendChild(card);
    });
}

function createDeliveryCard(delivery) {
    const card = document.createElement('div');
    card.className = 'delivery-card';
    card.innerHTML = `
        <div class="delivery-card-header">
            <div class="delivery-info">
                <h5 class="delivery-so-number">${delivery.id}</h5>
                <span class="delivery-status badge bg-warning text-dark">Pending</span>
            </div>
            <div class="delivery-actions">
                <button class="btn btn-sm btn-outline-primary" onclick="showDeliveryDetails('${delivery.id}')">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-sm btn-success" onclick="quickMarkAsDelivered('${delivery.id}')">
                    <i class="bi bi-truck"></i>
                </button>
            </div>
        </div>
        
        <div class="delivery-customer-info">
            <div class="customer-section">
                <h6><i class="bi bi-person-fill me-2"></i>Customer Information</h6>
                <div class="customer-details">
                    <p><strong>Name:</strong> ${delivery.customerName}</p>
                    <p><strong>Phone:</strong> ${delivery.customerPhone}</p>
                    <p><strong>Delivery Address:</strong></p>
                    <p class="address-text">${delivery.deliveryAddress}</p>
                </div>
            </div>
        </div>
        
        <div class="delivery-summary">
            <div class="summary-row">
                <span><i class="bi bi-calendar3 me-2"></i>Order Date:</span>
                <span>${delivery.orderDate}</span>
            </div>
            <div class="summary-row">
                <span><i class="bi bi-truck me-2"></i>Delivery Date:</span>
                <span>${delivery.deliveryDate}</span>
            </div>
            <div class="summary-row total-row">
                <span><i class="bi bi-currency-ringgit me-2"></i>Total Amount:</span>
                <span class="total-amount">RM ${delivery.totalAmount.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span><i class="bi bi-box-seam me-2"></i>Items:</span>
                <span>${delivery.items.length} items</span>
            </div>
        </div>
    `;
    
    return card;
}

function showDeliveryDetails(deliveryId) {
    const delivery = pendingDeliveries.find(d => d.id === deliveryId);
    if (!delivery) return;
    
    currentDeliveryId = deliveryId;
    
    const detailsContainer = document.getElementById('deliveryDetails');
    detailsContainer.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6><i class="bi bi-person-fill me-2"></i>Customer Information</h6>
                <table class="table table-sm">
                    <tr>
                        <td><strong>Name:</strong></td>
                        <td>${delivery.customerName}</td>
                    </tr>
                    <tr>
                        <td><strong>Phone:</strong></td>
                        <td>${delivery.customerPhone}</td>
                    </tr>
                    <tr>
                        <td><strong>Address:</strong></td>
                        <td>${delivery.deliveryAddress}</td>
                    </tr>
                </table>
            </div>
            <div class="col-md-6">
                <h6><i class="bi bi-receipt me-2"></i>Order Information</h6>
                <table class="table table-sm">
                    <tr>
                        <td><strong>Order ID:</strong></td>
                        <td>${delivery.id}</td>
                    </tr>
                    <tr>
                        <td><strong>Order Date:</strong></td>
                        <td>${delivery.orderDate}</td>
                    </tr>
                    <tr>
                        <td><strong>Delivery Date:</strong></td>
                        <td>${delivery.deliveryDate}</td>
                    </tr>
                    <tr>
                        <td><strong>Total Amount:</strong></td>
                        <td class="text-success fw-bold">RM ${delivery.totalAmount.toFixed(2)}</td>
                    </tr>
                </table>
            </div>
        </div>
        
        <h6 class="mt-3"><i class="bi bi-box-seam me-2"></i>Order Items</h6>
        <div class="table-responsive">
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Variation</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${delivery.items.map(item => `
                        <tr>
                            <td>${item.name}</td>
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
                        <td class="fw-bold">RM ${delivery.totalAmount.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('deliveryModal'));
    modal.show();
}

function quickMarkAsDelivered(deliveryId) {
    if (confirm('Are you sure you want to mark this order as delivered?')) {
        markDeliveryAsDelivered(deliveryId);
    }
}

function markAsDelivered() {
    if (currentDeliveryId) {
        markDeliveryAsDelivered(currentDeliveryId);
        const modal = bootstrap.Modal.getInstance(document.getElementById('deliveryModal'));
        modal.hide();
    }
}

function markDeliveryAsDelivered(deliveryId) {
    // Remove from pending deliveries
    pendingDeliveries = pendingDeliveries.filter(d => d.id !== deliveryId);
    
    // Save to completed deliveries (in real app, this would be sent to backend)
    const completedDeliveries = JSON.parse(localStorage.getItem('completedDeliveries') || '[]');
    const delivery = pendingDeliveries.find(d => d.id === deliveryId);
    if (delivery) {
        delivery.status = 'delivered';
        delivery.deliveredDate = new Date().toISOString().split('T')[0];
        completedDeliveries.push(delivery);
        localStorage.setItem('completedDeliveries', JSON.stringify(completedDeliveries));
    }
    
    // Refresh display
    loadPendingDeliveries();
    
    showNotification(`Order ${deliveryId} marked as delivered!`, 'success');
}

function markAllAsDelivered() {
    if (pendingDeliveries.length === 0) {
        showNotification('No pending deliveries to mark as delivered!', 'info');
        return;
    }
    
    if (confirm(`Are you sure you want to mark all ${pendingDeliveries.length} orders as delivered?`)) {
        const completedDeliveries = JSON.parse(localStorage.getItem('completedDeliveries') || '[]');
        
        pendingDeliveries.forEach(delivery => {
            delivery.status = 'delivered';
            delivery.deliveredDate = new Date().toISOString().split('T')[0];
            completedDeliveries.push(delivery);
        });
        
        localStorage.setItem('completedDeliveries', JSON.stringify(completedDeliveries));
        pendingDeliveries = [];
        
        loadPendingDeliveries();
        showNotification('All orders marked as delivered!', 'success');
    }
}

function refreshDeliveries() {
    // In real app, this would fetch fresh data from backend
    loadPendingDeliveries();
    showNotification('Delivery list refreshed!', 'info');
}
