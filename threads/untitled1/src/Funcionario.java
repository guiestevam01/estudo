import java.util.Arrays;

public class Funcionario {
    private int id;
    private String nome;
    private double salario;

    public Funcionario(String nome, double salario, int id) {
        this.nome = nome;
        this.salario = salario;
        this.id = id;
    }

    public double getSalario() {
        return salario;
    }

    public String getNome() {
        return nome;
    }

    public int getId() {
        return id;
    }

    public static boolean aumentarSalario(
            Funcionario[] funcionarios,
            int id,
            double aumento
    ) {
        return Arrays.stream(funcionarios)
                .filter(funcionario -> funcionario.getId() == id)
                .findFirst()
                .map(funcionario -> {
                    funcionario.salario = funcionario.salario + (funcionario.salario*(aumento/100));
                    return true;
                })
                .orElse(false);
    }

    @Override
    public String toString() {
        return id + ", " + nome + ", " + salario;
    }

    static boolean mudarNome(Funcionario[] funcionarios, String nome, String novoNome){
        Funcionario encontrado = Arrays.stream(funcionarios)
                .filter(funcionario -> funcionario.getNome().equalsIgnoreCase(nome))
                .findFirst()
                .orElse(null);
        if(encontrado == null){
            return false;
        }
        encontrado.nome = novoNome;
        return true;
    }


}