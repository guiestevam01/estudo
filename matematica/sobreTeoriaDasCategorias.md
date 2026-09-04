# Teoria das categorias
Uma categoria C tem as seguintes propriedades:
- Ela tem um objeto, denotado por Ob(A)
- Ela tem um morfismo, denotado por Hom(A, B), e caso mais de uma categoria esteja envolvida, é denotado por $`Hom_C(A, B)`$; o conjunto de todos os morfismos é Mor(C)
- Todo morfismo tem um domínio, representado por dom(A), e um codomínio, representado por cod(B)
- Se há um morfismo de A para B e de B para C, então há um morfismo de A para C: sua composição
- A composição é associativa
- Todo objeto tem um morfismo para si próprio, representado por 1 ou Id
- Toda categoria tem seu inverso (dual), representado por $`C^{OP}`$
- O inverso de um morfismo é representado por $`B^-1`$, sendo este isomórfico ao seu dual
- C(∅) é chamado de categoria vazia, e C({0}) é chamado de categoria terminal e representado por 1
- Um funtor é representado por F, F(a) ou Fa

Uma categoria é um grafo dirigido com as seguintes propriedades:
1. Todo nó tem uma aresta que vai dele para ele mesmo
2. Se existe uma aresta (A, B) e uma aresta (B, C), então existe uma aresta (A, C)

Nós e arestas nesse grafo podem representar qualquer coisa, desde que você mantenha essas duas propriedades. Daí o interessante é quando você começa a catalogar tipos específicos de categoria, ou categorias que você pode construir a partir de outras. Os nós de uma categoria normalmente são chamados de objetos e as arestas de morfismos.

Também existe o que chamamos de lógica categórica, que é a interpretação da lógica via teoria das categorias, e semântica categórica, que é a aplicação de noções de lógica categórica a própria categoria (como lógica interna, por exemplo).

