package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sec33_Emparty/backend/database"
	Userdata "github.com/sec33_Emparty/backend/models"
	Usertable "github.com/sec33_Emparty/backend/models"
)

//example handle function for api
func GetAllUser(c *gin.Context) {
	user := []Userdata.Userdata{}

	database.DB.Find(&user)

	c.JSON(http.StatusOK, user)
}

func SaveUser(c *gin.Context) {
	userdata := Userdata.Userdata{}
	usertable := Usertable.Usertable{} 

	if err := c.ShouldBindJSON(&userdata); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	if err := database.DB.Save(&userdata).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	if err := c.ShouldBindJSON(&usertable); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	if err := database.DB.Save(&usertable).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, userdata)

}
