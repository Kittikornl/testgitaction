// Package classification Pugsod API.
//
// the purpose of this application is to provide Pugsod Backend
// that is for frontend developer to understand more about API
//
//     Schemes: http
//     Host: localhost
//     BasePath: /api/
//     Version: 1.0.3
//     Contact: Pugsod Team<empartyteam@gmail.com>
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     SecurityDefinitions:
//     Bearer:
//      type: apiKey
//      name: Authorization
//      in: header
//
// swagger:meta
package docs

import (
	_ "github.com/sec33_Emparty/backend/handle/products"
	"github.com/sec33_Emparty/backend/handle/reviews"
	"github.com/sec33_Emparty/backend/handle/shipment"
	"github.com/sec33_Emparty/backend/handle/cart"
	_ "github.com/sec33_Emparty/backend/handle/shop"
	"github.com/sec33_Emparty/backend/handle/user"
	"github.com/sec33_Emparty/backend/models"
)

// A list of reviews
// swagger:response shopReviewsResponse
type shopReviewsResponseWrapper struct {
	// 5 latest shop's reviews 
	// in: body
	Body []reviews.ShopReviewOutput
}

// A list of reviews
// swagger:response productReviewsResponse
type productReviewsResponseWrapper struct {
	// 5 latest product's reviews 
	// in: body
	Body []reviews.ProductReviewOutput
}

// The return message 
// swagger:response returnMessage
type returnMessageResponseWrapper struct {
	// return some message to user 
	// in: body
	Body string
}

// swagger:parameters createReviewsBody createReviews
type createReviewsBodyWrapper struct {
    // in: body
    Body reviews.ReviewInput
}
type UserBody struct{
	FirstName     string `json:"firstname"`
	LastName      string `json:"lastname"`
	ProfilePicURL string `json:"url_profile_pic"`
	Role          int    `json:"role"`
	PhoneNo       string `json:"phoneNo"`
	Birthdate     string `json:"birthdate"`
	Adress        string `json:"houseNo"`
	Street        string `json:"street"`
	SubDistrict   string `json:"subDistrict"`
	District      string `json:"district"`
	Zipcode       string `json:"zipcode"`
	City          string `json:"city"`
}

// swagger:parameters updateUserBody updateUser
type updateUserBodyWrapper struct {
    // in: body
    Body UserBody
}

// swagger:parameters resetPasswordBody resetPassword
type resetPasswordBodyWrapper struct {
    // in: body
    Body user.ResetPasswordInput
}

// swagger:parameters changePasswordBody changePassword
type changePasswordBodyBodyWrapper struct {
    // in: body
    Body user.ChangePasswordInput
}



// List of top selling products and List of new products
// swagger:response homePageResponse
type homePageResponseWrapper struct {
	// return some message to user 
	// in: body
	Body user.HomePageOutput
}

// swagger:parameters trackingNumberBody shipment
type trackingNumberBodyWrapper struct {
    // in: body
    Body shipment.TrackInput
}

// swagger:response shipmentResponse
type shipmentResponseWrapper struct { 
	// in: body
	Body models.Order
}

// swagger:response orderHistoryResponse
type orderHistoryResponseWrapper struct { 
	// return orders history
	// in: body
	Body cart.HistoryOutput
}

// swagger:parameters checkoutOrderBody cart
type checkoutOrderBodyWrapper struct {
    // in: body
    Body cart.Checkout
}

// swagger:response checkoutOrderResponse
type checkoutOrderResponseWrapper struct { 
	// in: body
	Body int
}

// swagger:response cartItemsResponse
type cartItemsResponseWrapper struct { 
	// return cart items
	// in: body
	Body cart.CartitemOutput
}

// swagger:parameters deleteCartitemBody cart
type deleteCartitemBodyWrapper struct {
    // in: body
    Body models.Cartitem
}

// swagger:parameters addCartBody cart
type addCartBodyWrapper struct {
    // in: body
    Body models.Cartitem
}

// swagger:response addCartResponse
type addCartResponseWrapper struct { 
	// in: body
	Body models.Cartitem
}

// swagger:parameters updateCartBody cart
type updateCartBodyWrapper struct {
    // in: body
    Body models.Cartitem
}

// swagger:response updateCartResponse
type updateCartResponseWrapper struct { 
	// in: body
	Body int
}