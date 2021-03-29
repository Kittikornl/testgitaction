package shop

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sec33_Emparty/backend/services"
)

// Get all the shop that has been in the system
func GetAllShop(c *gin.Context) {
	shops := []models.Shoptable{}
	database.DB.Find(&shops)
	c.JSON(http.StatusOK, shops)
}

// Get a specific shop
func GetShop(c *gin.Context) {
	shop := models.Shoptable{}
	new_products := []models.Product{}
	top_selling := []models.Product{}
	all_products_1 := []models.Product{}
	all_products_2 := []models.Product{}

	id := c.Param("id")

	database.DB.Model(models.Soldproduct{}).
		Joins("left JOIN products on products.id =  soldproducts.product_id").
		Select("products.id, products.created_at, products.updated_at, products.deleted_at, products.shop_id, products.picture_url, products.product_title, products.price, products.amount, products.product_type, products.product_detail, products.rating, sum(soldproducts.amount) as total").
		Where("products.shop_id = ? AND products.amount > ?", id, 0).
		Group("products.id").Order("total desc").Limit(8).Scan(&top_selling)

	if err := database.DB.Order("product_title ASC, product_type ASC").Where("shop_id = ? AND product_type = ? AND amount > ?", id, 1, 0).Find(&all_products_1).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
	}

	if err := database.DB.Order("product_title ASC, product_type ASC").Where("shop_id = ? AND product_type = ? AND amount > ?", id, 2, 0).Find(&all_products_2).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
	}
	// SELECT * FROM Products WHERE ShopID = id ORDER BY ProductTitle ASC GROUP BY ProductType

	if err := database.DB.Order("created_at desc").Limit(5).Where("shop_id = ? AND amount > ?", id, 0).Find(&new_products).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
	}

	if err := database.DB.First(&shop, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"shop_information":     shop,
		"new_arrival_products": new_products,
		"top_selling_products": top_selling,
		"all_product_type1":    all_products_1,
		"all_product_type2":    all_products_2,
	})
}

// Create a new shop
func CreateShop(c *gin.Context) {
	var shoptable models.Shoptable

	// Get current user's token then call the Extractfunction to get the return of userID
	// to add into the shoptable model before saving into the database.

	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))
	if err := c.ShouldBindBodyWith(&shoptable, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}

	shoptable.UserID = userID

	// Save the format data into DB: Shoptable
	if err := database.DB.Save(&shoptable).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, &shoptable)
}

// Update shop's info
func UpdateShop(c *gin.Context) {
	id := c.Param("id")
	shoptable := models.Shoptable{}
	shoptableIN := models.Shoptable{}

	if err := c.ShouldBindBodyWith(&shoptableIN, binding.JSON); err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		return
	}
	// check if exist
	if err := database.DB.First(&shoptable, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage("shop_id: "+string(id)+" does not exist"))
		return
	}
	// Update the data
	if err := database.DB.Model(&shoptable).Updates(shoptableIN).Error; err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		return
	}
	c.JSON(http.StatusOK, services.ReturnMessage(""))
}

// Delete shop from DB
func DeleteShop(c *gin.Context) {
	id := c.Param("id")
	shoptable := models.Shoptable{}
	product := models.Product{}

	// Check if in the database
	if err := database.DB.Find(&shoptable, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	database.DB.Delete(&shoptable)
	database.DB.Where("shop_id = ?", id).Delete(&product)
	c.Status(http.StatusNoContent)
}
