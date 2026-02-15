class Cliente{
    Calculadora calculadora = new Calculadora();
    
}
class Calculadora{
    private int result;
    //inteface
    public int mostrarSoma(int valueA, int valueB){
        return result = soma(valueA, valueB);
    }
    //metodo.
    private int calculoSoma(int valueA, int valueB){
        return valueA + valueB + 9;
    }
}
