package cart

import (
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sec33_Emparty/backend/services"
	"gorm.io/gorm"
)

type Checkout struct {
	gorm.Model
	Item []models.Order `json:"items"`
}

func GetOrdersHistory(c *gin.Context) {

	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))
	var items Checkout
	var userInfo models.Userdata
	var shopOut []models.Shoptable
	
	if err := database.DB.Where("id = ?", userID).Find(&userInfo).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	if err := database.DB.Where("user_id = ? AND status > ?", userID, 0).Find(&items.Item).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	for _ , e := range items.Item {

		var shopInfo models.Shoptable
		if err := database.DB.Where("id = ?", e.ShopID).Find(&shopInfo).Error; err != nil {
				c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
				return
		}
		shopOut = append(shopOut, shopInfo)
	}
	c.JSON(http.StatusOK, gin.H{"user_info": userInfo, "order_info": items.Item, "shop_info": shopOut})
}

func CheckOutOrder(c *gin.Context) {
	total := float32(0)
	var items Checkout
	var orderID int
	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))
	rand.Seed(time.Now().UTC().UnixNano())

	if err := c.ShouldBindBodyWith(&items, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}

	row := database.DB.Table("orders").Select("max(order_id)").Row()
	row.Scan(&orderID)
	println(orderID)

	for _, e := range items.Item {
		total = total + e.Price
	}
	for _, e := range items.Item {
		e.TotalPrice = total
		e.UserId = userID
		e.Status = 1
		e.OrderID = orderID + 1
		e.ShippingCharge = randInt(15,100)
		if err := database.DB.Save(&e).Error; err != nil {
			c.Status(http.StatusInternalServerError)
			return
		}
	}

	c.JSON(http.StatusOK, items)
}

func randInt(min int, max int) int {
    return min + rand.Intn(max-min)
}