package user

import (
	"math/rand"
	"net/http"
	"net/smtp"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/models"
<<<<<<< Updated upstream
<<<<<<< HEAD
	"github.com/sendgrid/sendgrid-go"
=======
>>>>>>> Stashed changes
)

=======
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var DB *gorm.DB

>>>>>>> 0f0e56806dec286bb2e98486eff54dce834d8138
//example handle function for api
func GetAllUser(c *gin.Context) {
	user := []models.Userdata{}

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

// send email
func SendEmail(userEmail, subject, text string) string {
	// Sender data.
	from := "noreply.pugsod@gmail.com"
	password := "emparty@2021"

	// Receiver email address.
	to := []string{
		userEmail,
	}

	// smtp server configuration.
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	// Message.
	message := []byte(userEmail)

	// Authentication.
	auth := smtp.PlainAuth("", from, password, smtpHost)

	// Sending email.
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
	if err != nil {
		return err.Error()
	}
	return "Email Sent Successfully!"
}

// reset password by email
func ResetPassword(c *gin.Context) {
	// user_data := models.Userdata{}
	// user_table := models.Usertable{}
	println("I'm working")
	new_password := GeneratePassword()
	text := "we change your password to \n " + new_password + "\n pls change your password in profile page \n Best Regress \n Pugsod"
	message := SendEmail("pkorn03@gmail.com", "Reset Password", text)
	c.JSON(http.StatusOK, message)
}
