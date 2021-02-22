package services

type LoginService interface {
	LoginUser(email string, password string) bool
}

type LoginInformation struct {
	Email    string
	Password string
}

// Store data from database for comparing
func NewLoginService(email string, password string) LoginService {
	return &LoginInformation{
		Email:    email,
		Password: password,
	}
}

func (info *LoginInformation) LoginUser(email string, password string) bool {
	return info.Email == email && info.Password == password
}
