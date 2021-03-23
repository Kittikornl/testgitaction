package models

import (
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	UserId         int     `json:"user_id"`
	ShopID         int     `json:"shop_id"`
	OrderID        int     `json:"order_id" gorm:"default:1"`
	ProductTitle   string  `json:"product_title"`
	PictureURL     string  `json:"picture_url"`
	ProductDetail  string  `json:"product_detail"`
	Amount         float32 `json:"amount"`
	Price          float32 `json:"price"`
	TotalPrice     float32 `json:"total_price" gorm:"default:1"`
	TrackingNumber string  `json:"tracking_number"`
	CheckTracking  int     `json:"check_tracking" gorm:"default:0"`
	ShippingCharge int `json:"shipping_charge"`
	Status         int     `json:"status" gorm:"default:0"`
	TransactionID  int     `json:"transaction_id"`
}
