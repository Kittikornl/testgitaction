package models

import (
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	ShopID        int       `json:"ShopID"`
	PictureURL    string    `json:"PictureURL"`
	ProductTitle  string    `json:"ProductTitle"`
	Price         int       `json:"Price"`
	Amount        int       `json:"Amount"`
	ProductDetail string    `json:"ProductDetail"`
	Rating        int       `json:"Rating"`
}
