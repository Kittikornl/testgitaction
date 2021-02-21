package dto

//Login credential
type LoginCredentials struct {
	Email    string `form:"email"`
	Password string `form:"password"`
	UserID   int    `form:"userID"`
	Role     int    `form:"role"`
}
