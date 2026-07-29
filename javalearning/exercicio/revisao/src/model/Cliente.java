package model;

import java.math.BigDecimal;

public class Cliente {
    private final String nome;
    private final BigDecimal rendaBruta;
    private final int idade;
    public Cliente(String nome, BigDecimal rendaBruta, int idade){
        //refatorar com método depois
        if(nome == null || nome.isEmpty()){
            throw new IllegalArgumentException("Nome não deve ser nulo ou vazio");
        }
        this.nome = nome;
        if(rendaBruta.compareTo(BigDecimal.ZERO) < 0){
            throw new IllegalArgumentException("Renda bruta não deve ser inferior a zero");
        }
        this.rendaBruta = rendaBruta;
        if(idade < 0){
            throw new IllegalArgumentException("Idade não deve ser inferior a zero");
        }
        this.idade = idade;
    }

    public String getNome() {
        return nome;
    }

    public int getIdade() {
        return idade;
    }

    public BigDecimal getRendaBruta() {
        return rendaBruta;
    }
}
