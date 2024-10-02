package com.example.TravelPal;

import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

@Service
public class AuthService {

    private static final String FIREBASE_WEB_API_KEY = "AIzaSyCcCJFrzu0yJ4vIZLt3nA2Tqagqs7AgIhk"; // Replace with your Web API Key

    // Firebase Authentication URLs for login and signup
    private static final String FIREBASE_AUTH_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    private static final String FIREBASE_SIGNUP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

    /**
     * Authenticate user with Firebase using email and password (Login).
     * 
     * @param email    User email
     * @param password User password
     * @return Firebase ID token if authentication is successful
     * @throws Exception if authentication fails
     */
    public String loginWithEmailPassword(String email, String password) throws Exception {
        return sendFirebaseAuthRequest(FIREBASE_AUTH_URL, email, password);
    }

    /**
     * Register new user with Firebase using email and password (Signup).
     * 
     * @param email    User email
     * @param password User password
     * @return Firebase ID token if signup is successful
     * @throws Exception if signup fails
     */
    public String signUpWithEmailPassword(String email, String password) throws Exception {
        return sendFirebaseAuthRequest(FIREBASE_SIGNUP_URL, email, password);
    }

    /**
     * Sends a request to Firebase for either login or signup.
     * 
     * @param url      Firebase REST API URL (login or signup)
     * @param email    User email
     * @param password User password
     * @return Firebase ID token if the request is successful
     * @throws Exception if the request fails
     */
    private String sendFirebaseAuthRequest(String url, String email, String password) throws Exception {
        RestTemplate restTemplate = new RestTemplate();

        // Create the payload for the request
        JSONObject requestBody = new JSONObject();
        requestBody.put("email", email);
        requestBody.put("password", password);
        requestBody.put("returnSecureToken", true); // Request an ID token

        // Prepare the HTTP headers and request entity
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);

        // Send the request to Firebase REST API
        ResponseEntity<String> response = restTemplate.exchange(
                url + FIREBASE_WEB_API_KEY,
                HttpMethod.POST,
                request,
                String.class
        );

        if (response.getStatusCode() == HttpStatus.OK) {
            // Parse the response and extract the ID token
            JSONObject jsonResponse = new JSONObject(response.getBody());
            return jsonResponse.getString("idToken"); // Return the ID token
        } else {
            throw new Exception("Firebase Authentication request failed");
        }
    }

    /**
     * Verifies the provided Firebase ID token.
     * 
     * @param idToken the ID token to verify
     * @return true if the token is valid, false otherwise
     */
    public boolean verifyIdToken(String idToken) {
        try {
            // Verify the token with Firebase Admin SDK
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            
            // Token is valid and decodedToken contains user info
            String uid = decodedToken.getUid();  // You can get the user ID if needed
            return true;  // Token is valid
        } catch (Exception e) {
            // Invalid token
            return false;
        }
    }
}