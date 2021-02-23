package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sec33_Emparty/backend/services"
	"golang.org/x/crypto/bcrypt"
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
	id := c.Param("id")
	if err := database.DB.Joins("Userdata").First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	c.JSON(http.StatusOK, user)
}

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
	userData := models.Userdata{}

	if err := database.DB.Find(&userData, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}
	database.DB.Delete(&userData)
	c.Status(http.StatusNoContent)
}

func ResetPassword(c *gin.Context) {
	var userTable models.Usertable

	email := c.PostForm("email")
	new_password := services.GeneratePassword()
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(new_password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		return
	}

	if err := database.DB.Where("email = ?", email).First(&userTable).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage("Email is not exist"))
		return
	}
	database.DB.Model(&userTable).Where("email = ?", email).Update("password", passwordHash)

	text := "This is your new password\n\n" + new_password + "\n\n you can change your password in profile page\n\n Best Regards\n Pugsod team <3"
	services.SendEmail(userTable.Email, "Reset Password", text)
	c.JSON(http.StatusOK, services.ReturnMessage("Your new password was sent to your Email"))
}

func ChangePassword(c *gin.Context) {

	id := c.Param("id")
	old_password := c.PostForm("old-pwd")
	new_password := c.PostForm("new-pwd")

	new_password_hash, err := bcrypt.GenerateFromPassword([]byte(new_password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		return
	}

	var userTable models.Usertable

	if err := database.DB.First(&userTable, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage("user_id: "+string(id)+"is not exist"))
		return
	}
	if err := bcrypt.CompareHashAndPassword([]byte(userTable.Password), []byte(old_password)); err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage("Old password is invalid!!"))
		return
	}
	database.DB.Model(&userTable).Where("id", id).Update("password", new_password_hash)
	c.JSON(http.StatusOK, services.ReturnMessage("Your password have been changed"))
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
		c.JSON(http.StatusNotFound, services.ReturnMessage("user_id: "+string(id)+" is not exist"))
		return
	}
	if err := database.DB.Model(&userData).Updates(userDataIN).Error; err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		return
	}
	c.JSON(http.StatusOK, services.ReturnMessage(""))
}
