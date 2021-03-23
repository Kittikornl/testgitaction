package main

import (
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/routers"
)

func main() {

	database.Initdatabase()
	r := routers.InitRouter()
	r.Run()
}
