enum StatusPedido {
    PAGAMENTO_PENDENTE("Pagamento pendente"),
    PROCESSANDO("Processando"),
    ENVIADO("Enviado"),
    ENTREGUE("Entregue");
    private String descricao;
    StatusPedido(String descricao){
        this.descricao = descricao;
    }
    public String getDescricao(){
        return descricao;
    }
}

public class Main{
    public static void main(String[] args){
        StatusPedido status = StatusPedido.PROCESSANDO;
        System.out.println(status.PROCESSANDO.getDescricao());
    }
}
