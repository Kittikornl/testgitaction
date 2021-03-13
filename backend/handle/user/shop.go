package user

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
	id := c.Param("id")
	if err := database.DB.First(&shop, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}
	c.JSON(http.StatusOK, shop)
}

// Create a new shop
func CreateShop(c *gin.Context) {

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
	if err := database.DB.First(&shoptable, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage("shop_id: "+string(id)+" does not exist"))
		return
	}
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

	if err := database.DB.Find(&shoptable, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	database.DB.Delete(&shoptable)
	c.Status(http.StatusNoContent)
}
