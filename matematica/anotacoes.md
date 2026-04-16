# 1. Definição Formal do Espaço de Agentes

Seja $\mathcal{P}$ o espaço de todos os programas computáveis (Turing-completos, por exemplo, implementados em Python).

Um **HyperAgent** $H \in \mathcal{P}$ é definido como uma tupla ordenada:

$$
H = \langle A_T, A_M, \Sigma \rangle
$$

onde:

- $A_T: \mathcal{I} \to \mathcal{O}$ é o **Task Agent**, que mapeia entradas $i \in \mathcal{I}$ para saídas $o \in \mathcal{O}$.

- $A_M: \mathcal{H} \times \mathcal{E} \times \mathbb{N} \to \Delta(\mathcal{D})$ é o **Meta Agent**, que, dado:
  - um histórico de execução $\mathcal{H}$,
  - um conjunto de avaliações $\mathcal{E}$,
  - e um budget restante $b \in \mathbb{N}$,

  produz uma distribuição sobre modificações de código $\delta \in \mathcal{D}$ (por exemplo, diffs ou transformações estruturais).

- $\Sigma$ representa o estado interno mutável do agente (memória persistente, variáveis internas, logs, etc.).

---

A operação de modificação é definida por:

$$
\mathcal{M}: \mathcal{P} \times \mathcal{D} \to \mathcal{P}
$$

tal que, dado um agente $H$ e uma modificação $\delta \in \mathcal{D}$:

$$
H' = \mathcal{M}(H, \delta), \quad \text{com } H' \in \mathcal{P}
$$

---

## 1.1 Auto-Referencialidade

Diferente de sistemas hierárquicos onde $A_M$ é fixo ($A_M^{\text{fixed}}$), no HyperAgent:

$$
A_M \subseteq C(H) \;\Rightarrow\; A_M \text{ pode modificar } A_M \text{ e } A_T
$$

Isso implica que a função de transição de estado do sistema **não é estacionária**, pois a própria política de modificação evolui ao longo do tempo.

---

## 2. O Processo Evolutivo: DGM-H como Cadeia de Markov Não-Homogênea

O DGM-H mantém um arquivo $\mathcal{A}_t = \{H_0, H_1, \dots, H_t\}$ na iteração $t$.

### 2.1 Seleção de Pais (Parent Selection)

Seja $S(H_i)$ a pontuação de performance do agente $i$.  
Seja $N(H_i)$ o número de filhos gerados com sucesso a partir de $H_i$.

O peso de seleção $w_i$ é definido por:

$$
w_i = \sigma\big(\lambda (S(H_i) - \mu_t)\big)\cdot \frac{1}{1 + N(H_i)}
$$

onde:

- $\sigma(x) = \frac{1}{1 + e^{-x}}$ é a função sigmoide;
- $\mu_t = \frac{1}{k}\sum_{j \in \text{Top-}k} S(H_j)$ é a média da elite;
- $\lambda$ controla a pressão seletiva.

A probabilidade de seleção é:

$$
P(H_i \mid \mathcal{A}_t) = \frac{w_i}{\sum_{H_j \in \mathcal{A}_t} w_j}
$$

> **Nota:** O termo $\frac{1}{1+N(H_i)}$ atua como incentivo à exploração, semelhante a bônus em métodos tipo UCB.

---

### 2.2 Transição de Estado

$$
\mathcal{A}_{t+1} =
\mathcal{A}_t \cup
\left\{
H_{\text{new}} \;\middle|\;
H_{\text{new}} = \mathcal{M}\big(H_{\text{parent}}, \delta\big),
\;\delta \sim A_M(H_{\text{parent}}),
\;\text{Valid}(H_{\text{new}})
\right\}
$$

---

## 3. Métrica de Meta-Aprendizado: $\text{Improvement}@k$

Seja:

- $M$: Meta Agent fixo (ou inicial);
- $A_0$: Task Agent inicial;
- $\mathcal{T}$: conjunto de tarefas de teste;
- $\text{Eval}(A, \mathcal{T}) \in [0,1]$: função de avaliação.

Definimos a sequência:

$$
A_i = \text{Modify}(A_{i-1}, M)
$$

