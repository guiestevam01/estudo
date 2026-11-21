# xv6 — laboratório de Sistemas Operacionais

Anotações de estudo do **xv6**, sistema operacional educacional semelhante ao Unix, desenvolvido no MIT. O objetivo é entender a implementação de processos, memória virtual, interrupções, chamadas de sistema, sincronização, escalonamento e sistema de arquivos a partir de código **C e Assembly RISC-V**.

> Este é um caderno de estudos, não uma cópia do código-fonte do xv6 nem um repositório de soluções de laboratórios.

## Ambiente

- Sistema hospedeiro: Ubuntu 26.04 LTS.
- IDE: CLion (edição e navegação de C/Assembly).
- Arquitetura do xv6: RISC-V 64 bits (RV64).
- Compilação: Makefile original + cross-compiler RISC-V.
- Emulação: QEMU.
- Depuração: GDB multiarch e servidor GDB do QEMU.

O código do xv6 deve ficar em **um checkout separado** deste repositório de anotações. Os caminhos nos guias são exemplos: adapte-os ao diretório do seu checkout.

## Comece aqui

1. [Preparar Ubuntu e executar o xv6](setup/ubuntu.md).
2. [Abrir o código no CLion e compilar](setup/clion.md).
3. [Depurar o kernel com QEMU + GDB](setup/gdb-qemu.md).

## Roteiro de leitura

Páginas abaixo correspondem à numeração impressa da edição de **5 de setembro de 2022** do livro.

| Capítulo | Páginas | O que investigar |
| --- | --- | --- |
| 1. Operating system interfaces | 9–19 | `fork`, `wait`, `exec`, descritores de arquivos e pipes |
| 2. Operating system organization | 21–29 | `kernel/entry.S`, `start.c`, `main.c` e o primeiro processo |
| 3. Page tables | 31–42 | `kernel/vm.c`, `kalloc.c` e endereços virtuais |
| 4. Traps and system calls | 43–51 | `trap.c`, `syscall.c`, `trampoline.S` |
| 5. Interrupts and device drivers | 53–57 | `console.c`, `uart.c` e interrupções |
| 6. Locking | 59–69 | `spinlock.c`, races, atomicidade e deadlocks |
| 7. Scheduling | 71–84 | `proc.c`, `swtch.S` e troca de contexto |
| 8. File system | 85–100 | `fs.c`, `bio.c`, `log.c` |
| 9. Concurrency revisited | 103–106 | padrões de sincronização e paralelismo |

**Observação de versões:** este roteiro se baseia na edição de 2022. O repositório oficial do xv6 recebe mudanças; nomes de arquivos, trechos e linhas podem diferir. Para uma correspondência exata, utilize o código da edição/curso correspondente e registre a branch/commit estudados.

## Como registrar uma investigação

Para cada seção, documentar:

- **Pergunta:** qual comportamento quero compreender?
- **Fonte:** capítulo, seção e arquivos/funções do kernel.
- **Hipótese:** o que espero que aconteça e por quê?
- **Procedimento:** comandos de execução e depuração reproduzíveis.
- **Observação:** saída, registradores e evidências efetivamente obtidas.
- **Conclusão:** o que foi confirmado, refutado ou ainda está em aberto.

Não marcar uma atividade como concluída sem executá-la.

## Publicação responsável

Os arquivos públicos contêm apenas configuração de ambiente, explicações conceituais, diagramas e relatos autorais de investigação. **Não publicar implementações, patches, diffs ou respostas de exercícios dos laboratórios oficiais do MIT.** Manter o trabalho dos labs em repositório privado.

## Referências

- [Livro xv6, edição RISC-V de 2022 (PDF oficial)](https://pdos.csail.mit.edu/6.S081/2022/xv6/book-riscv-rev3.pdf)
- [Código-fonte oficial do xv6](https://github.com/mit-pdos/xv6-riscv)
- [MIT 6.1810 — curso de 2022](https://pdos.csail.mit.edu/6.1810/2022/)
- [Orientações sobre ferramentas do MIT](https://pdos.csail.mit.edu/6.1810/2022/tools.html)
- [Política de colaboração do MIT](https://ocw.mit.edu/courses/6-1810-operating-system-engineering-fall-2023/pages/syllabus/)
