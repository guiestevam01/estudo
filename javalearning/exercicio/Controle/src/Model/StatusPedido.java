package Model;

public enum StatusPedido {
    PAGAMENTO_PENDENTE(0),
    PROCESSANDO(1),
    DESPACHADO(2),
    ENTREGUE(3);
    private final int status;
    StatusPedido(int status){
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
