package routers

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sec33_Emparty/backend/handle/products"
	"github.com/sec33_Emparty/backend/handle/user"
)

func InitRouter() *gin.Engine {
	r := gin.Default()
	CORSHandler := cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	})
	r.Use(CORSHandler)

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
	r.GET("/api/products", products.GetAllProducts)
	r.POST("/api/products", products.AddProduct)
	r.GET("/api/products/:id", products.GetProduct)
	r.PUT("/api/products/:id", products.UpdateProduct)
	r.DELETE("/api/products/:id", products.DeleteProduct)
	r.POST("/api/shops", user.CreateShop)
	r.GET("/api/shops", user.GetAllShop)
	r.GET("/api/shops/:id", user.GetShop)
	
	return r
}
