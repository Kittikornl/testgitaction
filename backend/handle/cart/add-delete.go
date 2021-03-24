package cart

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sec33_Emparty/backend/services"
)

func GetCartitems(c *gin.Context) {
	//check delete?
	cartitems := make([]models.Cartitem, 0)
	var shopOut []models.Shoptable
	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))

	if err := database.DB.Where("user_id = ? ", userID).Find(&cartitems).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	for _, e := range cartitems {

		var shopInfo models.Shoptable
		if err := database.DB.Where("id = ?", e.ShopID).Find(&shopInfo).Error; err != nil {
			c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
			return
		}
		shopOut = append(shopOut, shopInfo)
	}

	c.JSON(http.StatusOK, gin.H{"shop_info": shopOut, "cart_items": cartitems})
}

func AddToCart(c *gin.Context) {

	cartitems := models.Cartitem{}
	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))

	if err := c.ShouldBindBodyWith(&cartitems, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}

	cartitems.UserId = userID

	if err := database.DB.Save(&cartitems).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}
	c.JSON(http.StatusOK, &cartitems)
}

func UpdateCart(c *gin.Context) {

	var changeInput models.Cartitem
	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))

	if err := c.ShouldBindBodyWith(&changeInput, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}

	newAmount := changeInput.Amount + changeInput.ChangeAmount
	println(newAmount,changeInput.Amount,changeInput.ChangeAmount)
	if err := database.DB.Table("cartitems").Where("user_id = ? AND shop_id = ? AND product_title = ? AND amount = ?", userID, changeInput.ShopID, changeInput.ProductTitle, changeInput.Amount).Updates(map[string]interface{}{"amount": newAmount}).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}
	c.JSON(http.StatusOK, &changeInput)
}

// func DeleteFromCart(c *gin.Context) {
// 	//bug jaaa >> can't delete
// 	//var cartitemsDelete cart
// 	cartitems := make([]models.Cartitem, 0)
// 	id := c.Param("id")

// 	if err := database.DB.Find(&cartitems, id).Error; err != nil {
// 		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
// 		return
// 	}

// 	database.DB.Delete(&cartitems)
// 	c.Status(http.StatusNoContent)
// }
