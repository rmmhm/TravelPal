import React from "react";
import "./ResultArea.css";

const ResultArea = () => {
  return (
    <div className="results-section">
      <h2>Search Results</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Distance to Point (ft)</th>
            <th>Address</th>
            <th>Rating</th>
            <th>Price Level</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>JCT Kitchen & Bar</td>
            <td>1815</td>
            <td>1198 Howell Mill Rd #18, Atlanta, GA 30318</td>
            <td>4/5</td>
            <td>$$</td>
          </tr>
          <tr>
            <td>Piju Belly</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
          </tr>
          <tr>
            <td>Miller Union</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
          </tr>
          <tr>
            <td>West Egg Cafe</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResultArea;
