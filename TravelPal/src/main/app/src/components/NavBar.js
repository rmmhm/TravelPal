import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/welcome"
            className={({ isActive }) => {
              return isActive ? "active-link" : "";
            }}
          >
            Home
          </NavLink>
        </li>
        {/* replace with logged in check */}
        {1 && (
          <li>
            <NavLink to="/welcome">Logout </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
