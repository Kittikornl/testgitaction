package shipment

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

type TrackInput struct {
	gorm.Model
	TrackInput string `json:"track_input"`
}


// swagger:route POST /shipment shipment shipment
// Check validate tracking number & generate status for shipment
// Security:
//       Bearer: read
// parameters: trackingNumberBody
// responses:
//		200: shipmentResponse

func Shipment(c *gin.Context) { 

	var orders models.Order
	var trackInput TrackInput
	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))
	rand.Seed(time.Now().UTC().UnixNano())

	if err := c.ShouldBindBodyWith(&trackInput, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}

	if err := database.DB.Where("tracking_number = ? AND user_id = ?", trackInput.TrackInput,userID).Find(&orders).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage(err.Error()))
		return
	}

	if (orders.CheckTracking == 0){
		rand := randInt(3,5)
		orders.Status = rand
		orders.CheckTracking = 1
		println(orders.Status) 
	}

	if err := database.DB.Table("orders").Where("tracking_number = ?", trackInput.TrackInput).Updates(map[string]interface{}{"status": orders.Status, "check_tracking": orders.CheckTracking}).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}
	c.JSON(http.StatusOK, orders)
}

func randInt(min int, max int) int {
    return min + rand.Intn(max-min)
}