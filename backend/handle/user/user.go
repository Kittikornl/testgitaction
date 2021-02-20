package user

import (
	"math/rand"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"github.com/sendgrid/sendgrid-go"
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

// random generate password
func GeneratePassword() string {
	var (
		lowerCharSet   = "abcdedfghijklmnopqrst"
		upperCharSet   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		specialCharSet = "!@#$%&*"
		numberSet      = "0123456789"
		allCharSet     = lowerCharSet + upperCharSet + specialCharSet + numberSet
		password       strings.Builder
	)
	//Init rand
	rand.Seed(time.Now().UTC().UnixNano())
	//Set special character
	password.WriteString(string(specialCharSet[rand.Intn(len(specialCharSet))]))

	//Set numeric
	password.WriteString(string(numberSet[rand.Intn(len(numberSet))]))

	//Set uppercase
	password.WriteString(string(upperCharSet[rand.Intn(len(upperCharSet))]))

	//Set lowercase
	password.WriteString(string(lowerCharSet[rand.Intn(len(lowerCharSet))]))

	for i := 0; i < 4; i++ {
		random := rand.Intn(len(allCharSet))
		password.WriteString(string(allCharSet[random]))
	}

	inRune := []rune(password.String())
	rand.Shuffle(len(inRune), func(i, j int) {
		inRune[i], inRune[j] = inRune[j], inRune[i]
	})
	return string(inRune)
}
