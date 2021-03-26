package cart

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sec33_Emparty/backend/services"
)

type CartitemOutput struct {
	Cartitems []models.Cartitem  `json:"cart_items"`
	ShopOut   []models.Shoptable `json:"shop_info"`
}

type AddCartOutput struct {

}

// swagger:route GET /carts cart getCartitems
// Return cart items
// Security:
//       Bearer: read
// responses:
//		200: cartItemsResponse

func GetCartitems(c *gin.Context) {

	var cartitem CartitemOutput
	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))

	if err := database.DB.Where("user_id = ? ", userID).Find(&cartitem.Cartitems).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	for _, e := range cartitem.Cartitems {

		var shopInfo models.Shoptable
		if err := database.DB.Where("id = ?", e.ShopID).Find(&shopInfo).Error; err != nil {
			c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
			return
		}

		_, found := Find(cartitem.ShopOut, shopInfo)
		if !found {
			cartitem.ShopOut = append(cartitem.ShopOut, shopInfo)
		}
	}

	c.JSON(http.StatusOK, cartitem)
}

// swagger:route POST /carts/add cart addCart
// Add items into cart
// Security:
//       Bearer: read
// parameters: addCartBody
// responses:
//		200: addCartResponse

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

// swagger:route POST /carts/update cart updateCart
// Change amount of item in cart
// Security:
//       Bearer: read
// parameters: updateCartBody
// responses:
//		200: updateCartResponse

func UpdateCart(c *gin.Context) {

	var changeInput models.Cartitem
	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))

	if err := c.ShouldBindBodyWith(&changeInput, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}

	newAmount := changeInput.Amount + changeInput.ChangeAmount
	println(newAmount, changeInput.Amount, changeInput.ChangeAmount)
	if err := database.DB.Table("cartitems").Where("user_id = ? AND shop_id = ? AND product_title = ? AND amount = ?", userID, changeInput.ShopID, changeInput.ProductTitle, changeInput.Amount).Updates(map[string]interface{}{"amount": newAmount}).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}
	c.JSON(http.StatusOK, gin.H{"new_amount":newAmount})
}

// swagger:route DELETE /carts/delete cart deleteFromCart
// Delete item from cart
// Security:
//       Bearer: read
// parameters: deleteCartitemBody
// responses:
//		200: returnMessage

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
	c.JSON(http.StatusOK, "Deleted Successful")
}

func Find(slice []models.Shoptable, val models.Shoptable) (int, bool) {
	for i, item := range slice {
		if item == val {
			return i, true
		}
	}
	return -1, false
}
