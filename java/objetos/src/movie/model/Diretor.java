package movie.model;

public final class Diretor {
    private final String nome;

    public Diretor(String nome){
        this.nome = validarNome(nome);
    }
    public String getNome(){
        return nome;
    }
    private static String validarNome(String nome){
        if(nome == null || nome.isBlank()){
            throw new IllegalArgumentException("Nome não pode ser nulo ou vazio");
        }
        return nome;
    }

    @Override
    public String toString() {
        return "Nome do diretor: " + nome;
    }
}
