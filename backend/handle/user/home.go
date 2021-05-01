package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
)

type HomePageOutput struct{
	TopSellingProducts     []models.Product `json:"top_selling_products"`
	NewProducts      []models.Product `json:"new_products"`
}

// swagger:route GET /homepage users getHomePage
// Return 5 latest shop's reviews with comment
// Security:
//       Bearer: read
// responses:
//		200: homePageResponse

func GetHomePage(c *gin.Context) {
	new_products := []models.Product{}
	top_selling_products := []models.Product{}

	database.DB.Order("created_at desc").Limit(8).Find(&new_products)
	database.DB.Model(models.Soldproduct{}).
		Joins("left JOIN products on products.id =  soldproducts.product_id").
		Select("products.id, products.created_at, products.updated_at, products.deleted_at, products.shop_id, products.picture_url, products.product_title, products.price, products.amount, products.product_type, products.product_detail, products.rating, sum(soldproducts.amount) as total").
		Group("products.id").Order("total desc").Where("products.amount > ?", 0).Limit(8).Scan(&top_selling_products)

	c.JSON(http.StatusOK, HomePageOutput{TopSellingProducts:top_selling_products, NewProducts:new_products})
}
