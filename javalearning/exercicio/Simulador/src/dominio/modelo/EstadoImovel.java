package dominio.modelo;

public enum EstadoImovel {
    NOVO("Novo"),
    USADO("Usado");
    private final String message;
    EstadoImovel(String message){
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
