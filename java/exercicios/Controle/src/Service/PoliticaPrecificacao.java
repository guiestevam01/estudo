package Service;

import Model.Cliente;
import Model.Pedido;
import Model.Produto;

public interface PoliticaPrecificacao {
    double calcularPreco(Produto produto, int quantidade, Cliente cliente);
}
