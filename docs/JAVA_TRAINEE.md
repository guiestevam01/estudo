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
| API REST com Spring Boot | [`../projetos/hello-world-api`](../projetos/hello-world-api) | Java 21, endpoints REST, validação, Maven e testes |
| Estruturas de dados | [`../estrutura-de-dados/estrutura-de-dados-java`](../estrutura-de-dados/estrutura-de-dados-java) | Arrays, busca linear, ordenação, listas |
| POO e exercícios | [`../cursos/java-completo`](../cursos/java-completo) | Classes, objetos, encapsulamento, construtores |
| Estudos de Java | [`../java`](../java) | ArrayList, lambdas, gerenciamento de memória |
| Threads | [`../java/concorrencia`](../java/concorrencia) | Modelagem inicial de concorrência e classes relacionadas |
| CSV | [`../java/entrada-saida/leitura-csv`](../java/entrada-saida/leitura-csv) | `Files.readString`, validação de extensão e parsing simples |

## Projeto backend em destaque

O projeto [`Hello World API`](../projetos/hello-world-api) possui build Maven
reproduzível, validação de entrada e testes de integração executados também
pelo GitHub Actions.

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
