/*  
    StreamList App
    Stephen Foster, JOse Hernandez
    The University of Arizona Global Campus
    INT499: Capstone for Information Technology
    Professor Amine Dehmani
    August 31, 2026
*/


import { NavLink } from "react-router-dom";

function Navbar({ handleLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo">
          StreamList
        </NavLink>

        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Movies
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Shop
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Cart
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>

            <button
              type="button"
              className="nav-link logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;