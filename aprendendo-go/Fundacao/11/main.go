package main

type Endereco struct{
	Longradouro string
	Numero		int
	Cidade		string
	Estado		string	
}

type Cliente struct {
	Nome  string
	Idade int
	Ativo bool
	Endereco
}
type Pessoa interface{
	Desativar() // qualquer struct com metodo desativar vai implementar a interface Pessoa 
}
func (c Cliente) Desativar(){
	c.Ativo = false
}
func main() {
	gui := Cliente{
		Nome:  "Guilherme",
		Idade: 19,
		Ativo: true,
	}
	gui.Endereco.Cidade = "Maringa"
}
