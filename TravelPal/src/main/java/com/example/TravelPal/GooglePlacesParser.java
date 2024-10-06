package com.example.TravelPal;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.TravelPal.model.InterestPoint;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


@Service
public class GooglePlacesParser {

    // Radius of the Earth in miles
    private static final double EARTH_RADIUS_MILES = 3959.0;

    // Method to parse and calculate distances for each InterestPoint
    public List<InterestPoint> parseInterestPoints(String jsonResponse, float originLat, float originLong) throws Exception {
        List<InterestPoint> interestPoints = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(jsonResponse);
        
        // Parse the JSON response
        JsonNode rootNode = mapper.readTree(jsonResponse);
        JsonNode resultsNode = rootNode.get("results");  // Use 'results' array from the JSON response

        // Iterate over each result in the 'results' array
        for (JsonNode result : resultsNode) {
            // Extract latitude and longitude from the 'geometry' object
            float lat = result.get("geometry").get("location").get("lat").floatValue();
            float longi = result.get("geometry").get("location").get("lng").floatValue();

            // Extract other fields like name, rating, address (formatted_address), and price level
            String name = result.has("name") ? result.get("name").asText() : "N/A";
            String address = result.has("vicinity") ? result.get("vicinity").asText() : "N/A";
            float rating = result.has("rating") ? result.get("rating").floatValue() : 6;
            String priceLevel = result.has("price_level") ? convertPriceNumToString(result.get("price_level").asInt()) : "N/A";
            String websiteLink = result.has("website") ? result.get("website").asText() : "N/A";

            // Construct the Google Maps direction link
            String directionLink = "https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + longi;

            // Calculate the distance using Haversine formula
            float distance = calculateDistanceInMiles(originLat, originLong, lat, longi);

            // Create and add the InterestPoint to the list
            InterestPoint point = new InterestPoint(lat, longi, name, distance, rating, directionLink, websiteLink, priceLevel, address);
            interestPoints.add(point);
        }
        
        return interestPoints;
    }

    // Haversine formula to calculate the distance between two lat/long points in miles
    private float calculateDistanceInMiles(float lat1, float lon1, float lat2, float lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                   Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                   Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Distance in miles
        return (float) (EARTH_RADIUS_MILES * c);
    }

    private String convertPriceNumToString(int num) {
        return new String(new char[num]).replace('\0', '$');
    }
}
