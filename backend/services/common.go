package services

import (
	"github.com/dgrijalva/jwt-go"
)

// return userID(int), role(int)
func ExtractToken(tokenString string) jwt.MapClaims {
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(tokenString, &claims, func(token *jwt.Token) (interface{}, error) {
		// Verification key = 'Emparty'
		return []byte("SECRET"), nil
	})
	// error handling
	if err != nil {
		println(err.Error())
	}
	return claims
}
