package foo

import "fmt"

type Foo struct {
	Name string
}

func (f *Foo) Foo() {
	fmt.Println("foo")
}
