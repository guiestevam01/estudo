# Input Embedding com PyTorch e Qwen3

Projeto de estudo que acompanha a frase **“o gato dorme”** desde o texto até o
tensor `inputs_embeds` usado como entrada de um Transformer moderno.

O exemplo usa o tokenizador real do `Qwen/Qwen3-0.6B-Base`, mas cria uma nova
tabela `torch.nn.Embedding` com pesos aleatórios. Assim, é possível estudar a
mecânica do input embedding sem baixar os pesos completos do modelo.

```text
texto → subtokens → IDs → W_embedding[ID] → inputs_embeds
```

## O que este projeto demonstra

- como um tokenizador subword divide uma frase;
- como cada subtoken recebe um ID inteiro;
- como `nn.Embedding` usa o ID para selecionar uma linha da matriz;
- os formatos de `input_ids`, `attention_mask`, `position_ids` e
  `inputs_embeds`;
- como a tabela é inicializada com uma distribuição Normal;
- por que o Qwen3 não soma um embedding posicional nessa etapa;
- como RoPE usa as posições posteriormente em Query e Key;
- a diferença entre pesos aleatórios e embeddings já treinados.

## Requisitos

- Python 3.13;
- aproximadamente 6 GiB livres para o ambiente com PyTorch e CUDA no Linux;
- internet na primeira execução para obter o tokenizador e a configuração do
  Qwen3.

As versões validadas estão em `requirements.txt`.

## Preparação do ambiente

Na pasta deste projeto, execute:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

O diretório `.venv` é local e não deve ser enviado ao Git.

## Execução rápida

Com o ambiente preparado, os comandos mais comuns podem ser executados pelo
`Makefile`:

```bash
make run
make experiment
make test
make check
```

Use `make help` para consultar a finalidade de cada comando. A execução direta
com Python continua disponível:

```bash
python input_embedding_o_gato_dorme.py
```

A saída mostra os subtokens, IDs, máscaras, posições, as linhas selecionadas e
o formato final. A comprovação central aparece assim:

```text
W[ID] == saida? True
```

Isso significa que o vetor produzido é exatamente a linha indicada pelo ID:

$$
\texttt{inputs\_embeds}[b,t]
=
W_{\text{embedding}}[\texttt{input\_ids}[b,t]]
$$

## Experimentos

Use vetores pequenos para visualizar todos os componentes:

```bash
python input_embedding_o_gato_dorme.py \
    --texto "gato gato gato" \
    --d-model 4 \
    --mostrar 4 \
    --device cpu \
    --seed 42
```

Passe mais de uma frase para observar padding e `attention_mask`:

```bash
python input_embedding_o_gato_dorme.py \
    --texto "o gato dorme" "a gata corre"
```

Use os 1024 componentes da configuração original:

```bash
python input_embedding_o_gato_dorme.py --dimensao-original
```

Esse último modo ocupa aproximadamente 593,5 MiB apenas para a matriz em
`float32`.

Consulte todas as opções disponíveis:

```bash
python input_embedding_o_gato_dorme.py --help
```

## Testes

Os testes usam tensores pequenos em CPU e não acessam a internet:

```bash
python -m unittest -v
```

Eles verificam o lookup de IDs, os formatos dos tensores, a reprodutibilidade
da inicialização, a geração de `position_ids` e o tratamento de entradas
inválidas.

## Estrutura

```text
InputEmbedding/
├── README.md
├── Makefile
├── input_embedding_o_gato_dorme.py
├── requirements.txt
├── sobreEmbedding.md
└── test_input_embedding.py
```

- [`input_embedding_o_gato_dorme.py`](input_embedding_o_gato_dorme.py): exemplo
  executável e comentado;
- [`Makefile`](Makefile): atalhos para preparar, executar e validar o projeto;
- [`sobreEmbedding.md`](sobreEmbedding.md): explicação conceitual completa e
  resultados dos experimentos;
- [`test_input_embedding.py`](test_input_embedding.py): testes automatizados;
- [`requirements.txt`](requirements.txt): versões das dependências validadas.

## Sequência de aprendizado nos commits

O histórico foi organizado em etapas pequenas:

1. `7a70fca` — adiciona o exemplo didático com Qwen3;
2. `c213845` — fixa as dependências do ambiente Python;
3. `2ee3e32` — alinha a explicação ao fluxo do Qwen3;
4. `5928e09` — valida lookup, formatos e posições com testes;
5. `00e13b3` — registra o experimento com tokens repetidos.

Os commits anteriores `9eb972f` e `dc3b475` preservam a evolução inicial das
anotações, inclusive conceitos que depois foram refinados para a arquitetura
específica estudada aqui.

## Próxima leitura

Leia [`sobreEmbedding.md`](sobreEmbedding.md) para acompanhar as fórmulas, a
diferença entre RoPE e soma posicional e a interpretação detalhada das saídas.
