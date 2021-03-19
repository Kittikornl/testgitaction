package reviews

import (
    "testing"

	"github.com/sec33_Emparty/backend/services"
)


func TestNewRatingFromZero(t *testing.T) {
    rating:= 0.00
	newRating := 5
	totalReviews := 0
	result := services.NewRating(rating,totalReviews,newRating)
	if (result != 5.00){
		t.Error("New rating should be 5.00 not", result)
	}
}

func TestNewRating(t *testing.T) {
    rating:= 5.00
	newRating := 4
	totalReviews := 99
	result := services.NewRating(rating,totalReviews,newRating)
	if (result != 4.99){
		t.Error("New rating should be '4.99' not", result)
	}
}