# Trilha Java Trainee

Este guia destaca os estudos Java mais relevantes deste repositório para uma avaliação rápida de recrutadores e pessoas técnicas.

## Foco atual

- Consolidar fundamentos de Java.
- Praticar programação orientada a objetos.
- Construir pequenos exemplos de backend com Spring Boot.
- Evoluir organização, testes e documentação dos estudos.

## Projetos e estudos principais

| Tópico | Caminho | Competências demonstradas |
| --- | --- | --- |
| API REST com Spring Boot | [`../aprendendo-spring/1/helloworld`](../aprendendo-spring/1/helloworld) | Controllers, JSON e status HTTP |
| Estruturas de dados | [`../estrutura-de-dados/estrutura-de-dados-java`](../estrutura-de-dados/estrutura-de-dados-java) | Arrays, busca linear, ordenação, listas |
| POO e exercícios | [`../Java COMPLETO Programação Orientada a Objetos_nelio`](../Java%20COMPLETO%20Programação%20Orientada%20a%20Objetos_nelio) | Classes, objetos, encapsulamento, construtores |
| Estudos de Java | [`../javalearning`](../javalearning) | ArrayList, lambdas, gerenciamento de memória |
| Threads | [`../threads`](../threads) | Modelagem inicial de concorrência e classes relacionadas |
| CSV | [`../modulo1/AprendendoCSV`](../modulo1/AprendendoCSV) | `Files.readString`, validação de extensão e parsing simples |

## Projeto backend em evolução

O estudo mais próximo de um backend está em
`aprendendo-spring/1/helloworld`. No estado atual, ele contém o código-fonte
dos controllers e do modelo, mas ainda precisa de `pom.xml`, classe principal
e testes versionados antes de poder ser executado como aplicação.

Endpoints:

- `GET /hello`: resposta simples para validar o servidor.
- `GET /products`: retorna um produto em JSON.
- `POST /products`: recebe um produto em JSON e responde com `201 Created`.

## O que este repositório comunica

- Base em Java moderno.
- Interesse real por backend.
- Disciplina de estudar fundamentos antes de frameworks.
- Evolução incremental com projetos pequenos, exercícios e anotações.

## Próximas melhorias técnicas

- Criar pacotes Java padronizados nos exercícios soltos.
- Adicionar testes unitários para algoritmos.
- Criar uma API Spring com camadas `controller`, `service`, `repository` e DTOs.
- Documentar exemplos com entrada, saída esperada e comandos de execução.
- Remover arquivos gerados ou privados do versionamento.
