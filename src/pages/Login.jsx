import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function handleLogin(e) {

    e.preventDefault();


    // Get all registered users
    const users =
      JSON.parse(localStorage.getItem("users")) || [];


    // Find matching user
    const user = users.find(
      user =>
        user.email === email &&
        user.password === password
    );


    if (!user) {

      alert("Invalid email or password");
      return;

    }


    // Store currently logged-in user
    localStorage.setItem(
      "loggedIn",
      "true"
    );


    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );


    alert(`Welcome ${user.name}!`);

    navigate("/");

  }


  return (

    <div className="auth-page">

      <div className="auth-container">

        <div className="auth-brand">

          <div className="brand-logo">
            ShopNest
          </div>

          <h1>
            Welcome
            <br />
            Back!
          </h1>

          <p>
            Discover great products,
            manage your cart and enjoy
            a simple shopping experience.
          </p>

          <div className="brand-decoration">
            🛍️
          </div>

        </div>


        <div className="auth-form-container">

          <div className="auth-header">

            <h2>Login</h2>

            <p>
              Welcome back! Please enter
              your details.
            </p>

          </div>


          <form onSubmit={handleLogin}>

            <div className="input-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>


            <div className="input-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>


            <button
              type="submit"
              className="auth-button"
            >
              Login
            </button>

          </form>


          <div className="auth-footer">

            <span>
              Don't have an account?
            </span>

            <Link to="/register">
              Create account
            </Link>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Login;