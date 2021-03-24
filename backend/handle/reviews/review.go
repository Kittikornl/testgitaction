package reviews

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sec33_Emparty/backend/services"
)
type ReviewInput struct {
	ShopID int `json:"shop_id"`
	ShopRating int `json:"shop_rating"`
	ShopComment string `json:"shop_comment"`
	ProductList []int `json:"products"`
	ProductsRating int `json:"products_rating"`
	ProductsComment string `json:"products_comment"`
}

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

// swagger:route GET /shops/{:id}/reviews shops listShopReviews
// Return 5 latest shop's reviews with comment
// Security:
//       Bearer: read
// responses:
//		200: shopReviewsResponse

// API for Shop's Reviews
// Get 5 latest reviews with comment by shopId
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

// swagger:route Post /reviews reviews createReviews
// Add new shop & products reviews
// Security:
//       Bearer: write
// parameters: createReviewsBody
// responses:
//		200: returnMessage
//		400:
//		404: returnMessage
//		500:

//Create new review
func CreateReview(c *gin.Context) {
	reviewInput := ReviewInput{}

	shopReview := models.Shopreview{}
	shop := models.Shoptable{}	

	//extract data from JWT
	userID, _ := services.ExtractToken(c.GetHeader("Authorization"))

	if err := c.ShouldBindBodyWith(&reviewInput, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}
	// shop review
	shopReview.UserId = userID
	shopReview.ShopId = reviewInput.ShopID
	shopReview.Rating = reviewInput.ShopRating
	shopReview.Comment = reviewInput.ShopComment
	//find shop
	if err := database.DB.Where("id = ?", reviewInput.ShopID).First(&shop).Error; err != nil {
		c.JSON(http.StatusNotFound, services.ReturnMessage("shop_id: "+string(reviewInput.ShopID)+" does not exist"))
		println(err.Error())
		return
	}
	// Save data into reviews
	if err := database.DB.Save(&shopReview).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		println(err.Error())
		return
	}
	// Update shop
	shop.Rating = services.NewRating(shop.Rating, shop.ReviewCount, shopReview.Rating)
	shop.ReviewCount = shop.ReviewCount + 1
	if err := database.DB.Model(&models.Shoptable{}).Where("id = ?", shop.ID).Updates(&shop).Error; err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		println(err.Error())
		return
	}
	
	// product review
	for i := 0; i < len(reviewInput.ProductList); i++ {
		product := models.Product{}
		productReview := models.Productreview{}
		productReview.UserId = userID
		productReview.Comment = reviewInput.ProductsComment
		productReview.Rating = reviewInput.ProductsRating
		productReview.ProductId = reviewInput.ProductList[i]
		//find product
		if err := database.DB.Where("id = ?",  productReview.ProductId).First(&product).Error; err != nil {
			c.JSON(http.StatusNotFound, services.ReturnMessage("product_id: "+string(reviewInput.ProductList[i])+" does not exist"))
			println(err.Error())
			return
		}
		// Save data into reviews
		if err := database.DB.Save(&productReview).Error; err != nil {
			c.Status(http.StatusInternalServerError)
			println(err.Error())
			return
		}
		// Update the data
		product.Rating = services.NewRating(product.Rating, product.ReviewCount, productReview.Rating)
		product.ReviewCount = product.ReviewCount + 1
		if err := database.DB.Model(&models.Product{}).Where("id = ?", product.ID).Updates(&product).Error; err != nil {
			c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
			println(err.Error())
			return
		}
	}
	c.JSON(http.StatusOK, services.ReturnMessage("All reviews have been created!"))
}

// swagger:route GET /products/{:id}/reviews products listProductReviews
// Return 5 latest shop's reviews with comment
// Security:
//       Bearer: read
// responses:
//		200: productReviewsResponse

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