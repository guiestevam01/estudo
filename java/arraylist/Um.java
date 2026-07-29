package arralist;

import java.util.ArrayList;
import java.util.List;
class Pessoa{
    private String name;
    private List<String> telefones;
    public Pessoa(String name){
        this.name = name;
        telefones = new ArrayList<>();
    }
    public List<String> getTelefones(){
        return telefones;
    }
    public void addTelefone(String numero){
        telefones.add(numero);
    }
    @Override
    public String toString() {
        return "Pessoa [name=" + name + ", telefones=" + telefones + "]";
    }
    public void setTelefone(){
        
    }
    
}

public class Um {
    public static void main(String[] args) {
        ArrayList<Pessoa> pessoas = new ArrayList<>();
        pessoas.add(new Pessoa("Joáo"));
        Pessoa joao = pessoas.get(0);
        joao.addTelefone("+554499917223");
        joao.addTelefone("+554988128383");
        System.out.println(joao.getTelefones().get(0));
    }
    
}

