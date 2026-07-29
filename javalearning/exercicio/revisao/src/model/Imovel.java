package model;

import java.math.BigDecimal;

public class Imovel {
    private final String cidade;
    private final BigDecimal valor;
    private final EstadoImovel estado;
    public Imovel(String cidade, BigDecimal valor, EstadoImovel estado){
        if(cidade == null || cidade.isEmpty()){
            throw new IllegalArgumentException("Nome não deve ser nulo ou vazio");
        }
        this.cidade = cidade;
        if(valor.compareTo(BigDecimal.ZERO) < 0){
            throw new IllegalArgumentException("Renda bruta não deve ser inferior a zero");
        }
        this.valor = valor;
        this.estado = estado;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public EstadoImovel getEstado() {
        return estado;
    }

    public String getCidade() {
        return cidade;
    }
}
