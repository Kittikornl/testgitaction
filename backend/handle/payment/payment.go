package payment

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/models"
)

type Payment struct {
	Item      []models.Order `json:"orders"`
	promotion string         `json:"promotion"`
}

func GetQR(c *gin.Context) {
	payment := Payment{}

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
