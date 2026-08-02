# anotacoes

O caminho estudado neste exemplo é:

$$
\text{dataset}
\longrightarrow
\text{tokenizer}
\longrightarrow
\text{IDs}
\longrightarrow
\text{token embeddings}
\longrightarrow
\text{informação de posição}
\longrightarrow
\text{entrada do Transformer}
$$

> **Importante:** a distribuição Normal usada abaixo é uma escolha didática de inicialização. Ela não é uma regra obrigatória para todos os Transformers. Bibliotecas e arquiteturas diferentes podem inicializar os embeddings de outras maneiras.

## 1. Tokenização e vocabulário

O **tokenizer** recebe um texto e o divide em unidades chamadas **tokens**. Em seguida, converte cada token em um número inteiro chamado **ID**.

Exemplo:

$$
\text{gato} \longrightarrow \text{ID } 45
$$

O número 45 não contém, por si só, o significado de “gato”. Ele funciona apenas como um índice usado para localizar uma linha na tabela de embeddings.

Há uma distinção importante:

- durante o **treinamento do tokenizer**, um corpus de textos é usado para construir o vocabulário;
- depois que o tokenizer está pronto, ele usa esse vocabulário para transformar novos textos em IDs.

## 2. Dimensão dos embeddings

Cada token é representado por um vetor com $d_{\text{model}}$ componentes.

Neste exemplo:

$$
d_{\text{model}} = d = 4
$$

Portanto, o embedding de “gato” possui quatro componentes:

$$
\mathbf{e}_{\text{gato}} =
\begin{bmatrix}
e_1 & e_2 & e_3 & e_4
\end{bmatrix}
$$

No início do treinamento, esses componentes são apenas números aleatórios. Eles ainda não representam características compreensíveis como “animal”, “mamífero” ou “doméstico”.

## 3. Inicialização com uma distribuição Normal

Neste exemplo didático, os valores iniciais dos embeddings são sorteados de uma distribuição Normal com média

$$
\mu = 0
$$

e desvio-padrão

$$
\sigma = \frac{1}{\sqrt{d}}
$$

Como $d=4$:

$$
\sigma = \frac{1}{\sqrt{4}} = \frac{1}{2} = 0{,}5
$$

Assim, cada componente do vetor é sorteado de:

$$
e_j \sim \mathcal{N}\left(0,(0{,}5)^2\right)
$$

Nessa notação, o primeiro valor é a média e o segundo é a variância:

$$
\mathcal{N}(\mu,\sigma^2)
$$

### Função densidade da distribuição Normal

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}}
\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

Substituindo $\mu=0$ e $\sigma=0{,}5$:

$$
f(x) = \frac{1}{0{,}5\sqrt{2\pi}}
\exp\left(-\frac{x^2}{2(0{,}5)^2}\right)
$$

Essa função não escolhe diretamente os números do embedding. Ela descreve a distribuição de probabilidades usada no sorteio: valores próximos de zero são mais prováveis, enquanto valores muito negativos ou muito positivos são menos prováveis.

### Forma prática de realizar o sorteio

Primeiro, sorteamos um valor de uma Normal padrão:

$$
z_j \sim \mathcal{N}(0,1)
$$

Depois, ajustamos sua média e sua escala:

$$
e_j = \mu + \sigma z_j
$$

Por exemplo, se

$$
z_1 = -0{,}6,
$$

então

$$
e_1 = 0 + 0{,}5(-0{,}6) = -0{,}3.
$$

Repetimos o processo de maneira independente para as quatro dimensões. Um resultado possível seria:

$$
\mathbf{e}_{\text{gato}} = E[45] =
\begin{bmatrix}
-0{,}3 & 0{,}1 & 0{,}7 & 0{,}5
\end{bmatrix}
$$

Esses valores são apenas um exemplo de sorteio. Uma nova inicialização provavelmente produziria números diferentes.

## 4. Tabela de embeddings

Os vetores de todos os tokens ficam armazenados em uma matriz de embeddings:

$$
E \in \mathbb{R}^{|V| \times d_{\text{model}}}
$$

Nessa expressão:

- $|V|$ é a quantidade de tokens do vocabulário;
- $d_{\text{model}}$ é a quantidade de componentes de cada embedding;
- cada linha $E[k]$ contém o embedding do token cujo ID é $k$.

Para o exemplo:

$$
E[45] = \mathbf{e}_{\text{gato}}
$$

Se uma frase possui $n$ tokens, com IDs $t_0,t_1,\ldots,t_{n-1}$, a consulta à tabela produz:

$$
X_{\text{token}} =
\begin{bmatrix}
E[t_0] \\
E[t_1] \\
\vdots \\
E[t_{n-1}]
\end{bmatrix}
\in \mathbb{R}^{n \times d_{\text{model}}}
$$

Cada linha dessa matriz representa um token da frase.

### O que acontece durante o treinamento?

Os embeddings são parâmetros treináveis. Conforme o modelo tenta prever respostas corretas, o algoritmo de treinamento calcula os erros e modifica gradualmente os valores da matriz $E$.

Por isso, o vetor de “gato” começa aleatório, mas passa a adquirir uma representação útil a partir dos contextos nos quais o token aparece.

## 5. Por que adicionar informação de posição?

O vetor $E[45]$ informa **qual token** está sendo processado, mas não informa **em qual posição da frase** ele apareceu.

Isso é importante porque a ordem pode alterar o sentido. Por exemplo, “o gato perseguiu o rato” não significa a mesma coisa que “o rato perseguiu o gato”.

