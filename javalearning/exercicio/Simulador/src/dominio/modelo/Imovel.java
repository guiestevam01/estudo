package dominio.modelo;

import java.math.BigDecimal;

public class Imovel {
    private final String cidade;
    private final BigDecimal valor;
    private final EstadoImovel estado;
    public Imovel(String cidade, BigDecimal valor, EstadoImovel estado){
        if(valor.compareTo(BigDecimal.ZERO) < 0){
            throw new IllegalArgumentException("Valor não deve ser menor que zero");
        }
        this.valor = valor;
        this.estado = estado;
        if(cidade == null || cidade.isEmpty()){
            throw new IllegalArgumentException("Campo não deve ser nulo ou vazio");
        }
        this.cidade = cidade;
    }

}
