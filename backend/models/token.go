package models

import (
	"gorm.io/gorm"
)

type Token struct {
	gorm.Model
	Token string `gorm:"primary_key" json:"id"`
}
