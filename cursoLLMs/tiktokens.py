import tiktoken

 enc = tiktoken.encoding_for_model("gpt-3.5-turbo")
 n_tokens_tiktoken = len(enc.encode(frase))

 print(f"Número de tokens: " {n_tokens_tiktoken}")
