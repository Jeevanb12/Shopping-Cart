import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";


  useEffect(() => {

    fetch("https://fakestoreapi.com/products")
      .then(response => {

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();

      })
      .then(data => {

        setProducts(data);
        setLoading(false);

      })
      .catch(error => {

        console.log(error);
        setError(true);
        setLoading(false);

      });

  }, []);


  // ADD TO CART
  function addToCart(product) {

    const currentUser =
      JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {

      alert("Please login first");
      return;

    }


    const cartKey = `cart_${currentUser.id}`;


    const cart =
      JSON.parse(localStorage.getItem(cartKey)) || [];


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
  function addToWishlist(product) {

    const currentUser =
      JSON.parse(localStorage.getItem("currentUser"));


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


    const alreadyExists = wishlist.some(
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
        <h2>Loading products...</h2>
      </div>
    );

  }


  if (error) {

    return (
      <div className="page">
        <h2>Failed to load products 😕</h2>
        <p>Please try again later.</p>
      </div>
    );

  }


  const filteredProducts = products.filter(product => {

    const matchesSearch =
      product.title
        .toLowerCase()
        .includes(search.toLowerCase());


    const matchesCategory =
      category === "" ||
      product.category === category;


    return matchesSearch && matchesCategory;

  });


  return (

    <div className="page">

      <div className="page-heading">

        <h1>All Products</h1>


        {search && (
          <p>
            Search results for:
            {" "}
            <b>{search}</b>
          </p>
        )}


        {category && (
          <p>
            Category:
            {" "}
            <b>{category}</b>
          </p>
        )}

      </div>


      <div className="product-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map(product => (

            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
            />

          ))

        ) : (

          <h2>No products found.</h2>

        )}

      </div>

    </div>

  );
}

export default Products;