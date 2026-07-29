# Organização do repositório

Este repositório reúne exercícios, anotações e pequenos projetos de estudo. A
organização é feita por área para que cada trilha possa evoluir sem misturar
dependências ou artefatos gerados.

## Mapa das trilhas

| Área | Diretórios principais |
| --- | --- |
| Java e backend | `aprendendo-spring/`, `javalearning/`, `threads/`, `padroesDeProjeto/` |
| Algoritmos | `estrutura-de-dados/` |
| JavaScript e web | `js/`, `nodejs/`, `typescript/`, `exercicios-js/` |
| Python | `python/`, `webscraping/` |
| Inteligência artificial | `AI-GERAL/` |
| Cursos e exercícios guiados | `modulo1/`, `programming-with-javascript-meta/` e diretórios com o nome do curso |

## O que entra no Git

- Código-fonte, testes, anotações e diagramas úteis.
- Arquivos de dependências, como `pom.xml`, `package.json` e arquivos de lock.
- Um `.gitignore` específico quando um projeto precisar de regras adicionais.

Não entram no Git:

- dependências instaladas (`node_modules/`);
- resultados de compilação (`target/`, `build/`, `out/` e `*.class`);
- configurações pessoais de IDE (`.idea/`, `.vscode/` e `*.iml`);
- credenciais e configurações locais (`.env*`);
- bancos locais, PDFs e datasets grandes.

## Estratégia de branches

- `main`: versão estável e atual do repositório.
- `estudo/<assunto>`: anotações ou exercícios de uma trilha.
- `feat/<descricao>`: projeto ou funcionalidade nova.
- `fix/<descricao>`: correção pontual.

Branches devem ter vida curta. Depois da integração em `main`, podem ser
excluídas. Antes de grandes reorganizações, uma tag ou branch `backup/...`
preserva um ponto de retorno.

## Convenção de commits

Use mensagens curtas que expliquem a intenção:

```text
docs: adiciona anotações sobre collections
feat: implementa busca binária em Java
fix: corrige cálculo do simulador
chore: remove artefatos gerados da IDE
```

## Ao adicionar um novo estudo

1. Escolha a área existente mais próxima.
2. Crie uma pasta com nome curto e descritivo.
3. Inclua um `README.md` quando houver comandos, dependências ou contexto.
4. Verifique `git status` antes do commit para não publicar dados locais.
5. Execute os testes ou a compilação do projeto alterado.
