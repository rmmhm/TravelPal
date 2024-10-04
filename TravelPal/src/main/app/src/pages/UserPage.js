import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet"; // Import leaflet for custom icons
import "./UserPage.css"; // Import CSS for styling
import "leaflet/dist/leaflet.css"; // Import Leaflet's CSS

// Custom component to update the map's center using the useMap hook
const UpdateMapCenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center); // Update the map center whenever the center changes
    }
  }, [center, map]);

  return null;
};

// Define custom red marker icon using Leaflet's assets
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41] // size of the shadow
});

const UserPage = () => {
  const [searchLatitude, setLatitude] = useState('');
  const [searchLongitude, setLongitude] = useState('');
  const [searchRadius, setRadius] = useState('');
  const [centerPosition, setCenterPosition] = useState([33.777, -84.396]); // Example: Coordinates for Atlanta

  // State to store dynamically generated interest points
  const [interestPoints, setInterestPoints] = useState([]);

  const handleSearch = () => {
    // Update centerPosition based on user input
    const newLatitude = parseFloat(searchLatitude);
    const newLongitude = parseFloat(searchLongitude);
    if (!isNaN(newLatitude) && !isNaN(newLongitude)) {
      setCenterPosition([newLatitude, newLongitude]);
      console.log(`Center updated to: ${newLatitude}, ${newLongitude}`);
    }

    // Dummy interest points based on the search area
    const points = [
      {
        lat: newLatitude + 0.01, 
        long: newLongitude + 0.01, 
        name: 'Point 1',
        distance: '5 miles',
        rating: 4.5,
        directionLink: 'https://maps.google.com',
        websiteLink: 'https://www.example.com'
      },
      {
        lat: newLatitude - 0.01, 
        long: newLongitude - 0.01, 
        name: 'Point 2',
        distance: '3 miles',
        rating: 3.8,
        directionLink: 'https://maps.google.com',
        websiteLink: 'https://www.example.com'
      },
      {
        lat: newLatitude + 0.02, 
        long: newLongitude - 0.02, 
        name: 'Point 3',
        distance: '2 miles',
        rating: 4.0,
        directionLink: 'https://maps.google.com',
        websiteLink: 'https://www.example.com'
      },
    ];
    
    // Update the interestPoints state with the new points
    setInterestPoints(points);
  };

  return (
    <div className="user-page">
      <div className="search-area">
        <label>
          Latitude:
          <input type="text" value={searchLatitude} onChange={(e) => setLatitude(e.target.value)} />
        </label>
        <label>
          Longitude:
          <input type="text" value={searchLongitude} onChange={(e) => setLongitude(e.target.value)} />
        </label>
        <label>
          Search radius:
          <input type="text" value={searchRadius} onChange={(e) => setRadius(e.target.value)} />
        </label>
        <button onClick={handleSearch}>Find Places!</button>
      </div>

      <div className="results-map-container">
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

        <div className="map-section">
          <MapContainer center={centerPosition} zoom={13} scrollWheelZoom={false} className="leaflet-map">
            {/* Update map center when centerPosition changes */}
            <UpdateMapCenter center={centerPosition} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Loop through interestPoints and render a marker for each */}
            {interestPoints.map((point, index) => (
              <Marker
                key={index}
                position={[point.lat, point.long]}
                icon={redIcon}
                eventHandlers={{
                  mouseover: (e) => {
                    e.target.bindPopup(
                      `<strong>Name:</strong> ${point.name}<br />
                      <strong>Distance:</strong> ${point.distance}<br />
                      <strong>Rating:</strong> ${point.rating}/5`,
                      { autoClose: true, closeOnClick: false }
                    ).openPopup();
                  },
                  click: (e) => {
                    e.target.bindPopup(
                      `<a href="${point.directionLink}" target="_blank" rel="noopener noreferrer">Get Directions</a><br />
                      <a href="${point.websiteLink}" target="_blank" rel="noopener noreferrer">Visit Website</a>`,
                      { autoClose: false, closeOnClick: false }
                    ).openPopup();
                  }
                }}
              >
                {/* Empty Popup initially to allow hover and click */}
                <Popup closeOnClick={false} autoClose={true} />
              </Marker>
            ))}

          </MapContainer>
        </div>
      </div>

      <button className="logout-button">Log Out</button>
    </div>
  );
};

export default UserPage;
