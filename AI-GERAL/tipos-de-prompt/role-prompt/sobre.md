Use persona quando a perspectiva profissional faz parte da tarefa. Não use persona apenas para tentar deixar a IA “mais inteligente”.

| Situação                                   | Por que a persona ajuda                         | Exemplo                                             |
| ------------------------------------------ | ----------------------------------------------- | --------------------------------------------------- |
| Orientação e aconselhamento                | Estimula análise cuidadosa, estrutura e cautela | “Analise como psicólogo clínico...”                 |
| Avaliação de riscos                        | Incentiva ressalvas, impactos e incertezas      | “Atue como especialista em segurança...”            |
| Tomada de decisão complexa                 | Traz critérios típicos da profissão             | “Avalie como arquiteto de software...”              |
| Revisão por uma perspectiva específica     | Direciona o que deve receber atenção            | “Revise este contrato como advogado empresarial...” |
| Comunicação profissional especializada     | Ajuda a seguir convenções da área               | “Elabore como analista de incidentes...”            |
| Situações em que segurança importa         | Aumenta comunicação de riscos e limites         | Medicina, psicologia, segurança e finanças pessoais |
| Quando existem várias perspectivas válidas | Permite comparar interpretações                 | Arquiteto, desenvolvedor, SRE e gerente de produto  |

# Exemplos

response = llm.invoke("Explique recursão em palavras simples.")
print(response.content)

resposta - "A recursão pode parecer complexa, mas é muito fácil de entender se usar uma **metáfora**.

Imagine a **boneca russa (Matryoshka)**.

Aqui está o conceito passo a passo:

### 1. A ideia central
Na programação, a recursão é quando uma função chama a si mesma para resolver um problema. É como se você tivesse uma caixa gigante, dentro dela uma caixa menor, dentro daquela outra ainda menor, e assim por diante.

### 2. Como funciona na prática
Para resolver o problema da caixa gigante, você precisa abrir a caixa para achar a menor. Mas para abrir essa caixa menor, você precisa abrir ela também. E assim por diante, até chegar na **caixinha mais pequena**.

### 3. Os dois ingredientes da recursão
Para não ficar preso nessa caixinha para sempre, você precisa de duas coisas:

1.  **O Caso Base (A parada):** É a caixinha mais pequena que você não precisa mais abrir. É a resposta direta e simples que não precisa de mais recursão. (Ex: "Se a caixa estiver vazia, pare aqui").
2.  **O Passo Recursivo (O chamado):** É o ato de abrir a caixa atual para achar a próxima, que é um problema menor e igual ao original.

### Um exemplo visual simples: Contagem Regressiva

Imagine um código que diz para contar de 5 até 0.

*   **A Função diz:** "Conte até 0".
*   **A Função chama a si mesma:** "Antes de contar até 0, preciso contar até 1".
*   **A Função chama a si mesma novamente:** "Antes de contar até 1, preciso contar até 2".
*   **E assim vai...** até chegar no número **0**.

Quando chega no 0, a recursão **para** (é o caso base).

**Resumo:**
Recursão é dividir um problema grande em pedaços menores iguais ao original, até que o problema se torne tão simples que já seja resolvido sem precisar de mais recursão."

# Agora utilizando persona e especializando o prompt, o resultado foi incrivelmente melhor
**Intuição**

Recursão é um conceito onde uma função chama a si mesma para resolver um problema. A ideia central é dividir um problema grande em versões menores do mesmo problema. Assim como uma caixa de ovos de Páscoa contém uma caixa menor, que contém outra ainda menor, uma função recursiva resolve o problema atual e delega a resolução de uma versão "menor" de si mesma.

**Exemplo Cotidiano**

Pense no ato de desligar um computador. Para desligar o sistema operacional, você clica em "Desligar". O sistema operacional precisa desligar todos os programas abertos. Para desligar cada programa, ele precisa desligar as janelas abertas dentro deles. Para desligar cada janela, ele precisa desligar os menus e botões. Cada nível é uma versão menor do problema anterior, até chegar ao nível mais baixo (o hardware), que não precisa de mais nada para desligar.

**Exemplo em Java**

Um exemplo clássico é o cálculo do fatorial de um número. O fatorial de 5 ($5!$) é $5 \times 4 \times 3 \times 2 \times 1$.

```java
public int fatorial(int n) {
    // Caso Base
    if (n == 1) {
        return 1;
    }
    // Chamada Recursiva
    return n * fatorial(n - 1);
}
```

**Caso Base**

O caso base é a condição que impede a recursão de continuar para sempre. É a versão "menor" do problema que já sabemos resolver sem precisar chamar a função novamente. No exemplo acima, quando `n` é 1, o fatorial é 1. Sem isso, a função chamaria a si mesma infinitamente.

**Chamada Recursiva**

É a linha de código onde a função invoca a si mesma. Ela deve passar um argumento que leve inevitavelmente ao caso base. No exemplo, passamos `n - 1`, garantindo que o número diminua a cada chamada.

**O que acontece na pilha (Resumo)**

Embora você ainda não tenha estudado a estrutura de dados "pilha", imagine que a execução funciona como uma pilha de pratos. Quando a função é chamada, um novo "prato" é colocado na pilha. O computador executa o código desse novo prato. Quando ele termina, o prato é removido e a execução volta para o prato anterior. Isso permite que o cálculo do fatorial de 5 espere o resultado do fatorial de 4, que espera o de 3, e assim por diante.
{'input_tokens': 308, 'output_tokens': 2011, 'total_tokens': 2319, 'input_token_details': {'cache_read': 3}, 'output_token_details': {'reasoning': 1407}}