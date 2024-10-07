package com.example.TravelPal.model;

import java.util.List;

public class InterestPoint {

    private float lat;
    private float longi;
    private String name;
    private float distance;
    private String rating;
    private String directionLink;
    private String websiteLink;
    private String priceLevel;
    private String address;  // Replacing vicinity with address
    private List<String> types;

    // Constructor
    public InterestPoint(float lat, float longi, String name, float distance, String rating, String directionLink, String websiteLink, String priceLevel, String address, List<String> types) {
        this.lat = lat;
        this.longi = longi;
        this.name = name;
        this.distance = distance;
        this.rating = rating;
        this.directionLink = directionLink;
        this.websiteLink = websiteLink;
        this.priceLevel = priceLevel;
        this.address = address;  // Set address
        this.types = types;
    }

    // Getters and setters for all fields

    public float getLat() {
        return lat;
    }

    public void setLat(float lat) {
        this.lat = lat;
    }

    public float getLongi() {
        return longi;
    }

    public void setLongi(float longi) {
        this.longi = longi;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getDistance() {
        return distance;
    }

    public void setDistance(float distance) {
        this.distance = distance;
    }

    public String getRating() {
        return rating;
    }

    public float getRatingAsFloat() {
        return rating.equals("N/A") ? -1.0f : Float.parseFloat(rating);
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getDirectionLink() {
        return directionLink;
    }

    public void setDirectionLink(String directionLink) {
        this.directionLink = directionLink;
    }

    public String getWebsiteLink() {
        return websiteLink;
    }

    public void setWebsiteLink(String websiteLink) {
        this.websiteLink = websiteLink;
    }

    public String getPriceLevel() {
        return priceLevel;
    }

    public void setPriceLevel(String priceLevel) {
        this.priceLevel = priceLevel;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<String> getTypes() {
        return types;
    }

    public void setType(List<String> types) {
        this.types = types;
    }
}
