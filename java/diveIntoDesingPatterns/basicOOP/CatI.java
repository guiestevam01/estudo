package diveIntoDesingPatterns.basicOOP;

public class CatI { // name
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
        System.out.print("=^.^=  inhale...  ~~~~~");
        System.out.println("=^.^= exhale... .....");
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
    public void meow(){
        System.out.println("meewwwoo");
    }

    public static void main(String[] args) {
        /*
            Digamos que você tenha um gato chamado Oscar. Oscar é um obj
            eto, uma instância da classe Cat. Cada gato tem vários atributos pa
            drão: nome, sexo, idade, peso, cor, comida favorita, etc. Esses são
            os fields(campos) da classe.
        */

        CatI oscar; //declaration of a reference variable
                  /*
                    At this point, oscar does NOT refer to any object in memory so we cannot assign values to its fields.
                    The object is only created when we call the constructor with "new".
                    oscar = new Cat(); // now an object is created in memory and assigned to oscar
                   */
        oscar = new CatI();
        oscar.name = "Oscar";
        oscar.sex = "male";
        oscar.age = 3;
        oscar.weight = 7;
        oscar.color = "brown";
        oscar.texture = "striped";

        CatI luna = new CatI();
        oscar.name = "Luna";
        oscar.sex = "female";
        oscar.age = 2;
        oscar.weight = 5;
        oscar.color = "gray";
        oscar.texture = "plain";
    }
    /*
    * Podemos observar que cachorros podem ter as mesmas caracteristicas que um gato
    * Portanto podemos definir uma classe base Animal com atributos e comportamento comuns
    * Esse é uma generalizacao, isso se chama superclasse, e a especializacao e as subclasses que herdam da classe*/
}
