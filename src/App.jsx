import "./App.css";

import { lazy, Suspense } from "react";
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";


const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));


function App() {

  const location = useLocation();

  // Hide navbar on authentication pages
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";


  return (

    <>

      {!hideNavbar && <Navbar />}


      <ErrorBoundary>

        <Suspense fallback={<h2>Loading...</h2>}>

          <Routes>

            {/* Home */}

            <Route
              path="/"
              element={<Home />}
            />


            {/* Products */}

            <Route
              path="/products"
              element={<Products />}
            />


            {/* Product Details */}

            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />


            {/* Protected Cart */}

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />


            {/* Protected Wishlist */}

            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />


            {/* Authentication */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

          </Routes>

        </Suspense>

      </ErrorBoundary>

    </>

  );
}

export default App;