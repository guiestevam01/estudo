# 1. Definição Formal do Espaço de Agentes

Seja $\mathcal{P}$ o espaço de todos os programas computáveis (Turing-completos, por exemplo, implementados em Python).

Um **HyperAgent** $H \in \mathcal{P}$ é definido como uma tupla ordenada:

$$
H = \langle A_T, A_M, \Sigma \rangle
$$

onde:

- $A_T: \mathcal{I} \to \mathcal{O}$ é o **Task Agent**, que mapeia entradas $i \in \mathcal{I}$ para saídas $o \in \mathcal{O}$.

- $A_M: \mathcal{H} \times \mathcal{E} \times \mathbb{N} \to \Delta(\mathcal{D})$ é o **Meta Agent**, que, dado: um histórico de execução $\mathcal{H}$, um conjunto de avaliações $\mathcal{E}$, e um budget restante $b \in \mathbb{N}$,

  produz uma distribuição sobre modificações de código $\mathcal{D}$ (por exemplo, diffs ou transformações estruturais).

- $\Sigma$ representa o estado interno mutável do agente (memória persistente, variáveis internas, logs, etc.).

---

A operação de modificação é definida por:

$$
\mathcal{M}: \mathcal{P} \times \mathcal{D} \to \mathcal{P}
$$

tal que, dado um agente $H$ e uma modificação $\delta \in \mathcal{D}$:

$$
H' = \mathcal{M}(H, \delta) \quad \text{com} \quad H' \in \mathcal{P}
$$

### 1.1 Auto-Referencialidade
Diferente de sistemas hierárquicos onde $A_M$ é fixo ($A_M^{\text{fixed}}$), no HyperAgent:
$$
A_M \subset C(H) \implies A_M \text{ pode alterar } A_M \text{ e } A_T
$$
Isso implica que a função de transição de estado do sistema **não é estacionária** em relação à estratégia de busca.

---

## 2. O Processo Evolutivo: DGM-H como Cadeia de Markov Não-Homogênea

O DGM-H mantém um arquivo $\mathcal{A}_t = \{H_0, H_1, \dots, H_t\}$ na iteração $t$.

### 2.1 Seleção de Pais (Parent Selection)
Seja $S(H_i)$ a pontuação de performance do agente $i$.  
Seja $N(H_i)$ o número de filhos compilados com sucesso gerados por $H_i$.

O peso de seleção $w_i$ é definido por:
$$
w_i = \sigma\big(\lambda (S(H_i) - \mu_t)\big) \cdot \frac{1}{1 + N(H_i)}
$$
Onde:
* $\sigma(x) = \frac{1}{1+e^{-x}}$ é a sigmoide.
* $\mu_t = \frac{1}{k} \sum_{j \in \text{Top-}k} S(H_j)$ é a média da fronteira de Pareto aproximada.
* $\lambda$ controla a pressão seletiva.

A probabilidade de seleção é:
$$
P(H_i \mid \mathcal{A}_t) = \frac{w_i}{\sum_{H_j \in \mathcal{A}_t} w_j}
$$
> **Nota:** O termo $\frac{1}{1+N(H_i)}$ atua como um bônus de exploração, análogo ao denominador em fórmulas UCB.

### 2.2 Transição de Estado
$$
\mathcal{A}_{t+1} = \mathcal{A}_t \cup \big\{ H_{\text{new}} \mid H_{\text{new}} = \mathcal{M}(H_{\text{parent}}, A_M(H_{\text{parent}})) \land \text{Valid}(H_{\text{new}}) \big\}
$$

---

## 3. Métrica de Meta-Aprendizado: $\text{Improvement}@k$

Para quantificar a capacidade do Meta Agent de melhorar o Task Agent independentemente da tarefa:

Seja:
* $M$: Meta Agent fixo (ou inicial).
* $A_0$: Task Agent inicial.
* $\mathcal{T}$: Conjunto de tarefas de teste.
* $\text{Eval}(A, \mathcal{T}) \in [0,1]$: Função de avaliação normalizada.

Definimos a sequência $\{A_1, \dots, A_k\}$ onde $A_{i} = \text{Modify}(A_{i-1}, M)$.

$$
\text{Imp}@k(M, A_0, \mathcal{T}) = \max_{i \in \{1,\dots,k\}} \big( \text{Eval}(A_i, \mathcal{T}) \big) - \text{Eval}(A_0, \mathcal{T})
$$

### 3.1 Transferência de Domínio
Sejam $\mathcal{D}_S$ (Source) e $\mathcal{D}_T$ (Target). Um HyperAgent $H_S$ otimizado em $\mathcal{D}_S$ contém $M_S$.

