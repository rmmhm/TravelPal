import React from "react";
import "./Login.css"; // Optional: Import a CSS file for styling
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div className="login-container">
      <h1>Welcome Back!</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Email <span className="required-asterisk">*</span></label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password <span className="required-asterisk">*</span></label>
            <input type="password" id="password" name="password" required />
          </div>

          <button type="submit" className="login-button">Log in</button>
          <div className="additional-options">
            <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
            <p>Don't have an account? <Link to="/sign-up" className="sign-up-link">Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
