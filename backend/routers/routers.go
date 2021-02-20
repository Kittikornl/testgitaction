package routers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sec33_Emparty/backend/handle/user"
)

func InitRouter() *gin.Engine {
	r := gin.Default()

	//test api
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r1 := r.Group("/users")
	{
		r1.GET("all", user.GetAllUser) //example api
		r1.POST("", user.SaveUser)
		r1.DELETE("/:id", user.DeleteUser)
	}

	return r
}
