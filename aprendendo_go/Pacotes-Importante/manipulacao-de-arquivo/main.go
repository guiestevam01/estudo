package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

type Student struct {
	FirstName, lastName, university                string
	test1Score, test2Score, test3Score, test4Score int
}

func main() {
	var sliceSeparado []string
	var sla []string
	file, err := os.Open("grades.csv")
	if err != nil {
		return
	}
	fmt.Println(file)
	defer file.Close()

	f := bufio.NewScanner(file)
	var st []string
	for f.Scan() == true {
		st = append(st, f.Text())
	}
	for _, std := range st {
		sliceSeparado = strings.Split(std, ",")
		sla = append(sla, sliceSeparado[0])
	}
	//acesso por índice: sliceSeparado[0], [1], [2]...
	//strconv.Atoi() para converter notas
	//criação de struct com literal de struct
	//append() em []Student
}
