package play

import (
	"fmt"

	"github.com/guiestevam01/estudo/aprendendo_go/guessing-game/logic"
	"github.com/guiestevam01/estudo/aprendendo_go/guessing-game/user"
)

func Jogar(u *user.User) {
	numeroSecreto := logic.GerarNumero()
	tentativa := 0
	for tentativa < 10 {
		var numero int
		fmt.Print("Digite seu numero de 1 a 100: ")
		fmt.Scan(&numero)
		u.NumeroTentativas = append(u.NumeroTentativas, numero)
		tentativa++
		if numero > numeroSecreto {
			fmt.Println("Você errou. O numero sorteado é menor")
		} else if numero < numeroSecreto {
			fmt.Println("Você errou. O numero sorteado é maior")
		} else {
			fmt.Printf("Parabéns! você acertou em %d tentativas\n", tentativa)
			break
		}
	}
}