Então:

$$
\text{Imp}@k(M, A_0, \mathcal{T}) =
\max_{i \in \{1,\dots,k\}} \text{Eval}(A_i, \mathcal{T})
- \text{Eval}(A_0, \mathcal{T})
$$

---

### 3.1 Transferência de Domínio

Sejam $\mathcal{D}_S$ (source) e $\mathcal{D}_T$ (target). Um HyperAgent $H_S$ treinado em $\mathcal{D}_S$ contém $M_S$.

$$
\Delta_{\text{trans}} =
\text{Imp}@k(M_S, A_{0,T}, \mathcal{T}_T)
-
\text{Imp}@k(M_{\text{init}}, A_{0,T}, \mathcal{T}_T)
$$

Se $\Delta_{\text{trans}} > 0$, então $M_S$ aprendeu uma heurística de melhoria geral $h_{\text{meta}}$ tal que:

$$
h_{\text{meta}} \notin \text{Space}(\mathcal{D}_S)
\quad \text{mas} \quad
h_{\text{meta}} \in \text{Space}(\mathcal{D}_{\text{universal}})
$$

Exemplos observados:

1. **Rastreamento de tendência**
$$
\text{Trend} =
\frac{1}{w}\sum_{j=t-w}^{t} S_j
-
\frac{1}{w}\sum_{j=t-2w}^{t-w} S_j
$$

2. **Memória persistente**  
Estrutura que armazena pares causais $(\text{causa}, \text{efeito})$ para evitar regressões locais.

---

## 4. Análise de Convergência e Compounding

Seja $J(H)$ a função objetivo. O objetivo é:

$$
H^* = \arg\max_{H \in \mathcal{P}} J(H)
$$

Como $\mathcal{P}$ é discreto e vasto, utiliza-se busca estocástica guiada. A hipótese de *compounding* assume que a taxa de melhoria $\frac{dJ}{dt}$ não decai rapidamente, pois o próprio operador de busca evolui.

Se o Meta Agent aprende uma política $\pi_\theta(a|s)$:

$$
\theta_{t+1} \leftarrow \theta_t + \alpha \nabla_\theta \mathbb{E}_{H \sim \pi_\theta}[J(H)]
$$

*(Nota: no DGM-H isso ocorre implicitamente via seleção, não por backpropagation direta.)*

---

### 4.1 Exemplo: Refinamento de Rubrica

$$
F_{\text{grade}}(\text{sol}) =
\begin{cases}
7 & \text{se solução completa e válida} \\
6 & \text{se ideia central correta com erros menores} \\
1 & \text{se atende parcialmente critérios mínimos} \\
0 & \text{caso contrário}
\end{cases}
$$

A melhoria é medida pela correlação com avaliador humano:

$$
\rho(\text{Score}_{\text{agent}}, \text{Score}_{\text{human}})_T
>
\rho(\text{Score}_{\text{agent}}, \text{Score}_{\text{human}})_0
$$

---

## 5. Limitações Formais

1. **Espaço de busca restrito**  
A função de avaliação e seleção são externas e fixas:

$$
\mathcal{L}_{\text{total}} =
\mathcal{L}_{\text{inner}}(H)
+
\mathcal{L}_{\text{outer}}(\text{fixed})
$$

2. **Lei de Goodhart**  
Se $J(H)$ é proxy imperfeita de $Q(H)$:

$$
J(H_t) \to \max J
\quad \not\Rightarrow \quad
Q(H_t) \to \max Q
$$

---

## 6. Estruturas de Dados Emergentes

| Estrutura | Formulação | Função |
|----------|------------|--------|
| Moving Average | $\bar{x}_w = \frac{1}{w}\sum_{i=1}^w x_i$ | Suavização de ruído |
| Entropia | $H(Y) = -\sum_c p(c)\log p(c)$ | Detecta colapso de diversidade |
| UCB Adaptativo | $\bar{x}_i + C_t \sqrt{\frac{\ln N}{n_i}}$ | Exploração vs exploração |
| Memory Tool | $\mathcal{M}_t = \mathcal{M}_{t-1} \cup \{(k_t,v_t,\tau_t)\}$ | Memória persistente |

---
