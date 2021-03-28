package models

import (
	"time"

	"gorm.io/gorm"
)

type Promotion struct {
	gorm.Model
	PromotionCode  string    `json:"promotion_code"`
	Description    string    `json:"description"`
	DiscountAmount int       `json:"discount_amount"`
	MinSpent       float32   `json:"min_spent"`
	Amount         int       `json:"amount" gorm: "default:0"`
	EXPDate        time.Time `json:"exp_date"`
	IsForAllShop   int       `json:"is_for_all_shop"`
}

type ShopPromotion struct {
	gorm.Model
	ShopID      int `json:"shop_id"`
	PromotionID int `json:"promotion_id"`
}

type UserUsePromotion struct {
	gorm.Model
	UserID      int       `json:"user_id"`
	PromotionID int       `json:"promotion_id"`
	OrderID     int       `json:"order_id"`
	UsedDate    time.Time `json:"used_date"`
}
