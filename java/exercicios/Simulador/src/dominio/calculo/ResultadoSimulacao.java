package dominio.calculo;

import java.math.BigDecimal;

public class ResultadoSimulacao {
    private final BigDecimal valorFinanciado;
    private final BigDecimal valorParcela;
    private final int quantidadeParcelas;
    public ResultadoSimulacao(BigDecimal valorFinanciado, BigDecimal valorParcela, int quantidadeParcelas){
        //refatorar depois
        if(valorFinanciado.compareTo(BigDecimal.ZERO) < 0){
            throw new IllegalArgumentException("Campo não deve ser menor que zero");
        }
        this.valorFinanciado = valorFinanciado;
        if(valorFinanciado.compareTo(BigDecimal.ZERO) < 0){
            throw new IllegalArgumentException("Campo não deve ser menor que zero");
        }
        this.valorParcela = valorParcela;
        if(quantidadeParcelas < 0){
            throw new IllegalArgumentException("Campo não deve ser menor que zero");
        }
        this.quantidadeParcelas = quantidadeParcelas;
    }

    public BigDecimal getValorFinanciado() {
        return valorFinanciado;
    }

    public int getQuantidadeParcelas() {
        return quantidadeParcelas;
    }

    public BigDecimal getValorParcela() {
        return valorParcela;
    }
}
