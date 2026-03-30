import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="container">
      <h1>Our Products</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <strong>Filter by Category:</strong>
        <div style={{ marginTop: '0.5rem' }}>
          {categories.map(category => (
            <button
              key={category}
              className={`btn ${filter === category ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter(category)}
              style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
