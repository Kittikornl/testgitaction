package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"gorm.io/gorm"
)

type search struct {
	gorm.Model
	Search      string `json:"Search"`
	ProductType int    `json:"ProductType"`
}

func SearchProductOrShop(c *gin.Context) {

	var search search
	products := make([]models.Product, 0)
	types := make([]models.Product, 0)
	productsSpec := make([]models.Product, 0)
	shops := make([]models.Shoptable, 0)
	productsInShop := make([]models.Product, 0)
	
	search.Search = " "
	search.ProductType = 0
	
	if err := c.ShouldBindBodyWith(&search, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println(err.Error())
		return
	}
	
	if (search.Search != " " && search.ProductType != 0) { //2 params
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

		
		for _,e := range shops{
			var productTMP []models.Product
			if err := database.DB.Where("shop_id = ?", e.ID).Find(&productTMP).Error; err != nil {
				c.JSON(http.StatusBadRequest, &shops)
			}

			for _,i := range productTMP{
				_, found := Find(productsInShop,i)
				if !found {
					productsInShop = append(productsInShop, i)
				}
			}
		}

		c.JSON(http.StatusOK, gin.H{
			"q_by_shopname":    shops,
			"all_products_inshop": productsInShop,
			"q_by_productname": products,
			"q_by_type":        types})
	}

}

func Find(slice []models.Product, val models.Product) (int, bool) {
	for i, item := range slice {
		if item == val {
			return i, true
		}
	}
	return -1, false
}