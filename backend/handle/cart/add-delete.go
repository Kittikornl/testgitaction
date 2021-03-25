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

		_, found := Find(shopOut, shopInfo)
    	if !found {
        	shopOut = append(shopOut, shopInfo)
		}
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

func DeleteFromCart(c *gin.Context) {

	var cartitem models.Cartitem
	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))

	if err := c.ShouldBindBodyWith(&cartitem, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}

	if err := database.DB.Where("user_id = ? AND shop_id = ? AND product_title = ? AND amount = ?", userID, cartitem.ShopID, cartitem.ProductTitle, cartitem.Amount).Find(&cartitem).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	database.DB.Delete(&cartitem)
	c.JSON(http.StatusOK,"")
}

func Find(slice []models.Shoptable, val models.Shoptable) (int, bool) {
    for i, item := range slice {
        if item == val {
            return i, true
        }
    }
    return -1, false
}