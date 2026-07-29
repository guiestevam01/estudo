package Model;

import Application.Precificacao;

public class Produto {
    private final String nome;
    private final double preco;
    public Produto(String nome, Precificacao preco){
        this.nome = nome;
        this.preco = preco.calcularPreco(this.preco);
    }

    public String getNome() {
        return nome;
    }

    public double getPreco() {
        return preco;
    }
}
