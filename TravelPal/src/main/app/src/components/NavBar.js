import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/welcome");
    } else {
      navigate("/map");
    }
}, [isAuthenticated, navigate]);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/api/auth/validate`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            }
          );
          
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            navigate("/welcome")
            console.error("Failed to validate token");
            console.log(await response.text());
          }
        } catch (error) {
          console.error("Error validating token: ", error);
          setIsAuthenticated(false);
          navigate("/welcome")
        }
      };
  }

    validateToken();
  }, []);

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
        {isAuthenticated && (
          <li>
            <NavLink to="/welcome" className="logout-link">Logout </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
