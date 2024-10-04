import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapSection.css";



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



// Custom red marker icon
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const MapSection = ({ centerPosition, interestPoints }) => {
  return (
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
  );
};

export default MapSection;
