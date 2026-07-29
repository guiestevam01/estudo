## 1. Estrutura da memória da jvm
Toda aplicacão java é rodada por um jvm por baixo dos panos.
Um programa simples pode ocupar de fato 12mb porque a jvm precisa ocupar isso em certo nível.
Existe em mais baixo nivel a memória do sistema operacional.
Quando se roda uma aplicacao em java a jvm necessita de memória para rodar tudo que precisa.
A jvm divide a memória do processo em 2 categorias principais:
    - Memória heap: Fica armazenado todos objetos
    - Memória não heap: tem varias partes: Method Area, Java Stack, porgram counter, native method tacks

java -XX:NativeMemoryTracking=summary ClassName
jcmd PID
jcmd PID VM.native_memory summary
commited é uma regiao de memoria que a jvm reserva para a aplicacao

No geral a jvm pede para o sistema operacional criar threads  no geral cada thread Java corresponde exatamente a uma thread nativa do sistema operacional

