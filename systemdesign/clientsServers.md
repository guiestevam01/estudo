Em sistemas atuais existe quase que sempre a tree tier architecture. Ela dividi nossa aplicacao em 3 camadas. Essas camadas acontecem em niveis
de abstracao em relacao ao meu usuario final. Existe a camada de aplicacao que seria a camada mais proxima do usuario, o famoso front.
A segunda camada é a camada de logica, e a 3 camada e camada de persistencia ou seja, preciso armazenar dados que são persistidos ou nao, no geral,
temos sempre banco de dados para isso, Na camada de logica ocorre o back-end, onde por meios de api faz a operacao acontecer e ela se comuncia com as 2
camadas,

Nesse modelo as coisas podem ser sincronas ou assincrona
sincrona: Na comunicação síncrona, quem inicia uma operação precisa aguardar seu resultado antes de continuar aquela sequência de execução.

assincron: Na comunicação assíncrona, quem inicia uma operação não precisa bloquear toda a execução enquanto espera o resultado. O resultado pode ser tratado posteriormente por meio de:

eventos;
callbacks;
promises;
filas de mensagens;
notificações;
event loops.
