Suponha que uma operação precise chamar três serviços diferentes. Se as chamadas forem síncronas, cada uma terá sua própria latência, resposta e possibilidade de falha. Se forem sequenciais, o tempo total será a soma aproximada das latências.

Caso uma chamada falhe depois que as anteriores foram concluídas, o sistema precisará decidir entre repetir apenas a operação que falhou, executar operações compensatórias ou manter o progresso parcial para continuar posteriormente.

Se muitas instâncias do produtor fizerem essas chamadas simultaneamente, os serviços consumidores podem ficar sobrecarregados. Retentativas simultâneas também podem aumentar a carga e provocar falhas em cascata.

Message brokers como RabbitMQ podem receber e armazenar mensagens representando trabalhos pendentes. Um número controlado de workers consome essas mensagens conforme sua capacidade, permitindo desacoplamento, controle de concorrência, retries e dead-letter queues.

A fila não armazena necessariamente as requisições HTTP originais. Ela armazena mensagens que representam comandos, tarefas ou eventos. O estado da operação normalmente permanece no banco de dados. Kafka também pode distribuir mensagens, mas funciona principalmente como um log de eventos distribuído, não exatamente como uma fila tradicional.
