package com.example.TravelPal.model;

public class SearchRequest {
    
    private float latitude;
    private float longitude;
    private float radius;

    // Constructor
    public SearchRequest() {
    }

    // Getter for latitude
    public float getLatitude() {
        return latitude;
    }

    // Setter for latitude
    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    // Getter for longitude
    public float getLongitude() {
        return longitude;
    }

    // Setter for longitude
    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    // Getter for radius
    public float getRadius() {
        return radius;
    }

    // Setter for radius
    public void setRadius(float radius) {
        this.radius = radius;
    }
}
