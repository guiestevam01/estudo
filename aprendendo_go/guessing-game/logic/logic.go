package logic

import (
	"math/rand"
)

func GerarNumero() int {
	return rand.Intn(100) + 1
}
