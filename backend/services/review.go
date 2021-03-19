package services

import (
	"math"

	"github.com/dgrijalva/jwt-go"
)

func NewRating(oldRating float32, totalReviews int, newRating int) float32{
	rating := (oldRating +  newRating) / (totalReviews+1)
	return math.Round(rating*100)/100
}