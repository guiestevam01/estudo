package main

import "fmt"

func main() {
	a := 10
	p := &a
	fmt.Printf("a na memoria -> %p\n", &a)
	fmt.Printf("&p na memoria -> %p\n", &p)
	fmt.Printf("p na memoria -> %p\n\n", p)
	// nesse caso podemos observar que p aponta para a mas p tem seu proprio endereco de memoria.
	// agora vamos ver o valor
	fmt.Printf("valor de a -> %d\n", a)
	fmt.Printf("valor de *p: -> %d\n\n", *p)
	a = 20
	fmt.Printf("a = 20\n\n")
	fmt.Printf("a na memoria -> %p\n", &a)
	fmt.Printf("&p na memoria -> %p\n", &p)
	fmt.Printf("p na memoria -> %p\n\n", p)
	fmt.Printf("valor de a -> %d\n", a)
	fmt.Printf("valor de *p: -> %d\n", *p)
	value := &p
	fmt.Printf("value = &p: %d", *(*value))
}
