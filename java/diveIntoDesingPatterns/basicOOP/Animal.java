package diveIntoDesingPatterns.basicOOP;

public class Animal extends Organism {
    //field(state)
    public String name;
    public String gender;
    public int age;
    public double weight;
    public String color;
    public String favoriteFood;
    public String texture;
    public String sex;

    //methods(behavior)
    public void breathe(){
    }
    public void eat(String food){
        System.out.print(name + " eat " + food);
    }
    public void run(String destination){
        System.out.println("runs to " + destination);
    }
    public void sleep(double hours){
        System.out.println("sleeps for " + " hours!");
    }
}
