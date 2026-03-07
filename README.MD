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

3. Product Details Page (`product-details.html`)
- Purpose: Show detailed product information and allow customization.
- Large product image display.
- Product description and price.
- **Product Variations**: Users can select different sizes, types, or specifications.
- **Quantity Selector**: Users can select desired quantity.
- **Add to Cart Button**: Only available on this page.
- Navigation back to products and to cart.

4. Cart Page (`cart.html`)
- Purpose: Review and manage items before checkout.
- Display all cart items with variations.
- Quantity adjustment controls.
- Remove item functionality.
- Total price calculation.
- Proceed to checkout button.

5. Customer Information Page (`customer-info.html`)
- Purpose: Collect customer details for order processing.
- Form fields: Name, Phone, Email, Address, Delivery Address.
- Order type display (Delivery/Pickup).
- Navigation back to cart and forward to payment.

6. Payment Page (`payment.html`)
- Purpose: Select payment method and complete order.
- Payment options: Cash, E-Wallet, Credit Card, DuitNow QR.
- Order summary display.
- Complete order button.
- Order confirmation modal with print functionality.

## Project Structure
```
Easy Sales V2/
├── home.html                 # Landing page with Delivery/Pickup options
├── products.html             # Product grid with category filtering
├── product-details.html      # Individual product details with variations
├── cart.html                 # Shopping cart management
├── login.html                # Login/signup with OTP verification
├── customer-info.html        # Customer information form
├── payment.html              # Payment method selection and checkout
├── index.html                # Original single-page version (legacy)
├── styles.css                # Global styling with yellow theme
├── script.js                 # JavaScript functionality and navigation
├── README.MD                 # Project documentation
└── images/                   # Product images folder
    ├── tools/
    ├── materials/
    ├── safety/
    └── electronics/
```

## Key Features
- **Separate HTML Files**: Each page is now a separate HTML file for better organization.
- **Product Variations**: Products now have multiple variations (size, type, specifications).
- **Enhanced Product Details**: Dedicated page for product information and customization.
- **Login/Signup System**: Email or phone login with OTP verification (Demo OTP: 123456).
- **Session Storage**: Cart and customer data persist across page navigation.
- **Touch-Friendly Design**: Optimized for kiosk touch screens.
- **Responsive Layout**: Works on both vertical kiosk screens and mobile devices.
- **Print Functionality**: Generate sales orders for counter payment.

## Key UI Design Rules
- Primary Color: Yellow #faed2c
- Use large, touch-friendly buttons and controls
- Ensure high contrast for readability
- Keep navigation simple and intuitive
- Use clear visual hierarchy

## Data Models

## API Contracts

## Business Rules

## Known Limitations

## AI Context
Instructions for AI agents working in this module.