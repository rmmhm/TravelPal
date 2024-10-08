import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  // State variables
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldValidate, setShouldValidate] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Listen for token changes in local storage
  useEffect(() => {
    const handleStorageTokenChange = () => {
      setShouldValidate(true);
    };
    window.addEventListener("tokenChange", handleStorageTokenChange);

    return () => {
      window.removeEventListener("tokenChange", handleStorageTokenChange);
    };
  }, [navigate]);

  // Handle navigation based on authentication status
  useEffect(() => {
    if (!isAuthenticated && !isLoggingOut && !shouldValidate && !isLoading) {
      if (location.pathname.includes("/map")) {
        // navigate("/welcome");
      }
    } else if (isAuthenticated && !isLoading && !isLoggingOut) {
      navigate("/map");
    }
  }, [
    isAuthenticated,
    isLoggingOut,
    location.pathname,
    navigate,
    isLoading,
    shouldValidate,
  ]);

  // Validate the authentication token
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
            console.log("validation authentication");
          } else {
            setIsAuthenticated(false);
            console.error("Failed to validate token");
            console.log(await response.text());
          }
        } catch (error) {
          console.error("Error validating token: ", error);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    validateToken();
    setShouldValidate(false);
  }, [navigate, shouldValidate, isLoading]);

  // Logout function
  const handleLogout = async (event) => {
    event.preventDefault();
    setIsLoggingOut(true);
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
      setIsLoggingOut(false);
    } else {
      console.error("Failed to log out");
      console.log(await response.text());
      setIsAuthenticated(false);
      setIsLoggingOut(false);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/welcome"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink to="#" className="logout-link" onClick={handleLogout}>
              Logout
            </NavLink>
          </li>
        )}
      </ul>
      {isLoggingOut && (
        <div className="logging-out-indicator">Logging Out...</div>
      )}
    </nav>
  );
};

export default NavBar;
