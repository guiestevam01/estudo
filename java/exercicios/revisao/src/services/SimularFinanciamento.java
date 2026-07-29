package services;

import model.Cliente;
import model.Imovel;
import results.ResultadoSimulacao;

public class SimularFinanciamento {
    CalculoFinanciamento calculadora;
    //defino o método de calculo durante a instanciacao
    public SimularFinanciamento(CalculoFinanciamento calculadora){
        this.calculadora = calculadora;
    }
    public ResultadoSimulacao simular(Cliente cliente, Imovel imovel){
        return calculadora.calcular(cliente, imovel);
    }
}
