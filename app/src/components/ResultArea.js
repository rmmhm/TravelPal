import React, { useEffect, useState } from "react";
import "./ResultArea.css";
import { point } from "leaflet";

const ResultArea = ({ interestPoints, setInterestPoints, apiInterestPoints }) => {
  const [sortCriteria, setSortCriteria] = useState("distAsc");
  const [filterCriteria, setFilterCriteria] = useState("all");
  const [entriesToShow, setEntriesToShow] = useState(10);

  // Update num entries field
  const handleEntriesChange = (event) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setEntriesToShow(value);
    }
  };

  // Update sorting criteria
  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  /// Update results filter
  const handleFilterChange = (event) => {
    setFilterCriteria(event.target.value);
  };

  // Re-sort interest points when sorting criteria changes
  useEffect(() => {
    const sortPoints = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/sort?criteria=${sortCriteria}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(interestPoints),
        }
      );
      const data = await response.json();
      setInterestPoints(data); // Directly update interestPoints
    };

    sortPoints();
  }, [sortCriteria]);

  // Re-filter the sorted points when filtering criteria changes, or when interest points get re-sorted
  useEffect(() => {
    const filterPoints = () => {
      const newFilteredPoints = apiInterestPoints.filter(
        (point) => filterCriteria === "all" || point.types.includes(filterCriteria)
      );
      setInterestPoints(newFilteredPoints); // Directly update interestPoints
    };
    filterPoints();
  }, [filterCriteria]);

  useEffect(() => {
    if (interestPoints.length > 0 && entriesToShow === 0) {
      setEntriesToShow(Math.min(interestPoints.length, 10));
    } else if (interestPoints.length > 0) {
      setEntriesToShow(Math.min(interestPoints.length, entriesToShow));
    }
  }, [interestPoints]);

  return (
    <div className="results-section">
      <h2>Search Results</h2>
      <div className="entries-control">
        Show
        <input
          type="number"
          min="1"
          max={interestPoints.length}
          value={entriesToShow}
          onChange={handleEntriesChange}
        />
        entries
        <span style={{ marginLeft: "20px" }}>Sort:</span>
        <select onChange={handleSortChange} value={sortCriteria}>
          <option value="distAsc">Distance: Low to High</option>
          <option value="distDesc">Distance: High to Low</option>
          <option value="ratingAsc">Rating: Low to High</option>
          <option value="ratingDesc">Rating: High to Low</option>
          <option value="priceAsc">Price Level: Low to High</option>
          <option value="priceDesc">Price Level: High to Low</option>
        </select>
        <span style={{ marginRight: "5px", marginLeft: "20px" }}>Filters:</span>
        <select
          id="filter"
          onChange={handleFilterChange}
          value={filterCriteria}
        >
          <option value="all">All</option>
          <option value="restaurant">Food</option>
          <option value="lodging">Lodging</option>
          <option value="hospital">Hospitals</option>
          <option value="store">Stores</option>
          <option value="tourist_attraction">Attractions</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Distance to Point (mi)</th>
            <th>Address</th>
            <th>Open Now?</th>
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
              <td>
                {point.isOpen === "N/A"
                  ? "N/A"
                  : point.isOpen === "true"
                  ? `Yes`
                  : `No`}
              </td>
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