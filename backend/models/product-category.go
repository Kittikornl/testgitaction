package models

import (
	"gorm.io/gorm"
)

type ProductCategory struct {
	gorm.Model
	Product          Product 	 `gorm:"foreignKey: id; constraint:OnUpdate:RESTRICT,OnDelete:RESTRICT;"`
	Category         Category 	 `gorm:"foreignKey: id; constraint:OnUpdate:RESTRICT,OnDelete:RESTRICT;"`

}