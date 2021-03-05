package models

import (
	"gorm.io/gorm"
)

type Category struct {
	gorm.Model
	CategoryTitle 	string `json:"CategoryTitle"`

}