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
	id := c.Param("id")
	if err := database.DB.First(&shop, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}
	c.JSON(http.StatusOK, shop)
}

// Create a new shop
func CreateShop(c *gin.Context) {
	var shoptable models.Shoptable

	// email, pass = services.ExtractToken(c.GetHeader())
	// Get current user's token then call the Extractfunction to get the return of email
	// to call userdata from database via email and then insert it into the models.
	const BEARER_SCHEMA = "Bearer"

	auth := c.GetHeader("Authorization")
	tokenString := auth[len(BEARER_SCHEMA):]
	userID, _ := services.ExtractToken(tokenString)
	shoptable.UserID = userID
	if err := c.ShouldBindBodyWith(&shoptable, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}

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

	// Check if in the database
	if err := database.DB.Find(&shoptable, id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	database.DB.Delete(&shoptable)
	c.Status(http.StatusNoContent)
}
