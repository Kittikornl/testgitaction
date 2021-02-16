package userdata

import (
	"gorm.io/gorm"
)

type Userdata struct {
	gorm.Model
	userID        int `gorm:"primaryKey"`
	firstName     string
	lastname      string
	isActive      int
	profilePicURL string
	role          int
	phoneOn       string
	birthdate     string
	adress        string
	zipcode       string
	city          string
}
