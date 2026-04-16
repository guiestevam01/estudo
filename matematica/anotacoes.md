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

  produz uma distribuição sobre modificações $\delta \in \mathcal{D}$ (differences ou transformações de código).

- $\Sigma$ representa o estado interno mutável do agente (memória persistente, variáveis internas, logs, etc.).

---

A operação de modificação é definida por:

$$
\mathcal{M}: \mathcal{P} \times \mathcal{D} \to \mathcal{P}
$$

tal que:

$$
H' = \mathcal{M}(H, \delta), \quad \text{com } H' \in \mathcal{P}
$$

---

## 1.1 Auto-Referencialidade

Diferente de sistemas hierárquicos onde $A_M$ é fixo ($A_M^{\text{fixed}}$), no HyperAgent:

$$
A_M \subseteq C(H) \;\Rightarrow\; A_M \text{ pode modificar } A_M \text{ e } A_T
$$

Isso implica que a dinâmica do sistema **não é estacionária**, pois a política de modificação também evolui.

---

# 2. Processo Evolutivo: DGM-H como Cadeia de Markov Não-Homogênea

O sistema mantém um conjunto de agentes:

$$
\mathcal{A}_t = \{H_0, H_1, \dots, H_t\}
$$

---

## 2.1 Seleção de Pais (Parent Selection)

Seja $S(H_i)$ a performance do agente $H_i$.  
Seja $N(H_i)$ o número de descendentes válidos gerados por $H_i$.

O peso de seleção é:

$$
w_i = \sigma\big(\lambda (S(H_i) - \mu_t)\big)\cdot \frac{1}{1 + N(H_i)}
$$

onde:

- $\sigma(x) = \frac{1}{1 + e^{-x}}$ (sigmoide)
- $\mu_t = \frac{1}{k} \sum_{j \in \text{Top-}k} S(H_j)$
- $\lambda$ controla pressão seletiva

A probabilidade de seleção:

$$
P(H_i \mid \mathcal{A}_t) =
\frac{w_i}{\sum_{H_j \in \mathcal{A}_t} w_j}
$$

> O termo $\frac{1}{1+N(H_i)}$ incentiva exploração (análoga a UCB).

---

## 2.2 Transição de Estado

$$
\mathcal{A}_{t+1} =
\mathcal{A}_t \cup
\left\{
H_{\text{new}} \;\middle|\;
H_{\text{new}} = \mathcal{M}(H_{\text{parent}}, \delta),
\;\delta \sim A_M(H_{\text{parent}}),
\;\text{Valid}(H_{\text{new}})
\right\}
$$

---

# 3. Métrica de Meta-Aprendizado: $\text{Improvement}@k$

Seja:

- $M$: Meta Agent fixo
- $A_0$: Task Agent inicial
- $\mathcal{T}$: conjunto de tarefas
- $\text{Eval}(A, \mathcal{T}) \in [0,1]$

Definimos:

$$
A_i = \text{Modify}(A_{i-1}, M)
$$

e:

$$
\text{Imp}@k(M, A_0, \mathcal{T}) =
\max_{i \in \{1,\dots,k\}} \text{Eval}(A_i, \mathcal{T})
- \text{Eval}(A_0, \mathcal{T})
$$

---

## 3.1 Transferência de Domínio

Sejam $\mathcal{D}_S$ (source) e $\mathcal{D}_T$ (target).  
Um HyperAgent $H_S$ treinado em $\mathcal{D}_S$ contém $M_S$.

$$
\Delta_{\text{trans}} =
\text{Imp}@k(M_S, A_{0,T}, \mathcal{T}_T)
-
\text{Imp}@k(M_{\text{init}}, A_{0,T}, \mathcal{T}_T)
$$

Se $\Delta_{\text{trans}} > 0$, então $M_S$ aprendeu uma heurística de melhoria geral $h_{\text{meta}}$ tal que:

$$
h_{\text{meta}} \notin \mathcal{D}_S
\quad \text{mas} \quad
h_{\text{meta}} \in \mathcal{D}_{\text{universal}}
$$

Exemplos:

### 1. Tendência temporal
$$
\text{Trend} =
\frac{1}{w}\sum_{j=t-w}^{t} S_j
-
\frac{1}{w}\sum_{j=t-2w}^{t-w} S_j
$$

### 2. Memória persistente
Armazena pares causais $(\text{causa}, \text{efeito})$ para evitar regressões.

---

# 4. Convergência e Compounding

Seja $J(H)$ a função objetivo:

$$
H^* = \arg\max_{H \in \mathcal{P}} J(H)
$$

Como $\mathcal{P}$ é discreto, usa-se busca estocástica guiada.

A hipótese de compounding assume:

$$
\frac{dJ}{dt} \not\to 0 \text{ rapidamente}
$$

Se o meta-agent induz política $\pi_\theta$:

$$
\theta_{t+1} \leftarrow \theta_t + \alpha \nabla_\theta \mathbb{E}_{H \sim \pi_\theta}[J(H)]
$$

*(no sistema real isso ocorre implicitamente por seleção)*

---

## 4.1 Exemplo de Rubrica

$$
F_{\text{grade}}(\text{sol}) =
\begin{cases}
7 & \text{solução completa e válida} \\
6 & \text{ideia correta com erros menores} \\
1 & \text{parcialmente correta} \\
0 & \text{incorreta}
\end{cases}
$$

E melhoria:

$$
\rho(\text{Score}_{\text{agent}}, \text{Score}_{\text{human}})_T >
\rho(\text{Score}_{\text{agent}}, \text{Score}_{\text{human}})_0
$$

---

# 5. Limitações Formais

## 5.1 Espaço de busca fixo

$$
\mathcal{L}_{\text{total}} =
\mathcal{L}_{\text{inner}}(H)
+
\mathcal{L}_{\text{outer}}(\text{fixed})
$$

## 5.2 Goodhart

Se $J(H)$ é proxy de $Q(H)$:

$$
J(H_t) \to \max J
\quad \not\Rightarrow \quad
Q(H_t) \to \max Q
$$

---

# 6. Estruturas Emergentes

| Estrutura | Fórmula | Função |
|----------|--------|--------|
| Moving Average | $\bar{x}_w = \frac{1}{w}\sum x_i$ | suavização |
| Entropia | $H(Y) = -\sum p \log p$ | diversidade |
| UCB | $\bar{x}_i + C_t \sqrt{\frac{\ln N}{n_i}}$ | exploração |
| Memória | $\mathcal{M}_t = \mathcal{M}_{t-1} \cup \{(k,v,\tau)\}$ | memória persistente |

---
