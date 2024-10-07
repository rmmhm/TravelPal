import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css"; // Optional: Import a CSS file for styling

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
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
        `${process.env.REACT_APP_SERVER_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: username, password: password }),
        }
      );

      if (response.ok) {
        const data = await response.text();
        console.log(data);
        localStorage.setItem("token", data);
        console.log("Signed up successfully");
        // The navbar will auto redirect
        window.dispatchEvent(new Event("tokenChange"));
      } else {
        console.error("Failed to sign up");
        console.log(await response.text());
      }
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  return (
    <div className="signup-container">
      <h1>Create Your Account!</h1>
      <form className="signup-form-container" onSubmit={handleSubmit}>
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
        <div className="form-group">
          <label htmlFor="confirm-password">
            Confirm Password <span className="required-asterisk">*</span>
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="signup-button">
          Sign Up
        </button>
        <div className="additional-options">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
