package main

type Endereco struct{
	Longradouro string
	Numero		int
	Cidade		string
	Estado		string
}

type Client struct {
	Nome  string
	Idade int
	Ativo bool
	Endereco
}

func main() {
	gui := Client{
		Nome:  "Guilherme",
		Idade: 19,
		Ativo: true,
	}
	gui.Endereco.Cidade = "Maringa"
}
