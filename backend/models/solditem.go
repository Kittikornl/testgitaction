package models

import (
	"gorm.io/gorm"
)

type Solditems struct {
	gorm.Model
	ShopId int `gorm:"NOT NULL" json:"shop_id"`
	ItemId int `gorm:"NOT NULL" json:"item_id"`
	Amount int `gorm:"NOT NULL" json:"item_id"`
}
