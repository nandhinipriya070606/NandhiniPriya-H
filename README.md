# E-Commerce Website

A full-stack e-commerce application with product listing, shopping cart, checkout system, and admin dashboard.

## Features

- **Product Listing**: Browse all available products with filtering by category
- **Shopping Cart**: Add products to cart, update quantities, and view cart summary
- **Checkout System**: Complete order with customer information and address
- **Admin Dashboard**: 
  - View sales statistics and order metrics
  - Manage products (Create, Read, Update, Delete)
  - Manage orders and update order status
  - Real-time sales tracking

## Project Structure

```
e-commerce-website/
├── backend/                 # Express.js server
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # React application
│   ├── public/
│   │   └── index.html      # HTML template
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── App.js          # Main app component
│   │   ├── App.css         # Styling
│   │   └── index.js        # React entry point
│   └── package.json        # Frontend dependencies
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend application:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

### Customer Features

1. **Home Page**: Browse products and filter by category
2. **Add to Cart**: Click "Add to Cart" on any product
3. **Shopping Cart**: View items, adjust quantities, and see order summary
4. **Checkout**: Enter shipping information and complete purchase
5. **Order Confirmation**: Receive order ID confirmation

### Admin Features

1. Navigate to `/admin` or click "Admin" in navigation
2. **Dashboard Tab**: View sales metrics and order statistics
3. **Products Tab**: 
   - Add new products
   - Edit existing products
   - Delete products
4. **Orders Tab**:
   - View all customer orders
   - Update order status (Pending → Processing → Shipped → Delivered)
   - View detailed order information

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get specific order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status

### Stats
- `GET /api/stats` - Get dashboard statistics

## Sample Products

The backend comes pre-populated with sample products:
- Wireless Headphones ($79.99)
- USB-C Cable ($12.99)
- Phone Case ($24.99)
- Portable Charger ($49.99)
- Screen Protector ($9.99)
- Wireless Charger ($34.99)

## Key Features

### Shopping Cart
- Persistent storage using localStorage
- Real-time update of cart count in navigation
- Quantity adjustment and item removal
- Automatic tax calculation (10%)

### Checkout
- Form validation for customer information
- Order confirmation with Order ID
- Automatic redirect to home after successful order
- Error handling and user feedback

### Admin Dashboard
- Real-time statistics update (every 5 seconds)
- Product CRUD operations
- Order status management
- Pending orders tracking
- Sales metrics display

## Technologies Used

### Backend
- Express.js - Web framework
- CORS - Cross-origin requests
- Body-parser - Request parsing

### Frontend
- React - UI library
- React Router - Navigation
- CSS3 - Styling (fully responsive)
- LocalStorage - Cart persistence

## Responsive Design

The application is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile devices

## Future Enhancements

- User authentication and profiles
- Payment processing integration
- Product search functionality
- Customer reviews and ratings
- Email notifications
- Inventory management
- Advanced reporting

## License

MIT License

## Support

For issues and questions, please refer to the individual component files for more information.
