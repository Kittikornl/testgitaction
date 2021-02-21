package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/dto"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sec33_Emparty/backend/service"
	"golang.org/x/crypto/bcrypt"
)

//login controller interface
type LoginController interface {
	Login(isAuth bool, userData models.Userdata) string
}

type loginController struct {
	loginService service.LoginService
	jWtService   service.JWTService
}

func LoginHandler(loginService service.LoginService,
	jWtService service.JWTService) LoginController {
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
	var loginInformation = service.LoginInformation{}

	if err := c.ShouldBindBodyWith(&loginInformation, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println("Error: Missing data")
		return
	}
	// Store input password
	password := loginInformation.Password

	// Check if the email exists in DB
	if err := database.DB.Where("Email = ?", loginInformation.Email).First(&userTable).Error; err != nil {
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

	var loginService service.LoginService = service.NewLoginService(userTable.Email, password)
	var jwtService service.JWTService = service.JWTAuthService()
	var loginController LoginController = LoginHandler(loginService, jwtService)

	token := loginController.Login(isAuth, userData)
	if token != "" {
		c.JSON(http.StatusOK, gin.H{
			"token": token,
		})
	} else {
		c.JSON(http.StatusUnauthorized, nil)
	}

	// Insert token into Token table to store the working token.
	newToken := &models.Token{
		Token: token,
	}
	database.DB.Model(models.Token{}).Updates(models.Token{Token: token})
	c.JSON(http.StatusOK, newToken)
}

func logoutFromUser(c *gin.Context) {
	token := c.GetHeader("Authorization")
	database.DB.Model(models.Token{}).Delete(models.Token{Token: token})
}
