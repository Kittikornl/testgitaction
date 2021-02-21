package models

import (
	"gorm.io/gorm"
)

type Token struct {
	gorm.Model
	// The token already contains information, thus, no need to store others data
	Token string `gorm:"primary_key" json:"id"`
}
