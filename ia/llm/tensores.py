import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler

data = {
    'cliente_id': [1, 2, 3, 1, 2, 4],
    'idade': [35, 28, 42, 35, 28, 31],
    'cidade': ['SP', 'RJ', 'BH', 'SP', 'RJ', 'SP'],
    'valor_compra': [250.5, 89.9, 1200.0, 150.0, 45.5, 99.9],
    'dia_semana': [2, 5, 0, 3, 1, 4],
    'produto_categoria': ['eletrônicos', 'livros', 'eletrônicos', 'roupas', 'livros', 'roupas']
}
df = pd.DataFrame(data) # cria data frames
#data tem chaves como cliente_id,idade,cidade e valor_compra
# data tem listas que seriam os valores de cada coluna
# o pandas alinha isso de forma simples.
# essas chaves tem seus dados como textos certo, redes neurais nao lidam berm com isso entao voce precisa converter as categorias em numeros,
#para isso usamos o LabelEncoder.
# Vamos identificar colunas categoricas( texto ou categorias sem ordem numerica.) como cidade e produto_categoria
le_cidade = LabelEncoder()
le_categoria = LabelEncoder()

df['cidade_cod'] = le_cidade.fit_transform(df['cidade'])
#seleciona a coluna original do texto, .fir_transform. fir() analisa a coluna cidade e encontra valores unicos. transoform substitui cada valor da coluna por um codigo correspondente.
df['categoria_cod'] = le_categoria.fit_transform(df['produto_categoria'])

## Selecionar features numéricas
features = ['idade', 'valor_compra', 'dia_semana', 'cidade_cod', 'categoria_cod']
x = df[features].values #array numpy2d

#normalizar
scaler = StandardScaler()
X_normalized = scaler.fit_transform(X)  # agora com média 0 e desvio 1

#converter para tensores
tensor_torch = torch.tensor(X_normalized, dtype=torch.float32)
print("\nTensor PyTorch:")
print(tensor_torch)
print("Shape:", tensor_torch.shape)  # torch.Size([6, 5])
