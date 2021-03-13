package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
)

func GetHomePage(c *gin.Context) {
	new_products := []models.Product{}
	top_selling_products := []models.Product{}

	database.DB.Order("created_at desc").Limit(5).Find(&new_products)
	database.DB.Model(models.Soldproduct{}).
		Joins("left JOIN products on products.id =  soldproducts.product_id").
		Select("products.id , products.product_title, sum(soldproducts.amount) as total").
		Group("products.id").Order("total desc").Limit(5).Scan(&top_selling_products)

	c.JSON(http.StatusOK, gin.H{
		"top_selling_products": top_selling_products,
		"new_products":         new_products,
	})
}
