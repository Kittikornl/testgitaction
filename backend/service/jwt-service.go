package service

import (
	"fmt"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

//jwt service
type JWTService interface {
	GenerateToken(email string, isUser bool) string
	ValidateToken(token string) (*jwt.Token, error)
}

// jwtCustomClaims are custom claims extending default ones.
type authCustomClaims struct {
	Email string `json:"email"`
	User  bool   `json:"user"`
	jwt.StandardClaims
}

type jwtService struct {
	secretKey string
	issuer    string
}

//auth-jwt
func JWTAuthService() JWTService {
	return &jwtService{
		secretKey: getSecretKey(),
		issuer:    "Emparty",
	}
}

func getSecretKey() string {
	secret := os.Getenv("SECRET")
	if secret == "" {
		secret = "secret"
	}
	return secret
}

func (service *jwtService) GenerateToken(email string, isUser bool) string {

	// Set custom and standard claims
	claims := &authCustomClaims{
		email,
		isUser,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 48).Unix(),
			Issuer:    service.issuer,
			IssuedAt:  time.Now().Unix(),
		},
	}
	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded  token using secret key
	t, err := token.SignedString([]byte(service.secretKey))
	if err != nil {
		panic(err)
	}
	return t
}

func (service *jwtService) ValidateToken(tokenString string) (*jwt.Token, error) {
	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Signing method validation
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Invalid token", token.Header["alg"])
		}
		// Return the secret key
		return []byte(service.secretKey), nil
	})
}
