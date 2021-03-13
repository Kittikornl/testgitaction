package services

import (
	"github.com/dgrijalva/jwt-go"
)

func ExtractToken(tokenString string) (string, string) {
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(tokenString, &claims, func(token *jwt.Token) (interface{}, error) {
		// Verification key = 'Emparty'
		return []byte("Emparty"), nil
	})
	// error handling
	if err != nil {
		println(err.Error())
	}
	// get attributes from decoded claims
	email := claims["email"].(string)
	role := claims["role"].(string)

	return email, role
}
