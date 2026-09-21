package server

import "net/http"

type User struct {
	Id       int    `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/create", CreateUserApi)
	http.ListenAndServe(":8080", mux)
}
func CreateUserApi(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("teste"))
}
