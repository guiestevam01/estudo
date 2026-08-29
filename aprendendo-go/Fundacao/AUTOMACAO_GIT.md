# Commits automáticos

O timer `fundacao-auto-commit.timer` executa a cada 15 minutos. Ele adiciona,
commita e envia somente o diretório `aprendendo-go/Fundacao`; modificações em
outros cursos no mesmo repositório não entram no commit.

Para instalar ou atualizar o timer neste computador, execute:

```bash
./scripts/install-auto-commit-timer.sh
```

Para conferir as próximas execuções e os logs:

```bash
systemctl --user list-timers fundacao-auto-commit.timer --all
tail -f .auto-commit.log
```

Para desativar a automação:

```bash
systemctl --user disable --now fundacao-auto-commit.timer
```

O envio usa o remoto Git já configurado (`origin`) e a branch atual. Se o
remoto rejeitar um envio, o script não cria outro commit até que a pendência
seja resolvida, evitando misturar históricos automaticamente.
