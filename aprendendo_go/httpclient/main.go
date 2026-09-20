package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"time"
)

// Estabelecer limites para chamadas externas realizadas pelo sistema.
// Imagine que precisamos consumir uma API externa e, em alguns casos, ela demora 10 segundos para responder
// Se nossa aplicação esperar indefinidamente por essa API, podemos manter recursos ocupados por muito tempo e prejudicar o desempenho.
// Por isso, definimos um timeout: o tempo máximo que estamos dispostos a esperar pela resposta da API externa.
func main() {
	c := http.Client{Timeout: time.Second * 5}
	inicio := time.Now()
	resp, err := c.Get("https://google.com")
	duracao := time.Since(inicio)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(body))
	log.Printf("GET demorou: %v", duracao)
}
