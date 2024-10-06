import React, { useState } from "react";
import "./Login.css"; // Optional: Import a CSS file for styling
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError("Email and password are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setError("Please enter a valid email address.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache", // Prevent caching
            Pragma: "no-cache",
          },
          body: JSON.stringify({ email: username, password: password }),
        }
      );

      if (response.ok) {
        const data = await response.text();
        console.log(data);
        localStorage.setItem("token", data);
        console.log("Logged in successfully");
        navigate("/map");
      } else {
        console.error("Failed to log in");
        console.log(await response.text());
      }
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome Back!</h1>
      <form className="login-form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">
            Email <span className="required-asterisk">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password <span className="required-asterisk">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">
          Log in
        </button>
        <div className="additional-options">
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="sign-up-link">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
