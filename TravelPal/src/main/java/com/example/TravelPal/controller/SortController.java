package com.example.TravelPal.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.TravelPal.model.InterestPoint;
import com.example.TravelPal.service.Sorter;


@RestController
@RequestMapping("/api/sort")
public class SortController {
    
    @PostMapping
    public List<InterestPoint> sortPoints (@RequestBody List<InterestPoint> list, @RequestParam String criteria) {
        return Sorter.sort(list, criteria);
    }
    
}
