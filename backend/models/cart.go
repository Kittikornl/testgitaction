package models

import (
	"gorm.io/gorm"
)

type Cart struct {
	gorm.Model
	UserId 			int `json:"user_id"`
	ShopID			int `json:"shop_id"`
	ProductTitle   	string  `json:"product_title"`
	Amount			float32 `json:"amount"`
	Price         	float32 `json:"price"`
	PictureURL    	string  `json:"picture_url"`
	ProductDetail 	string  `json:"product_detail"`
}
