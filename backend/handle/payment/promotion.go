package payment

import (
	"net/http"
	"time"
	"strconv"


	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sec33_Emparty/backend/services"
	_ "gorm.io/gorm"
)

type PromotionIn struct {
	ShopID        []int       `json:"shop_id"`
	UserID        int       `json:"user_id"`
	OederID       int       `json:"order_id"`
	PromotionCode string    `json:"promotion_code"`
	Price         float32   `json:"price"`
	UsedDate      time.Time `json:"used_date"`
}

// swagger:route Post /payment/promotion promotion usePromotion
// use promotion
// Security:
//       Bearer: write
// parameters: usePromotionBody
// responses:
//		200: promotionResponse
//		400:
//		404: returnMessage
//		500:

func UsePromotion(c *gin.Context) {
	var promotionIn PromotionIn
	var promotion models.Promotion
	var userusepromotion models.UserUsePromotion
	var userusepromotionIn models.UserUsePromotion

	if err := c.ShouldBindBodyWith(&promotionIn, binding.JSON); err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		return
	}
	promotionIn.UsedDate = time.Now()

	if err := c.ShouldBindBodyWith(&userusepromotionIn, binding.JSON); err != nil {
		println(err.Error())
		c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
		return
	}

	//qurry promotion
	if err := database.DB.Where("promotion_code ILIKE ? AND amount > ?", promotionIn.PromotionCode, 1).First(&promotion).Error; err != nil {
		c.JSON(http.StatusBadRequest, services.ReturnMessage("promotion code: "+promotionIn.PromotionCode+" does not exist"))
		return
	}

	//check user used promotion
	if err := database.DB.Where("promotion_id = ? AND user_id = ?", promotion.ID, promotionIn.UserID).First(&userusepromotion).Error; err != nil {

		//check expiration date
		if promotionIn.UsedDate.Before(promotion.EXPDate) {

			//check total price is enough
			if promotionIn.Price >= promotion.MinSpent {

				//check is for all shop
				if promotion.IsForAllShop == 1 {

					//save consumed promotion
					userusepromotionIn.PromotionID = int(promotion.ID)
					if err := database.DB.Save(&userusepromotionIn).Error; err != nil {
						c.Status(http.StatusInternalServerError)
						return
					}
					newpromotion := promotion
					if newpromotion.Amount == 1 {
						println(newpromotion.Amount)
						newpromotion.Amount = 0
						println(newpromotion.Amount)
					} else {
						newpromotion.Amount = newpromotion.Amount - 1
					}

					//update promotion amount
					if err := database.DB.Model(&promotion).Updates(newpromotion).Error; err != nil {
						c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
						return
					}
					c.JSON(http.StatusOK, &promotion)
					return
				}
				
				//check promotion can use with each shop
				for _, e := range promotionIn.ShopID {
					var shoppromotion models.ShopPromotion
					if err := database.DB.Where("promotion_id = ? AND shop_id = ?", promotion.ID,e).First(&shoppromotion).Error; err != nil {
						println(err.Error())
						c.JSON(http.StatusBadRequest, services.ReturnMessage("promotion code: "+promotionIn.PromotionCode+" can not used with shop ID : "+ strconv.Itoa(e)))
						return
					}
				}

				//save consumed promotion
				userusepromotionIn.PromotionID = int(promotion.ID)
				if err := database.DB.Save(&userusepromotionIn).Error; err != nil {
					c.Status(http.StatusInternalServerError)
					return
				}
				newpromotion := promotion
				if newpromotion.Amount == 1 {
					newpromotion.Amount = 0
				} else {
					newpromotion.Amount = newpromotion.Amount - 1
				}

				//update promotion amount
				if err := database.DB.Model(&promotion).Updates(newpromotion).Error; err != nil {
					c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
					return
				}
				c.JSON(http.StatusOK, &promotion)
				return
			}
			c.JSON(http.StatusBadRequest, services.ReturnMessage("Your total price is not enough for promotion code: "+promotionIn.PromotionCode))
			return
		}
		c.JSON(http.StatusBadRequest, services.ReturnMessage("promotion code: "+promotionIn.PromotionCode+" expired"))
		return
	}
	c.JSON(http.StatusBadRequest, services.ReturnMessage("promotion code: "+promotionIn.PromotionCode+" was used by this user"))
}
