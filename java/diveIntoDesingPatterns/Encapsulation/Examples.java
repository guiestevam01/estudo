package diveIntoDesingPatterns.Encapsulation;
import java.util.Scanner;
import java.util.Random;
/*Quando apertamos o botao da tv para liga-la, nao estamos preocupado com processo fisico e eletronico que ocorre
* Temos uma interface simples(um botao) que faz isso. Isso é parte do conceito de interface: uma parte publica do objeto aberta
* a interacao com outros objetos.
*
* encapsulamento: capacidade de um objeto de esconder parte de seus estados e comportamento de outros objetos expondo apenas interfaces
* limitadas para o restante do programa
* Interfaces permite definir contratos de interacao entre objetos.
* Quero que restringir classe X para trabalhar apenas com classes que implemente Y interface.*/
interface Y{
    void method();
}
class Z implements Y{
    @Override
    public void method(){
        System.out.println("method of Z");
    }
}

class K implements Y{
    @Override
    public void method(){
        System.out.println("method of K");
    }
}

class X {
    //so aceita objetos que implementa y
    public void receive(Y y){
        y.method();
    }
}
class A{
    public void method(){
        System.out.println("method of K");
    }
}
interface CartaoInterface{
    boolean permitido(Cartao cartao);
}

abstract class Cartao implements CartaoInterface{
    private final long numero;
    private final int ano;

    public Cartao(int ano) {
        this.ano = ano;
        this.numero = generatedCartao();
    }
    private long generatedCartao(){
        Random random = new Random();
        StringBuilder cartao = new StringBuilder();
        for (int i = 0; i < 16; i++) {
            cartao.append(random.nextInt(10)); // dígito de 0 a 9
        }
        return Long.parseLong(cartao.toString());
    }

    public long getNumero() {
        return numero;
    }

    public int getAno() {
        return ano;
    }
    Scanner sc = new Scanner(System.in);
    @Override
    public boolean permitido(Cartao cartao){
        if(ano > 2025){
            return true;
        } else{
            return false;
        }
    }
}
class CartaoConcreto extends Cartao {

    public CartaoConcreto(int ano) {
        super(ano);
    }
}

class transacao{
    public transacao(CartaoInterface cartaoInterface, Cartao
                     cartao){
        cartaoInterface.permitido(cartao);
        boolean ok = cartaoInterface.permitido(cartao);
        if (ok){
            System.out.println("transacao permitida");
        } else{
            System.out.println("transacao negada");
        }
    }
}

public class Examples {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        X x = new X();
        Y z = new Z();
        A a = new A();
        //x.receive(a); // error x.receive
       // x.receive(z);
        System.out.println("Bem-vindo(a) voce deseja criar um novo cartão? Digite sim ou não: ");
        String resposta = sc.next(); // Reads next token until whitespace
        CartaoConcreto cartaoConcreto;
        if(resposta.equalsIgnoreCase("sim")){
            System.out.println("Digite o ano do cartão:");
            int ano = sc.nextInt();
            cartaoConcreto = new CartaoConcreto(ano);
            informacoes(cartaoConcreto);
        } else{
            System.out.println("Nenhum cartão criado.");
        }
        sc.close();
    }

    public static void informacoes(CartaoConcreto cartao){
        System.out.println("=============================");
        System.out.println("Informacoes do seu cartão:");
        System.out.println("Número: "+ cartao.getNumero());
        System.out.println("Ano: "+ cartao.getAno());
        System.out.printf("Permitido transacao:");
        if(!cartao.permitido(cartao)){
            System.out.println(" negada - o ano do seu cartão é inferior ao ano atual");
        } else{
            System.out.println(" permitida - você esta apto a fazer transacao");
        }
        System.out.println("=============================");
    }

}

