import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()

# llm representa o modelo configurado
llm = ChatOpenAI(
    model=os.getenv("ZAI_MODEL", "glm-4.7-flash"),
    api_key=os.environ["ZAI_API_KEY"],
    base_url="https://api.z.ai/api/paas/v4/",
)
#invoke envia mesagem ao modelo.
#response é um objeto AImessage com metadados adicionais
response = llm.invoke("Explique recursão em palavras simples.")
print(response.content)