package models

import (
	"gorm.io/gorm"
)

type Userdata struct {
	gorm.Model
	ID   			uint   `gorm:"primary_key" json:"id"`
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
