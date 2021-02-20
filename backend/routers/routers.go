package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/sec33_Emparty/backend/handle/user"
)

func InitRouter() *gin.Engine {
	r := gin.Default()

	r1 := r.Group("/api/users")
	{
		r1.GET("all", user.GetAllUser) //example api
		r1.POST("", user.SaveUser)
		r1.DELETE("/:id", user.DeleteUser)
		r1.POST("reset-pwd", user.ResetPassword)
	}

	return r
}
