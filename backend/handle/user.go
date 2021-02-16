package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sec33_Emparty/backend/database"
	Userdata "github.com/sec33_Emparty/backend/models"
)

//example handle function for api
func GetAllUser(c *gin.Context) {
	user := []Userdata.Userdata{}

	database.DB.Find(&user)

	c.JSON(http.StatusOK, user)
}
