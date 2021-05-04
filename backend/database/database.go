package database

import (
	"fmt"

	"github.com/sec33_Emparty/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Initdatabase() {
	var err error
	dsn := fmt.Sprintf("postgres://%v:%v@%v:%v/%v?sslmode=disable", "postgres", "1234", "localhost", "5432", "empartydb")
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	DB.AutoMigrate(&models.Userdata{})
	DB.AutoMigrate(&models.Usertable{})
	DB.AutoMigrate(&models.Shoptable{})
	DB.AutoMigrate(&models.Token{})
	DB.AutoMigrate(&models.Product{})
	DB.AutoMigrate(&models.Soldproduct{})
	DB.AutoMigrate(&models.Productreview{})
	DB.AutoMigrate(&models.Shopreview{})
	DB.AutoMigrate(&models.Order{})
	DB.AutoMigrate(&models.Cartitem{})
	DB.AutoMigrate(&models.Promotion{})
	DB.AutoMigrate(&models.Promotion{})
	DB.AutoMigrate(&models.Promotion{})
	DB.AutoMigrate(&models.ShopPromotion{})
	DB.AutoMigrate(&models.UserUsePromotion{})
}
