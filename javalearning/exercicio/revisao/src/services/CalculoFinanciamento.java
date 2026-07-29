package services;

import model.Cliente;
import model.Imovel;
import results.ResultadoSimulacao;

public interface CalculoFinanciamento {
    public ResultadoSimulacao calcular(Cliente cliente, Imovel imovel);
}
