import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  // FETCH PRODUCT
  useEffect(() => {

    fetch(
      `https://fakestoreapi.com/products/${id}`
    )
      .then(response => {

        if (!response.ok) {
          throw new Error("Product not found");
        }

        return response.json();

      })
      .then(data => {

        setProduct(data);
        setLoading(false);

      })
      .catch(error => {

        console.log(error);
        setError(true);
        setLoading(false);

      });

  }, [id]);


  // ADD TO CART
  function addToCart() {

    const currentUser =
      JSON.parse(
        localStorage.getItem("currentUser")
      );


    if (!currentUser) {

      alert("Please login first");
      return;

    }


    const cartKey =
      `cart_${currentUser.id}`;


    const cart =
      JSON.parse(
        localStorage.getItem(cartKey)
      ) || [];


    const existingProduct = cart.find(
      item => item.id === product.id
    );


    let updatedCart;


    if (existingProduct) {

      updatedCart = cart.map(item =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      );

    } else {

      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ];

    }


    localStorage.setItem(
      cartKey,
      JSON.stringify(updatedCart)
    );


    window.dispatchEvent(
      new Event("cartUpdated")
    );


    alert("Added to cart");

  }


  // ADD TO WISHLIST
  function addToWishlist() {

    const currentUser =
      JSON.parse(
        localStorage.getItem("currentUser")
      );


    if (!currentUser) {

      alert("Please login first");
      return;

    }


    const wishlistKey =
      `wishlist_${currentUser.id}`;


    const wishlist =
      JSON.parse(
        localStorage.getItem(wishlistKey)
      ) || [];


    const alreadyExists =
      wishlist.some(
        item => item.id === product.id
      );


    if (alreadyExists) {

      alert("Already in wishlist");
      return;

    }


    const updatedWishlist = [
      ...wishlist,
      product
    ];


    localStorage.setItem(
      wishlistKey,
      JSON.stringify(updatedWishlist)
    );


    window.dispatchEvent(
      new Event("wishlistUpdated")
    );


    alert("Added to wishlist");

  }


  if (loading) {

    return (
      <div className="page">
        <h2>Loading product...</h2>
      </div>
    );

  }


  if (error || !product) {

    return (
      <div className="page">
        <h2>Product not found 😕</h2>
      </div>
    );

  }


  return (

    <div className="product-details">


      <div className="details-image">

        <img
          src={product.image}
          alt={product.title}
        />

      </div>


      <div className="details-content">

        <p className="category">
          {product.category}
        </p>


        <h1>
          {product.title}
        </h1>


        <p className="price">
          ₹{product.price}
        </p>


        <p>
          {product.description}
        </p>


        <p>
          ⭐ {product.rating?.rate}
          {" "}
          ({product.rating?.count} reviews)
        </p>


        <div className="details-buttons">

          <button
            onClick={addToCart}
          >
            Add to Cart
          </button>


          <button
            onClick={addToWishlist}
          >
            ❤️ Add to Wishlist
          </button>

        </div>

      </div>

    </div>

  );
}

export default ProductDetails;