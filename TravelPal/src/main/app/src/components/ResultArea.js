import React, { useState } from "react";
import "./ResultArea.css";

const ResultArea = ({interestPoints}) => {
  const [entriesToShow, setEntriesToShow] = useState(10);

  const handleEntriesChange = (event) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setEntriesToShow(value);
    }
  };

  return (
    <div className="results-section">
      <h2>Search Results</h2>
      <div className="entries-control">
        Show 
        <input
          type="number"
          min="1"
          value={entriesToShow}
          onChange={handleEntriesChange}
        />
        entries
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Distance to Point (mi)</th>
            <th>Address</th>
            <th>Rating</th>
            <th>Price Level</th>
          </tr>
        </thead>
        <tbody>
          {interestPoints.slice(0, entriesToShow).map((point, index) => (
            <tr key={index}>
              <td>{point.name}</td>
              <td>{point.distance.toFixed(2)}</td>
              <td>{point.address}</td>
              <td>{point.rating === "N/A" ? "N/A" : `${point.rating}/5`}</td>
              <td>{point.priceLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultArea;