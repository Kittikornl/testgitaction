package user

import (
	"net/http"
	"gorm.io/gorm"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sec33_Emparty/backend/services"
)

type search struct {
	gorm.Model
	Search 		string	`json:"Search"; default:""`
	ProductType int 	`json:"ProductType"; default: 0`
}

func SearchProductOrShop(c *gin.Context) {

	var search search
	products := make([]models.Product, 0)
	//shops := make([]models.Shop, 0)
	
	if err := c.ShouldBindBodyWith(&search, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}


	if (search.Search != "" && search.ProductType != 0){	//2 params
		
		if err := database.DB.Joins("Shop").Where("product_type = ? AND product_title LIKE ? OR shop_name LIKE ?", search.ProductType, "%"+search.Search+"%", "%"+search.Search+"%").Find(&products).Error; err != nil{
			c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
			return
		}else{
			c.JSON(http.StatusFound, &products)
		}
	 
	}else{	//1 param

		if err := database.DB.Joins("Shop").Where("product_type = ? OR product_title LIKE ? OR shop_name LIKE ?", search.ProductType, "%"+search.Search+"%", "%"+search.Search+"%").Find(&products).Error; err != nil{	
			c.JSON(http.StatusBadRequest, services.ReturnMessage(err.Error()))
			return
		}else{
			c.JSON(http.StatusFound, &products)
		}
	}
	

}
