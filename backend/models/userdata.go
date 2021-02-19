package Userdata

import (
	"gorm.io/gorm"
)

type Userdata struct {
	gorm.Model
	UserID        int `gorm:"primaryKey"`
	FirstName     string
	LastName      string
	IsActive      int
	ProfilePicURL string
	Role          int
	PhoneOn       string
	Birthdate     string
	Adress        string
	Zipcode       string
	City          string
}
