package com.example.TravelPal;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Sorter {
    public List<InterestPoint> sort(List<InterestPoint> list, String criteria) {
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
    
    private Comparator<InterestPoint> distLowToHighComp() {
        return Comparator.comparingDouble(InterestPoint::getDistance);
    }

    private Comparator<InterestPoint> distHighToLowComp() {
        return Comparator.comparingDouble(InterestPoint::getDistance).reversed();
    }

    private Comparator<InterestPoint> ratingLowToHighComp() {
        return Comparator.comparingDouble(InterestPoint::getRating);
    }

    private Comparator<InterestPoint> ratingHighToLowComp() {
        return Comparator.comparingDouble(InterestPoint::getRating).reversed();
    }

    private Comparator<InterestPoint> priceLevelLowToHighComp() {
        Comparator<InterestPoint> priceComp = Comparator.comparingInt(ip -> {
            return ip.getPriceLevel().length();
        });
        return priceComp;
    }

    private Comparator<InterestPoint> priceLevelHighToLowComp() {
        Comparator<InterestPoint> priceComp = Comparator.comparingInt(ip -> {
            return ip.getPriceLevel().length();
        });
        return priceComp.reversed();
    }
}