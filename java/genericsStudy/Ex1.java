/*
Uma declaração de classe genérica class C<T1,...,Tn> { ... } tem um ou mais
parâmetros de tipo T1,...,Tn. O corpo da declaração é um corpo de classe comum (seção
9.1) no qual os parâmetros de tipo Ti podem ser usados quase como se fossem tipos co-
muns; veja a seção 21.6. Uma classe genérica também é chamada de classe parametrizada
*/

class C<T1 extends Obj,T2>{
    T1 t1;
    T2 t2;
    public void print(){
        System.out.println(t2);
        System.out.println(t1.getName());
    }

}

class Obj{
    private String name;
    @Override
    public String toString() {
        return "name: " + name;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}

public class Ex1{
    public static void main(String[] args) {
        Obj objTest = new Obj();
        C<Obj, String> classeParametrizada = new C<>();
        objTest.setName("Paulo");
        String t2 = "t2";
        
        classeParametrizada.t1 = objTest;
        classeParametrizada.t2 = t2;
        classeParametrizada.print();
    }
}
