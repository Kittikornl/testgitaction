package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
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
		return user.jWtService.GenerateToken(credential.Email, true)
	}
	return ""
}

func LoginToTheFuckingUser(c *gin.Context) {
	var userTable models.Usertable
	var loginService service.LoginService = service.NewLoginService(userTable.Email, userTable.Password)
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
