import React from "react";
import "./Signup.css"; // Optional: Import a CSS file for styling
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div className="signup-container">
      <h1>Create Your Account!</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Email <span className="required-asterisk">*</span></label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password <span className="required-asterisk">*</span></label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password <span className="required-asterisk">*</span></label>
            <input type="confirm-password" id="confirm-password" name="confirm-password" required />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
          <div className="additional-options">
            <p>Already have an account? <Link to="/log-in" className="login-link">Log in</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
