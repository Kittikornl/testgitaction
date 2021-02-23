package routers

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sec33_Emparty/backend/handle/user"
)

func InitRouter() *gin.Engine {
	r := gin.Default()
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"*"}
	corsConfig.AllowCredentials = true
	corsConfig.AddAllowMethods("*")
	r.GET("/api/users", user.GetAllUser)
	r.GET("/api/accounts", user.GetAllAccount)
	r.POST("/api/users", user.SaveUser)
	r.POST("/api/users/reset-pwd", user.ResetPassword)
	r.POST("/api/users/login", user.LoginToUser)
	r.POST("/api/users/logout", user.LogoutFromUser)
	r.DELETE("/api/users/:id", user.DeleteUser)
	r.GET("/api/users/:id", user.GetUser)
	r.PUT("/api/users/:id", user.UpdateUser)
	r.PATCH("/api/users/:id/change-pwd", user.ChangePassword)
	r.Use(cors.New(corsConfig))
	return r
}
