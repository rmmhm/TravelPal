import { useNavigate } from 'react-router-dom';
import React from 'react';
import './Welcome.css'; // Optional: Import a CSS file for styling


const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Welcome to TravelPal</h1>
      <p>We're glad to have you here. Explore the features and get started on your journey.</p>
      <button className="get-started-button" onClick={() => {
        navigate('/log-in');
      }}>Get Started</button>
    </div>
  );
};

export default Welcome;