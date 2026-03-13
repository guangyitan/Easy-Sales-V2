// Pending Delivery page specific functions

// Sample pending delivery data (in real app, this would come from backend)
let pendingDeliveries = [
    {
        id: 'SO-20240313001',
        customerName: 'Ahmad bin Ismail',
        customerPhone: '+60 12-3456789',
        deliveryAddress: 'No. 123, Jalan Merdeka, Taman Seri Setia, 43000 Kajang',
        orderDate: '2024-03-13',
        deliveryDate: '2024-03-15',
        items: [
            { name: 'Genting Konkrit Contour', quantity: 2, variation: 'Standard', price: 45.99, image: 'images/roof/genting-konkrit-contour.png' },
            { name: 'U-Drain 300x300mm', quantity: 5, variation: '300mm', price: 35.99, image: 'images/precast-drain/u-drain-300x300mm.png' },
            { name: 'Sudut Hip Starter', quantity: 3, variation: 'Basic', price: 125.99, image: 'images/roof/sudut-hip-starter.png' }
        ],
        totalAmount: 651.90,
        status: 'pending',
        orderType: 'Delivery'
    },
    {
        id: 'SO-20240313002',
        customerName: 'Siti Aminah binti Omar',
        customerPhone: '+60 19-8765432',
        deliveryAddress: 'Lot 456, Jalan Industri 2, Kawasan Perindustrian, 47300 Puchong',
        orderDate: '2024-03-13',
        deliveryDate: '2024-03-16',
        items: [
            { name: 'Perabung Saga Ridge Tiles', quantity: 10, variation: 'Red', price: 89.99, image: 'images/roof/perabung-saga-ridge-tiles.png' },
            { name: 'Tiang Pagar Simen 3x3', quantity: 8, variation: '3m', price: 75.99, image: 'images/precast-post/tiang-pagar-simen-3x3.png' },
            { name: 'Permentong 3x3', quantity: 4, variation: '3m', price: 89.99, image: 'images/pipe-culvert/permentong-3x3.png' },
            { name: 'UDrain 375x375mm', quantity: 6, variation: '375mm', price: 42.99, image: 'images/precast-drain/u-drain-375x375mm.png' }
        ],
        totalAmount: 2156.81,
        status: 'pending',
        orderType: 'Delivery'
    },
    {
        id: 'SO-20240313003',
        customerName: 'Mohamed bin Hassan',
        customerPhone: '+60 16-2345678',
        deliveryAddress: 'No. 789, Persiaran Teknologi, Cyberjaya, 63000 Selangor',
        orderDate: '2024-03-13',
        deliveryDate: '2024-03-17',
        items: [
            { name: 'Permentong 3x3', quantity: 3, variation: '3m', price: 89.99, image: 'images/pipe-culvert/permentong-3x3.png' },
            { name: 'Penutup Permentong 3x3', quantity: 3, variation: '3m', price: 95.99, image: 'images/pipe-culvert/penutup-permentong-3x3.png' },
            { name: 'Genting Konkrit Contour', quantity: 2, variation: 'Premium', price: 45.99, image: 'images/roof/genting-konkrit-contour.png' }
        ],
        totalAmount: 735.93,
        status: 'pending',
        orderType: 'Delivery'
    },
    {
        id: 'SO-20240313004',
        customerName: 'Fatimah binti Ali',
        customerPhone: '+60 14-9876543',
        deliveryAddress: 'No. 321, Jalan Raya Cheras, 56000 Kuala Lumpur',
        orderDate: '2024-03-13',
        deliveryDate: '2024-03-18',
        items: [
            { name: 'Sudut Hip Starter', quantity: 6, variation: 'Deluxe', price: 125.99, image: 'images/roof/sudut-hip-starter.png' },
            { name: 'UDrain 375x375mm', quantity: 4, variation: '375mm', price: 42.99, image: 'images/precast-drain/u-drain-375x375mm.png' },
            { name: 'Tiang Pagar Simen 4x4', quantity: 5, variation: '4m', price: 125.99, image: 'images/precast-post/tiang-pagar-simen-4x4.png' },
            { name: 'Perabung Saga Ridge Tiles', quantity: 8, variation: 'Gray', price: 89.99, image: 'images/roof/perabung-saga-ridge-tiles.png' }
        ],
        totalAmount: 1791.85,
        status: 'pending',
        orderType: 'Delivery'
    },
    {
        id: 'SO-20240313005',
        customerName: 'Razak bin Mohamad',
        customerPhone: '+60 11-2345678',
        deliveryAddress: 'No. 654, Jalan Sultan Abdul Samad, 50000 Kuala Lumpur',
        orderDate: '2024-03-13',
        deliveryDate: '2024-03-19',
        items: [
            { name: 'Genting Konkrit Contour', quantity: 4, variation: 'Premium', price: 45.99, image: 'images/roof/genting-konkrit-contour.png' },
            { name: 'Tiang Pagar Simen 4x4', quantity: 6, variation: '4m', price: 125.99, image: 'images/precast-post/tiang-pagar-simen-4x4.png' },
            { name: 'U-Drain 300x300mm', quantity: 8, variation: '450mm', price: 35.99, image: 'images/precast-drain/u-drain-300x300mm.png' }
        ],
        totalAmount: 1319.82,
        status: 'pending',
        orderType: 'Delivery'
    },
    {
        id: 'SO-20240313006',
        customerName: 'Norhayati binti Ibrahim',
        customerPhone: '+60 13-8765432',
        deliveryAddress: 'No. 987, Jalan Ampang Hilir, 55000 Kuala Lumpur',
        orderDate: '2024-03-13',
        deliveryDate: '2024-03-20',
        items: [
            { name: 'Perabung Saga Ridge Tiles', quantity: 15, variation: 'Brown', price: 89.99, image: 'images/roof/perabung-saga-ridge-tiles.png' },
            { name: 'Permentong 3x3', quantity: 5, variation: '6m', price: 89.99, image: 'images/pipe-culvert/permentong-3x3.png' },
            { name: 'Penutup Permentong 3x3', quantity: 5, variation: '6m', price: 95.99, image: 'images/pipe-culvert/penutup-permentong-3x3.png' },
            { name: 'Tiang Pagar Simen 3x3', quantity: 4, variation: '5m', price: 75.99, image: 'images/precast-post/tiang-pagar-simen-3x3.png' }
        ],
        totalAmount: 2549.80,
        status: 'pending',
        orderType: 'Delivery'
    },
    {
        id: 'SO-20240313007',
        customerName: 'Abdul Rahman bin Yusof',
        customerPhone: '+60 17-3456789',
        deliveryAddress: 'No. 246, Jalan Damansara, 47810 Petaling Jaya',
        orderDate: '2024-03-13',
        deliveryDate: '2024-03-21',
        items: [
            { name: 'U-Drain 300x300mm', quantity: 8, variation: '450mm', price: 35.99, image: 'images/precast-drain/u-drain-300x300mm.png' },
            { name: 'Sudut Hip Starter', quantity: 4, variation: 'Premium', price: 125.99, image: 'images/roof/sudut-hip-starter.png' },
            { name: 'Genting Konkrit Contour', quantity: 3, variation: 'Quick Set', price: 45.99, image: 'images/roof/genting-konkrit-contour.png' },
            { name: 'Tiang Pagar Simen 4x4', quantity: 2, variation: '6m', price: 125.99, image: 'images/precast-post/tiang-pagar-simen-4x4.png' },
            { name: 'Perabung Saga Ridge Tiles', quantity: 6, variation: 'Red', price: 89.99, image: 'images/roof/perabung-saga-ridge-tiles.png' }
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
                        <th>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="selectAllItems" onchange="toggleAllItems()">
                                <label class="form-check-label" for="selectAllItems">Select All</label>
                            </div>
                        </th>
                        <th>Item</th>
                        <th>Variation</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Lorry Size</th>
                    </tr>
                </thead>
                <tbody>
                    ${delivery.items.map((item, index) => `
                        <tr>
                            <td>
                                <div class="form-check">
                                    <input class="form-check-input item-checkbox" type="checkbox" id="item_${index}" value="${index}" onchange="updateSelectionCount()">
                                    <label class="form-check-label" for="item_${index}"></label>
                                </div>
                            </td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img src="${item.image}" alt="${item.name}" style="width: 40px; height: 40px; margin-right: 8px; border-radius: 4px; object-fit: cover;">
                                    <span>${item.name}</span>
                                </div>
                            </td>
                            <td>${item.variation}</td>
                            <td>${item.quantity}</td>
                            <td>RM ${item.price.toFixed(2)}</td>
                            <td>RM ${(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <select class="form-select form-select-sm" id="lorrySize_${index}" onchange="updateItemLorrySize(${index})">
                                    <option value="">Select Lorry</option>
                                    <option value="1-ton">1 Ton</option>
                                    <option value="3-ton">3 Ton</option>
                                    <option value="5-ton">5 Ton</option>
                                    <option value="10-ton">10 Ton</option>
                                    <option value="20-ton">20 Ton</option>
                                    <option value="trailer">Trailer</option>
                                    <option value="long-trailer">Long Trailer</option>
                                </select>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr class="table-success">
                        <td colspan="5" class="text-end fw-bold">Total:</td>
                        <td class="fw-bold">RM ${delivery.totalAmount.toFixed(2)}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('deliveryModal'));
    modal.show();
}

function quickMarkAsDelivered(deliveryId) {
    if (confirm('Are you sure you want to generate invoice and mark this order as delivered?')) {
        generateInvoiceAndDOForDelivery(deliveryId);
    }
}

function generateInvoiceAndDO() {
    if (!currentDeliveryId) {
        showNotification('No delivery selected', 'warning');
        return;
    }
    
    // Find the delivery first
    const delivery = pendingDeliveries.find(d => d.id === currentDeliveryId);
    if (!delivery) return;
    
    // Get selected items
    const selectedCheckboxes = document.querySelectorAll('.item-checkbox');
    const selectedItems = [];
    let missingLorrySizes = [];
    
    selectedCheckboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const lorrySizeElement = document.getElementById(`lorrySize_${index}`);
            const lorrySize = lorrySizeElement ? lorrySizeElement.value : '';
            
            if (!lorrySize) {
                missingLorrySizes.push(delivery.items[index].name);
            }
            
            selectedItems.push({
                ...delivery.items[index],
                lorrySize: lorrySize || 'Not Assigned'
            });
        }
    });
    
    if (selectedItems.length === 0) {
        showNotification('Please select at least one item to generate invoice', 'warning');
        return; // Don't close modal
    }
    
    if (missingLorrySizes.length > 0) {
        showNotification(`Please assign lorry size for: ${missingLorrySizes.join(', ')}`, 'warning');
        return; // Don't close modal
    }
    
    // Generate invoice number
    const invoiceNumber = 'INV' + Date.now().toString().slice(-8);
    const doNumber = 'DO' + Date.now().toString().slice(-8);
    
    // Create invoice data
    const invoiceData = {
        invoiceNumber: invoiceNumber,
        doNumber: doNumber,
        customerName: delivery.customerName,
        customerPhone: delivery.customerPhone,
        deliveryAddress: delivery.deliveryAddress,
        orderDate: delivery.orderDate,
        deliveryDate: delivery.deliveryDate,
        items: selectedItems,
        totalAmount: selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        generatedDate: new Date().toISOString().split('T')[0]
    };
    
    // Remove from pending deliveries
    const deliveryIndex = pendingDeliveries.findIndex(d => d.id === currentDeliveryId);
    if (deliveryIndex !== -1) {
        // Get the original delivery
        const originalDelivery = pendingDeliveries[deliveryIndex];
        
        // Create updated delivery with only delivered items
        const updatedDelivery = {
            ...originalDelivery,
            status: 'delivered',
            deliveredDate: new Date().toISOString().split('T')[0],
            invoiceNumber: invoiceNumber,
            doNumber: doNumber,
            deliveredItems: selectedItems,
            // Keep only non-delivered items in the order
            items: originalDelivery.items.filter((item, index) => {
                // Check if this item was selected for delivery
                const wasSelected = selectedItems.some(selectedItem => 
                    selectedItem.name === item.name && 
                    selectedItem.variation === item.variation
                );
                
                // Keep item if it wasn't selected for delivery
                if (!wasSelected) {
                    return item;
                }
                return null; // Remove selected items from the order
            }).filter(item => item !== null),
            totalAmount: selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            generatedDate: new Date().toISOString().split('T')[0]
        };
        
        // Update the delivery in pending list
        pendingDeliveries[deliveryIndex] = updatedDelivery;
        
        // Create new pending order for remaining items if any
        const remainingItems = originalDelivery.items.filter((item, index) => {
            const wasSelected = selectedItems.some(selectedItem => 
                selectedItem.name === item.name && 
                selectedItem.variation === item.variation
            );
            return wasSelected; // Keep only items that were selected
        });
        
        if (remainingItems.length > 0) {
            // Create new delivery for remaining items
            const newDeliveryId = 'SO-' + Date.now().toString().slice(-8);
            const newDelivery = {
                id: newDeliveryId,
                customerName: originalDelivery.customerName,
                customerPhone: originalDelivery.customerPhone,
                deliveryAddress: originalDelivery.deliveryAddress,
                orderDate: originalDelivery.orderDate,
                deliveryDate: originalDelivery.deliveryDate,
                items: remainingItems,
                totalAmount: remainingItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                status: 'pending',
                generatedDate: new Date().toISOString().split('T')[0]
            };
            
            pendingDeliveries.push(newDelivery);
            showNotification(`New delivery ${newDeliveryId} created for remaining items`, 'info');
        }
        
        // Save to completed deliveries
        const completedDeliveries = JSON.parse(localStorage.getItem('completedDeliveries') || '[]');
        completedDeliveries.push(updatedDelivery);
        localStorage.setItem('completedDeliveries', JSON.stringify(completedDeliveries));
    }
    
    // Generate printable invoice
    generatePrintableInvoice(invoiceData);
    
    // Refresh display
    loadPendingDeliveries();
    
    // Close modal only after successful invoice generation
    const modal = bootstrap.Modal.getInstance(document.getElementById('deliveryModal'));
    if (modal) {
        modal.hide();
    }
    
    showNotification(`Invoice ${invoiceNumber} and DO ${doNumber} generated!`, 'success');
}

function generateInvoiceAndDOForDelivery(deliveryId) {
    // Find the delivery
    const delivery = pendingDeliveries.find(d => d.id === deliveryId);
    if (!delivery) return;
    
    // Get selected items
    const selectedCheckboxes = document.querySelectorAll('.item-checkbox');
    const selectedItems = [];
    let missingLorrySizes = [];
    
    selectedCheckboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const lorrySizeElement = document.getElementById(`lorrySize_${index}`);
            const lorrySize = lorrySizeElement ? lorrySizeElement.value : '';
            
            if (!lorrySize) {
                missingLorrySizes.push(delivery.items[index].name);
            }
            
            selectedItems.push({
                ...delivery.items[index],
                lorrySize: lorrySize || 'Not Assigned'
            });
        }
    });
    
    if (selectedItems.length === 0) {
        showNotification('Please select at least one item to generate invoice', 'warning');
        return;
    }
    
    if (missingLorrySizes.length > 0) {
        showNotification(`Please assign lorry size for: ${missingLorrySizes.join(', ')}`, 'warning');
        return;
    }
    
    // Generate invoice number
    const invoiceNumber = 'INV' + Date.now().toString().slice(-8);
    const doNumber = 'DO' + Date.now().toString().slice(-8);
    
    // Create invoice data
    const invoiceData = {
        invoiceNumber: invoiceNumber,
        doNumber: doNumber,
        customerName: delivery.customerName,
        customerPhone: delivery.customerPhone,
        deliveryAddress: delivery.deliveryAddress,
        orderDate: delivery.orderDate,
        deliveryDate: delivery.deliveryDate,
        items: selectedItems,
        totalAmount: selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        generatedDate: new Date().toISOString().split('T')[0]
    };
    
    // Save to completed deliveries
    const completedDeliveries = JSON.parse(localStorage.getItem('completedDeliveries') || '[]');
    const completedDelivery = {
        ...delivery,
        status: 'delivered',
        deliveredDate: new Date().toISOString().split('T')[0],
        invoiceNumber: invoiceNumber,
        doNumber: doNumber,
        deliveredItems: selectedItems,
        originalItems: delivery.items
    };
    completedDeliveries.push(completedDelivery);
    localStorage.setItem('completedDeliveries', JSON.stringify(completedDeliveries));
    
    // Remove from pending deliveries
    const deliveryIndex = pendingDeliveries.findIndex(d => d.id === deliveryId);
    if (deliveryIndex !== -1) {
        pendingDeliveries.splice(deliveryIndex, 1);
    }
    
    // Generate printable invoice
    generatePrintableInvoice(invoiceData);
    
    // Refresh display
    loadPendingDeliveries();
    
    showNotification(`Invoice ${invoiceNumber} and DO ${doNumber} generated!`, 'success');
}

function generatePrintableInvoice(invoiceData) {
    // Create printable invoice content
    const invoiceContent = `
        <html>
        <head>
            <title>Delivery Order - ${invoiceData.invoiceNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .info-section { margin-bottom: 20px; }
                .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                .items-table th { background-color: #f2f2f2; font-weight: bold; }
                .total { text-align: right; font-weight: bold; }
                .footer { margin-top: 30px; text-align: center; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>DELIVERY SO-ER</h1>
                <h2>Invoice: ${invoiceData.invoiceNumber}</h2>
                <h2>Delivery Order: ${invoiceData.doNumber}</h2>
            </div>
            
            <div class="info-section">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> ${invoiceData.customerName}</p>
                <p><strong>Phone:</strong> ${invoiceData.customerPhone}</p>
                <p><strong>Delivery Address:</strong> ${invoiceData.deliveryAddress}</p>
                <p><strong>Order Date:</strong> ${invoiceData.orderDate}</p>
                <p><strong>Delivery Date:</strong> ${invoiceData.deliveryDate}</p>
            </div>
            
            <div class="info-section">
                <h3>Delivered Items</h3>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Variation</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Lorry Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoiceData.items.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.variation}</td>
                                <td>${item.quantity}</td>
                                <td>RM ${item.price.toFixed(2)}</td>
                                <td>RM ${(item.price * item.quantity).toFixed(2)}</td>
                                <td>${item.lorrySize}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="4" class="total">Total:</td>
                            <td colspan="2" class="total">RM ${invoiceData.totalAmount.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
            <div class="footer">
                <p><strong>Generated Date:</strong> ${invoiceData.generatedDate}</p>
                <p>Signature: _________________</p>
            </div>
        </body>
        </html>
    `;
    
    // Create print window and show invoice
    const printWindow = window.open('', '_blank');
    printWindow.document.write(invoiceContent);
    printWindow.document.close();
    printWindow.print();
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

function updateLorrySize() {
    const lorrySize = document.getElementById('lorrySize').value;
    if (lorrySize && currentDeliveryId) {
        // Find the delivery and update lorry size
        const deliveryIndex = pendingDeliveries.findIndex(d => d.id === currentDeliveryId);
        if (deliveryIndex !== -1) {
            pendingDeliveries[deliveryIndex].lorrySize = lorrySize;
            showNotification(`Lorry size updated to ${lorrySize.replace('-', ' ').toUpperCase()}`, 'success');
        }
    }
}

function updateItemLorrySize(itemIndex) {
    const lorrySize = document.getElementById(`lorrySize_${itemIndex}`).value;
    if (lorrySize && currentDeliveryId) {
        // Find the delivery and update specific item lorry size
        const deliveryIndex = pendingDeliveries.findIndex(d => d.id === currentDeliveryId);
        if (deliveryIndex !== -1) {
            // Initialize lorrySizes array if it doesn't exist
            if (!pendingDeliveries[deliveryIndex].lorrySizes) {
                pendingDeliveries[deliveryIndex].lorrySizes = [];
            }
            
            // Update lorry size for specific item
            pendingDeliveries[deliveryIndex].lorrySizes[itemIndex] = lorrySize;
            
            const itemName = pendingDeliveries[deliveryIndex].items[itemIndex].name;
            showNotification(`${itemName} lorry size updated to ${lorrySize.replace('-', ' ').toUpperCase()}`, 'success');
        }
    }
}

function toggleAllItems() {
    const selectAllCheckbox = document.getElementById('selectAllItems');
    const itemCheckboxes = document.querySelectorAll('.item-checkbox');
    const isChecked = selectAllCheckbox.checked;
    
    itemCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
    
    updateSelectionCount();
}

function quickGenerateInvoice(deliveryId) {
    // For quick generation, select all items automatically
    const delivery = pendingDeliveries.find(d => d.id === deliveryId);
    if (!delivery) return;
    
    // Set current delivery ID
    currentDeliveryId = deliveryId;
    
    // Show modal first
    showDeliveryDetails(deliveryId);
    
    // Wait for modal to be fully rendered, then select all items
    setTimeout(() => {
        const selectAllCheckbox = document.getElementById('selectAllItems');
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = true;
            toggleAllItems();
        }
        
        // Then attempt to generate invoice
        setTimeout(() => {
            generateInvoiceAndDO();
        }, 500);
    }, 300);
}

function updateSelectionCount() {
    const itemCheckboxes = document.querySelectorAll('.item-checkbox');
    const selectedCount = Array.from(itemCheckboxes).filter(cb => cb.checked).length;
    const totalCount = itemCheckboxes.length;
    
    // Update select all checkbox state
    const selectAllCheckbox = document.getElementById('selectAllItems');
    if (selectedCount === totalCount) {
        selectAllCheckbox.checked = true;
        selectAllCheckbox.indeterminate = false;
    } else if (selectedCount === 0) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
    } else {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = true;
    }
    
    // Show selection count
    if (selectedCount > 0) {
        showNotification(`${selectedCount} item(s) selected`, 'info');
    }
}
