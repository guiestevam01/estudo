package main

import "github.com/guiestevam01/estudo/aprendendo_go/structs/foo"

type Account struct {
	foo.Foo  // agora posso accessar metodos de foo.Foo, isso é embed
	ID       uint64
	email    string
	password string
}

// o meu método vai atualizar os valores de user? sim então uso o pointer receiver
// : Se pelo menos um dos métodos for um pointer receiver é legal que TODOS OS MÉTODOS TAMBÉM SEJA.
func (a *Account) setEmail(email string) {
	a.email = email
}
func (a *Account) setPassword(password string) {
	a.password = password
}
func main() {
}
