package dominio.calculo;

import dominio.modelo.Cliente;
import dominio.modelo.Imovel;

public interface CalculoFInanciamento {
    public ResultadoSimulacao calcular(Cliente cliente, Imovel imovel);
}
