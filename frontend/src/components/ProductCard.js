import React from 'react';
import './ProductCard.css'; // Assuming you're creating a separate CSS file for styling

const ProductCard = ({ product, onEdit, onDelete, onAddToCart, onToggleFavorite, favorites }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">${product.price}</p>
      <div className="button-container">
        <button className="btn add-to-cart" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
        <button className="btn edit" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button className="btn delete" onClick={() => onDelete(product.id)}>
          Delete
        </button>
        <button className="btn favorite" onClick={() => onToggleFavorite(product)}>
          {favorites.some((fav) => fav.id === product.id) ? 'Unstar' : 'Star'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
