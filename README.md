# Portfólio de estudos — Backend Java

[![Java CI](https://github.com/guiestevam01/estudo/actions/workflows/java-ci.yml/badge.svg)](https://github.com/guiestevam01/estudo/actions/workflows/java-ci.yml)
![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4-6DB33F?logo=springboot&logoColor=white)

Repositório de evolução técnica com foco em **Java, backend, orientação a
objetos e estruturas de dados**. A proposta é registrar a prática contínua,
mas também destacar projetos pequenos, executáveis e testados.

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

## Competências demonstradas

| Área | Evidência no repositório |
| --- | --- |
| Java e Spring Boot | [API REST executável e testada](projetos/hello-world-api) |
| Orientação a objetos | [Exercícios de domínio, composição e encapsulamento](java/objetos) |
| Design de software | [Factories e anotações sobre construção de objetos](java/padroes-de-projeto) |
| Estruturas de dados | [Arrays, listas, busca e exercícios em Java/C](estrutura-de-dados) |
| Concorrência | [Exercícios iniciais com threads](java/concorrencia) |
| Inteligência artificial | [Agentes, prompting e experimentos de RAG](inteligencia-artificial) |

## Organização

```text
.
├── projetos/                    # Projetos executáveis em destaque
│   └── hello-world-api/
├── java/                        # POO, concorrência e design
├── estrutura-de-dados/          # Algoritmos e exercícios em Java e C
├── cursos/                      # Exercícios guiados organizados por curso
├── inteligencia-artificial/     # IA, agentes, prompts e RAG
├── js/, nodejs/, typescript/    # Estudos complementares de web
├── python/, webscraping/        # Estudos complementares de Python
└── docs/                        # Mapa de estudos e convenções
```

Os exercícios exploratórios permanecem visíveis para mostrar evolução. O
diretório `projetos/` reúne apenas trabalhos com instruções de execução e
validação automatizada.

## Próximos passos

- Evoluir a API com service, repository, DTOs e tratamento global de erros.
- Adicionar persistência com Spring Data JPA e PostgreSQL.
- Ampliar a cobertura de testes unitários e de integração.
- Publicar um segundo projeto backend com autenticação e documentação OpenAPI.

Mais detalhes: [trilha Java](docs/JAVA_TRAINEE.md) ·
[convenções do repositório](docs/ORGANIZACAO.md) ·
[perfil no GitHub](https://github.com/guiestevam01)
