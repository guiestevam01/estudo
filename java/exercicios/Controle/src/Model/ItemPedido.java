package Model;

import Service.PoliticaPrecificacao;

public class ItemPedido {
    private final int quantity;
    private final double preco;
    private final Produto produto;
    public ItemPedido(int quantity, PoliticaPrecificacao preco, Produto produto){
        this.quantity = quantity;
        this.preco = preco;
        this.produto = produto;
    }
    public double subTotal(){
        return quantity * preco;
    }

    public double getPrice() {
        return preco;
    }

    public int getQuantity() {
        return quantity;
    }

    public Produto getProduto() {
        return produto;
    }
}
