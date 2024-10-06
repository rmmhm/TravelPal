import React from "react";
import "./ResultArea.css";

const ResultArea = ({interestPoints}) => {
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
          {interestPoints.map((point, index) => (
            <tr key={index}>
              <td>{point.name}</td>
              <td>{point.distance}</td>
              <td>{point.address}</td>
              <td>{point.rating}</td>
              <td>{point.priceLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultArea;