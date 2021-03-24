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

type ResetPasswordInput struct {
	Email string `json:"email"`
}

type ChangePasswordInput struct {
	OldPassword string `json:"old-pwd"`
	NewPassword string `json:"new-pwd"`
}

// swagger:route POST /users/reset-pwd users resetPassword
// Reset password by email
// then new password will be sent to user's email
// parameters: resetPasswordBody
// responses:
//	200: returnMessage
//  400: returnMessage
//  404: returnMessage
func ResetPassword(c *gin.Context) {
	var userTable models.Usertable
	var emailIn ResetPasswordInput

	if err := c.ShouldBindBodyWith(&emailIn, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}

	new_password := services.GeneratePassword()
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(new_password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		return
	}

	if err := database.DB.Where("email = ?", emailIn.Email).First(&userTable).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage("Email is not exist"))
		return
	}
	database.DB.Model(&userTable).Where("email = ?", emailIn.Email).Update("password", passwordHash)

	text := "This is your new password\n\n" + new_password + "\n\n you can change your password in profile page\n\n Best Regards\n Pugsod team <3"
	services.SendEmail(userTable.Email, "Reset Password", text)
	c.JSON(http.StatusOK, services.ReturnMessage("Your new password was sent to your Email"))
}

// swagger:route PATCH /users/{:id}/change-pwd users changePassword
// Change password
// Security:
//       Bearer: write
// parameters: changePasswordBody
// responses:
//	200: returnMessage
//  400: returnMessage
//  404: returnMessage
func ChangePassword(c *gin.Context) {

	id := c.Param("id")

	var changePassword ChangePasswordInput

	if err := c.ShouldBindBodyWith(&changePassword, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}

	new_password_hash, err := bcrypt.GenerateFromPassword([]byte(changePassword.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		return
	}

	var userTable models.Usertable

	if err := database.DB.First(&userTable, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage("user_id: "+string(id)+"is not exist"))
		return
	}
	if err := bcrypt.CompareHashAndPassword([]byte(userTable.Password), []byte(changePassword.OldPassword)); err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage("Old password is invalid!!"))
		return
	}
	database.DB.Model(&userTable).Where("id", id).Update("password", new_password_hash)
	c.JSON(http.StatusOK, services.ReturnMessage("Your password have been changed"))
}