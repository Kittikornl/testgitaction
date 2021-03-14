package models

import (
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	ShopID        int     `json:"ShopID"`
	PictureURL    string  `json:"PictureURL"`
	ProductTitle  string  `json:"ProductTitle"`
	Price         float32 `json:"Price"`
	Amount        int     `json:"Amount"`
	ProductType   int     `json:"ProductType"`
	ProductDetail string  `json:"ProductDetail"`
	Rating        int     `json:"Rating"`
}
