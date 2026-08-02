PYTHON := .venv/bin/python

.PHONY: help setup run experiment test check

help:
	@echo "Comandos disponíveis:"
	@echo "  make setup       cria o ambiente e instala as dependências"
	@echo "  make run         executa o exemplo padrão"
	@echo "  make experiment  executa o exemplo didático com tokens repetidos"
	@echo "  make test        executa os testes automatizados"
	@echo "  make check       valida sintaxe e executa todos os testes"

setup:
	python3 -m venv .venv
	$(PYTHON) -m pip install --upgrade pip
	$(PYTHON) -m pip install -r requirements.txt

run: check-env
	$(PYTHON) input_embedding_o_gato_dorme.py

experiment: check-env
	$(PYTHON) input_embedding_o_gato_dorme.py \
		--texto "gato gato gato" \
		--d-model 4 \
		--mostrar 4 \
		--device cpu \
		--seed 42

test: check-env
	$(PYTHON) -m unittest -v

check: check-env
	$(PYTHON) -m py_compile \
		input_embedding_o_gato_dorme.py \
		test_input_embedding.py
	$(PYTHON) -m unittest -v

.PHONY: check-env
check-env:
	@test -x "$(PYTHON)" || { \
		echo "Ambiente não encontrado. Execute: make setup"; \
		exit 1; \
	}
