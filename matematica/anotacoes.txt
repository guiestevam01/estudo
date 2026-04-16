# 1. Definição Formal do Espaço de Agentes

Seja $\mathcal{P}$ o espaço de todos os programas computáveis (Turing-completos, implementados em Python).

Um **HyperAgent** $H \in \mathcal{P}$ é definido como uma tupla ordenada:
$$
H = \langle A_T, A_M, \Sigma \rangle
$$
Onde:
* $A_T: \mathcal{I} \to \mathcal{O}$ é o **Task Agent**, que mapeia inputs $\mathcal{I}$ para outputs $\mathcal{O}$.
* $A_M: \mathcal{H} \times \mathcal{E} \times \mathbb{N} \to \Delta(\mathcal{P})$ é o **Meta Agent**, que dado um hyperagent atual $H$, histórico de avaliações $\mathcal{E}$ e budget restante, retorna uma distribuição sobre modificações de código (diffs).
* $\Sigma$ representa o estado interno mutável (memória persistente, trackers, etc.).

A operação de modificação $\mathcal{M}$ aplica um diff $\delta$ gerado por $A_M$ ao código de $H$:
$$
H' = \mathcal{M}(H, \delta) \quad \text{tal que} \quad H' \in \mathcal{P}
$$

