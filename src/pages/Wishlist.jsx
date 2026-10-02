import { useEffect, useState } from "react";

function Wishlist() {

  const [wishlist, setWishlist] = useState([]);


  function getWishlistKey() {

    const currentUser =
      JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      return null;
    }

    return `wishlist_${currentUser.id}`;

  }


  // LOAD CURRENT USER'S WISHLIST
  useEffect(() => {

    const wishlistKey = getWishlistKey();

    if (!wishlistKey) {
      setWishlist([]);
      return;
    }


    const savedWishlist =
      JSON.parse(
        localStorage.getItem(wishlistKey)
      ) || [];


    setWishlist(savedWishlist);

  }, []);


  // REMOVE FROM WISHLIST
  function removeFromWishlist(id) {

    const updatedWishlist =
      wishlist.filter(item => item.id !== id);


    setWishlist(updatedWishlist);


    const wishlistKey =
      getWishlistKey();


    if (wishlistKey) {

      localStorage.setItem(
        wishlistKey,
        JSON.stringify(updatedWishlist)
      );

    }


    window.dispatchEvent(
      new Event("wishlistUpdated")
    );

  }


  return (

    <div className="page">

      <h1>My Wishlist</h1>


      {wishlist.length === 0 ? (

        <h2>Your wishlist is empty</h2>

      ) : (

        <div className="product-grid">

          {wishlist.map(item => (

            <div
              key={item.id}
              className="product-card"
            >

              <div className="product-image">

                <img
                  src={item.image}
                  alt={item.title}
                />

              </div>


              <h3>
                {item.title}
              </h3>


              <p className="category">
                {item.category}
              </p>


              <p className="price">
                ₹{item.price}
              </p>


              <button
                onClick={() =>
                  removeFromWishlist(item.id)
                }
              >
                Remove
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default Wishlist;