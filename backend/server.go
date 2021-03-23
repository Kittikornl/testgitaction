package main

import (
	"github.com/sec33_Emparty/backend/database"
	"github.com/sec33_Emparty/backend/routers"
	"time" 
	"math/rand"
)

func main() {

	rand.Seed(time.Now().UTC().UnixNano())
	database.Initdatabase()
	r := routers.InitRouter()
	r.Run()
}
