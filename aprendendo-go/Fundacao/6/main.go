package main

import "fmt"

func main() {

	meuArray := []int{1, 2, 3, 4}
	fmt.Printf("len:%d cap=%d %v\n", len(meuArray), cap(meuArray), meuArray)
	meuArray = append(meuArray, 44)
	fmt.Printf("len:%d cap=%d %v\n", len(meuArray[2:3]), cap(meuArray), meuArray[1:3])
}
