import React from 'react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-price">₹{product.price.toFixed(2)}</div>
        <div className="product-description">{product.description}</div>
        <div style={{ fontSize: '0.85rem', color: '#95a5a6', margin: '0.5rem 0' }}>
          Category: {product.category}
        </div>
        <div className="product-buttons">
          <button
            className="btn btn-success"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
