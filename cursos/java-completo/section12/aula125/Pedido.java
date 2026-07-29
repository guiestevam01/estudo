public class Pedido{
    private final Status status;
    private final String nome;
    public Pedido(Status status, String nome){
        this.status = Objects.requireNOnNull(status, "Status nao deve ser nulo");
        if(nome == null || nome.isEmpty()){
            throw new IllegalArgumentException("Nme não deve ser nulo ou em branco ");
        }
        this.nome = nome;
    }
    public String getNome(){
        return nome;
    }

    public Status getStatus(){
        return status;
    }
}
