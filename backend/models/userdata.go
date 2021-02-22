package models

import (
	"gorm.io/gorm"
)

type Userdata struct {
	gorm.Model
	FirstName     string `json:"firstname"`
	LastName      string `json:"lastname"`
	ProfilePicURL string `json:"url_profile_pic"`
	Role          int    `json:"role"`
	PhoneNo       string `json:"phoneNo"`
	Birthdate     string `json:"birthdate"`
	Adress        string `json:"houseNo"`
	Street        string `json:"street"`
	SubDistrict   string `json:"subDistrict"`
	District      string `json:"district"`
	Zipcode       string `json:"zipcode"`
	City          string `json:"city"`
}
