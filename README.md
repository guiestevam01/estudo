# Estudo contínuo

[![Java CI](https://github.com/guiestevam01/estudo/actions/workflows/java-ci.yml/badge.svg)](https://github.com/guiestevam01/estudo/actions/workflows/java-ci.yml)
![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white)
![Go](https://img.shields.io/badge/Go-estudos-00ADD8?logo=go&logoColor=white)

Meu caderno público de evolução técnica: fundamentos, exercícios, anotações e
projetos executáveis. O foco atual é **backend**, com Java e Spring Boot como
trilha principal, complementado por Go, JavaScript, TypeScript, Python,
estruturas de dados, sistemas e inteligência artificial.

Este repositório tem dois objetivos diferentes, organizados de forma explícita:

- **vitrine:** projetos com instruções de execução, testes e decisões técnicas;
- **laboratório:** exercícios e anotações que registram o caminho de aprendizagem.

## Comece por aqui

| Objetivo | Link |
| --- | --- |
| Ver o projeto mais completo | [Hello World API](projetos/hello-world-api) |
| Seguir a trilha de backend Java | [Trilha Java Trainee](docs/JAVA_TRAINEE.md) |
| Consultar todo o mapa de estudos | [Mapa do repositório](docs/ORGANIZACAO.md) |
| Explorar algoritmos | [Estruturas de dados](estrutura-de-dados) |
| Explorar IA e RAG | [Inteligência artificial](inteligencia-artificial) |

## Projeto em destaque

### [Hello World API](projetos/hello-world-api)

API REST com Java 21 e Spring Boot que demonstra:

- endpoints `GET` e `POST` com respostas HTTP adequadas;
- desserialização de JSON e validação com Jakarta Bean Validation;
- modelo imutável usando `record`;
- testes de integração com JUnit 5 e MockMvc;
- build reproduzível com Maven Wrapper;
- integração contínua no GitHub Actions.

Para executar:

```bash
cd projetos/hello-world-api
./mvnw test
./mvnw spring-boot:run
```

Rotas disponíveis:

| Método | Rota | Resultado |
| --- | --- | --- |
| `GET` | `/hello` | Mensagem para verificação da API |
| `GET` | `/products` | Produto de exemplo em JSON |
| `POST` | `/products` | Valida e retorna o produto com `201 Created` |

## Mapa rápido

| Área | Evidência no repositório |
| --- | --- |
| Java e backend | [Fundamentos e APIs](java) · [projetos executáveis](projetos) |
| Spring Boot | [Hello World API](projetos/hello-world-api) · [estudos de Hibernate](java/hibernate) |
| Orientação a objetos | [Classes, composição e encapsulamento](java/objetos) · [curso completo](cursos/java-completo) |
| Design e arquitetura | [Padrões de projeto](java/padroes-de-projeto) · [system design](systemdesign) |
| Algoritmos | [Java e C](estrutura-de-dados) |
| Go | [Fundamentos e exemplos](aprendendo_go) |
| Web | [JavaScript](js) · [Node.js](nodejs) · [TypeScript](typescript) |
| Python | [Fundamentos](python) · [web scraping](webscraping) |
| Inteligência artificial | [Prompts, agentes e RAG](inteligencia-artificial) |
| Base teórica | [Computação](Computacao) · [matemática](matematica) · [economia](sobreEconomia) |
| Estudos complementares | [Spring](aprendendo-spring) · [padrões de projeto](padroesDeProjeto) · [trilha](trilha) · [exercícios JS](exercicios-js) |

## Estrutura

```text
.
├── projetos/                    # Vitrine: projetos executáveis e testados
├── docs/                        # Índices, trilhas e convenções
├── java/                        # Java, Spring, JDBC, Hibernate e POO
├── estrutura-de-dados/          # Algoritmos e estruturas em Java e C
├── cursos/                      # Exercícios guiados por curso
├── aprendendo_go/               # Fundamentos, exemplos e projetos Go
├── inteligencia-artificial/     # IA, agentes, prompts e RAG
├── js/, nodejs/, typescript/    # JavaScript e desenvolvimento web
├── python/, webscraping/        # Python e automação
├── systemdesign/, Computacao/   # Fundamentos de engenharia de software
└── aprendendo-spring/, trilha/  # Estudos complementares
```

Os exercícios permanecem visíveis para mostrar evolução. A pasta `projetos/`
é a seleção curada: cada projeto novo deve ter README próprio, dependências
identificadas e uma forma objetiva de validação.

## Como navegar

1. Comece pela área que você quer explorar no [mapa de organização](docs/ORGANIZACAO.md).
2. Em cada pasta, leia o README local quando existir.
3. Para avaliar código executável, use primeiro a pasta `projetos/`.
4. Para acompanhar a evolução, consulte a [trilha Java](docs/JAVA_TRAINEE.md).

## Próximos passos

- Evoluir a API com service, repository, DTOs e tratamento global de erros.
- Adicionar persistência com Spring Data JPA e PostgreSQL.
- Ampliar testes unitários e de integração nos projetos em destaque.
- Criar READMEs locais para os estudos que ganharem comandos próprios.

Perfil: [github.com/guiestevam01](https://github.com/guiestevam01)
