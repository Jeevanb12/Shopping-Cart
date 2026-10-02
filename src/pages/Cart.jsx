import { useEffect, useState } from "react";

function Cart() {

  const [cart, setCart] = useState([]);


  function getCartKey() {

    const currentUser =
      JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      return null;
    }

    return `cart_${currentUser.id}`;

  }


  // LOAD CURRENT USER'S CART
  useEffect(() => {

    const cartKey = getCartKey();

    if (!cartKey) {
      setCart([]);
      return;
    }


    const savedCart =
      JSON.parse(
        localStorage.getItem(cartKey)
      ) || [];


    setCart(savedCart);

  }, []);


  // REMOVE ITEM
  function removeItem(id) {

    const updatedCart =
      cart.filter(item => item.id !== id);


    setCart(updatedCart);


    const cartKey = getCartKey();

    if (cartKey) {

      localStorage.setItem(
        cartKey,
        JSON.stringify(updatedCart)
      );

    }


    window.dispatchEvent(
      new Event("cartUpdated")
    );

  }


  // INCREASE QUANTITY
  function increaseQuantity(id) {

    const updatedCart = cart.map(item =>

      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1
          }
        : item

    );


    setCart(updatedCart);


    const cartKey = getCartKey();

    if (cartKey) {

      localStorage.setItem(
        cartKey,
        JSON.stringify(updatedCart)
      );

    }


    window.dispatchEvent(
      new Event("cartUpdated")
    );

  }


  // DECREASE QUANTITY
  function decreaseQuantity(id) {

    const updatedCart = cart.map(item =>

      item.id === id && item.quantity > 1
        ? {
            ...item,
            quantity: item.quantity - 1
          }
        : item

    );


    setCart(updatedCart);


    const cartKey = getCartKey();

    if (cartKey) {

      localStorage.setItem(
        cartKey,
        JSON.stringify(updatedCart)
      );

    }


    window.dispatchEvent(
      new Event("cartUpdated")
    );

  }


  // TOTAL
  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );


  return (

    <div className="page">

      <h1>Shopping Cart</h1>


      {cart.length === 0 ? (

        <h2>Your cart is empty</h2>

      ) : (

        <>

          {cart.map(item => (

            <div
              key={item.id}
              className="cart-item"
            >

              <img
                src={item.image}
                alt={item.title}
                width="100"
              />


              <div>

                <h2>
                  {item.title}
                </h2>


                <p>
                  ₹{item.price}
                </p>


                <div>

                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    -
                  </button>


                  <span>
                    {" "}
                    {item.quantity}
                    {" "}
                  </span>


                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>

                </div>


                <button
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}


          <hr />


          <h2>
            Total: ₹{total.toFixed(2)}
          </h2>

        </>

      )}

    </div>

  );
}

export default Cart;