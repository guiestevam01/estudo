package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID    int
	Name  string
	Email string
}
type UserTag struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func main() {
	user := User{
		ID:    1,
		Name:  "Guilherme",
		Email: "gui@example.com",
	}
	userTag := UserTag{
		ID:    1,
		Name:  "Guilherme1",
		Email: "gui@example.com1",
	}
	toJson, err := json.Marshal(user)
	if err != nil {
		panic(err)
	}
	semtag := string(toJson)

	toJsonTag, err := json.Marshal(userTag)
	if err != nil {
		panic(err)
	}
	comtag := string(toJsonTag)
	fmt.Println(comtag)
	fmt.Println(semtag)
}
