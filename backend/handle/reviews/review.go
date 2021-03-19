package reviews

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sec33_Emparty/backend/services"
)

type ReviewOutput struct {
	FirstName     string `json:"firstname"`
	LastName      string `json:"lastname"`
	ProfilePicURL string `json:"url_profile_pic"`
	UserID int `json:"user_id"`
	ShopID int `json:"shop_id"`
	Rating int `json:"rating"`
	Comment string `json:"comment"`
}

// Get 5 latest review with comment by shopId
func GetShopReviews(c *gin.Context) {
	reviewsOutput := []reviewsOutput

	id := c.Param("id")

	database.DB.Model(models.Userdata{}).
		Joins("left JOIN shopreviews on userdata.id =  shopreviews.user_id").
		.Order("created_at desc").Where("shopreviews.shop_id = ? and len(shopreviews.comment) > 0", id).
		Limit(5).Scan(&reviewsOutput)

	c.JSON(http.StatusOK, reviewsOutput)
}

func CreateShop(c *gin.Context) {
	//extract data from JWT
	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))


	if err := c.ShouldBindBodyWith(&shoptable, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}

	shoptable.UserID = userID

	// Save the format data into DB: Shoptable
	if err := database.DB.Save(&shoptable).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, &shoptable)
}
}