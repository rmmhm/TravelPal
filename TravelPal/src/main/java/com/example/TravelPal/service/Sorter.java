package com.example.TravelPal.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.TravelPal.model.InterestPoint;

@Service
public class Sorter {
    public static List<InterestPoint> sort(List<InterestPoint> list, String criteria) {
        switch (criteria) {
            case "distAsc":
                return list.stream().sorted(distLowToHighComp()).collect(Collectors.toList());
            case "distDesc":
                return list.stream().sorted(distHighToLowComp()).collect(Collectors.toList());
            case "ratingAsc":
                return list.stream().sorted(ratingLowToHighComp()).collect(Collectors.toList());
            case "ratingDesc":
                return list.stream().sorted(ratingHighToLowComp()).collect(Collectors.toList());
            case "priceAsc":
                return list.stream().sorted(priceLevelLowToHighComp()).collect(Collectors.toList());
            case "priceDesc":
                return list.stream().sorted(priceLevelHighToLowComp()).collect(Collectors.toList());
            default:
                return list;
        }
    }
    
    private static Comparator<InterestPoint> distLowToHighComp() {
        return Comparator.comparingDouble(InterestPoint::getDistance);
    }

    private static Comparator<InterestPoint> distHighToLowComp() {
        return Comparator.comparingDouble(InterestPoint::getDistance).reversed();
    }

    private static Comparator<InterestPoint> ratingLowToHighComp() {
        return Comparator.comparingDouble(InterestPoint::getRating);
    }

    private static Comparator<InterestPoint> ratingHighToLowComp() {
        return Comparator.comparingDouble(InterestPoint::getRating).reversed();
    }

    private static Comparator<InterestPoint> priceLevelLowToHighComp() {
        Comparator<InterestPoint> priceComp = Comparator.comparingInt(ip -> {
            return ip.getPriceLevel().length();
        });
        return priceComp;
    }

    private static Comparator<InterestPoint> priceLevelHighToLowComp() {
        Comparator<InterestPoint> priceComp = Comparator.comparingInt(ip -> {
            return ip.getPriceLevel().length();
        });
        return priceComp.reversed();
    }
}