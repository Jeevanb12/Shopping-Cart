import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);


  // GET CURRENT USER
  function getCurrentUser() {

    return JSON.parse(
      localStorage.getItem("currentUser")
    );

  }


  // LOAD CURRENT USER
  useEffect(() => {

    setCurrentUser(getCurrentUser());

  }, []);


  // UPDATE CART COUNT
  useEffect(() => {

    function updateCartCount() {

      const user = getCurrentUser();

      if (!user) {

        setCartCount(0);
        return;

      }


      const cartKey = `cart_${user.id}`;

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

      const user = getCurrentUser();

      if (!user) {

        setWishlistCount(0);
        return;

      }


      const wishlistKey =
        `wishlist_${user.id}`;


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


    setCurrentUser(null);
    setCartCount(0);
    setWishlistCount(0);


    navigate("/login");

  }


  return (

    <nav className="navbar">


      {/* LOGO */}

      <Link
        to="/"
        className="logo"
      >
        ShopNest
      </Link>


      {/* SEARCH */}

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


      {/* NAVIGATION */}

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


        {/* LOGGED IN / LOGGED OUT */}

        {currentUser ? (

          <>

            <span className="user-name">
              Hi, {currentUser.name}
            </span>


            <button
              onClick={logout}
              className="logout-btn"
            >
              Logout
            </button>

          </>

        ) : (

          <Link to="/login">
            Login
          </Link>

        )}


      </div>

    </nav>

  );
}

export default Navbar;