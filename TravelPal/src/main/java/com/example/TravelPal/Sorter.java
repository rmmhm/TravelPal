package com.example.TravelPal;

import java.util.Comparator;
import java.util.List;

public class Sorter {
    public static void sort(List<Result> results, Comparator<Result> comparator) {
        results.sort(comparator);
    }

    public static Comparator<Result> sortPriceLevelLowToHigh() {
        return Comparator.comparingInt(Result::getPriceLevel);
    }

    public static Comparator<Result> sortPriceLevelHighToLow() {
        return Comparator.comparingInt(Result::getPriceLevel).reversed();
    }

    public static Comparator<Result> sortRatingLowToHigh() {
        return Comparator.comparingDouble(Result::getUserRating);
    }

    public static Comparator<Result> sortRatingHighToLow() {
        return Comparator.comparingDouble(Result::getUserRating).reversed();
    }

    public static Comparator<Result> sortDistLowToHigh() {
        return Comparator.comparingDouble(Result::getDistToLocation);
    }

    public static Comparator<Result> sortDistHighToLow() {
        return Comparator.comparingDouble(Result::getDistToLocation).reversed();
    }
}