package models

import {
	"gorm.io/gorm"
}

type Shop struct {
	gorm.Model
	// Auto-generated Shop ID
	Userdata Userdata 	`gorm:"foreignKey: id; constraint:OnUpdate:RESTRICT,OnDelete:RESTRICT;"`
	ShopName 	string 	`json:"shopname"`
	Description string 	`json:"description"`
	PhoneNo 	string 	`json:"phone_number"`
	Rating 		int 	`json:"rating"`
	IG 			string 	`json:"ig"`
	Facebook 	string 	`json:"facebook"`
	Twitter 	string 	`json:"twitter"`
	Line 		string 	`json:"line"`

}