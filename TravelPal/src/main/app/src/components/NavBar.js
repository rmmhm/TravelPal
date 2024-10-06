import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log(location.pathname);
      if (location.pathname.includes("/map")) {
        navigate("/welcome");
      }
    } else {
      navigate("/map");
    }
  }, [isAuthenticated, location.pathname, navigate]);

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
            console.error("Failed to validate token");
            console.log(await response.text());
          }
        } catch (error) {
          console.error("Error validating token: ", error);
          setIsAuthenticated(false);
          navigate("/welcome");
        }
      }
    };

    validateToken();
  }, [navigate]);

  const handleLogout = async () => {
    let token = localStorage.getItem("token");
    let response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (response.ok) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate("/login");
    } else {
      console.error("Failed to log out");
      console.log(await response.text());
      setIsAuthenticated(false);
      navigate("/welcome");
    }
  };

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
            <NavLink
              to="/welcome"
              className="logout-link"
              onClick={handleLogout}
            >
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
