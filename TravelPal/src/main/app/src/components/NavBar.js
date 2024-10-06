import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldValidate, setShouldValidate] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleStorageTokenChange = () => {
      setShouldValidate(true);
    };
    window.addEventListener("tokenChange", handleStorageTokenChange);

    return () => {
      window.removeEventListener("tokenChange", handleStorageTokenChange);
    };
  }, [navigate]);

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
      setIsLoggingOut(false); // Update logout state
      // After successful logout and setting isLoggingOut to false, navigate
    } else {
      console.error("Failed to log out");
      console.log(await response.text());
      setIsAuthenticated(false);
      setIsLoggingOut(false); // Ensure we stop showing logging out state
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
