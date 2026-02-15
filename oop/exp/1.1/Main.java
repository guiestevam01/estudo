class IntSquare{
    private int squareValue;
    public int getSquare(int value){
        return this.squareValue = calculo(value);
    }
    private int calculo(int value){
        return value * value;
    }
}

public class Main{
    public static void main(String[] args){
        IntSquare mySquare = new IntSquare();
        System.out.println(mySquare.getSquare(6));
    }
}
