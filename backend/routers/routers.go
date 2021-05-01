package routers

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sec33_Emparty/backend/handle/cart"
	"github.com/sec33_Emparty/backend/handle/payment"
	"github.com/sec33_Emparty/backend/handle/products"
	"github.com/sec33_Emparty/backend/handle/reviews"
	"github.com/sec33_Emparty/backend/handle/shipment"
	"github.com/sec33_Emparty/backend/handle/shop"
	"github.com/sec33_Emparty/backend/handle/user"
	"github.com/sec33_Emparty/backend/middleware"
	swaggerDoc "github.com/utahta/swagger-doc"
)

func InitRouter() *gin.Engine {
	r := gin.Default()
	CORSHandler := cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	})
	r.Use(CORSHandler)

	// Don't need Authentication header
	r.POST("/api/users/reset-pwd", user.ResetPassword)
	r.POST("/api/users/login", user.LoginToUser)
	r.POST("/api/users", user.SaveUser)

	// Need Authentication header
	sr := r.Group("/")
	sr.Use(CORSHandler)
	sr.Use(middleware.AuthorizeJWT())
	{
		sr.GET("/api/homepage", user.GetHomePage)
		sr.GET("/api/users", user.GetAllUser)
		sr.GET("/api/accounts", user.GetAllAccount)
		sr.POST("/api/users/logout", user.LogoutFromUser)
		sr.DELETE("/api/users/:id", user.DeleteUser)
		sr.GET("/api/users/:id", user.GetUser)
		sr.PUT("/api/users/:id", user.UpdateUser)
		sr.PATCH("/api/users/:id/change-pwd", user.ChangePassword)
		sr.POST("/api/shops", shop.CreateShop)
		sr.GET("/api/shops", shop.GetAllShop)
		sr.GET("/api/shops/:id", shop.GetShop)
		sr.GET("/api/shops/:id/reviews", reviews.GetShopReviews)
		sr.DELETE("/api/shops/:id", shop.DeleteShop)
		sr.PUT("/api/shops/:id", shop.UpdateShop)
		sr.GET("/api/products", products.GetAllProducts)
		sr.POST("/api/products", products.AddProduct)
		sr.GET("/api/products/:id", products.GetProduct)
		sr.PUT("/api/products/:id", products.UpdateProduct)
		sr.DELETE("/api/products/:id", products.DeleteProduct)
		sr.GET("/api/products/:id/reviews", reviews.GetProductReviews)
		sr.POST("/api/reviews", reviews.CreateReview)
		sr.POST("/api/search", user.SearchProductOrShop)
		sr.POST("/api/checkout", cart.CheckOutOrder)
		sr.GET("/api/history", cart.GetOrdersHistory)
		sr.GET("/api/orders", cart.GetOrdersForSeller)
		sr.GET("/api/history/filter/:status", cart.FilterHistory)
		sr.POST("/api/payment/qr", payment.GetQR)
		sr.POST("/api/payment/creditcard", payment.ValidateCard)
		sr.POST("/api/payment/promotion", payment.UsePromotion)
		sr.GET("/api/payment/promotion", payment.GetRandomPromotion)
		sr.POST("/api/payment/cancel", payment.CancelOrder)
		sr.POST("/api/shipment", shipment.Shipment)
		sr.GET("/api/carts", cart.GetCartitems)
		sr.POST("/api/carts/add", cart.AddToCart)
		sr.POST("/api/carts/update", cart.UpdateCart)
		sr.DELETE("/api/carts/delete/:id", cart.DeleteFromCart)
	}

	//static folder
	r.StaticFile("/static/swagger.json", "./static/swagger.json")
	//doc
	r.GET("/api/docs", func(c *gin.Context) {
		c.Redirect(301, "/redoc")
	})
	r.GET("/redoc", gin.WrapH(swaggerDoc.NewRedocHandler("/static/swagger.json", "redoc")))
	return r
}