Por isso, cada posição $i$ recebe um vetor:

$$
P[i] \in \mathbb{R}^{d_{\text{model}}}
$$

Neste exemplo didático, considere:

$$
P[0] =
\begin{bmatrix}
0{,}1 & 0{,}2 & -0{,}7 & 0{,}1
\end{bmatrix}
$$

e

$$
P[1] =
\begin{bmatrix}
0{,}2 & 0{,}7 & -0{,}2 & 0{,}2
\end{bmatrix}.
$$

Esses valores são apenas ilustrativos. A informação de posição pode ser fixa, como no positional encoding senoidal do Transformer original, ou aprendida durante o treinamento, dependendo da arquitetura.

## 6. Soma do token embedding com a posição

Para o token $t_i$ situado na posição $i$, calculamos:

$$
X_i = E[t_i] + P[i]
$$

Essa é uma soma componente a componente:

$$
\begin{bmatrix}
a_1 & a_2 & a_3 & a_4
\end{bmatrix}
+
\begin{bmatrix}
b_1 & b_2 & b_3 & b_4
\end{bmatrix}
=
\begin{bmatrix}
a_1+b_1 & a_2+b_2 & a_3+b_3 & a_4+b_4
\end{bmatrix}
$$

### Exemplo: “gato” na posição 1

Considere a frase “o gato dorme”, com as posições contadas a partir de zero:

| Posição | Token |
| ---: | --- |
| 0 | o |
| 1 | gato |
| 2 | dorme |

O embedding do token “gato” é:

$$
E[45] =
\begin{bmatrix}
-0{,}3 & 0{,}1 & 0{,}7 & 0{,}5
\end{bmatrix}
$$

O vetor da posição 1 é:

$$
P[1] =
\begin{bmatrix}
0{,}2 & 0{,}7 & -0{,}2 & 0{,}2
\end{bmatrix}
$$

Somando os vetores:

$$
\begin{aligned}
X_{\text{gato}}
&= E[45] + P[1] \\
&=
\begin{bmatrix}
-0{,}3 & 0{,}1 & 0{,}7 & 0{,}5
\end{bmatrix}
+
\begin{bmatrix}
0{,}2 & 0{,}7 & -0{,}2 & 0{,}2
\end{bmatrix} \\
&=
\begin{bmatrix}
-0{,}1 & 0{,}8 & 0{,}5 & 0{,}7
\end{bmatrix}
\end{aligned}
$$

Verificando cada dimensão:

$$
\begin{aligned}
-0{,}3 + 0{,}2 &= -0{,}1 \\
\phantom{-}0{,}1 + 0{,}7 &= \phantom{-}0{,}8 \\
\phantom{-}0{,}7 - 0{,}2 &= \phantom{-}0{,}5 \\
\phantom{-}0{,}5 + 0{,}2 &= \phantom{-}0{,}7
\end{aligned}
$$

O resultado é:

$$
\boxed{
X_{\text{gato}} =
\begin{bmatrix}
-0{,}1 & 0{,}8 & 0{,}5 & 0{,}7
\end{bmatrix}
}
$$

Esse é o vetor que representa simultaneamente o token “gato” e sua posição na frase.

## 7. Entrada de uma frase inteira

O cálculo é repetido para todos os tokens da frase:

$$
X_i = E[t_i] + P[i]
$$

Empilhando todos os vetores finais:

$$
X =
\begin{bmatrix}
E[t_0] + P[0] \\
E[t_1] + P[1] \\
\vdots \\
E[t_{n-1}] + P[n-1]
\end{bmatrix}
\in \mathbb{R}^{n \times d_{\text{model}}}
$$

A matriz $X$ é enviada ao primeiro bloco do Transformer. Em implementações reais, ainda pode haver uma operação de **dropout** antes da entrada no primeiro bloco.

## 8. Observação sobre o Transformer original

No artigo *Attention Is All You Need*, o token embedding é multiplicado por $\sqrt{d_{\text{model}}}$ antes da soma com o positional encoding:

$$
X_i = \sqrt{d_{\text{model}}}\,E[t_i] + PE(i)
$$

Como $d_{\text{model}}=4$:

$$
\sqrt{d_{\text{model}}} = \sqrt{4} = 2
$$

O exemplo numérico deste texto usa a versão simplificada:

$$
X_i = E[t_i] + P[i]
$$

Por isso, o fator $\sqrt{d_{\text{model}}}$ não foi aplicado às contas anteriores.

## Resumo das fórmulas

### Inicialização adotada no exemplo

$$
\mu = 0,
\qquad
\sigma = \frac{1}{\sqrt{d}}
$$

$$
z_j \sim \mathcal{N}(0,1)
$$

$$
e_j = \mu + \sigma z_j
$$

### Consulta do embedding

$$
\mathbf{e}_{\text{token}} = E[\text{ID do token}]
$$

### Adição da posição

$$
X_i = E[t_i] + P[i]
$$

### Entrada da frase

$$
X \in \mathbb{R}^{n \times d_{\text{model}}}
$$

## Ideia principal

O processo pode ser resumido assim:

1. o tokenizer converte o texto em IDs;
2. cada ID seleciona uma linha da matriz de embeddings;
3. cada embedding recebe informação sobre sua posição;
4. os vetores resultantes formam a matriz de entrada do Transformer;
5. durante o treinamento, os embeddings são ajustados para representar padrões úteis dos dados.
