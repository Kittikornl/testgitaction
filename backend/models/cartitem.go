package models

import (
	"gorm.io/gorm"
)

type Cartitem struct {
	gorm.Model
	UserId        int     `json:"user_id"`
	ShopID        int     `json:"shop_id"`
	ProductID     int     `json:"product_id"`
	ProductTitle  string  `json:"product_title"`
	Amount        float32 `json:"amount"`
	Price         float32 `json:"price"`
	PictureURL    string  `json:"picture_url"`
	ProductDetail string  `json:"product_detail"`
	ChangeAmount  float32 `json:"change_amount" gorm:"default:0"`
}
