package products

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sec33_Emparty/backend/services"
)

func GetAllProducts(c *gin.Context) {

	products := []models.Product{}
	database.DB.Find(&products)

	c.JSON(http.StatusOK, products)
}

func GetProduct(c *gin.Context) {
	println(1)
	id := c.Param("id")
	product := models.Product{}
	if err := database.DB.Find(&product, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}
	c.JSON(http.StatusOK, product)
}

func AddProduct(c *gin.Context) {
	var product models.Product

	if err := c.ShouldBindBodyWith(&product, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}

	if err := database.DB.Save(&product).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}
	c.JSON(http.StatusOK, &product)
}

func UpdateProduct(c *gin.Context) {
	id := c.Param("id")
	var productIN models.Product
	var product models.Product

	if err := c.ShouldBindBodyWith(&productIN, binding.JSON); err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		return
	}

	if err := database.DB.Find(&product, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage("productID: "+string(id)+" is not exist"))
		return
	}

	if err := database.DB.Model(&product).Updates(productIN).Error; err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		return
	}
	c.JSON(http.StatusOK, services.ReturnMessage(""))
}

func DeleteProduct(c *gin.Context) {
	id := c.Param("id")
	product := models.Product{}

	if err := database.DB.Find(&product, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	database.DB.Delete(&product)
	c.Status(http.StatusNoContent)
}
