package composicao.exemplo2;

public class Exemplo2 {
}

class Computador {

    private String nome;
    private final Processador processador;

    public Computador(String nome) {
        this.nome = nome;
        this.processador = new Processador();
    }
}
class Processador{
    private String nome;
    private String linha;
    private String modelo;
    private String frequencia;

    public Processador(String nome, String linha, String modelo, String frequencia) {
        this.nome = nome;
        this.linha = linha;
        this.modelo = modelo;
        this.frequencia = frequencia;
    }

    public Processador() {
    }
}