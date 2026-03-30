const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database
let products = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, description: 'Premium noise-cancelling wireless headphones with 30-hour battery life', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', category: 'Electronics' },
  { id: 2, name: 'USB-C Cable', price: 12.99, description: 'Durable 6ft USB-C charging and data cable', image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&h=300&fit=crop', category: 'Accessories' },
  { id: 3, name: 'Premium Phone Case', price: 24.99, description: 'Protective TPU + PC phone case with shock absorption', image: 'https://images.unsplash.com/photo-1592286927505-1def25e29f21?w=300&h=300&fit=crop', category: 'Accessories' },
  { id: 4, name: 'Portable Charger', price: 49.99, description: '20000mAh portable power bank with fast charging', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop', category: 'Electronics' },
  { id: 5, name: 'Screen Protector', price: 9.99, description: 'Tempered glass screen protector with easy installation', image: 'https://images.unsplash.com/photo-1589492477829-5e75b7293cb7?w=300&h=300&fit=crop', category: 'Accessories' },
  { id: 6, name: 'Fast Wireless Charger', price: 34.99, description: '15W fast wireless charging pad with LED indicator', image: 'https://images.unsplash.com/photo-1591290621144-30d0f876e8c1?w=300&h=300&fit=crop', category: 'Electronics' },
  { id: 7, name: 'Laptop Stand', price: 44.99, description: 'Adjustable aluminum laptop stand for better ergonomics', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop', category: 'Electronics' },
  { id: 8, name: 'Wireless Mouse', price: 29.99, description: 'Silent wireless mouse with precision tracking', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop', category: 'Electronics' },
  { id: 9, name: 'Keyboard Switch Set', price: 39.99, description: 'Mechanical keyboard switches with red tactile response', image: 'https://images.unsplash.com/photo-1587829191301-4b5ba1ab4908?w=300&h=300&fit=crop', category: 'Accessories' },
  { id: 10, name: 'USB Hub', price: 19.99, description: '4 Port USB 3.0 Hub with power adapter', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=300&fit=crop', category: 'Electronics' },
  { id: 11, name: 'Phone Ring Stand', price: 7.99, description: 'Rotating phone ring stand with magnetic mounting', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop', category: 'Accessories' },
  { id: 12, name: 'Car Phone Mount', price: 16.99, description: 'Dashboard and windshield phone mount with strong grip', image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop', category: 'Accessories' },
  { id: 13, name: 'Bluetooth Speaker', price: 54.99, description: 'Portable waterproof Bluetooth speaker with 360° sound', image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=300&h=300&fit=crop', category: 'Electronics' },
  { id: 14, name: 'Camera Lens Cap', price: 5.99, description: 'Universal camera lens cap for DSLR and mirrorless cameras', image: 'https://images.unsplash.com/photo-1606986628028-a87dff4d8e7d?w=300&h=300&fit=crop', category: 'Accessories' },
  { id: 15, name: 'HDMI Cable', price: 11.99, description: '6ft high-speed HDMI 2.1 cable for 4K video', image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&h=300&fit=crop', category: 'Accessories' },
  { id: 16, name: 'Webcam 1080p', price: 64.99, description: 'Full HD webcam with auto-focus and noise-cancelling mic', image: 'https://images.unsplash.com/photo-1598765046696-b74ef7f4654b?w=300&h=300&fit=crop', category: 'Electronics' },
  { id: 17, name: 'LED Desk Lamp', price: 39.99, description: 'Dimmable LED desk lamp with USB charging port', image: 'https://images.unsplash.com/photo-1565636192335-14f82952d81b?w=300&h=300&fit=crop', category: 'Electronics' },
  { id: 18, name: 'Tablet Stylus', price: 34.99, description: 'Precision stylus for tablets with pressure sensitivity', image: 'https://images.unsplash.com/photo-1588821291841-8ec07f00ce38?w=300&h=300&fit=crop', category: 'Accessories' },
  { id: 19, name: 'Cable Organizer', price: 14.99, description: '5-pack silicone cable organizer clips', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=300&fit=crop', category: 'Accessories' },
  { id: 20, name: 'Monitor Arm', price: 69.99, description: 'Adjustable monitor arm for dual or single display', image: 'https://images.unsplash.com/photo-1575902320051-091c63ec7ea0?w=300&h=300&fit=crop', category: 'Electronics' }
];

let orders = [];
let nextOrderId = 1;

// Product routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.post('/api/products', (req, res) => {
  const newProduct = {
    id: Math.max(...products.map(p => p.id), 20) + 1,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image || 'https://via.placeholder.com/200?text=Product',
    category: req.body.category || 'General'
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.image = req.body.image || product.image;
    product.category = req.body.category || product.category;
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index > -1) {
    const deleted = products.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Order routes
app.post('/api/orders', (req, res) => {
  const order = {
    id: nextOrderId++,
    items: req.body.items,
    customerName: req.body.customerName,
    email: req.body.email,
    address: req.body.address,
    total: req.body.total,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  res.status(201).json(order);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.put('/api/orders/:id/status', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (order) {
    order.status = req.body.status;
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Stats route for admin dashboard
app.get('/api/stats', (req, res) => {
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  res.json({
    totalProducts: products.length,
    totalOrders: orders.length,
    totalSales: totalSales.toFixed(2),
    pendingOrders: orders.filter(o => o.status === 'Pending').length
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
