# Estudos em Programação - foco Java

Repositório de estudos práticos com foco principal em Java, Spring Boot, programação orientada a objetos, estruturas de dados e fundamentos de backend.

Meu objetivo com este repositório é mostrar evolução contínua, organização de aprendizado e base técnica para oportunidades como **Java Trainee / Desenvolvedor Backend Junior**.

## Destaques para recrutadores

- **Java e Spring Boot:** API REST simples com Maven, endpoints HTTP e modelo de domínio.
- **POO:** exercícios com classes, atributos, métodos, encapsulamento e composição.
- **Estruturas de dados:** arrays, busca, ordenação, substituição e manipulação de listas.
- **Concorrência:** estudos iniciais com threads em Java.
- **Entrada e saída:** leitura de CSV usando `java.nio.file`.
- **Aprendizado complementar:** JavaScript, TypeScript, Node.js, Python e estudos de IA/RAG.

## Onde olhar primeiro

| Área | Caminho | O que demonstra |
| --- | --- | --- |
| Spring Boot | [`aprendendo-spring/1/helloworld`](aprendendo-spring/1/helloworld) | Controllers e modelo de uma API REST em evolução |
| Java trainee | [`docs/JAVA_TRAINEE.md`](docs/JAVA_TRAINEE.md) | Mapa dos estudos Java e próximos passos |
| Estruturas de dados | [`estrutura-de-dados/estrutura-de-dados-java`](estrutura-de-dados/estrutura-de-dados-java) | Algoritmos básicos, arrays, busca e listas |
| POO em Java | [`Java COMPLETO Programação Orientada a Objetos_nelio`](Java%20COMPLETO%20Programação%20Orientada%20a%20Objetos_nelio) | Exercícios de classes, objetos e fundamentos |
| Threads | [`threads`](threads) | Modelagem e primeiros estudos de concorrência |
| CSV com Java | [`modulo1/AprendendoCSV`](modulo1/AprendendoCSV) | Manipulação de arquivos e strings |

## Projeto Spring Boot

O diretório `aprendendo-spring/1/helloworld` contém os primeiros controllers e
o modelo da API. Ele ainda não possui `pom.xml` ou wrapper Maven versionado e,
portanto, permanece como estudo em evolução, não como aplicação executável.

Endpoints principais:

- `GET /hello`
- `GET /products`
- `POST /products`

Exemplo de `POST /products`:

```json
{
  "id": 2,
  "name": "Mouse Logitech",
  "price": 120.0
}
```

## Organização geral

Este repositório também funciona como diário técnico. Algumas pastas são estudos de cursos e experimentos, enquanto a trilha Java recebe prioridade na organização e documentação.

```text
.
├── aprendendo-spring/        # Estudos com Spring Boot
├── estrutura-de-dados/       # Algoritmos e estruturas em Java e C
├── javalearning/             # Tópicos isolados de Java
├── padroesDeProjeto/          # Design, factories e princípios de projeto
├── threads/                  # Estudos de concorrência
├── modulo1/AprendendoCSV/    # Leitura de CSV com Java
├── nodejs/, js/, typescript/ # Estudos complementares web
├── python/, webscraping/     # Estudos complementares Python
├── AI-GERAL/                 # IA, agentes, prompts e experimentos
└── docs/                     # Guias para leitura do repositório
```

As regras para novos conteúdos, artefatos locais e branches estão no
[`docs/ORGANIZACAO.md`](docs/ORGANIZACAO.md).

## Roadmap Java

- Melhorar nomes de pacotes e padronizar projetos Java com Maven.
- Criar testes unitários para exemplos de algoritmos e POO.
- Evoluir a API Spring Boot com DTOs, validação, tratamento de erros e persistência.
- Separar estudos finalizados de rascunhos para deixar a vitrine ainda mais limpa.
