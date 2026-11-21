# Depuração do xv6 com GDB e QEMU

O QEMU oferece um **servidor GDB** que permite interromper o kernel RISC-V, examinar instruções, registradores e memória. O GDB multiarch executa no Ubuntu e se conecta a esse servidor.

**Pré-requisito:** [ambiente Ubuntu](ubuntu.md) configurado e `make qemu` funcionando.

## 1. Descobrir a porta GDB

Na raiz do checkout do xv6:

~~~bash
make print-gdbport
~~~

O Makefile calcula uma porta com base no UID do usuário. Para UID 1000, normalmente é **26000**, mas **use sempre o valor mostrado pelo comando**.

## 2. Iniciar o QEMU pausado

No **terminal 1**, na raiz do xv6:

~~~bash
make qemu-gdb
~~~

O QEMU iniciará o sistema emulado pausado, aguardando conexão do depurador.

No **terminal 2**, no mesmo diretório:

~~~bash
gdb-multiarch -q kernel/kernel
~~~

O xv6 pode gerar um arquivo `.gdbinit` que configura a conexão automaticamente. Se o GDB recusar o carregamento desse arquivo, siga a orientação de segurança **add-auto-load-safe-path** impressa por ele, somente para esse diretório confiável. Alternativamente, conecte manualmente com a porta mostrada anteriormente:

~~~gdb
set architecture riscv:rv64
target remote 127.0.0.1:26000
~~~

**Substitua 26000 pela sua porta real.** Não execute `target remote` uma segunda vez se o `.gdbinit` já conectou o depurador.

## 3. Primeiro breakpoint

Na sessão GDB conectada:

~~~gdb
break main
continue
info registers
x/8i $pc
bt
~~~

- `break main`: para na função inicial C do kernel.
- `continue`: executa até o breakpoint.
- `info registers`: mostra os registradores RISC-V.
- `x/8i $pc`: mostra oito instruções a partir do contador de programa.
- `bt`: mostra a pilha de chamadas disponível.

Para executar **uma instrução de máquina**, use `si`. Para prosseguir uma linha de código-fonte, use `next`, quando houver símbolos suficientes. As primeiras instruções de boot estão em `kernel/entry.S`; algumas rotinas iniciais podem exigir breakpoints de Assembly.

## 4. Usar a interface do CLion

Com o `make qemu-gdb` ainda em execução:

1. No CLion, abra **Run → Edit Configurations → + → Remote Debug**.
2. Escolha o debugger **Custom GDB** com `/usr/bin/gdb-multiarch` (ou o GDB multiarch integrado, se compatível).
3. Configure **target remote args** como `127.0.0.1:PORTA`, substituindo pela porta do `make print-gdbport`.
4. Em **Symbol file**, selecione o arquivo absoluto `.../xv6-riscv/kernel/kernel` do seu checkout, **não** um programa do Ubuntu.
5. Abra `kernel/main.c`, coloque um breakpoint em `main` e clique em **Debug**.

A configuração **Remote Debug** do CLion fala com o servidor GDB do QEMU; não precisa de um segundo processo `gdb-multiarch` conectado ao mesmo servidor. Use **ou** o terminal GDB **ou** o CLion como cliente da sessão.

## 5. Diagnóstico de erros

| Sintoma | O que conferir |
| --- | --- |
| `Connection refused` | `make qemu-gdb` está rodando? A porta é a mesma de `make print-gdbport`? |
| Breakpoint não é atingido | O kernel está pausado? Os símbolos apontam para o `kernel/kernel` compilado do mesmo checkout? |
| Arquivo-fonte não é localizado | Confira os caminhos do projeto e o mapeamento de fontes no CLion |
| Aviso sobre `.gdbinit` | Configure um caminho confiável específico, sem desativar indiscriminadamente a proteção do GDB |
| O QEMU parece congelado | No modo GDB ele inicia **intencionalmente pausado**; execute `continue` no debugger |

## 6. Modelo de registro de experimento

Preencher somente com resultados observados:

- Data / commit do xv6:
- Função e arquivo investigados:
- Breakpoint usado:
- Instrução atual (`$pc`):
- Registradores relevantes:
- Hipótese inicial:
- Observação:
- Conclusão e dúvidas:

## Fontes

- [MIT — debugging guidance](https://pdos.csail.mit.edu/6.1810/2025/labs/guidance.html)
- [JetBrains — CLion Remote Debug](https://www.jetbrains.com/help/clion/remote-debug.html)
- [Código-fonte oficial do xv6](https://github.com/mit-pdos/xv6-riscv)
