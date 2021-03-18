package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"gorm.io/gorm"
	//"github.com/sec33_Emparty/backend/services"
)

type search struct {
	gorm.Model
	Search      string `json:"Search"; default: "test"`
	ProductType int    `json:"ProductType"; default: 0`
}

func SearchProductOrShop(c *gin.Context) {

	var search search
	products := make([]models.Product, 0)
	types := make([]models.Product, 0)
	productsSpec := make([]models.Product, 0)
	shops := make([]models.Shoptable, 0)

	if err := c.ShouldBindBodyWith(&search, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}

	if search.Search != "" && search.ProductType != 0 { //2 params
		//query products
		if err := database.DB.Where("product_type = ? AND product_title ILIKE ? AND amount > ?", search.ProductType, "%"+search.Search+"%", 0).Find(&products).Error; err != nil {
			c.JSON(http.StatusBadRequest, &products)

		}
		//query product for specify shops
		if err := database.DB.Joins("JOIN shoptables on products.shop_id = shoptables.id").Where("product_type = ? AND shop_name ILIKE ? AND amount > ?", search.ProductType, "%"+search.Search+"%", 0).Find(&productsSpec).Error; err != nil {
			c.JSON(http.StatusBadRequest, &productsSpec)

		}
		c.JSON(http.StatusOK, gin.H{
			"products_information": products,
			"allproducts_for_shop": productsSpec})

	} else { //1 param
		//query by product name
		if err := database.DB.Where("product_title ILIKE ? AND amount > ?", "%"+search.Search+"%", 0).Find(&products).Error; err != nil {
			c.JSON(http.StatusBadRequest, &products)
		}
		//query by type
		if err := database.DB.Where("product_type = ? AND amount > ?", search.ProductType, 0).Find(&types).Error; err != nil {
			c.JSON(http.StatusBadRequest, &types)
		}
		//query by shop name
		if err := database.DB.Where("shop_name ILIKE ?", "%"+search.Search+"%").Find(&shops).Error; err != nil {
			c.JSON(http.StatusBadRequest, &shops)
		}

		c.JSON(http.StatusOK, gin.H{
			"q_by_shopname":    shops,
			"q_by_productname": products,
			"q_by_type":        types})
	}

}
