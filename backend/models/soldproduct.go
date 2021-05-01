package models

import (
	"gorm.io/gorm"
)

type Soldproduct struct {
	gorm.Model
	ShopId    int `gorm:"NOT NULL" json:"shop_id"`
	ProductId int `gorm:"NOT NULL" json:"product_id"`
	Amount    int `gorm:"NOT NULL" json:"amount"`
}
