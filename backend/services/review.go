package services

import (
	"math"
)

func NewRating(oldRating float64, totalReviews int, newRating int) float64{
	rating := ((oldRating*float64(totalReviews)) +  float64(newRating)) / float64(totalReviews+1)
	return math.Round(rating*100)/100
}