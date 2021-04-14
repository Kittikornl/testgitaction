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

type HistoryOutput struct {
	Items    []models.Order     `json:"order_info"`
	UserInfo []models.Userdata    `json:"user_info"`
	ShopOut  []models.Shoptable `json:"shop_info"`
}

type FilterHistoryOutput struct {
	Items    []models.Order     `json:"order_info"`
	UserInfo models.Userdata    `json:"user_info"`
	ShopOut  []models.Shoptable `json:"shop_info"`
}

// swagger:route GET /history/filter/:status cart filterHistory
// Return orders history filter by status
// Security:
//       Bearer: read
// responses:
//		200: filterHistoryResponse

func FilterHistory(c *gin.Context){
	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))
	status := c.Param("status")
	var filterHistoryOut FilterHistoryOutput

	if err := database.DB.Where("id = ?", userID).Find(&filterHistoryOut.UserInfo).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	if err := database.DB.Where("user_id = ? AND status = ?", userID, status).Order("order_id desc").Find(&filterHistoryOut.Items).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	for _, e := range filterHistoryOut.Items {

		var shopInfo models.Shoptable
		if err := database.DB.Where("id = ?", e.ShopID).Find(&shopInfo).Error; err != nil {
			c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
			return
		}
		_, found := Find(filterHistoryOut.ShopOut, shopInfo)
		if !found {
			filterHistoryOut.ShopOut = append(filterHistoryOut.ShopOut, shopInfo)
		}
	}
	c.JSON(http.StatusOK, filterHistoryOut)
}

// swagger:route GET /history cart getOrderHistory
// Return orders history
// Security:
//       Bearer: read
// responses:
//		200: orderHistoryResponse

func GetOrdersHistory(c *gin.Context) {

	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))
	var historyOut HistoryOutput

	if err := database.DB.Where("id = ?", userID).Find(&historyOut.UserInfo).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	if err := database.DB.Where("user_id = ? AND status > ?", userID, 0).Order("order_id desc").Find(&historyOut.Items).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	for _, e := range historyOut.Items {

		var shopInfo models.Shoptable
		if err := database.DB.Where("id = ?", e.ShopID).Find(&shopInfo).Error; err != nil {
			c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
			return
		}
		_, found := Find(historyOut.ShopOut, shopInfo)
		if !found {
			historyOut.ShopOut = append(historyOut.ShopOut, shopInfo)
		}
	}
	c.JSON(http.StatusOK, historyOut)
}

// swagger:route POST /checkout cart checkOutOrder
// Checkout order (save order into database)
// Security:
//       Bearer: read
// parameters: checkOutOrderBody
// responses:
//		200: checkOutOrderResponse

func CheckOutOrder(c *gin.Context) {
	total := float32(0)
	var items Checkout
	var orderID int
	var cartitem []models.Cartitem
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
	shippingForAll := randInt(15, 100)
	for _, e := range items.Item {
		total = total + (e.Price*e.Amount)

	}
	for _, e := range items.Item {
		e.TotalPrice = total
		e.UserId = userID
		e.Status = 1
		e.OrderID = orderID + 1
		e.ShippingCharge = shippingForAll

		
		if err := database.DB.Save(&e).Error; err != nil {
			c.Status(http.StatusInternalServerError)
			return
		}
		if err := database.DB.Where("user_id = ? AND shop_id = ? AND product_title = ? AND amount = ?", userID, e.ShopID, e.ProductTitle, e.Amount).Find(&cartitem).Error; err != nil {
			c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
			return
		}
		println("con")
		database.DB.Delete(&cartitem)
	}
	

	c.JSON(http.StatusOK, gin.H{"order_id": orderID + 1})
}

func GetOrdersForSeller(c *gin.Context) {

	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))
	var orderOut HistoryOutput

	if err := database.DB.Where("id = ?", userID).Find(&orderOut.ShopOut).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	if err := database.DB.Where("shop_id = ? AND status = ?", userID, 2).Find(&orderOut.Items).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	for _, e := range orderOut.Items {

		var userInfo models.Userdata
		if err := database.DB.Where("id = ?", e.UserId).Find(&userInfo).Error; err != nil {
			c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
			return
		}
		_, found := FindUser(orderOut.UserInfo, userInfo)
		if !found {
			orderOut.UserInfo = append(orderOut.UserInfo, userInfo)
		}
	}
	c.JSON(http.StatusOK, orderOut)
}

func randInt(min int, max int) int {
	return min + rand.Intn(max-min)
}


func FindUser(slice []models.Userdata, val models.Userdata) (int, bool) {
	for i, item := range slice {
		if item == val {
			return i, true
		}
	}
	return -1, false
}
