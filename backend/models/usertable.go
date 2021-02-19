package Usertable

import (
	"gorm.io/gorm"
)

type Usertable struct {
	gorm.Model
	UserID   int `gorm:"primaryKey"`
	Email    string
	Password string
}
