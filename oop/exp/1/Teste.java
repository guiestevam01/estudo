class Math{
    private int myInt1 = 10;
    private int myInt2 = 10;
  
    public int sum(){
        return this.myInt1 + this.myInt2;
     }
}
public class Teste{
    public static void main(String[] args){
        Math myMath = new Math();
        System.out.println(myMath.sum());

    }
}
