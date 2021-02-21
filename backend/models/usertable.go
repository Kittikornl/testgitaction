package models

import (
	"gorm.io/gorm"
)

type Usertable struct {
	gorm.Model
	Userdata Userdata `gorm:"foreignKey: ID; constraint:OnUpdate:RESTRICT,OnDelete:RESTRICT;"`
	Email    string   `gorm:"NOT NULL"`
	Password string   `gorm:"NOT NULL"`
}
