package results;

import java.math.BigDecimal;

public class ResultadoSimulacao {

    private final BigDecimal valorFinanciado;
    private final BigDecimal valorParcela;
    private final int quantidadeParcelas;
    public ResultadoSimulacao(BigDecimal valorParcela, BigDecimal valorFinanciado, int quantidadeParcelas){
        if(valorFinanciado.compareTo(BigDecimal.ZERO) < 0){
            throw new IllegalArgumentException("Renda bruta não deve ser inferior a zero");
        }
        this.valorFinanciado = valorFinanciado;
        if(valorParcela.compareTo(BigDecimal.ZERO) < 0){
            throw new IllegalArgumentException("Renda bruta não deve ser inferior a zero");
        }
        this.valorParcela = valorParcela;
        if (quantidadeParcelas < 0){
            throw new IllegalArgumentException("Valor da parcela não deve ser inferior a zero");
        }
        this.quantidadeParcelas = quantidadeParcelas;
    }

    public BigDecimal getValorParcela() {
        return valorParcela;
    }

    public int getQuantidadeParcelas() {
        return quantidadeParcelas;
    }

    public BigDecimal getValorFinanciado() {
        return valorFinanciado;
    }
}
