package models

import (
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	UserId         int     `json:"user_id"`
	ShopID         int     `json:"shop_id"`
	OrderID        int     `json:"order_id" gorm:"default:1"`
	ProductID      int     `json:"product_id"`
	ProductTitle   string  `json:"product_title"`
	PictureURL     string  `json:"picture_url"`
	ProductDetail  string  `json:"product_detail"`
	Amount         float32 `json:"amount"`
	Price          float32 `json:"price"`
	TotalPrice     float32 `json:"total_price" gorm:"default:1"`
	TrackingNumber string  `json:"tracking_number"`
	CheckTracking  int     `json:"check_tracking" gorm:"default:0"`
	ShippingCharge int     `json:"shipping_charge"`
	ShippingMethod string  `json:"shipping_method"`
	// Status's detail:
	// 0 = Cart (DEFAULT)
	// 1 = Wait for being paid
	// 2 = paid, wait for being delivered
	// 3 = delivered, wait for being received
	// 4 = received
	// 5 = Cancel order (SENT FROM FRONT)
	// 6 = Amount of items in order is exceeding
	Status        int `json:"status" gorm:"default:0"`
	TransactionID int `json:"transaction_id"`
}
