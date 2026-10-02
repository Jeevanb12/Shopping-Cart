import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);


  // GET CURRENT USER
  function getCurrentUser() {

    return JSON.parse(
      localStorage.getItem("currentUser")
    );

  }


  // UPDATE CART COUNT
  useEffect(() => {

    function updateCartCount() {

      const currentUser =
        getCurrentUser();


      if (!currentUser) {

        setCartCount(0);
        return;

      }


      const cartKey =
        `cart_${currentUser.id}`;


      const cart =
        JSON.parse(
          localStorage.getItem(cartKey)
        ) || [];


      setCartCount(cart.length);

    }


    updateCartCount();


    window.addEventListener(
      "cartUpdated",
      updateCartCount
    );


    return () => {

      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );

    };

  }, []);


  // UPDATE WISHLIST COUNT
  useEffect(() => {

    function updateWishlistCount() {

      const currentUser =
        getCurrentUser();


      if (!currentUser) {

        setWishlistCount(0);
        return;

      }


      const wishlistKey =
        `wishlist_${currentUser.id}`;


      const wishlist =
        JSON.parse(
          localStorage.getItem(wishlistKey)
        ) || [];


      setWishlistCount(
        wishlist.length
      );

    }


    updateWishlistCount();


    window.addEventListener(
      "wishlistUpdated",
      updateWishlistCount
    );


    return () => {

      window.removeEventListener(
        "wishlistUpdated",
        updateWishlistCount
      );

    };

  }, []);


  // SEARCH
  function handleSearch(e) {

    e.preventDefault();


    if (search.trim() === "") {

      navigate("/products");
      return;

    }


    navigate(
      `/products?search=${encodeURIComponent(search)}`
    );

  }


  // LOGOUT
  function logout() {

    localStorage.removeItem(
      "loggedIn"
    );


    localStorage.removeItem(
      "currentUser"
    );


    setCartCount(0);
    setWishlistCount(0);


    navigate("/login");

  }


  const currentUser =
    getCurrentUser();


  return (

    <nav className="navbar">


      <Link
        to="/"
        className="logo"
      >
        ShopNest
      </Link>


      <form
        className="search-box"
        onSubmit={handleSearch}
      >

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e =>
            setSearch(e.target.value)
          }
        />


        <button type="submit">
          Search
        </button>

      </form>


      <div className="nav-links">

        <Link to="/">
          Home
        </Link>


        <Link to="/products">
          Products
        </Link>


        <Link to="/wishlist">
          ❤️ Wishlist ({wishlistCount})
        </Link>


        <Link to="/cart">
          🛒 Cart ({cartCount})
        </Link>


        {currentUser && (

          <span className="user-name">
            Hi, {currentUser.name}
          </span>

        )}


        <button
          onClick={logout}
          className="logout-btn"
        >
          Logout
        </button>

      </div>

    </nav>

  );
}

export default Navbar;