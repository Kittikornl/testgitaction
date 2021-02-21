package models

import (
	"gorm.io/gorm"
)

type Userdata struct {
	gorm.Model
	FirstName     string
	LastName      string
	IsActive      int `gorm:"default:1"`
	ProfilePicURL string
	Role          int
	PhoneOn       string
	Birthdate     string
	Adress        string
	Zipcode       string
	City          string
}
