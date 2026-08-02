public class Camisa {
    private String nome;
    private String tamanho;

    public Camisa(String nome, String tamanho){
        this.nome = nome;
        this.tamanho = tamanho;
    }
    public String getNome() {
        return nome;
    }

    public String getTamanho() {
        return tamanho;
    }

    @Override
    public String toString() {
        return "Camisa{" +
                "nome='" + nome + '\'' +
                ", tamanho='" + tamanho + '\'' +
                '}';
    }
}
