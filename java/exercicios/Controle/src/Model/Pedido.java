package Model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

public class Pedido {
    private final Date moment;
    private final StatusPedido statusPedido;
    private final List<ItemPedido> itensPedido = new ArrayList<>();
    private final Cliente cliente;

    public Pedido(Date moment, StatusPedido statusPedido, Cliente cliente){
        this.moment = Objects.requireNonNull(moment);
        this.statusPedido = Objects.requireNonNull(statusPedido);
        this.cliente = cliente;
    }
    public Date getMoment() {
        return moment;
    }

    public StatusPedido getStatusPedido() {
        return statusPedido;
    }
    public void addPedido(ItemPedido itemPedido){
        itensPedido.add(itemPedido);
    }

    public List<ItemPedido> getItensPedido() {
        return List.copyOf(itensPedido);
    }
}
