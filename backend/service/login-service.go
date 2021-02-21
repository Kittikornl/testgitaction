package service

type LoginService interface {
	LoginUser(email string, password string) bool
}

type loginInformation struct {
	Email    string
	Password string
}

// Store data from database for comparing
func NewLoginService(email string, password string) LoginService {
	return &loginInformation{
		Email:    email,
		Password: password,
	}
}

func (info *loginInformation) LoginUser(email string, password string) bool {
	// Check if the input email and password match the database
	return info.Email == email && info.Password == password
}
