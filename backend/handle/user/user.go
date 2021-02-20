package user

import (
	"crypto/tls"
	"math/rand"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
	"golang.org/x/crypto/bcrypt"
	gomail "gopkg.in/mail.v2"
	"gorm.io/gorm"
)

var DB *gorm.DB

//example handle function for api
func GetAllUser(c *gin.Context) {
	user := []models.Userdata{}

	database.DB.Find(&user)

	c.JSON(http.StatusOK, user)
}

func GetAllAccount(c *gin.Context) {
	user := []models.Usertable{}

	database.DB.Find(&user)

	c.JSON(http.StatusOK, user)
}

func SaveUser(c *gin.Context) {

	var userData models.Userdata
	var userTable models.Usertable

	if err := c.ShouldBindBodyWith(&userData, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println("1")
		return
	}

	if err := database.DB.Save(&userData).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		println("2")
		return
	}

	if err := c.ShouldBindBodyWith(&userTable, binding.JSON); err != nil {
		c.Status(http.StatusBadRequest)
		println("3")
		return
	}

	if err := database.DB.Save(&userTable).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		println("4")
		return
	}

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(userTable.Password), bcrypt.DefaultCost)
	if err != nil {
		return
	}

	newUser := &models.Usertable{
		Email:    userTable.Email,
		Password: string(passwordHash),
		Userdata: userData,
	}

	database.DB.Model(&userTable).Updates(models.Usertable{Email: userTable.Email, Password: string(passwordHash), Userdata: userData})
	c.JSON(http.StatusOK, newUser)

}

func DeleteUser(c *gin.Context) {

	id := c.Param("id")
	userData := models.Userdata{}

	if err := database.DB.Find(&userData, id).Error; err != nil {
		c.Status(http.StatusNotFound)
		return
	}

	database.DB.Model(models.Userdata{}).Where("id", id).Updates(map[string]interface{}{"is_active": 0})
	c.Status(http.StatusNoContent)
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

func SendEmail(userEmail, subject, text string) string {
	m := gomail.NewMessage()
	sender := "noreply.pugsod@gmail.com"
	// Set E-Mail sender
	m.SetHeader("From", sender)

	// Set E-Mail receivers
	m.SetHeader("To", userEmail)

	// Set E-Mail subject
	m.SetHeader("Subject", subject)

	// Set E-Mail body. You can set plain text or html with text/html
	m.SetBody("text/plain", text)

	// Settings for SMTP server
	d := gomail.NewDialer("smtp.gmail.com", 587, sender, "emparty@2021")

	// This is only needed when SSL/TLS certificate is not valid on server.
	// In production this should be set to false.
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	// Now send E-Mail
	if err := d.DialAndSend(m); err != nil {
		return err.Error()
	}
	return "Email Sent Successfully!"
}

func ResetPassword(c *gin.Context) {
	var userTable models.Usertable

	email := c.PostForm("email")
	new_password := GeneratePassword()
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(new_password), bcrypt.DefaultCost)
	if err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	if err := database.DB.Where("email = ?", email).First(&userTable).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"massage": "Email is not exist",
		})
		return
	}
	database.DB.Model(&userTable).Where("email = ?", email).Update("password", passwordHash)
	text := "This is your new password\n\n" + new_password + "\n\n you can change your password in profile page\n\n  Best regres\n Pugsod team"
	SendEmail(userTable.Email, "Reset Password", text)
	c.JSON(http.StatusOK, gin.H{
		"massage": "Your new password was sent to your Email",
	})
}
