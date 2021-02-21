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
	user := []models.Userdata{}

	database.DB.Find(&user)

	c.JSON(http.StatusOK, user)
}

func GetAllAccount(c *gin.Context) {
	user := []models.Usertable{}

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

func ResetPassword(c *gin.Context) {
	var userTable models.Usertable

	email := c.PostForm("email")
	new_password := services.GeneratePassword()
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(new_password), bcrypt.DefaultCost)
	if err != nil {
		c.Status(http.StatusBadRequest)
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
		c.Status(http.StatusBadRequest)
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
	c.Status(http.StatusOK)
}
