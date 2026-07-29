package Model;

public class Resultado {
    private final Cliente cliente;
    private final ItemPedido itemPedido;
    public Resultado(Cliente cliente, ItemPedido itemPedido){
        this.cliente = cliente;
        this.itemPedido = itemPedido;
    }
    public Cliente getCliente() {
        return cliente;
    }

    public ItemPedido getItemPedido() {
        return itemPedido;
    }
}
