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
	reviewsOutput := []ReviewOutput{}
	shop_id := c.Param("id")

	database.DB.Model(models.Userdata{}).
		Joins("left JOIN shopreviews on userdata.id =  shopreviews.user_id").
		Order("created_at desc").Where("shopreviews.shop_id = ? and len(shopreviews.comment) > 0", shop_id).
		Limit(5).Scan(&reviewsOutput)

	c.JSON(http.StatusOK, reviewsOutput)
}


func CreateShopReview(c *gin.Context) {
	review := models.Shopreview{}
	shop := models.Shoptable{}
	totalReviews := 0 
	//extract data from JWT
	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))
	shop_id := c.Param("id")
	
	//find shop
	if err := database.DB.First(&shop, shop_id).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage("shop_id: "+string(shop_id)+" does not exist"))
		println(err.Error())
		return
	}

	if err := c.ShouldBindBodyWith(&review, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}
	
	// count total Reviews
	if err := database.DB.Model(models.Shopreview{}).Select("count(id)").Where("shop_id = ?", shop_id).Scan(&totalReviews); err != nil {
		c.Status(http.StatusNotFound)
		return
	}

	// Save data into reviews
	review.UserId = userID
	if err := database.DB.Save(&review).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		println(err.Error())
		return
	}
	
	// Update the data
	shop.Rating = services.NewRating(shop.Rating, totalReviews, review.Rating)
	if err := database.DB.Model(&models.Shoptable{}).Updates(&shop).Error; err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		println(err.Error())
		return
	}
	c.JSON(http.StatusOK, &review)
}