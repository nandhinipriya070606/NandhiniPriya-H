import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ cart }) {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'white' }}>
          🛍️ TechStore
        </Link>
        <div className="nav-links">
          <Link to="/">Shop</Link>
          <Link to="/cart">
            Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
