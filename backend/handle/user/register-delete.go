package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sec33_Emparty/backend/services"
	"golang.org/x/crypto/bcrypt"
)

func SaveUser(c *gin.Context) {

	var userData models.Userdata
	var userTable models.Usertable

	if err := c.ShouldBindBodyWith(&userData, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}

	if err := c.ShouldBindBodyWith(&userTable, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	//check valid email
	if err := database.DB.Where("email = ?", userTable.Email).First(&userTable).Error; err != nil {
		if err := database.DB.Save(&userData).Error; err != nil {
			c.Status(http.StatusInternalServerError)
			return
		}

		if err := database.DB.Save(&userData).Error; err != nil {
			c.Status(http.StatusInternalServerError)
			println("2")
			return
		}

		passwordHash, err := bcrypt.GenerateFromPassword([]byte(userTable.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
			return
		}

		userTable.Password = string(passwordHash)
		userTable.Userdata = userData
		if err := database.DB.Save(&userTable).Error; err != nil {
			c.Status(http.StatusInternalServerError)
			return
		}
		c.JSON(http.StatusOK, &userTable)

	} else {
		c.JSON(http.StatusFound, "enter valid email")
		return
	}

}

func DeleteUser(c *gin.Context) {

	id := c.Param("id")
	userTable := models.Usertable{}
	userData := models.Userdata{}

	if err := database.DB.Find(&userTable, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}
	if err := database.DB.Find(&userData, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}
	database.DB.Delete(&userTable)
	database.DB.Delete(&userData)
	c.Status(http.StatusNoContent)
}