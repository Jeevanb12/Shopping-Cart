import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function handleRegister(e) {

    e.preventDefault();


    if (!name || !email || !password) {

      alert("Please fill all fields");
      return;

    }


    // Get existing users
    const users =
      JSON.parse(localStorage.getItem("users")) || [];


    // Check whether email already exists
    const existingUser = users.find(
      user => user.email === email
    );


    if (existingUser) {

      alert("An account with this email already exists");
      return;

    }


    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password
    };


    // Add new user to existing users
    users.push(newUser);


    // Save all users
    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );


    alert("Registration successful");

    navigate("/login");

  }


  return (

    <div className="auth-page">

      <div className="auth-container">

        <div className="auth-brand">

          <div className="brand-logo">
            ShopNest
          </div>

          <h1>
            Start Your
            <br />
            Shopping Journey
          </h1>

          <p>
            Create your account and
            explore thousands of products
            from our collection.
          </p>

          <div className="brand-decoration">
            🛒
          </div>

        </div>


        <div className="auth-form-container">

          <div className="auth-header">

            <h2>Create Account</h2>

            <p>
              Enter your details to get started.
            </p>

          </div>


          <form onSubmit={handleRegister}>

            <div className="input-group">

              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={e =>
                  setName(e.target.value)
                }
                required
              />

            </div>


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
                placeholder="Create a password"
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
              Create Account
            </button>

          </form>


          <div className="auth-footer">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Login
            </Link>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Register;