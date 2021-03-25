package main

import (
	"github.com/sec33_Emparty/backend/database"
	_ "github.com/sec33_Emparty/backend/docs"
	_ "github.com/sec33_Emparty/backend/handle/products"
	_ "github.com/sec33_Emparty/backend/handle/reviews"
	_ "github.com/sec33_Emparty/backend/handle/shop"
	_ "github.com/sec33_Emparty/backend/handle/user"
	"github.com/sec33_Emparty/backend/routers"
)

func main() {

	database.Initdatabase()
	r := routers.InitRouter()
	r.Run()
}
