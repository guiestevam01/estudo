# Input embedding: de texto a vetores

Este estudo acompanha a frase **“o gato dorme”** até a entrada do primeiro
bloco Transformer, usando o tokenizador do `Qwen/Qwen3-0.6B-Base` e uma tabela
de embeddings criada do zero com PyTorch.

O caminho implementado em `input_embedding_o_gato_dorme.py` é:

$$
\text{texto}
\longrightarrow
\text{subtokens}
\longrightarrow
\text{IDs}
\longrightarrow
\text{lookup em } W_{\text{embedding}}
\longrightarrow
\texttt{inputs\_embeds}
$$

O código representa o **início de um treinamento**. Ele baixa o tokenizador e
a configuração do modelo, mas não baixa os pesos treinados do Qwen3. Por isso,
os vetores começam aleatórios e ainda não carregam significado aprendido.

## 1. Tokenização: texto não entra diretamente no modelo

O tokenizador divide o texto em unidades de seu vocabulário. Uma unidade pode
ser uma palavra inteira, parte de uma palavra, pontuação ou outro símbolo.

Na execução validada deste repositório, a frase foi dividida assim:

| Posição | Subtoken | ID |
| ---: | --- | ---: |
| 0 | `o` | 78 |
| 1 | `Ġg` | 342 |
| 2 | `ato` | 4330 |
| 3 | `Ġdorm` | 29109 |
| 4 | `e` | 68 |

O caractere `Ġ` é uma representação visual usada pelo tokenizador para indicar
que o subtoken começa depois de um espaço. Ele ajuda a distinguir, por exemplo,
um trecho no início de uma palavra de um trecho em outro contexto.

Os IDs formam o tensor:

```text
input_ids = [[78, 342, 4330, 29109, 68]]
```

Um ID não contém significado por si só. Ele é apenas o índice de uma linha na
tabela de embeddings.

## 2. A matriz de embeddings

Se o vocabulário possui $|V|$ entradas e cada vetor possui $d_{\text{model}}$
componentes, a tabela tem o formato:

$$
W_{\text{embedding}} \in
\mathbb{R}^{|V| \times d_{\text{model}}}
$$

No Qwen3-0.6B-Base, a configuração informa:

- $|V| = 151\,936$ tokens;
- $d_{\text{model}} = 1024$ componentes;
- `initializer_range = 0.02`.

O script usa 128 componentes por padrão para reduzir o consumo de memória. A
opção `--dimensao-original` usa os 1024 componentes da arquitetura original.

Em `float32`, cada componente ocupa 4 bytes. Portanto, apenas a tabela original
ocupa aproximadamente:

$$
151\,936 \times 1024 \times 4
\approx 593{,}5\ \text{MiB}
$$

O modo didático com 128 componentes ocupa aproximadamente $74{,}2$ MiB.

## 3. Como os valores iniciais são criados

O código preenche **todas as células** da tabela com valores sorteados de uma
distribuição Normal:

```python
nn.init.normal_(
    self.embed_tokens.weight,
    mean=0.0,
    std=0.02,
)
```

Para cada célula $w_{ij}$:

$$
z_{ij} \sim \mathcal{N}(0,1)
$$

$$
w_{ij} = 0 + 0{,}02z_{ij}
$$

De forma equivalente:

$$
w_{ij} \sim \mathcal{N}(0, 0{,}02^2)
$$

Na notação $\mathcal{N}(\mu,\sigma^2)$, o segundo argumento é a variância. O
valor passado como `std` no PyTorch é o desvio-padrão $\sigma$, não a variância.

A distribuição Normal não decide qual vetor pertence a um token. Ela apenas
inicializa os números da tabela. Depois disso, o ID seleciona uma linha.

## 4. A operação central: lookup

A camada é criada com:

```python
self.embed_tokens = nn.Embedding(
    num_embeddings=vocab_size,
    embedding_dim=d_model,
)
```

E a transformação de IDs em vetores acontece nesta linha:

```python
inputs_embeds = self.embed_tokens(input_ids)
```

Matematicamente:

$$
\texttt{inputs\_embeds}[b,t]
=
W_{\text{embedding}}[
    \texttt{input\_ids}[b,t]
]
$$

Aqui, $b$ é o índice da frase no lote e $t$ é a posição do subtoken. Se um
subtoken tem ID 45, seu vetor é exatamente:

$$
\mathbf{e} = W_{\text{embedding}}[45]
$$

Não há uma multiplicação entre o ID e a matriz. `nn.Embedding` realiza uma
consulta indexada: copia as linhas indicadas pelos IDs para o tensor de saída.

