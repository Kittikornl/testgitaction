package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sec33_Emparty/backend/services"
	"gorm.io/gorm"
)

var DB *gorm.DB

//example handle function for api
func GetAllUser(c *gin.Context) {
	users := []models.Userdata{}

	database.DB.Find(&users)

	c.JSON(http.StatusOK, users)
}

func GetAllAccount(c *gin.Context) {
	users := []models.Usertable{}

	database.DB.Joins("Userdata").Find(&users)

	c.JSON(http.StatusOK, users)
}

func GetUser(c *gin.Context) {
	user := models.Usertable{}
	shop := models.Shoptable{}

	id := c.Param("id")
	if err := database.DB.Joins("Userdata").First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}
	if err := database.DB.Joins("shoptables").Where("shoptables.user_id = ?", id).Find(&shop).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
	}

	c.JSON(http.StatusOK, gin.H{
		"Userdata":         user.Userdata,
		"email":            user.Email,
		"password":         user.Password,
		"shop_information": shop,
	})
}

func UpdateUser(c *gin.Context) {
	id := c.Param("id")
	var userDataIN models.Userdata
	var userData models.Userdata
	if err := c.ShouldBindBodyWith(&userDataIN, binding.JSON); err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		return
	}
	if err := database.DB.First(&userData, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage("user_id: "+string(id)+" does not exist"))
		return
	}
	if err := database.DB.Model(&userData).Updates(userDataIN).Error; err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		return
	}
	c.JSON(http.StatusOK, services.ReturnMessage(""))
}
