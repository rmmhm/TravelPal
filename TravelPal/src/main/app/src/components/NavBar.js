import React from "react";
import { NavLink } from "react-router-dom";

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
            Welcome
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-page"
            className={({ isActive }) => {
              return isActive ? "active-link" : "";
            }}
          >
            Change to Map Screens
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive ? "active-link" : "";
            }}
          >
            Change to Map Screens
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
