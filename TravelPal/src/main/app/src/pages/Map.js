import React, { useState } from "react";
import "./Map.css";
import ResultArea from "../components/ResultArea";
import MapSection from "../components/MapSection";

const Map = () => {
  const [searchLatitude, setLatitude] = useState("");
  const [searchLongitude, setLongitude] = useState("");
  const [searchRadius, setRadius] = useState("");
  const [centerPosition, setCenterPosition] = useState([33.777, -84.396]);
  const [interestPoints, setInterestPoints] = useState([]);

  const handleSearch = () => {
    const newLatitude = parseFloat(searchLatitude);
    const newLongitude = parseFloat(searchLongitude);
    if (!isNaN(newLatitude) && !isNaN(newLongitude)) {
      setCenterPosition([newLatitude, newLongitude]);
      console.log(`Center updated to: ${newLatitude}, ${newLongitude}`);
    }

    // Google API work here?
    // set interestPoints prop, this prop does the heavy lifting for the application because it passes into map and result area

    // dummy values for now will need to replace with whatever google gets back
    const points = [
      {
        lat: newLatitude + 0.01,
        long: newLongitude + 0.01,
        name: "Point 1",
        distance: "5 miles",
        rating: 4.5,
        directionLink: "https://maps.google.com",
        websiteLink: "https://www.example.com",
      },
      {
        lat: newLatitude - 0.01,
        long: newLongitude - 0.01,
        name: "Point 2",
        distance: "3 miles",
        rating: 3.8,
        directionLink: "https://maps.google.com",
        websiteLink: "https://www.example.com",
      },
      {
        lat: newLatitude + 0.02,
        long: newLongitude - 0.02,
        name: "Point 3",
        distance: "2 miles",
        rating: 4.0,
        directionLink: "https://maps.google.com",
        websiteLink: "https://www.example.com",
      },
    ];

    setInterestPoints(points);
  };

  return (
    <div className="user-page">
      <div className="search-area">
        <label>
          Latitude:
          <input
            type="text"
            value={searchLatitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
        <label>
          Longitude:
          <input
            type="text"
            value={searchLongitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
        <label>
          Search radius:
          <input
            type="text"
            value={searchRadius}
            onChange={(e) => setRadius(e.target.value)}
          />
        </label>
        <button onClick={handleSearch}>Find Places!</button>
      </div>

      <div className="results-map-container">
        <ResultArea />{" "}
        {/* pass in necessary props to result area, would guess it would be some form of the interest points prop */}
        {/* also, we may want to pass in the setInterestPoints function so we can filter the interest points and that way it woudl be reactive in the map as well */}
        <MapSection
          centerPosition={centerPosition}
          interestPoints={interestPoints}
        />
      </div>
    </div>
  );
};

export default Map;
