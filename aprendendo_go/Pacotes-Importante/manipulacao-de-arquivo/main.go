package main

import (
	"bufio"
	"fmt"
	"os"
)
type Conta struct{
	numero int
	saldo int

}
func main() {
	conta
	f, err := os.Create("arquivo.txt")
	if err != nil {
		panic(err)
	}
	tam, err := f.Write([]byte("escrevendo dados"))
	if err != nil {
		panic(err)
	}
	fmt.Printf("Arquivo criado com sucesso, tamanho: %d bytes\n", tam)
	f.Close()

	//leitura
	arquivo, err := os.ReadFile("arquivo.txt")
	if err != nil {
		panic(err)
	}
	fmt.Printf("Conteudo: %s\n", string(arquivo))

	//stream
	arq, err := os.Open("arquivo.txt")
	if err != nil {
		panic(err)
	}
	reader := bufio.NewReader(arq)
	// de quanto em quanto vai ler?

}
