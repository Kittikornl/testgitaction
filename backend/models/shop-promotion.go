package models

import (
	_"gorm.io/gorm"
)

type ShopPromotion struct {
	// Auto-generated Promotion ID
	Shop	Shop		`gorm:"foreignKey: id; constraint:OnUpdate:RESTRICT,OnDelete:RESTRICT;"`
	// Wait for promotion to be created, may edit later
	// Promotion Promotion `gorm:"foreignKey: id; constraint:OnUpdate:RESTRICT,OnDelete:RESTRICT;"`
}