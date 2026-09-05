package main
import "fmt"
func main() {
	salarios := map[string]int{"Guilherme": 1000, "Pedro": 900}
	fmt.Println(salarios["Guilherme"])
	delete(salarios, "Pedro")
	salarios["Joao"] = 120
	for nome, salario := range salarios {
		fmt.Printf("O salario de %s é %d\n", nome, salario)
	}
	for _, salario := range salarios {
		fmt.Printf("O salario de %s é %d\n", salario)
	}
}
