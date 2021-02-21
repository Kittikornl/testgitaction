package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/dto"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sec33_Emparty/backend/service"
)

//login controller interface
type LoginController interface {
	Login(ctx *gin.Context) string
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

func (user *loginController) Login(c *gin.Context) string {
	var credential dto.LoginCredentials
	err := c.ShouldBind(&credential)
	if err != nil {
		return "No data found"
	}
	isAuthenticated := user.loginService.LoginUser(credential.Email, credential.Password)
	if isAuthenticated {
		// return the token
		return user.jWtService.GenerateToken(credential.UserID, credential.Role)
	}
	return ""
}

func LoginToTheFuckingUser(c *gin.Context) {

	body := c.Request.Body

	userTable := models.Usertable{}

	// Check if tne email exists in DB
	if err := database.DB.Find(&userTable).Error; err != nil {
		c.Status(http.StatusNotFound)
		return
	}

	if password != database.DB.Select("Password").Where("Email", email).Find(&userTable).Name() {
		c.Status(http.StatusNotFound)
		return
	}

	var loginService service.LoginService = service.NewLoginService(email, password)
	var jwtService service.JWTService = service.JWTAuthService()
	var loginController LoginController = LoginHandler(loginService, jwtService)

	token := loginController.Login(c)
	if token != "" {
		c.JSON(http.StatusOK, gin.H{
			"token": token,
		})
	} else {
		c.JSON(http.StatusUnauthorized, nil)
	}

}
