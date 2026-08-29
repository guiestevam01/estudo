package main

import (
	"fmt"
	"io"
	"net/http"
)
//retorna dados e error e para verificar se teve erro
func getIssueData() ([]byte, error) {
	res, err := http.Get("https://api.boot.dev/v1/courses_rest_api/learn-http/issues") // resposta 
	if err != nil {
		return nil, fmt.Errorf("error creating request: %w", err)
	}
	defer res.Body.Close() // defer para garantir que 

	data, err := io.ReadAll(res.Body)
	return data, err
}
