const criarCategoria = (id, nome) => ({
    id,
    nome,

    verificarNome() {
        if (this.nome === undefined || this.nome.trim() === "") {
            throw new Error("Nome inválido");
        }
    }
});

const categoria = criarCategoria(1);

categoria.verificarNome();