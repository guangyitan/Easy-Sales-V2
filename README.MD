# Project Name
Self-Service Ordering Kiosk (Prototype)

## Purpose
This project is a front-end prototype of a self-service ordering kiosk similar to those used in Malaysian fast-food restaurants.
The goal is to demonstrate the user interface and interaction flow to clients before implementing a full backend ordering system.
This prototype is targeted for hardware and manufacturing material retail stores.

The prototype focuses on:
- Touch-friendly UI
- Vertical monitor layout (kiosk screens)
- Mobile responsiveness
- Simple navigation flow
- Static product display
- Only HTML, CSS (Bootstrap 5), and simple JavaScript are used.
- No backend or database is included.

## Core User Flow
1. Home Page (`home.html`)
- User selects: Delivery or Own Collect
- Both will navigate to Products Page

2. All Products Page (`products.html`)
- User browses items using categories
- User clicks on product to view details
- User can view cart from any page

3. Product Details Page (`product-details.html`)
- User views product information and image
- User selects product variation (size, type, etc.)
- User selects quantity
- User adds product to cart

4. Cart Page (`cart.html`)
- User can view items in cart with variations
- User can adjust quantities
- User can remove items
- User can proceed to checkout → **Login Page**

5. Login Page (`login.html`)
- User chooses login method: Email or Phone Number
- User enters credentials and requests OTP
- User enters 6-digit OTP code (Demo: 123456)
- After successful verification → **Customer Information Page**

6. Customer Information Page (`customer-info.html`)
- User can update customer information: Name, phone number, email, address, delivery address
- Login information (email/phone) is pre-filled if logged in
- User can proceed to payment

7. Payment Page (`payment.html`)
- User can select payment method: cash, e-wallet, credit card, duitnow QR
- User can complete order
- Print a Sales Order, show message to ask customer to pay at counter

## Page Design
1. Home Page (`home.html`)
- Purpose: Landing page for the kiosk where customers begin ordering.
- Has large promotional banner / poster
- Two main buttons: Delivery and Own Collect

2. Products Page (`products.html`)
- Purpose: Display all products in a grid format.
- Products are grouped by categories.
- Each product has an image, name, price.
- **No Add to Cart button** - users must click on product to view details.
- Has a Left sidebar that is always visible and contains the category filter.
- Products are clickable and navigate to Product Details Page.

## Project Structure
```
Easy Sales V2/
├── home.html                 # Landing page with Delivery/Pickup options
├── products.html              # Product grid with category filtering
├── product-details.html         # Individual product details with variations
├── cart.html                 # Shopping cart management
├── login.html                # Login/signup with OTP verification
├── customer-info.html          # Customer information form
├── payment.html               # Payment method selection and checkout
├── pending-delivery.html      # NEW: Delivery management system
├── js/                       # NEW: Modular JavaScript files
│   ├── common.js             # Shared functions and data
│   ├── home.js              # Home page specific
│   ├── products.js           # Products page specific
│   ├── product-details.js    # Product details specific
│   ├── cart.js               # Cart page specific
│   ├── login.js              # Login page specific
│   ├── customer-info.js      # Customer info page specific
│   ├── payment.js            # Payment page specific
│   └── pending-delivery.js   # Delivery management specific
├── styles.css                # Global styling with yellow theme
├── images/                   # Product images (placeholder URLs)
└── README.MD                 # This documentation
```

## Key Features

### **Product Categories**
- **Roof**: Genting Konkrit Contour, Perabung Saga Ridge Tiles, Sudut Hip Starter
- **Precast Drain**: U-Drain 300x300mm, UDrain 375x375mm
- **Pipe Culvert**: Permentong 3x3, Penutup Permentong 3x3
- **Precast Post**: Tiang Pagar Simen 3x3, Tiang Pagar Simen 4x4

### **Enhanced User Experience**
- **Touch-friendly UI**: Large buttons, clear visual hierarchy
- **Responsive Design**: Works on vertical kiosk screens and mobile devices
- **Real-time Updates**: Cart count, notifications, and dynamic content
- **Session Persistence**: Cart and customer data persist across page navigation

### **Authentication System**
- **Multi-method Login**: Email or phone number with OTP verification
- **Demo OTP**: 123456 for testing purposes
- **Guest Checkout**: Skip login for quick ordering
- **Customer Data Collection**: Name, phone, email, delivery addresses
- **Signup Flow**: Primary contact verification → Name/IC collection → Secondary contact verification

### **Delivery Management**
- **Order Tracking**: Real-time status updates (Pending → Delivered)
- **Item Selection**: Individual checkbox selection for partial deliveries
- **Lorry Assignment**: Vehicle type selection per item
- **Invoice Generation**: Professional invoices with unique numbers
- **Delivery Orders**: DO numbers for delivery tracking
- **Print Functionality**: Printable invoices and delivery receipts

## Technical Implementation

### **Frontend Stack**
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom styling with Bootstrap 5 framework
- **JavaScript (ES6+)**: Modular, event-driven interactions
- **Bootstrap 5**: Responsive grid system and components
- **Bootstrap Icons**: Visual icons for better UX

### **Data Management**
- **Session Storage**: Cart persistence and user session state
- **Local Storage**: Completed deliveries and invoice history
- **Mock Data**: Sample products and delivery orders for demonstration

### **Key Functions**
- **Navigation**: `navigateToPage()`, `showProductDetails()`, `showCart()`
- **Cart Management**: `addToCart()`, `updateQuantity()`, `removeFromCart()`
- **Authentication**: `requestOTP()`, `verifyOTP()`, `proceedAsGuest()`
- **Delivery**: `generateInvoiceAndDO()`, `markDeliveryAsDelivered()`
- **UI Updates**: `updateCartDisplay()`, `showNotification()`

## UI Design Rules
- **Primary Color**: Yellow (#faed2c) for branding consistency
- **Button Sizing**: Minimum 60px height for touch interaction
- **High Contrast**: Ensure readability on kiosk screens
- **Visual Feedback**: Hover effects, transitions, and loading states
- **Mobile First**: Touch-friendly controls and navigation

## Business Rules
- **Malaysian Context**: Product names and pricing in Ringgit (RM)
- **Construction Focus**: Materials and equipment for building/industrial use
- **Delivery Logistics**: Real-world lorry sizes and delivery scenarios
- **Customer Service**: Professional order processing and documentation

## Known Limitations
- **No Backend**: All data is stored locally in browser storage
- **Static Products**: Product catalog is hardcoded for demonstration
- **Demo Authentication**: OTP verification uses fixed code (123456)
- **Single User**: No multi-user support or concurrent sessions

## AI Context
Instructions for AI agents working in this module:
1. **Focus**: Frontend UI/UX improvements and JavaScript functionality
2. **Scope**: Work within existing HTML/CSS/JS structure
3. **Data**: Use mock data and local storage for demonstrations
4. **Constraints**: No backend API integration or database modifications
5. **Priority**: User experience improvements and bug fixes over new features