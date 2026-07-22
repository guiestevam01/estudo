package Entities;

public class Departament {
    private final String name;
    public Departament(String name){
        if(name == null || name.isEmpty()){
            throw new IllegalArgumentException("Nome não deve ser nulo ou vazio");
        }
        this.name = name;
    }
    public String getName() {
        return name;
    }
}
