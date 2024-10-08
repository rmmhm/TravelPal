import React, { useState } from "react";
import MapSection from "../components/MapSection";
import ResultArea from "../components/ResultArea";
import "./Map.css";

const Map = () => {
  const [searchLatitude, setSearchLatitude] = useState("");
  const [searchLongitude, setSearchLongitude] = useState("");
  const [searchRadius, setSearchRadius] = useState("");
  const [latDirection, setLatDirection] = useState(""); // Dropdown for North/South
  const [longDirection, setLongDirection] = useState(""); // Dropdown for East/West
  const [centerPosition, setCenterPosition] = useState([33.777, -84.396]);
  const [interestPoints, setInterestPoints] = useState([]);
  const [apiInterestPoints, setApiInterestPoints] = useState([]);
  const [entriesToShow, setEntriesToShow] = useState(10);

  const handleSearch = async () => {
    let newLatitude = parseFloat(searchLatitude);
    let newLongitude = parseFloat(searchLongitude);
    const newRadius = parseFloat(searchRadius);

    // Adjust latitude/longitude based on the selected direction
    if (latDirection === "South" && !isNaN(newLatitude)) {
      newLatitude = -Math.abs(newLatitude);
    }
    if (latDirection === "North" && !isNaN(newLatitude)) {
      newLatitude = Math.abs(newLatitude);
    }
    if (longDirection === "West" && !isNaN(newLongitude)) {
      newLongitude = -Math.abs(newLongitude);
    }
    if (longDirection === "East" && !isNaN(newLongitude)) {
      newLongitude = Math.abs(newLongitude);
    }

    if (!isNaN(newLatitude) && !isNaN(newLongitude) && !isNaN(newRadius)) {
      setCenterPosition([newLatitude, newLongitude]);
      console.log(`Center updated to: ${newLatitude}, ${newLongitude}`);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/googleApiCall`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude: newLatitude,
            longitude: newLongitude,
            radius: newRadius,
          }),
        }
      );

      if (response.ok) {
        const interestPointsData = await response.json(); // Parse response as JSON
        console.log(interestPointsData);

        // Assuming interestPointsData is an array of interest points
        setInterestPoints(interestPointsData); // Set the interestPoints directly from backend
        setApiInterestPoints(interestPointsData);
        setEntriesToShow(Math.min(interestPointsData.length, 10))
      } else {
        console.error("Failed to fetch interest points");
        console.log(await response.text());
      }
    } catch (error) {
      console.error("Error fetching interest points: ", error);
    }
  };

  return (
    <div className="user-page">
      <div className="search-area">
        <label>
          Latitude:
          <input
            type="text"
            value={searchLatitude}
            onChange={(e) => setSearchLatitude(e.target.value)}
          />
          <select value={latDirection} onChange={(e) => setLatDirection(e.target.value)}>
            <option value="">--Select--</option>
            <option value="North">North</option>
            <option value="South">South</option>
          </select>
        </label>
        <label>
          Longitude:
          <input
            type="text"
            value={searchLongitude}
            onChange={(e) => setSearchLongitude(e.target.value)}
          />
          <select value={longDirection} onChange={(e) => setLongDirection(e.target.value)}>
            <option value="">--Select--</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>
        </label>
        <label>
          Search Radius:
          <input
            type="text"
            value={searchRadius}
            onChange={(e) => setSearchRadius(e.target.value)}
          />
          miles
        </label>
        <button onClick={handleSearch}>Find Places!</button>
      </div>

      <div className="results-map-container">
        <ResultArea interestPoints={interestPoints} setInterestPoints={setInterestPoints} apiInterestPoints={apiInterestPoints} entriesToShow={entriesToShow} setEntriesToShow={setEntriesToShow} />
        {/* Pass interestPoints to ResultArea component */}
        <MapSection
          centerPosition={centerPosition}
          interestPoints={interestPoints}
          entriesToShow={entriesToShow}
        />
        {/* Pass both centerPosition and interestPoints to MapSection component */}
      </div>
    </div>
  );
};

export default Map;
