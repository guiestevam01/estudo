# Do tokenizer à entrada do Transformer

## Visão geral

O caminho representado nas anotações é:

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

## 1. Tokenização e vocabulário

O **tokenizer** lê o texto do dataset, separa-o em tokens e associa cada token a um ID do vocabulário.

Exemplo:

$$
\text{gato}\longrightarrow \text{ID }45
$$

O ID ainda não é o significado matemático do token. Ele funciona como o índice usado para buscar uma linha na tabela de embeddings.

## 2. Dimensão dos embeddings

Cada token será representado por um vetor com $d_{\text{model}}$ números.

Nas anotações:

$$
d_{\text{model}}=d=4
$$

Logo, o embedding de **gato** possui quatro componentes:

$$
\mathbf e_{\text{gato}}
=
\begin{bmatrix}
e_1 & e_2 & e_3 & e_4
\end{bmatrix}
$$

## 3. Inicialização com a distribuição de Gauss

Os valores iniciais dos embeddings são sorteados de uma distribuição Normal com média:

$$
\mu=0
$$

e desvio-padrão:

$$
\sigma=\frac{1}{\sqrt d}
$$

Como $d=4$:

$$
\sigma
=\frac{1}{\sqrt 4}
=\frac{1}{2}
=0{,}5
$$

Portanto, cada componente é sorteado de:

$$
e_j\sim\mathcal N\!\left(0,0{,}5^2\right)
$$

### Função densidade de Gauss

$$
f(x)=
\frac{1}{\sigma\sqrt{2\pi}}
\exp\!\left(
-\frac{(x-\mu)^2}{2\sigma^2}
\right)
$$

Substituindo $\mu=0$ e $\sigma=0{,}5$:

$$
f(x)=
\frac{1}{0{,}5\sqrt{2\pi}}
\exp\!\left(
-\frac{x^2}{2(0{,}5)^2}
\right)
$$

Essa função diz que números próximos de zero são mais prováveis; números muito negativos ou muito positivos são menos prováveis.

### Forma prática de realizar o sorteio

Primeiro, sorteamos um número de uma Normal padrão:

$$
z_j\sim\mathcal N(0,1)
$$

Depois, ajustamos sua média e sua escala:

$$
e_j=\mu+\sigma z_j
$$

Por exemplo, se:

$$
z_1=-0{,}6
$$

então:

$$
\begin{aligned}
e_1&=\mu+\sigma z_1\\
   &=0+0{,}5(-0{,}6)\\
   &=-0{,}3
\end{aligned}
$$

Repetindo o sorteio para as quatro dimensões, o exemplo das anotações resulta em:

$$
\mathbf e_{\text{gato}}
=E[45]
=
\begin{bmatrix}
-0{,}3 & 0{,}1 & 0{,}7 & 0{,}5
\end{bmatrix}
$$

## 4. Tabela de embeddings

Todos os vetores ficam armazenados em uma matriz de embeddings:

$$
E\in\mathbb R^{|V|\times d_{\text{model}}}
$$

onde:

- $|V|$ é a quantidade de tokens do vocabulário;
- $d_{\text{model}}$ é a quantidade de números usada para representar cada token;
- cada linha $E[k]$ contém o embedding do token cujo ID é $k$.

Para o exemplo:

$$
E[45]=\mathbf e_{\text{gato}}
$$

Se uma frase possui $n$ tokens com IDs $t_0,t_1,\ldots,t_{n-1}$, a busca na tabela produz:

$$
X_{\text{token}}
=
\begin{bmatrix}
E[t_0]\\
E[t_1]\\
\vdots\\
E[t_{n-1}]
\end{bmatrix}
\in\mathbb R^{n\times d_{\text{model}}}
$$

Nesse momento, cada linha representa um token da frase.

## 5. Por que adicionar informação de posição?

O vetor $E[45]$ informa **qual token** está sendo processado, mas não informa **em qual posição da frase** ele apareceu.

Por isso, cada posição $i$ recebe um vetor:

$$
P[i]\in\mathbb R^{d_{\text{model}}}
$$

Nas anotações aparecem, como exemplo:

