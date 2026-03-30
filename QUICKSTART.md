# Quick Start Guide

## Current Status
✅ **Both servers are running!**
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## Features to Test

### 1. **Browse Products** (Home Page)
- Navigate to http://localhost:3000
- View all 6 sample products with images and prices
- Filter products by category (Electronics, Accessories, General)
- Each product shows: name, price, description, and category

### 2. **Add Items to Cart**
- Click "Add to Cart" on any product
- See the cart count increase in the navigation bar
- Add multiple items and adjust quantities

### 3. **View Shopping Cart**
- Click "Cart" in the navigation or go to http://localhost:3000/cart
- View all items with images, prices, and quantities
- Adjust item quantities using the input field
- Remove individual items
- See automatic tax calculation (10% added)
- View order summary (Subtotal, Tax, Total)
- Option to clear entire cart

### 4. **Checkout**
- From cart page, click "Proceed to Checkout"
- Or navigate to http://localhost:3000/checkout
- Fill in customer information:
  - Full Name
  - Email
  - Address
  - City
  - Zip Code
- Click "Place Order"
- Get order confirmation with Order ID
- Cart automatically clears after successful order

### 5. **Admin Dashboard**
- Click "Admin" in navigation or go to http://localhost:3000/admin
- Three tabs available:

#### Dashboard Tab
- View real-time statistics:
  - Total Products count
  - Total Orders count
  - Total Sales (revenue)
  - Pending Orders count
- Stats refresh every 5 seconds

#### Products Tab
- **Add New Product:**
  - Enter product name, price, description, category
  - Click "Add Product"
  - New product appears in the product list

- **Manage Products:**
  - Edit any product: Click "Edit" button, modify details, click "Update Product"
  - Delete any product: Click "Delete" button (confirmation required)
  - All changes reflect immediately on the store

#### Orders Tab
- View all customer orders in a table
- Update order status for each order:
  - Pending → Processing → Shipped → Delivered
  - Can also set to Cancelled
- Click "View" to see detailed order information
- See order ID, customer name, total, date placed, and current status

## Sample Test Workflow

1. **Add products to cart:**
   - Add "Wireless Headphones" (qty: 2)
   - Add "Phone Case" (qty: 1)
   - Add "USB-C Cable" (qty: 3)

2. **Proceed to checkout:**
   - Click "Proceed to Checkout"
   - Enter test customer information
   - Click "Place Order"

3. **Check admin dashboard:**
   - Go to Admin → Orders Tab
   - See your order in the list
   - Update order status from "Pending" to "Processing"
   - Return to Dashboard Tab to see updated stats

4. **Add new product:**
   - Go to Admin → Products Tab
   - Add a new product:
     - Name: "Laptop Stand"
     - Price: 49.99
     - Category: "Accessories"
     - Description: "Aluminum laptop stand"
   - Product appears in store immediately

## API Endpoints (for testing with curl/Postman)

### Get all products
```
GET http://localhost:5000/api/products
```

### Create an order
```
POST http://localhost:5000/api/orders
Body: {
  "items": [...],
  "customerName": "John Doe",
  "email": "john@example.com",
  "address": "123 Main St, New York, 10001",
  "total": 150.50
}
```

### Get all orders
```
GET http://localhost:5000/api/orders
```

### View stats
```
GET http://localhost:5000/api/stats
```

### Add product
```
POST http://localhost:5000/api/products
Body: {
  "name": "Product Name",
  "price": 99.99,
  "description": "Description",
  "category": "Category"
}
```

## Key Features Demonstrated

✅ **Product Listing** - Browse and filter products by category
✅ **Shopping Cart** - Add items, update quantities, manage cart
✅ **Checkout System** - Complete order with customer info
✅ **Admin Dashboard** - Full product and order management
✅ **Real-time Updates** - Stats and orders update automatically
✅ **Data Persistence** - Cart saved in browser localStorage
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Professional UI** - Clean, modern interface with proper styling

## Troubleshooting

**Can't add to cart?**
- Make sure backend is running on port 5000
- Check browser console for errors (F12)

**Orders not showing in admin?**
- Refresh the admin dashboard
- Stats update every 5 seconds automatically

**Product not showing in store?**
- Refresh the page
- Check Products tab in Admin to verify it was saved

**Styling looks off?**
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh the page (Ctrl+R)

## File Structure
```
e-commerce-website/
├── backend/
│   ├── server.js (API endpoints)
│   ├── package.json
│   └── node_modules/
├── frontend/
│   ├── src/
│   │   ├── pages/ (ProductList, Cart, Checkout, AdminDashboard)
│   │   ├── components/ (ProductCard, Navigation)
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── node_modules/
├── README.md
└── start.bat
```

Enjoy your e-commerce platform! 🛍️
