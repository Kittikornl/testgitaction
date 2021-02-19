package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
)
//example handle function for api
func GetAllUser(c *gin.Context) {
	user := []models.Userdata{}

	database.DB.Find(&user)

	c.JSON(http.StatusOK, user)
}

func SaveUser(c *gin.Context) {
	user_data := models.Userdata{}
	user_table := models.Usertable{}

	if err := c.ShouldBindJSON(&user_data); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	if err := database.DB.Save(&user_data).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	if err := c.ShouldBindJSON(&user_table); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	if err := database.DB.Save(&user_table).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, user_data)

}
