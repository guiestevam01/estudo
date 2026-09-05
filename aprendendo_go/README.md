# Estudos de Go

Trilha de estudos de Go reunida em um unico modulo.

## Conteudo

| Pasta | Foco |
| --- | --- |
| `Fundacao/` | Exercicios de sintaxe, tipos, funcoes e HTTP |
| `calculadora/` | Pacote simples com operacoes aritmeticas |
| `chamadas/` | Requisicoes HTTP e leitura de headers |
| `guessing-game/` | Jogo dividido em pacotes |
| `Pacotes-Importante/` | Estudos de pacotes e manipulacao de arquivos |
| `deply-aulas/` | Exemplos de deploy e Docker |
| `test/` | Programas de apoio e experimentos |

## Executar

O modulo principal fica nesta pasta:

```bash
cd aprendendo_go
go test ./...
```

Os exercicios sao independentes e alguns ainda estao em desenvolvimento. Para
validar apenas os exemplos estaveis, execute os pacotes especificos que deseja
estudar, por exemplo:

```bash
go test ./calculadora ./chamadas ./guessing-game/...
```

O modulo de deploy em `deply-aulas/21-DEPLOY-K8S/` possui seu proprio `go.mod`
e deve ser executado separadamente.
