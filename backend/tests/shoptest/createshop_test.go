package shop

import (
	"io/ioutil"
	"bytes"
	"net/http"
	"testing"
	"fmt"
)


func TestCreateShop1(t *testing.T){
	
	httpposturl := "http://localhost:8080/api/users/login"
	fmt.Println("HTTP JSON POST URL:", httpposturl)
	var jsonData = []byte(`{
		"email": "hello1@gmail.com",
		"password": "bambam"
	}`)
	request, _ := http.NewRequest("POST", httpposturl, bytes.NewBuffer(jsonData))
	request.Header.Set("Content-Type", "application/json; charset=UTF-8")

	client := &http.Client{}
	response, error := client.Do(request)
	if error != nil {
		panic(error)
	}
	defer response.Body.Close()

	fmt.Println("response Status:", response.Status)
	fmt.Println("response Headers:", response.Header)
	body, _ := ioutil.ReadAll(response.Body)
	fmt.Println("response Body:", string(body)[10:len(string(body))-2])



	token := string(body)[10:len(string(body))-2]

	httpposturlCreate := "http://localhost:8080/api/shops"
	fmt.Println("HTTP JSON POST URL:", httpposturlCreate)
	var jsonCreateShop = []byte(`{
		"user_id": 1,
		"shop_name": "test1",
		"description": "test_description",
		"phone_number": "0123456789",
		"ig": "test_ig",
		"facebook" : "test_facebook",
		"twitter": "test_twitter",
		"line": "test_line"
	}`)
	req, _ := http.NewRequest("POST", httpposturlCreate, bytes.NewBuffer(jsonCreateShop))
	req.Header.Set("Authorization", "Bearer "+token)

	cli := &http.Client{}
	res, error := cli.Do(req)
	if error != nil {
		panic(error)
	}
	defer res.Body.Close()

	fmt.Println("response Status:", res.Status)
	fmt.Println("response Headers:", res.Header)
	bodyCreate, _ := ioutil.ReadAll(res.Body)
	fmt.Println("response Body:", string(bodyCreate))

	if(res.StatusCode == 200){
		return
	}
	t.Error("Please enter valid input")
}

func TestCreateShop2(t *testing.T){
	
	httpposturl := "http://localhost:8080/api/users/login"
	fmt.Println("HTTP JSON POST URL:", httpposturl)
	var jsonData = []byte(`{
		"email": "hello1@gmail.com",
		"password": "bambam"
	}`)
	request, _ := http.NewRequest("POST", httpposturl, bytes.NewBuffer(jsonData))
	request.Header.Set("Content-Type", "application/json; charset=UTF-8")

	client := &http.Client{}
	response, error := client.Do(request)
	if error != nil {
		panic(error)
	}
	defer response.Body.Close()

	fmt.Println("response Status:", response.Status)
	fmt.Println("response Headers:", response.Header)
	body, _ := ioutil.ReadAll(response.Body)
	fmt.Println("response Body:", string(body)[10:len(string(body))-2])



	token := string(body)[10:len(string(body))-2]

	httpposturlCreate := "http://localhost:8080/api/shops"
	fmt.Println("HTTP JSON POST URL:", httpposturlCreate)
	var jsonCreateShop = []byte(`{
		"user_id": "test",
		"shop_name": "test1",
		"description": "test_description",
		"phone_number": "0123456789",
		"ig": "test_ig",
		"facebook" : "test_facebook",
		"twitter": "test_twitter",
		"line": "test_line"
	}`)
	req, _ := http.NewRequest("POST", httpposturlCreate, bytes.NewBuffer(jsonCreateShop))
	req.Header.Set("Authorization", "Bearer "+token)

	cli := &http.Client{}
	res, error := cli.Do(req)
	if error != nil {
		panic(error)
	}
	defer res.Body.Close()

	fmt.Println("response Status:", res.Status)
	fmt.Println("response Headers:", res.Header)
	bodyCreate, _ := ioutil.ReadAll(res.Body)
	fmt.Println("response Body:", string(bodyCreate))

	if(res.StatusCode == 200){
		return
	}
	t.Error("Please enter valid input")
}

func TestCreateShop3(t *testing.T){
	
	httpposturl := "http://localhost:8080/api/users/login"
	fmt.Println("HTTP JSON POST URL:", httpposturl)
	var jsonData = []byte(`{
		"email": "hello1@gmail.com",
		"password": "bambam"
	}`)
	request, _ := http.NewRequest("POST", httpposturl, bytes.NewBuffer(jsonData))
	request.Header.Set("Content-Type", "application/json; charset=UTF-8")

	client := &http.Client{}
	response, error := client.Do(request)
	if error != nil {
		panic(error)
	}
	defer response.Body.Close()

	fmt.Println("response Status:", response.Status)
	fmt.Println("response Headers:", response.Header)
	body, _ := ioutil.ReadAll(response.Body)
	fmt.Println("response Body:", string(body)[10:len(string(body))-2])



	token := string(body)[10:len(string(body))-2]

	httpposturlCreate := "http://localhost:8080/api/shops"
	fmt.Println("HTTP JSON POST URL:", httpposturlCreate)
	var jsonCreateShop = []byte(`{
		"user_id": 1,
		"shop_name": 1,
		"description": 1,
		"phone_number": 1,
		"ig": 1,
		"facebook" : 1,
		"twitter": 1,
		"line": 1
	}`)
	req, _ := http.NewRequest("POST", httpposturlCreate, bytes.NewBuffer(jsonCreateShop))
	req.Header.Set("Authorization", "Bearer "+token)

	cli := &http.Client{}
	res, error := cli.Do(req)
	if error != nil {
		panic(error)
	}
	defer res.Body.Close()

	fmt.Println("response Status:", res.Status)
	fmt.Println("response Headers:", res.Header)
	bodyCreate, _ := ioutil.ReadAll(res.Body)
	fmt.Println("response Body:", string(bodyCreate))

	if(res.StatusCode == 200){
		return
	}else if(res.StatusCode == 400){
		t.Error("Please enter valid input")
	}
}