package services

import (
	"github.com/dgrijalva/jwt-go"
)

// return userID(int), role(int)
func ExtractToken(tokenString string) (int, int) {
	token, err := jwt.ParseWithClaims(tokenString, &authCustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})
	claims, ok := token.Claims.(*authCustomClaims)
	if !ok || !token.Valid {
		println(err.Error())
	}

	userId := claims.UserID
	role := claims.Role

	return userId, role
}
