package com.example.TravelPal;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@SpringBootApplication
public class TravelPalApplication {

    public static void main(String[] args) throws IOException {
        if (FirebaseApp.getApps().isEmpty()) {
            ClassLoader classLoader = TravelPalApplication.class.getClassLoader();
            try (InputStream serviceAccount = classLoader.getResourceAsStream("serviceAccountKey.json")) {
                if (serviceAccount == null) {
                    throw new FileNotFoundException("Resource not found: serviceAccountKey.json");
                }

                FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

                FirebaseApp.initializeApp(options);
            }
        }

        SpringApplication.run(TravelPalApplication.class, args);
    }
}