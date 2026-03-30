import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'General'
  });
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetchStats();
    fetchProducts();
    fetchOrders();

    // Refresh every 5 seconds
    const interval = setInterval(() => {
      fetchStats();
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      alert('Please fill in name and price');
      return;
    }

    try {
      const url = editingId
        ? `http://localhost:5000/api/products/${editingId}`
        : 'http://localhost:5000/api/products';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          description: formData.description,
          category: formData.category
        })
      });

      if (response.ok) {
        fetchProducts();
        setFormData({ name: '', price: '', description: '', category: 'General' });
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'DELETE'
        });
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category
    });
    setEditingId(product.id);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <div style={{ marginBottom: '2rem' }}>
        <button
          className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('dashboard')}
          style={{ marginRight: '0.5rem' }}
        >
          Dashboard
        </button>
        <button
          className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('products')}
          style={{ marginRight: '0.5rem' }}
        >
          Products
        </button>
        <button
          className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div>
          <h2>Overview</h2>
          <div className="admin-container">
            <div className="admin-card">
              <div className="stat-label">Total Products</div>
              <div className="stat-value">{stats?.totalProducts || 0}</div>
            </div>
            <div className="admin-card">
              <div className="stat-label">Total Orders</div>
              <div className="stat-value">{stats?.totalOrders || 0}</div>
            </div>
            <div className="admin-card">
              <div className="stat-label">Total Sales</div>
              <div className="stat-value">₹{stats?.totalSales || '0.00'}</div>
            </div>
            <div className="admin-card">
              <div className="stat-label">Pending Orders</div>
              <div className="stat-value">{stats?.pendingOrders || 0}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          <h2>Products</h2>
          
          <form onSubmit={handleAddProduct} className="admin-form">
            <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
            
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="General"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows="3"
              ></textarea>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-success">
                {editingId ? 'Update Product' : 'Add Product'}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ name: '', price: '', description: '', category: 'General' });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="admin-card" style={{ marginTop: '2rem' }}>
            <h3>Product List</h3>
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>₹{product.price.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEditProduct(product)}
                        style={{ marginRight: '0.5rem', padding: '0.5rem 1rem' }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteProduct(product.id)}
                        style={{ padding: '0.5rem 1rem' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <h2>Orders</h2>
          <div className="admin-card">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>₹{order.total.toFixed(2)}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        style={{ padding: '0.5rem' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                        onClick={() => alert(`Order ID: ${order.id}\nCustomer: ${order.customerName}\nEmail: ${order.email}\nAddress: ${order.address}\nItems: ${order.items.length}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
