package main

import (
	"github.com/guiestevam01/estudo/aprendendo_go/guessing-game/play"
	"github.com/guiestevam01/estudo/aprendendo_go/guessing-game/user"
)

func main() {
	var users []user.User
	u1 := user.User{
		Nome: "Gui",
	}
	play.Jogar(&u1)
	users = append(users, u1)

	u2 := user.User{
		Nome: "Pedro",
	}
	play.Jogar(&u2)
	users = append(users, u2)

}
