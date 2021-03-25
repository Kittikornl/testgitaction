package payment

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func getQR(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"qr": "https://drive.google.com/file/d/1d9jKm7B71cleQNxgB6JawCKjQMv9jZzY/view?usp=sharing"})
}
