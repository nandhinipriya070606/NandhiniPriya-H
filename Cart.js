import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Cart({ cart, onRemove, onUpdateQuantity, onClearCart }) {
  const [notification, setNotification] = useState('');

  const handleRemove = (productId) => {
    onRemove(productId);
    setNotification('Item removed from cart');
    setTimeout(() => setNotification(''), 2000);
  };

  const handleQuantityChange = (productId, quantity) => {
    const newQuantity = parseInt(quantity);
    if (newQuantity > 0) {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      
      {notification && <div className="success-message">{notification}</div>}

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Continue shopping to add items to your cart</p>
          <Link to="/" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price.toFixed(2)}</p>
                </div>
                <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="quantity-input"
                />
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            
            <Link to="/checkout" className="btn btn-success" style={{ marginTop: '1rem', display: 'block', textAlign: 'center', textDecoration: 'none' }}>
              Proceed to Checkout
            </Link>
            
            <button
              className="btn btn-secondary"
              onClick={onClearCart}
              style={{ marginTop: '0.5rem' }}
            >
              Clear Cart
            </button>
            
            <Link to="/" className="btn btn-primary" style={{ marginTop: '0.5rem', display: 'block', textAlign: 'center', textDecoration: 'none' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
