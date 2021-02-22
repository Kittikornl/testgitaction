package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/dto"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sec33_Emparty/backend/services"
	"golang.org/x/crypto/bcrypt"
)

//login controller interface
type LoginController interface {
	Login(isAuth bool, userData models.Userdata) string
}

type loginController struct {
	loginService services.LoginService
	jWtService   services.JWTService
}

func LoginHandler(loginService services.LoginService,
	jWtService services.JWTService) LoginController {
	return &loginController{
		loginService: loginService,
		jWtService:   jWtService,
	}
}

func (user *loginController) Login(isAuthenticated bool, userData models.Userdata) string {
	var credential dto.LoginCredentials
	credential.UserID = int(userData.ID)
	credential.Role = userData.Role

	if isAuthenticated {
		// return the token
		return user.jWtService.GenerateToken(credential.UserID, credential.Role)
	}
	return ""
}

func LoginToUser(c *gin.Context) {

	var userTable = models.Usertable{}
	var loginInformation = services.LoginInformation{}

	if err := c.ShouldBindBodyWith(&loginInformation, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println("Error: Missing data")
		return
	}
	// Store input password
	password := loginInformation.Password

	// Check if the email exists in DB
	if err := database.DB.Joins("Userdata").Where("Email = ?", loginInformation.Email).First(&userTable).Error; err != nil {
		println("This email doesn't exist in the system")
		c.Status(http.StatusNotFound)
		return
	}

	// Check if input password matched with input in the DB
	if err := bcrypt.CompareHashAndPassword([]byte(userTable.Password), []byte(password)); err != nil {
		// Error message
		println("The password doesn't correct")
		c.Status(http.StatusNotFound)
		return
	}

	userData := userTable.Userdata
	isAuth := true

	var loginService services.LoginService = services.NewLoginService(userTable.Email, password)
	var jwtService services.JWTService = services.JWTAuthService()
	var loginController LoginController = LoginHandler(loginService, jwtService)

	token := loginController.Login(isAuth, userData)
	if token != "" {
		// Insert token into Token table to store the working token.
		newToken := &models.Token{
			Token: token,
		}
		database.DB.Save(&newToken)
		c.JSON(http.StatusOK, gin.H{
			"token": token,
		})
	} else {
		c.JSON(http.StatusUnauthorized, nil)
	}

}

func LogoutFromUser(c *gin.Context) {
	token := &models.Token{
		Token: c.GetHeader("Authorization"),
	}

	if err := database.DB.Delete(&token).Error; err != nil {
		// Error message
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}
	c.JSON(205, "")
}
