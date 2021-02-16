package routers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	user "github.com/sec33_Emparty/backend/handle"
)

func InitRouter() *gin.Engine {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r1 := r.Group("/user")
	{
		r1.GET("all", user.GetAllUser)
	}

	return r
}
