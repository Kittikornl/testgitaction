package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/sec33_Emparty/backend/handle/user"
)

func InitRouter() *gin.Engine {
	r := gin.Default()
	r.GET("/api/users", user.GetAllUser)
	r.GET("/api/accounts", user.GetAllAccount)
	r.POST("/api/users", user.SaveUser)
	r.DELETE("/api/users/:id", user.DeleteUser)
	r.POST("/api/users/reset-pwd", user.ResetPassword)

	return r
}
