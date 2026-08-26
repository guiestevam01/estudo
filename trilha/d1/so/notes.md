O livro comeca dizendo que processos é uma das abstracoes mais fundamentais em Sistema operacional.
Definicao informal: Porcesso é um programa em execucao.
Melhor dizendo, um programa ele nada mais é que um conjunto de instrucoes, esse conjunto de instrucoes fica armazenado em algum disco que pode ser usado a qualquer momento.
Quem chama e permite essa instrucao rodar é o sistema operacional.
Ok mas como o sistema operacional controla diversos processos ao mesmo tempo e como isso o SO controla isso em relacao a CPU?
SO cria a ilusao que existe varias cpus virtuais quando na verdade só existe uma (ou algumas) cpu fisica. ESsa tecnica permite executar varios processos concorrentes.
A tecnica de time sharing permite um recurso seja utilizado por uma entidade e depois por outra, de forma organizada. 
Temos tambem o space sharing que permite dividir um recurso entre outras entidades./

Para entender a constituicao de um programa, podemos entender a partir da machine state: o que um programa lee e executa durante sua execucao? quais partes da maquina é 
importante para execucao deste programa?
Dois componentes principais, a memoria e os registradores.
Na memoria podemos pegar informacoes, escrever informacoes, enderecar informacoes em espacos de enderecos.
Nos registradores temos uns importantes: PC que nos diz aponta para a próxima instrucao, ponteiro de pilha, e frame-pointer.

A cpu só consegue executar uma coisa por vez em um determinado núcleo, então o time-sharing dividi o processo em varios instante de tempo
para cpu, isso cria a virtualicacao de  cpu.
Para guardar o contexto de cada processo ao interromper, so utiliza o context-switch.

