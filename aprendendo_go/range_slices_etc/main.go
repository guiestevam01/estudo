package main

import (
	"fmt"
	"strings"
)

func main() {
	dados := []byte("teste")
	fmt.Println(string(dados))
	fmt.Println(dados)
}

func get(url string) []byte {
	return []byte(url)
}

func encontrar(url, procura string) bool {
	dados := string(get(url))
	return strings.Contains(dados, procura)
}
