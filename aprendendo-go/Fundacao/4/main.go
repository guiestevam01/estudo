package main
import "fmt"

type ID int

var(
	b bool = true
	c float64
	d int
	e string 
	f ID = 1
)

func main() {
	fmt.Printf("o tipo de E é %T", e)
}
