# Setup do xv6 no Ubuntu

Guia de referência para **Ubuntu 26.04 LTS**. Os comandos são instruções reproduzíveis; ainda é necessário executá-los e registrar o resultado na sua própria máquina.

## 1. Pré-requisitos

Abra o terminal com um **usuário comum** que tenha permissão para usar `sudo`. Não compile o projeto como `root`.

~~~bash
whoami
cat /etc/os-release
sudo apt update
sudo apt install -y \
  git build-essential make bc perl \
  qemu-system-misc \
  gcc-riscv64-linux-gnu binutils-riscv64-linux-gnu \
  gdb-multiarch
~~~

O cross-compiler gera código RISC-V, enquanto o computador hospedeiro pode ser x86-64. O QEMU emula a máquina RISC-V.

## 2. Conferir as ferramentas

~~~bash
command -v qemu-system-riscv64
command -v riscv64-linux-gnu-gcc
command -v riscv64-linux-gnu-objdump
command -v gdb-multiarch

qemu-system-riscv64 --version
riscv64-linux-gnu-gcc --version
gdb-multiarch --version
~~~

O comando `qemu-system-riscv64` normalmente é fornecido pelo pacote `qemu-system-misc` no Ubuntu.

## 3. Separar fonte e documentação

Este repositório, `guiestevam01/estudo`, guarda as **anotações**. Clone o **código-fonte original** do xv6 fora dele, evitando misturar builds e soluções de labs com a documentação pública:

~~~bash
mkdir -p ~/estudos
cd ~/estudos
git clone https://github.com/mit-pdos/xv6-riscv.git
cd xv6-riscv

git status
git log -1 --oneline
~~~

Se o projeto já existir em outro caminho (por exemplo `~/estudos/mit-6s081`), entre no checkout existente em vez de cloná-lo novamente. Confirme que ali existe o `Makefile` do xv6.

**Nota:** a edição do livro usada nesta trilha é de 2022. O checkout atual pode diferir das linhas do PDF. Registre a versão usada com `git rev-parse HEAD` e compare com o material de 2022 antes de seguir referências de linha.

## 4. Compilar e executar

Na pasta que contém o `Makefile` do xv6:

~~~bash
make qemu
~~~

O Makefile compila o kernel, cria a imagem de sistema de arquivos e inicia o QEMU. Após o boot, deve aparecer algo como:

~~~text
xv6 kernel is booting

init: starting sh
$
~~~

No prompt `$` você está dentro do **xv6**, não do Ubuntu. Experimente comandos simples como `ls` ou `echo ola`. Para sair do QEMU em modo texto, pressione **Ctrl+A** e, depois, **X**.

Para limpar artefatos de compilação, quando necessário:

~~~bash
make clean
~~~

## 5. Problemas comuns

| Sintoma | Verificação |
| --- | --- |
| `qemu-system-riscv64: command not found` | Confira se `qemu-system-misc` está instalado e execute `command -v qemu-system-riscv64` |
| GCC/binutils RISC-V não encontrados | Confira `riscv64-linux-gnu-gcc` e `riscv64-linux-gnu-objdump` no `PATH` |
| `Permission denied` em arquivos de build | Confirme a propriedade da pasta; evite executar `make` com `sudo` |
| O comando `make qemu` não funciona | Confirme `pwd`, `ls Makefile` e a versão do checkout |
| Incompatibilidade entre livro e código | Compare a revisão do código com a edição do livro (2022) |

## 6. Registro do ambiente (preencher após testar)

- Data do teste:
- Versão do Ubuntu:
- Versão do QEMU:
- Versão do GCC RISC-V:
- Commit do xv6 (`git rev-parse HEAD`):
- Resultado do `make qemu`:
- Problemas encontrados:

## Fontes

- [MIT 6.1810 (2022) — Tools](https://pdos.csail.mit.edu/6.1810/2022/tools.html)
- [Repositório oficial do xv6](https://github.com/mit-pdos/xv6-riscv)
