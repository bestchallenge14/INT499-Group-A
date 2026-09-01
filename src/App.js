/*  
    StreamList App
    Stephen Foster, Jose Hernandez
    The University of Arizona Global Campus
    INT499: Capstone for Information Technology
    Professor Amine Dehmani
    August 31, 2026
*/

import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "./components/Navbar";
import Login from "./components/Login";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import CreditCard from "./pages/CreditCard";
import About from "./pages/About";
import Shop from "./components/Shop";

import "./App.css";

const GOOGLE_CLIENT_ID =
  "704894479211-g7d72u5sluqch55e92d3199ht25irete.apps.googleusercontent.com";


/* Protects pages from unauthenticated users */
function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


function App() {

  /* ---------------- Authentication ---------------- */

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("eztech_auth") === "true";
  });


  const handleLogout = () => {
    localStorage.removeItem("eztech_auth");
    setIsAuthenticated(false);
  };


  /* ---------------- Shopping Cart ---------------- */

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("streamListCart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });


  useEffect(() => {
    localStorage.setItem(
      "streamListCart",
      JSON.stringify(cart)
    );
  }, [cart]);


  const handleChange = (item, change) => {
    setCart((currentCart) =>
      currentCart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              amount: Math.max(
                1,
                cartItem.amount + change
              ),
            }
          : cartItem
      )
    );
  };


  const handleClick = (item) => {
    const isSubscription = item.id <= 4;

    const subscriptionInCart = cart.some(
      (cartItem) => cartItem.id <= 4
    );

    const itemExists = cart.some(
      (cartItem) => cartItem.id === item.id
    );


    // Only one subscription of any type is allowed
    if (isSubscription && subscriptionInCart) {
      alert(
        "Only one subscription plan can be added to your cart at a time."
      );
      return;
    }


    // Prevent duplicate merchandise
    if (itemExists) {
      alert(
        "This item is already in your cart. You can adjust the quantity in the Cart."
      );
      return;
    }


    setCart([
      ...cart,
      {
        ...item,
        amount: 1,
      },
    ]);
  };


  /* ---------------- Application ---------------- */

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>

        <div className="app">

          {/* Only display navbar after login */}
          {isAuthenticated && (
            <Navbar handleLogout={handleLogout} />
          )}


          <main className="main-content">

            <Routes>

              {/* Login Page */}
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Login
                      setIsAuthenticated={setIsAuthenticated}
                    />
                  )
                }
              />


              {/* Home */}
              <Route
                path="/"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Home />
                  </ProtectedRoute>
                }
              />


              {/* Movies */}
              <Route
                path="/movies"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Movies />
                  </ProtectedRoute>
                }
              />


              {/* Shopping Cart */}
              <Route
                path="/cart"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Cart
                      cart={cart}
                      setCart={setCart}
                      handleChange={handleChange}
                    />
                  </ProtectedRoute>
                }
              />

              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <CreditCard />
                  </ProtectedRoute>  
                } 
              />


              {/* About */}
              <Route
                path="/about"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <About />
                  </ProtectedRoute>
                }
              />


              {/* Shop */}
              <Route
                path="/shop"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Shop
                      handleClick={handleClick}
                    />
                  </ProtectedRoute>
                }
              />


              {/* Invalid routes */}
              <Route
                path="*"
                element={
                  <Navigate
                    to={isAuthenticated ? "/" : "/login"}
                    replace
                  />
                }
              />

            </Routes>

          </main>


          {/* Only display footer after login */}
          {isAuthenticated && (
            <footer className="footer">
              <p>© 2026 StreamList. All rights reserved.</p>
            </footer>
          )}

        </div>

      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}


export default App;