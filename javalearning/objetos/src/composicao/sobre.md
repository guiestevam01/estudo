# Sobre
Composição de objetos é uma forma de construir um objeto utilizando objetos de outras classes como seus membros de dados. Ela estabelece uma relação do tipo “tem um” (has-a).

No Exemplo1, o Computador recebe um Processador criado externamente. Portanto, o processador pode existir independentemente do computador. Em sentido amplo, o computador é composto utilizando um processador, embora na modelagem UML isso esteja mais próximo de uma associação.

No Exemplo2, o próprio Computador cria e controla seu Processador. Isso expressa uma composição mais forte, pois o ciclo de vida da parte está conceitualmente vinculado ao ciclo de vida do todo.

Quando não existir mais nenhuma referência alcançável para o Computador, seu Processador também poderá tornar-se inacessível e ambos ficarão elegíveis para coleta pelo Garbage Collector.