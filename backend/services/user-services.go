package services

import (
	"crypto/tls"
	"math/rand"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	gomail "gopkg.in/mail.v2"
)

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


