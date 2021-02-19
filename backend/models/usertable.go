package models

import (
	"gorm.io/gorm"
)

type Usertable struct {
	gorm.Model
	Email    string `gorm:"NOT NULL"`
	Password string `gorm:"NOT NULL"`
}
