import React from 'react';
import './Welcome.css'; // Optional: Import a CSS file for styling

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to TravelPal</h1>
      <p>We're glad to have you here. Explore the features and get started on your journey.</p>
      <button className="get-started-button">Get Started</button>
    </div>
  );
};

export default Welcome;