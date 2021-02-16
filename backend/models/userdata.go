package userdata

import (
	"gorm.io/gorm"
)

type Userdata struct {
	gorm.Model
	UserID        int `gorm:"primaryKey"`
	FirstName     string
	Lastname      string
	IsActive      int
	ProfilePicURL string
	Role          int
	PhoneOn       string
	Birthdate     string
	Adress        string
	Zipcode       string
	City          string
}