Para um lote com $B$ frases, sequências de tamanho $T$ e vetores de dimensão
$D$, os formatos são:

$$
\texttt{input\_ids} \in \mathbb{N}^{B \times T}
$$

$$
\texttt{inputs\_embeds} \in \mathbb{R}^{B \times T \times D}
$$

No exemplo padrão:

```text
input_ids.shape    = (1, 5)
inputs_embeds.shape = (1, 5, 128)
```

## 5. `attention_mask`

Frases diferentes podem possuir quantidades diferentes de subtokens. Para
colocá-las no mesmo lote, o tokenizador completa as menores com tokens de
padding.

A máscara distingue conteúdo real de preenchimento:

```text
1 = subtoken real
0 = padding
```

Para uma sequência sem padding:

```text
attention_mask = [[1, 1, 1, 1, 1]]
```

Para uma sequência com duas posições preenchidas artificialmente:

```text
attention_mask = [[1, 1, 1, 0, 0]]
```

A camada `nn.Embedding` ainda produz vetores para os IDs presentes nas posições
de padding. A máscara será usada na atenção para impedir que essas posições
sejam tratadas como conteúdo da frase.

## 6. `position_ids` e RoPE

O script também prepara os índices de posição:

```text
position_ids = [[0, 1, 2, 3, 4]]
```

No Qwen3, esses índices **não selecionam vetores posicionais para somar ao token
embedding**. A ordem das operações é:

1. `input_ids` seleciona linhas de `embed_tokens`;
2. o resultado é armazenado em `inputs_embeds`;
3. projeções posteriores criam Query, Key e Value;
4. RoPE usa `position_ids` para aplicar rotações em Query e Key;
5. a self-attention utiliza os valores transformados.

Assim, na etapa estudada pelo programa:

$$
\boxed{
\text{input embedding} = \text{token embedding}
}
$$

A informação de posição entra posteriormente no cálculo da atenção. Ela não é
ignorada; apenas é incorporada de outra maneira e em outro ponto da arquitetura.

## 7. Comparação com outras arquiteturas

Nem todo Transformer trata posição como o Qwen3.

No Transformer original, embeddings dos tokens são escalados e somados a um
positional encoding senoidal:

$$
X_i = \sqrt{d_{\text{model}}}\,E[t_i] + PE(i)
$$

Outras arquiteturas podem usar embeddings posicionais aprendidos:

$$
X_i = E[t_i] + P[i]
$$

Já uma arquitetura com RoPE, como o Qwen3, primeiro faz:

$$
X_i = E[t_i]
$$

e incorpora a posição posteriormente em Query e Key. Portanto, as fórmulas de
soma posicional são corretas para certas arquiteturas, mas não descrevem a etapa
de input embedding implementada neste exemplo.

## 8. Inicialização não é aprendizado

No início do treinamento, duas linhas da matriz podem ser próximas ou distantes
apenas por acaso. Os vetores começam a representar padrões úteis quando o
treinamento calcula gradientes e atualiza os pesos:

$$
W_{\text{embedding}}
\leftarrow
W_{\text{embedding}}
- \eta\nabla_{W_{\text{embedding}}}\mathcal{L}
$$

Nessa expressão:

- $\eta$ é a taxa de aprendizado;
- $\mathcal{L}$ é a função de perda;
- o gradiente indica como alterar os pesos para reduzir o erro.

Em um modelo já treinado, a tabela não é reinicializada aleatoriamente: seus
valores são carregados do checkpoint.

## 9. Como executar

Crie e ative um ambiente virtual:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Instale as versões validadas:

```bash
python -m pip install -r requirements.txt
```

Execute o modo didático:

```bash
python input_embedding_o_gato_dorme.py
```

Use a dimensão original do Qwen3-0.6B:

```bash
python input_embedding_o_gato_dorme.py --dimensao-original
```

Experimente um lote com outros textos:

```bash
python input_embedding_o_gato_dorme.py \
    --texto "o gato dorme" "a gata corre"
```

Na primeira execução, o tokenizador e a configuração são obtidos do Hugging
Face e armazenados no cache local. Os pesos completos do modelo não são
necessários para este exercício.

## Resumo

1. o tokenizador transforma texto em subtokens e IDs;
2. cada ID seleciona uma linha de $W_{\text{embedding}}$;
3. a saída possui um vetor para cada posição da sequência;
4. `attention_mask` identifica conteúdo real e padding;
5. no Qwen3, RoPE incorpora posição mais tarde em Query e Key;
6. vetores aleatórios só adquirem padrões úteis durante o treinamento.
