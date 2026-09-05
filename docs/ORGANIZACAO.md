# Organização do repositório

Este repositório reúne exercícios, anotações e pequenos projetos de estudo. A
organização é feita por área para que cada trilha possa evoluir sem misturar
dependências ou artefatos gerados. A raiz funciona como índice; as pastas de
assunto guardam o laboratório; e `projetos/` reúne o material selecionado para
ser executado por outra pessoa.

## Mapa das trilhas

| Área | Diretórios principais |
| --- | --- |
| Projetos demonstráveis | `projetos/` |
| Java e backend | `java/` |
| Algoritmos | `estrutura-de-dados/` |
| JavaScript e web | `js/`, `nodejs/`, `typescript/`, `exercicios-js/` |
| Python | `python/`, `webscraping/` |
| Inteligência artificial | `inteligencia-artificial/` |
| Cursos e exercícios guiados | `cursos/` |
| Estudos complementares | `aprendendo-spring/`, `exercicios-js/`, `memoriaava/`, `padroesDeProjeto/`, `trilha/` |

## Vitrine e laboratório

### Vitrine (`projetos/`)

Um projeto só entra na vitrine quando tiver:

- README com objetivo, requisitos e comandos de execução;
- dependências declaradas no próprio diretório;
- teste, script de validação ou instruções claras para verificar o resultado;
- `.env.example` quando houver configuração externa, sem credenciais reais.

### Laboratório (demais áreas)

Exercícios e anotações podem ser incompletos. Eles continuam importantes para
registrar evolução, mas devem ficar agrupados pelo assunto e não competir com
os projetos demonstráveis na primeira leitura.

## Convenções de nomes

- Use `kebab-case` para novas pastas e arquivos de documentação.
- Prefira nomes em português quando o material for uma anotação; use o nome
	técnico original para bibliotecas, frameworks e APIs.
- Evite criar variações da mesma pasta. Antes de adicionar uma área, procure
	uma categoria existente e atualize este mapa.
- Cada projeto executável deve ser independente e ter seu próprio README.

## Pendências de organização

Estas áreas foram mantidas intactas para preservar o histórico de estudo e
precisam de uma decisão manual antes de qualquer movimentação:

- `aprendendo_go/`: pasta canônica da trilha Go, com fundamentos, exemplos e
	projetos práticos reunidos em um único módulo.
- `hackaton/` e `hackaton (Copy)/`: comparar as versões, escolher a fonte
	principal e remover a cópia somente depois de confirmar o estado do projeto.
- diretórios com PDFs, bancos locais, ambientes virtuais ou builds: manter
	fora do Git e publicar apenas código, notas e instruções reproduzíveis.

## O que entra no Git

- Código-fonte, testes, anotações e diagramas úteis.
- Arquivos de dependências, como `pom.xml`, `package.json` e arquivos de lock.
- Um `.gitignore` específico quando um projeto precisar de regras adicionais.

Não entram no Git:

- dependências instaladas (`node_modules/`);
- ambientes virtuais e caches (`.venv/`, `__pycache__/`, `.pytest_cache/`);
- resultados de compilação (`target/`, `build/`, `dist/`, `out/` e `*.class`);
- configurações pessoais de IDE (`.idea/`, `.vscode/` e `*.iml`);
- credenciais e configurações locais (`.env*`, exceto `.env.example`);
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
2. Crie uma pasta com nome curto e descritivo, seguindo as convenções acima.
3. Inclua um `README.md` quando houver comandos, dependências ou contexto.
4. Verifique `git status` antes do commit para não publicar dados locais.
5. Execute os testes ou a compilação do projeto alterado.
6. Se o estudo virar projeto demonstrável, mova-o para `projetos/` somente com
	README e validação próprios.

## Checklist de revisão

Antes de publicar uma mudança:

- [ ] o caminho está na categoria correta;
- [ ] não há credenciais, banco local, build ou dependência instalada;
- [ ] os links do README apontam para caminhos existentes;
- [ ] o comando de teste ou execução foi verificado;
- [ ] o diff contém apenas a organização pretendida.
