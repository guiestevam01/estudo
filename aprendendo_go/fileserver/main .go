package main

import "net/http"

func main() {
	fileServer := http.FileServer(http.Dir("./public"))
	mux := http.NewServeMux()
	http.ListenAndServe(":8080", mux)
	mux.Handle("/", fileServer)

}
