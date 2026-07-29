package enums;

public enum Status {
    PENDING_PAYMENT(1, "Pagamento Pendente"),
    PROCESSING(2, "Pagamento está sendo processado"),
    SHIPPED(3, "Enviado"),
    DELIVERED(4, "Entregue");

    private final String menssagem;
    private final int codigo;
    Status(int codigo, String menssagem){
        this.codigo = codigo;
        this.menssagem = menssagem;
    }

    public String getMenssagem() {
        return menssagem;
    }

    public int getCodigo(){
        return codigo;
    }
}
