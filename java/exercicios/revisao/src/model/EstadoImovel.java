package model;

public enum EstadoImovel{
    NOVO("novo"),
    USADO("usado");
    private final String message;
    EstadoImovel(String message){
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
