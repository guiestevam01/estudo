# Setup do CLion para estudar xv6

Objetivo: navegar e editar o código em C e Assembly RISC-V no CLion, compilar pelo **Makefile original** e executar o kernel no **QEMU**.

> O xv6 não é um aplicativo Linux comum: não tente executar `kernel/main.c` nem `kernel/kernel` diretamente no Ubuntu.

## 1. Abrir o checkout correto

No CLion: **File → Open** e selecione a pasta que contém o `Makefile` do xv6 (por exemplo, `~/estudos/xv6-riscv`).

Não selecione o diretório `sistemas-operacionais/xv6` deste repositório de documentação: ele contém somente Markdown. Quando o CLion sugerir carregar o projeto **Makefile**, aceite.

Em **Settings → Plugins**, confira os plugins **Makefile** e **Makefile Language**.

## 2. Toolchain e Makefile

Em **Settings → Build, Execution, Deployment → Toolchains**, use uma toolchain local Linux para as ferramentas do IDE. O `Makefile` do xv6 já escolhe o cross-compiler RISC-V; não é necessário substituir as regras do Makefile por CMake nem forçar o GCC do host a compilar o kernel.

Em **Settings → Build, Execution, Deployment → Makefile**:

- Selecione a toolchain local.
- Para apenas compilar o kernel pela ação **Build Project**, use o alvo **`kernel/kernel`** (se disponível na versão do checkout).
- O comando `make qemu` também compila a imagem de arquivos e inicia o emulador; por ser interativo, é mais confiável executá-lo no terminal integrado.

A localização de opções pode variar conforme a versão do CLion. O carregamento de Makefiles ainda possui limitações documentadas pela JetBrains.

## 3. Compilar e executar no terminal da IDE

Abra **View → Tool Windows → Terminal** e execute a partir da raiz do código xv6:

~~~bash
make kernel/kernel fs.img
make qemu
~~~

No console do QEMU, o prompt `$` é o shell do xv6. Para voltar ao terminal hospedeiro, pressione **Ctrl+A**, depois **X**.

Você também pode criar uma configuração **Run → Edit Configurations → + → Makefile Target**, escolhendo o alvo `qemu`. Se o console da configuração não aceitar entrada interativa adequadamente, volte ao terminal integrado.

## 4. Arquivos interessantes para começar

| Objetivo | Arquivos |
| --- | --- |
| Inicialização da CPU e do kernel | `kernel/entry.S`, `kernel/start.c`, `kernel/main.c` |
| Processos e `fork` | `kernel/proc.c`, `user/sh.c` |
| Transição usuário/kernel | `kernel/trampoline.S`, `kernel/trap.c`, `kernel/syscall.c` |
| Locks e concorrência | `kernel/spinlock.c`, `kernel/kalloc.c` |
| Escalonamento | `kernel/proc.c`, `kernel/swtch.S` |

O Makefile também gera um disassembly com símbolos e código-fonte intercalados:

~~~bash
make kernel/kernel
less kernel/kernel.asm
~~~

Se o nome de algum arquivo divergir, confira a versão do xv6 utilizada.

## 5. Caso a indexação do CLion falhe

Primeiro tente **Tools → Makefile → Reload Makefile Project**. Se continuar com erros de indexação, uma alternativa opcional é gerar uma base de comandos de compilação:

~~~bash
sudo apt install -y bear
make clean
bear -- make kernel/kernel fs.img
~~~

Isso pode gerar `compile_commands.json`. Abra-o como projeto de **Compilation Database** no CLion. Nesse modo, continue usando `make` no terminal para compilar e executar o xv6. Não adicione a base gerada nem arquivos da IDE ao repositório público de anotações.

## 6. Próximo passo

Siga o guia de [depuração GDB + QEMU](gdb-qemu.md) para parar o kernel em um breakpoint e inspecionar registradores.

## Fontes

- [CLion — Makefile projects](https://www.jetbrains.com/help/clion/makefiles-support.html)
- [CLion — Remote Debug](https://www.jetbrains.com/help/clion/remote-debug.html)
- [Código-fonte do xv6](https://github.com/mit-pdos/xv6-riscv)
