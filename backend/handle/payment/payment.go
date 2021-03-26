package payment

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sec33_Emparty/backend/services"
)

type Payment struct {
	Item      []models.Order `json:"order"`
	promotion string         `json:"promotion"`
}

func GetQR(c *gin.Context) {
	payment := Payment{}

	if err := c.ShouldBindBodyWith(&payment, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}

	if !ClearStock(c) {
		return
	}

	// Change each order's status to 2 (paid, wait for being delivered)
	for i, _ := range payment.Item {
		payment.Item[i].Status = 2
	}

	// Fixed QR link, in the backend's GoogleDrive
	c.JSON(http.StatusOK, gin.H{
		"qr":        "https://drive.google.com/file/d/1d9jKm7B71cleQNxgB6JawCKjQMv9jZzY/view?usp=sharing",
		"orders":    payment.Item,
		"promotion": payment.promotion,
	})
}

func ValidateCard(c *gin.Context) {
	payment := Payment{}

	if err := c.ShouldBindBodyWith(&payment, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}

	if !ClearStock(c) {
		return
	}

	// Change each order's status to 2 (paid, wait for being delivered)
	for i, _ := range payment.Item {
		payment.Item[i].Status = 2
	}

	c.JSON(http.StatusOK, gin.H{
		"accept":    true,
		"orders":    payment.Item,
		"promotion": payment.promotion,
	})
}

func ClearStock(c *gin.Context) bool {
	payment := Payment{}
	products := []models.Product{}

	if err := c.ShouldBindBodyWith(&payment, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return false
	}

	// for-loop to check if any order is over in amount from stock.
	for _, order := range payment.Item {
		product := models.Product{}
		if err := database.DB.Where("shop_id = ? AND product_title = ?", order.ShopID, order.ProductTitle).First(&product).Error; err != nil {
			c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
			return false
		}

		if int(order.Amount) > product.Amount {
			c.JSON(http.StatusBadRequest, services.ReturnMessage("The requested amount is exceeding the stock's amount."))
			return false
		}

		product.Amount = LeftAmount(product.Amount, int(order.Amount))
		products = append(products, product)

	}

	// for-loop to update the amount left for each stock
	for _, product := range products {
		if err := database.DB.Save(&product).Error; err != nil {
			c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
			return false
		}
	}

	return true
}

func LeftAmount(stock int, order int) int {
	return stock - order
}
