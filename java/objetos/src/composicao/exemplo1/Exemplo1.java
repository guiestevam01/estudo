package composicao.exemplo1;

public class Exemplo1 {
    static void main() {
        Processador processador = new Processador(
                "Intel",
                "Core",
                "i5-11300H",
                "4.4 GHz"
        );
        Computador computador = new Computador("Notebook", processador);
    }
}

class Computador{
    private String nome;
    private Processador processador;
    public Computador(String nome, Processador processador){
        this.nome = nome;
        this.processador = processador;
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
}
