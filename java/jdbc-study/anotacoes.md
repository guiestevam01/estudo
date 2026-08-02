Basicamente temos tabela para representar o meu dominio.
A tabela é uma abstracao do meu dominio.
Tabelas no banco de dados possuem relacionamentos,
esses relacionamentos é feito por foreignt key
Tabelas com FK indica que ocorre uma relacao cardial com outra tabela. Uma FK geralmente aponta para um PK(Primary key ou chave primária) de uma outra tabela, indicando que existe ali um relacionamento. Chaves primárias sáo chaves para indicar o identificador único de cada tabela e toda table deve ter um PK
FK's também indicam a navegacao de dados onde um pode ver o outro ou não

- 1..1 um-para-um
- 1..* um-para-muitos
- *..1 muitos-para-um
'*'..'*' muitos-para-muitos

1 - configurar o driver, especificar para o driver como ele pode acessar do banco de dados.
2 - enviar instrucoes sql.
