package dominio.modelo;

import java.math.BigDecimal;

public class Cliente {
    private final String nome;
    private final BigDecimal rendaBruta;
    private final int idade;
    public Cliente(String nome, BigDecimal rendaBruta, int idade){
        if(nome == null || nome.isEmpty()){
            throw new IllegalArgumentException("Nome não deve ser nulo ou vazio");
        }
        this.nome = nome;
        if(rendaBruta.compareTo(BigDecimal.ZERO) < 0){
            throw new IllegalArgumentException("renda não pode ser menor que 0");
        }
        this.rendaBruta = rendaBruta;
        if(idade < 0){
            throw new IllegalArgumentException("idade não pode ser menor que zero");
        }
        this.idade = idade;
    }

    public BigDecimal getRendaBruta() {
        return rendaBruta;
    }

    public int getIdade() {
        return idade;
    }

    public String getNome() {
        return nome;
    }
}
