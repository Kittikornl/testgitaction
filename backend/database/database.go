package database

import (
	userdata "github.com/sec33_Emparty/backend/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Initdatabase() {
	var err error
	DB, err = gorm.Open(sqlite.Open("empartydb.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	DB.AutoMigrate(&userdata.Userdata{})

}
