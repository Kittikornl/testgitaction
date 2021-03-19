package reviews

import (
	"net/http"
	"strconv"

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

	database.DB.Model(models.Shopreview{}).
		Joins("left JOIN userdata on userdata.id =  shopreviews.user_id").
		Order("created_at desc").Where("shopreviews.shop_id = ?", shop_id).Scan(&reviewsOutput)

	c.JSON(http.StatusOK, reviewsOutput)
}


func CreateShopReview(c *gin.Context) {
	review := models.Shopreview{}
	shop := models.Shoptable{}
	//extract data from JWT
	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))
	shopID := c.Param("id")

	if err := c.ShouldBindBodyWith(&review, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}
	review.UserId = userID
	shopIDInt, _ := strconv.Atoi(shopID)
	review.ShopId = shopIDInt
	
	//find shop
	if err := database.DB.First(&shop, shopID).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage("shop_id: "+string(shopID)+" does not exist"))
		println(err.Error())
		return
	}

	// Save data into reviews
	if err := database.DB.Save(&review).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		println(err.Error())
		return
	}
	
	// Update the data
	println(shop.Rating, shop.ReviewCount, review.Rating)
	newRating := services.NewRating(shop.Rating, shop.ReviewCount, review.Rating)
	shop.Rating = newRating
	shop.ReviewCount = shop.ReviewCount + 1
	println(shop.Rating, shop.ReviewCount, review.Rating)
	if err := database.DB.Model(&models.Shoptable{}).Where("id = ?",shopID).Updates(&shop).Error; err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		println(err.Error())
		return
	}
	c.JSON(http.StatusOK, &review)
}