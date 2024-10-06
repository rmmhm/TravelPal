package com.example.TravelPal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TravelPal.model.LoginRequest;
import com.example.TravelPal.service.AuthService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // Assuming there's a service for handling authentication logic
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        System.out.println(loginRequest.getEmail());
        try {
            String token = authService.loginWithEmailPassword(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUpUser(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println(loginRequest.getEmail());
            String token = authService.signUpWithEmailPassword(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Signup failed");
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<String> isAuthenticated(@RequestHeader("Authorization") String token) {
        try {
            if (authService.verifyIdToken(token)) {
                return ResponseEntity.ok("Authenticated");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
        }
        
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(@RequestHeader("Authorization") String token) {
        try {
            if (authService.verifyIdToken(token)) {
                authService.revokeAuthToken(token);
                return ResponseEntity.ok("Logged out");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
        }
    }

    public String getSessionToken(HttpSession session) {
        return (String) session.getAttribute("authToken").toString();
    }


}
