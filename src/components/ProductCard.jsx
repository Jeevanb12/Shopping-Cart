import { Link } from "react-router-dom";

function ProductCard({
  product,
  addToCart,
  addToWishlist
}) {

  return (

    <div className="product-card">

      <div className="product-image">

        <img
          src={product.image}
          alt={product.title}
        />

      </div>


      <h3>
        {product.title}
      </h3>


      <p className="category">
        {product.category}
      </p>


      <p className="price">
        ₹{product.price}
      </p>


      <div className="card-buttons">

        <button
          onClick={() =>
            addToCart(product)
          }
        >
          Add to Cart
        </button>


        <button
          className="wishlist-btn"
          onClick={() =>
            addToWishlist(product)
          }
        >
          ❤️
        </button>

      </div>


      <Link
        to={`/products/${product.id}`}
        className="details-btn"
      >
        View Details
      </Link>

    </div>

  );
}

export default ProductCard;