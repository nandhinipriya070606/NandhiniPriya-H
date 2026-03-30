import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Checkout({ cart, onClearCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderMessage, setOrderMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.email || !formData.address) {
      setOrderMessage('Please fill in all required fields');
      return;
    }

    if (cart.length === 0) {
      setOrderMessage('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: cart,
          customerName: formData.customerName,
          email: formData.email,
          address: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
          total: total
        })
      });

      if (response.ok) {
        const order = await response.json();
        setOrderMessage(`Order placed successfully! Order ID: ${order.id}`);
        onClearCart();
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setOrderMessage('Error placing order. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setOrderMessage('Error placing order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && !orderMessage) {
    return (
      <div className="container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add items to your cart before checking out</p>
          <Link to="/" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderMessage.includes('successfully')) {
    return (
      <div className="container">
        <div className="success-message" style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', textAlign: 'center' }}>
          <h2>✓ {orderMessage}</h2>
          <p>Thank you for your purchase! Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Checkout</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', marginTop: '2rem', maxWidth: '900px', margin: '2rem auto' }}>
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>Billing Information</h2>
          
          {orderMessage && <div className="error-message">{orderMessage}</div>}

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="123 Main Street"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="New York"
                required
              />
            </div>

            <div className="form-group">
              <label>Zip Code *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="10001"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success"
            disabled={isProcessing}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </button>
        </form>

        <div>
          <div className="admin-card">
            <h3>Order Summary</h3>
            
            {cart.map(item => (
              <div key={item.id} style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #ecf0f1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item.name}</span>
                  <span>₹{item.price.toFixed(2)}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
                  Qty: {item.quantity}
                </div>
              </div>
            ))}

            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid #ecf0f1' }}>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%):</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