$$
P[0]
=
\begin{bmatrix}
0{,}1 & 0{,}2 & -0{,}7 & 0{,}1
\end{bmatrix}
$$

e:

$$
P[1]
=
\begin{bmatrix}
0{,}2 & 0{,}7 & -0{,}2 & 0{,}2
\end{bmatrix}
$$

## 6. Soma do token embedding com a posição

Para o token $t_i$ situado na posição $i$, calculamos:

$$
X_i=E[t_i]+P[i]
$$

Essa é uma soma componente a componente:

$$
\begin{bmatrix}
a_1&a_2&a_3&a_4
\end{bmatrix}
+
\begin{bmatrix}
b_1&b_2&b_3&b_4
\end{bmatrix}
=
\begin{bmatrix}
a_1+b_1&a_2+b_2&a_3+b_3&a_4+b_4
\end{bmatrix}
$$

### Exemplo: “gato” na posição 1

O embedding do token é:

$$
E[45]
=
\begin{bmatrix}
-0{,}3&0{,}1&0{,}7&0{,}5
\end{bmatrix}
$$

O vetor da posição é:

$$
P[1]
=
\begin{bmatrix}
0{,}2&0{,}7&-0{,}2&0{,}2
\end{bmatrix}
$$

Somando:

$$
\begin{aligned}
X_{\text{gato}}
&=E[45]+P[1]\\[4pt]
&=
\begin{bmatrix}
-0{,}3&0{,}1&0{,}7&0{,}5
\end{bmatrix}
+
\begin{bmatrix}
0{,}2&0{,}7&-0{,}2&0{,}2
\end{bmatrix}\\[4pt]
&=
\begin{bmatrix}
-0{,}1&0{,}8&0{,}5&0{,}7
\end{bmatrix}
\end{aligned}
$$

Verificando cada dimensão:

$$
\begin{aligned}
-0{,}3+0{,}2&=-0{,}1\\
 0{,}1+0{,}7&= 0{,}8\\
 0{,}7-0{,}2&= 0{,}5\\
 0{,}5+0{,}2&= 0{,}7
\end{aligned}
$$

O vetor final:

$$
\boxed{
X_{\text{gato}}
=
\begin{bmatrix}
-0{,}1&0{,}8&0{,}5&0{,}7
\end{bmatrix}
}
$$

é a **entrada do Transformer para o token “gato”** nesse exemplo.

## 7. Entrada de uma frase inteira

O cálculo é repetido para todos os tokens da frase:

$$
X_i=E[t_i]+P[i]
$$

Empilhando todos os vetores finais:

$$
X
=
\begin{bmatrix}
E[t_0]+P[0]\\
E[t_1]+P[1]\\
\vdots\\
E[t_{n-1}]+P[n-1]
\end{bmatrix}
\in\mathbb R^{n\times d_{\text{model}}}
$$

Essa matriz $X$ é enviada ao primeiro bloco do Transformer.

## 8. Observação sobre o Transformer original

No artigo *Attention Is All You Need*, o token embedding é multiplicado por $\sqrt{d_{\text{model}}}$ antes da soma com o positional encoding:

$$
X_i=\sqrt{d_{\text{model}}}\,E[t_i]+PE(i)
$$

Como $d_{\text{model}}=4$:

$$
\sqrt{d_{\text{model}}}=\sqrt 4=2
$$

As contas manuscritas usam a versão simplificada:

$$
X_i=E[t_i]+P[i]
$$

Por isso, o fator $\sqrt{d_{\text{model}}}$ não foi aplicado ao exemplo numérico.

## Resumo das fórmulas

### Inicialização

$$
\mu=0,
\qquad
\sigma=\frac{1}{\sqrt d}
$$

$$
z_j\sim\mathcal N(0,1)
$$

$$
e_j=\mu+\sigma z_j
$$

### Busca do embedding

$$
\mathbf e_{\text{token}}=E[\text{ID do token}]
$$

### Adição da posição

$$
X_i=E[t_i]+P[i]
$$

### Entrada da frase

$$
X\in\mathbb R^{n\times d_{\text{model}}}
$$