$$
\Delta_{\text{trans}} = \text{Imp}@k(M_S, A_{0,T}, \mathcal{T}_T) - \text{Imp}@k(M_{\text{init}}, A_{0,T}, \mathcal{T}_T)
$$
Se $\Delta_{\text{trans}} > 0$ estatisticamente, então $M_S$ aprendeu uma **heurística de melhoria geral** $h_{\text{meta}}$ tal que:
$$
h_{\text{meta}} \notin \text{Space}(\mathcal{D}_S) \quad \text{mas} \quad h_{\text{meta}} \in \text{Space}(\mathcal{D}_{\text{universal}})
$$

Exemplos observados no artigo:
1. **Rastreamento de Tendência:** 
   $$
   \text{Trend} = \frac{1}{w} \sum_{j=t-w}^{t} S_j - \frac{1}{w} \sum_{j=t-2w}^{t-w} S_j
   $$
2. **Memória Persistente:** Estrutura que armazena pares causais $(Causa, Efeito)$ para evitar regressões locais.

---

## 4. Análise de Convergência e "Compounding"

Seja $J(H)$ a função objetivo (performance esperada). O DGM-H tenta aproximar:
$$
H^* = \arg \max_{H \in \mathcal{P}} J(H)
$$
Como o espaço $\mathcal{P}$ é discreto e vasto, usa-se busca estocástica guiada. A hipótese de *compounding* implica que a taxa de melhoria $\frac{dJ}{dt}$ não decai rapidamente, pois o próprio operador de busca é otimizado.

Se o Meta Agent aprende uma política $\pi_\theta(a|s)$ para gerar diffs, então $\theta$ é atualizado implicitamente via seleção evolutiva:
$$
\theta_{t+1} \leftarrow \theta_t + \alpha \nabla_\theta \mathbb{E}_{H \sim \pi_\theta} [J(H)]
$$
*(Nota: No DGM-H, isso não é backpropagation explícita, mas uma aproximação via seleção baseada em fitness.)*

### 4.1 Exemplo de Refinamento de Rubrica (Math Grading)
O agente evolui de uma função de decisão binária suave para uma árvore de decisão rígida:

**Estado Final ($t=T$):**
$$
F_{\text{grade}}(\text{sol}) =
\begin{cases} 
7 & \text{se } \forall s_i \in \text{sol}, \text{Valid}(s_i) \land \text{Complete}(\text{sol}) \\
6 & \text{se } \text{CoreIdea}(\text{sol}) \land \exists \text{ minor error } \epsilon \\
1 & \text{se } \exists m \in \mathcal{G}_{\text{guidelines}} : \text{Achieved}(\text{sol}, m) \\
0 & \text{caso contrário}
\end{cases}
$$
A melhoria vem da redução da variância $\text{Var}(\text{Score})$ para soluções ambíguas, maximizando a correlação com o avaliador humano $H_{\text{expert}}$:
$$
\rho(\text{Score}_{\text{agent}}, \text{Score}_{\text{human}})_T > \rho(\text{Score}_{\text{agent}}, \text{Score}_{\text{human}})_0
$$

---

## 5. Limitações Formais

1. **Espaço de Busca Restrito:** Embora $H$ possa modificar qualquer código, a seleção de pais $P(H_i)$ e a função $\text{Eval}$ são fixas externamente:
   $$
   \mathcal{L}_{\text{total}} = \mathcal{L}_{\text{inner}}(H) + \mathcal{L}_{\text{outer}}(\text{Fixed})
   $$
   O sistema não otimiza $\mathcal{L}_{\text{outer}}$.

2. **Lei de Goodhart:** Se $J(H)$ é uma proxy imperfeita para a verdadeira qualidade $Q(H)$, então:
   $$
   \lim_{t \to \infty} J(H_t) \to \max(J) \quad \text{mas} \quad Q(H_t) \not\to \max(Q)
   $$
   Observado no artigo como colapso de classificação (ex: 99% "Accept").

---

## 6. Estruturas de Dados Emergentes (Modelagem Matemática)

O agente introduz estruturas autonomamente no código:

| Estrutura | Formulação Matemática | Função |
|:---|:---|:---|
| **Moving Average Tracker** | $ \bar{x}_w = \frac{1}{w}\sum_{i=1}^w x_i $ | Suavização de ruído em avaliações estocásticas |
| **Detecção de Viés** | $ H(Y) = -\sum_{c} p(c) \log p(c) $ | Identifica colapso de modo quando $H(Y) \approx 0$ |
| **UCB Adaptativo** | $ \text{UCB}_i = \bar{x}_i + C_t \sqrt{\frac{\ln N}{n_i}} $ | Balanceia exploração/exploração; $C_t$ ajustado por iterações restantes |
| **Memory Tool** | $ \mathcal{M}_t = \mathcal{M}_{t-1} \cup \{(k_t, v_t, \tau_t)\} $ | Extensão de espaço de estado além do contexto finito do LLM |

---

