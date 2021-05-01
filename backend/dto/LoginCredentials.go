package dto

//Login credential
type LoginCredentials struct {
	UserID int `form:"userID"`
	Role   int `form:"role"`
}
