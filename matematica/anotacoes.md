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
