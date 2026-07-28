class Pessoa{
    private String name;
    private int age;
    public Pessoa(String name, int age){
        this.name = name;
        this.age = age;
    }
    public String getName() {
        return name;
    }
}
class Aluno extends Pessoa{
    private String curso;
    public Aluno(String name, int age, String curso){
        super(name,age);
        this.curso = curso;

    }
    public String getCurso() {
        return curso;
    }
    public void aprovado(){
        System.out.println("sim");
    }
}

public class ola{
    public static void main(String[] args) {
        Aluno aluno = new Aluno("Guilherme", 12, "Ciencias da computacao");
        Pessoa pessoa = (Pessoa) aluno;
    }
}