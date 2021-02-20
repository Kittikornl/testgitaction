package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var DB *gorm.DB

//example handle function for api
func GetAllUser(c *gin.Context) {
	user := []models.Userdata{}

	database.DB.Find(&user)

	c.JSON(http.StatusOK, user)
}

func SaveUser(c *gin.Context) {

	var userData models.Userdata
	var userTable models.Usertable

	if err := c.ShouldBindBodyWith(&userData, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println("1")
		return
	}

	if err := database.DB.Save(&userData).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		println("2")
		return
	}

	if err := c.ShouldBindBodyWith(&userTable, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println("3")
		return
	}

	if err := database.DB.Save(&userTable).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		println("4")
		return
	}

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(userTable.Password), bcrypt.DefaultCost)
	if err != nil {
		return
	}

	newUser := &models.Usertable{
		Email:    userTable.Email,
		Password: string(passwordHash),
		Userdata: userData,
	}

	database.DB.Model(&userTable).Updates(models.Usertable{Email: userTable.Email, Password: string(passwordHash), Userdata: userData})
	c.JSON(http.StatusOK, newUser)

}

func DeleteUser(c *gin.Context) {

	id := c.Param("id")
	userData := models.Userdata{}

	if err := database.DB.Find(&userData, id).Error; err != nil {
		c.Status(http.StatusNotFound)
		return
	}

	database.DB.Model(models.Userdata{}).Where("id", id).Updates(map[string]interface{}{"is_active": 0})
	c.Status(http.StatusNoContent)
}
