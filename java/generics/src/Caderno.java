public class Caderno {
    private String nome;
    private String tamanho;

    public Caderno(String nome, String tamanho){
        this.nome = nome;
        this.tamanho = tamanho;
    }

    public String getTamanho() {
        return tamanho;
    }

    public String getNome() {
        return nome;
    }

    @Override
    public String toString() {
        return "Caderno{" +
                "nome='" + nome + '\'' +
                ", tamanho='" + tamanho + '\'' +
                '}';
    }
}
