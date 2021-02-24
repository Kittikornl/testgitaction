package database

import (
	"github.com/sec33_Emparty/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Initdatabase() {
	var err error
	dsn := "host=localhost user=postgres password=4583102625 dbname=empartydb port=5432 sslmode=disable TimeZone=Asia/Bangkok"
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	DB.AutoMigrate(&models.Userdata{})
	DB.AutoMigrate(&models.Usertable{})
	DB.AutoMigrate(&models.Token{})

}
