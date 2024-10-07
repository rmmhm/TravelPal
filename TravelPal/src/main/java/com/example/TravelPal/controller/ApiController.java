package com.example.TravelPal.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.TravelPal.model.InterestPoint;
import com.example.TravelPal.model.SearchRequest;
import com.example.TravelPal.service.GooglePlacesParser;

@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private GooglePlacesParser googlePlacesParser; // Autowired parser


    private static final String GOOGLE_API_KEY = "AIzaSyA1orXd3Ou_2QxigYgEBPoCTlHuBMdUsZo";


    @PostMapping("/googleApiCall")
    public ResponseEntity<List<InterestPoint>> getNearbyPlacesApiCall(@RequestBody SearchRequest searchRequest) {
        float latitude = searchRequest.getLatitude();
        float longitude = searchRequest.getLongitude();
        double radius = searchRequest.getRadius();
        
        List<InterestPoint> allPoints = new ArrayList<>();
        Set<String> interestPointHash = new HashSet<>();
        String[] types = {"restaurant", "lodging", "hospital", "tourist_attraction", "store"};

        for (int i = 0; i < types.length; i++) {
            String type = types[i];
        
            // Call the Google Places API and retrieve the raw JSON response
            String jsonResponse = getNearbyPlaces(latitude, longitude, radius * 1609.34, type);

            try {
                // Parse the JSON response and calculate distances
                List<InterestPoint> interestPoints = googlePlacesParser.parseInterestPoints(jsonResponse, latitude, longitude);
                for (InterestPoint ip : interestPoints) {
                    if (!interestPointHash.contains(ip.getName() + ":" + ip.getAddress())) {
                        allPoints.add(ip);
                        interestPointHash.add(ip.getName() + ":" + ip.getAddress());
                    }
                    System.out.println(ip.getLat() + " "  +  ip.getLongi() + " " + ip.getAddress());
                }
                
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).build();  // Return 500 if there's a parsing error
            }
        }
        // Return the list of InterestPoints with distance
        return ResponseEntity.ok(allPoints);
    }

    // Method to call Google Places API and get the JSON response (simplified here)
    public String getNearbyPlaces(float latitude, float longitude, double radius, String type) {
        String url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
        + "location=" + latitude + "," + longitude 
        + "&radius=" + radius
        + "&type=" + type
        + "&key=" + GOOGLE_API_KEY;  // Use the injected API key


        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
}
