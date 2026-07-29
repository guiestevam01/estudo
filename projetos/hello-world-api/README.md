# Hello World API

API REST criada para praticar fundamentos de backend com endpoints HTTP,
validação de entrada e testes de integração.

## Tecnologias

- Java 21
- Spring Boot 4
- Maven Wrapper
- Jakarta Bean Validation
- JUnit 5 e MockMvc

## Como executar

```bash
./mvnw spring-boot:run
```

A aplicação inicia em `http://localhost:8080`.

## Como testar

```bash
./mvnw test
```

## Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/hello` | Retorna uma mensagem simples |
| `GET` | `/products` | Retorna um produto de exemplo |
| `POST` | `/products` | Valida e retorna um produto com `201 Created` |

Exemplo de corpo para `POST /products`:

```json
{
  "id": 2,
  "name": "Mouse Logitech",
  "price": 120.0
}
```
