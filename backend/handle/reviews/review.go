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

type ShopReviewOutput struct {
	FirstName     string `json:"firstname"`
	LastName      string `json:"lastname"`
	ProfilePicURL string `json:"url_profile_pic"`
	UserID int `json:"user_id"`
	ShopID int `json:"shop_id"`
	Rating int `json:"rating"`
	Comment string `json:"comment"`
}
type ProductReviewOutput struct {
	FirstName     string `json:"firstname"`
	LastName      string `json:"lastname"`
	ProfilePicURL string `json:"url_profile_pic"`
	UserID int `json:"user_id"`
	ProductID int `json:"product_id"`
	Rating int `json:"rating"`
	Comment string `json:"comment"`
}

// API for Shop's Reviews
// Get 5 latest review with comment by shopId
func GetShopReviews(c *gin.Context) {
	reviewsOutput := []ShopReviewOutput{}
	shop_id := c.Param("id")

	database.DB.Model(models.Shopreview{}).
		Select("*").
		Joins("left JOIN userdata on userdata.id =  shopreviews.user_id").
		Order("shopreviews.created_at desc").Where("shopreviews.shop_id = ? and length(shopreviews.comment) != 0" , shop_id).
		Limit(5).Scan(&reviewsOutput)

	c.JSON(http.StatusOK, reviewsOutput)
}

//Create new review
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
	
	// Update shop
	shop.Rating = services.NewRating(shop.Rating, shop.ReviewCount, review.Rating)
	shop.ReviewCount = shop.ReviewCount + 1
	if err := database.DB.Model(&models.Shoptable{}).Where("id = ?",shopID).Updates(&shop).Error; err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		println(err.Error())
		return
	}
	c.JSON(http.StatusOK, &review)
}

// API for Product's Reviews
// Get 5 latest review with comment by productID
func GetProductReviews(c *gin.Context) {
	reviewsOutput := []ProductReviewOutput{}
	productID := c.Param("id")

	database.DB.Model(models.Productreview{}).
		Select("*").
		Joins("left JOIN userdata on userdata.id =  productreviews.user_id").
		Order("productreviews.created_at desc").Where("productreviews.product_id = ? and length(productreviews.comment) != 0", productID).
		Limit(5).Scan(&reviewsOutput)

	c.JSON(http.StatusOK, reviewsOutput)
}

func CreateProductReview(c *gin.Context) {
	review := models.Productreview{}
	product := models.Product{}
	//extract data from JWT
	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))
	productID := c.Param("id")

	if err := c.ShouldBindBodyWith(&review, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}
	review.UserId = userID
	productIDInt, _ := strconv.Atoi(productID)
	review.ProductId = productIDInt
	
	//find product
	if err := database.DB.First(&product, productID).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage("product_id: "+string(productID)+" does not exist"))
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
	product.Rating = services.NewRating(product.Rating, product.ReviewCount, review.Rating)
	product.ReviewCount = product.ReviewCount + 1
	if err := database.DB.Model(&models.Product{}).Where("id = ?",productID).Updates(&product).Error; err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		println(err.Error())
		return
	}
	c.JSON(http.StatusOK, &review)
}