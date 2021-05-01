package shop

import (
    "testing"
	"net/http/httptest"

	"github.com/gin-gonic/gin"
	"github.com/sec33_Emparty/backend/handle/shop"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
)

func TestDeleteShop1(t *testing.T){
	var shoptest models.Shoptable
	w := httptest.NewRecorder()
    c, _ := gin.CreateTestContext(w)
	
	c.Params = []gin.Param{
		{
			Key: "id",
			Value: "99",
		},
	}
	shoptest.ID=99
	shoptest.UserID = 99
	database.Initdatabase()
	database.DB.Save(&shoptest)
	shop.DeleteShop(c)
	if(w.Code == 200){
		return
	}
	t.Error("This ID should valid")
}


func TestDeleteShop2(t *testing.T){
	w := httptest.NewRecorder()
    c, _ := gin.CreateTestContext(w)
	
	c.Params = []gin.Param{
		{
			Key: "id",
			Value: "99.9",
		},
	}
	database.Initdatabase()
	shop.DeleteShop(c)
	if(w.Code == 404){
		return
	}
	t.Error("This ID should valid")
}
