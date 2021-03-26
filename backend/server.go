package main

import (
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/routers"
	_ "github.com/sec33_Emparty/backend/docs" 
	_ "github.com/sec33_Emparty/backend/handle/products"
	_ "github.com/sec33_Emparty/backend/handle/shop"
	_ "github.com/sec33_Emparty/backend/handle/user"
	_ "github.com/sec33_Emparty/backend/handle/reviews"
	_ "github.com/sec33_Emparty/backend/handle/shipment"
	_ "github.com/sec33_Emparty/backend/handle/cart"
)

func main() {

	database.Initdatabase()
	r := routers.InitRouter()
	r.Run()
}
