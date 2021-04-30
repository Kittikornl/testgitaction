package models

import (
	"gorm.io/gorm"
)

type Shopreview struct {
	gorm.Model
	UserId int `json:"user_id"`
	ShopId int `json:"shop_id"`
	Rating int `json:"rating"`
	Comment string `json:"comment"`
}

type Productreview struct{
	gorm.Model
	UserId int `json:"user_id"`
	ProductId int `json:"product_id"`
	Rating int `json:"rating"`
	Comment string `json:"comment"`
}
