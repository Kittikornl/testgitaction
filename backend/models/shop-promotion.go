package models

import {
	"gorm.io/gorm"
}

type ShopPromotion struct {
	// Auto-generated Promotion ID
	Shop	shop		`gorm:"foreignKey: id; constraint:OnUpdate:RESTRICT,OnDelete:RESTRICT;"`
	// Wait for promotion to be created, may edit later
	Promotion promotion `gorm:"foreignKey: id; constraint:OnUpdate:RESTRICT,OnDelete:RESTRICT;"`
}