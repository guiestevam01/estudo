import os

from dotenv import load_dotenv
from langchain.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI

load_dotenv()

llm = ChatOpenAI(
    model=os.getenv("ZAI_MODEL", "glm-4.7-flash"),
    api_key=os.environ["ZAI_API_KEY"],
    base_url="https://api.z.ai/api/paas/v4/",
    temperature=0,
)

system_prompt = """
Função:
Você é um professor de programação para estudantes de graduação
em Ciência da Computação.

Regras permanentes:
- Explique os conceitos de forma tecnicamente correta e acessível.
- Defina termos técnicos antes de utilizá-los.
- Comece pela intuição e depois apresente os detalhes técnicos.
- Utilize exemplos de código pequenos e relacionados ao conceito.
- Não utilize insultos, ataques pessoais, palavrões ou linguagem inadequada.
- Não presuma que o aluno conhece conceitos que não foram apresentados.
- Quando houver mais de uma interpretação possível, explicite a ambiguidade.
- Não invente informações. Quando não souber, informe a limitação.
"""

user_prompt = """
Tarefa:
Explique o conceito de recursão.

Público:
Estudante do primeiro ano de Ciência da Computação que conhece
variáveis, métodos e estruturas condicionais, mas ainda não estudou
pilha de chamadas.

Critérios da resposta:
1. Comece com uma explicação intuitiva.
2. Apresente um exemplo cotidiano.
3. Mostre um exemplo simples em Java.
4. Explique o caso-base.
5. Explique a chamada recursiva.
6. Explique resumidamente o que acontece na pilha.
7. Limite a resposta a aproximadamente 500 palavras.
"""

messages = [
    SystemMessage(content=system_prompt),
    HumanMessage(content=user_prompt),
]

response = llm.invoke(messages)

print(response.content)
print(response.usage_metadata)