# Classificador de atendimento: venda ou suporte

Fine-tuning do BERTimbau (`neuralmind/bert-base-portuguese-cased`) para
classificar mensagens de clientes nas classes `venda` e `suporte`.

## Dados

Coloque `treino.jsonl` e `teste.jsonl` neste diretório. Cada linha deve ser um
objeto JSON independente:

```json
{"prompt": "Olá, gostaria de comprar o novo produto", "completion": "venda"}
{"prompt": "Como configuro esta televisão?", "completion": "suporte"}
```

Os dois arquivos precisam conter exemplos de ambas as classes. Linhas vazias
são ignoradas; campos ausentes, JSON inválido e rótulos desconhecidos produzem
uma mensagem de erro com o número da linha.

## Execução local

Recomenda-se Python 3.10 ou mais recente:

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python train.py
```

O melhor checkpoint é selecionado pelo F1 ponderado no conjunto de teste. O
modelo final, o tokenizador e `metricas.json` são gravados em
`modelo_atendimento/`.

Os principais parâmetros podem ser alterados pela linha de comando:

```bash
python train.py \
  --train-file treino.jsonl \
  --test-file teste.jsonl \
  --epochs 5 \
  --batch-size 8 \
  --learning-rate 2e-5
```

Em uma máquina sem GPU, use um batch menor caso falte memória. Para um teste
mais leve também é possível informar
`--model-name distilbert-base-multilingual-cased`.

## Inferência

Após o treinamento:

```bash
python predict.py "Quero comprar uma televisão nova"
python predict.py "Minha televisão não conecta ao Wi-Fi"
```

## Google Colab

Abra `aimodel.ipynb`, selecione um ambiente com GPU e execute as células na
ordem. Faça upload de `treino.jsonl` e `teste.jsonl` quando solicitado. O login
no Hugging Face não é necessário para o modelo público usado neste projeto.
