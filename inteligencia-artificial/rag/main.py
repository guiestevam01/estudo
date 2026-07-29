from dotenv import load_dotenv
import os

load_dotenv()
hf_token = os.getenv("HUGGINGFACEHUB_API_TOKEN")

if not hf_token:
    raise RuntimeError("Defina HUGGINGFACEHUB_API_TOKEN no arquivo .env local.")
