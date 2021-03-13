package models

import (
	"gorm.io/gorm"
)

type Shoptable struct {
	gorm.Model
	// Auto-generated Shop id
	UserData	int 	  `json:"userData"`
	ShopName    string    `json:"shopname"`
	Description string    `json:"description"`
	PhoneNo     string    `json:"phone_number"`
	Rating      int       `json:"rating"`
	IG          string    `json:"ig"`
	Facebook    string    `json:"facebook"`
	Twitter     string    `json:"twitter"`
	Line        string    `json:"line"`
}
