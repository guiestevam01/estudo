package main

import (
	"fmt"

	"github.com/guiestevam01/estudo/aprendendo_go/calculadora"
	"github.com/guiestevam01/estudo/aprendendo_go/chamadas"
)

func main() {
	resultado := calculadora.Somar(10, 20)
	fmt.Println(resultado)
	fmt.Println(chamadas.GetStatus("https://jsonplaceholder.typicode.com/posts/1"))
	headers := chamadas.GetHeader("https://jsonplaceholder.typicode.com/posts/1")
	for chave, valor := range headers {
		fmt.Println(chave, valor)
	}
}
