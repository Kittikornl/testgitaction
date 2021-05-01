package models

import (
	"gorm.io/gorm"
)

type Usertable struct {
	gorm.Model
	Userdata Userdata `gorm:"foreignKey: id; constraint:OnUpdate:RESTRICT,OnDelete:RESTRICT;"`
	Email    string   `gorm:"NOT NULL" json:"email"`
	Password string   `gorm:"NOT NULL" json:"password"`
}
