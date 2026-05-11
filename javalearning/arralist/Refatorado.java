package arralist;
import java.util.ArrayList;

class ItemCardapio {
    String descricao;
    double preco;

    boolean possuiPrecoEntre(double precoMinimo, double precoMaximo) {
        return preco >= precoMinimo && preco <= precoMaximo;
    }

    void imprimir() {
        System.out.printf("%s x R$%.2f%n", descricao, preco);
    }
}

class Cardapio {
    ArrayList<ItemCardapio> itens;
    public Cardapio(){
        itens = new ArrayList<>();
        
    }
    
    public void adicionarItem(ItemCardapio item){
        itens.add(item);
    }
    public void removerItem(int index){
        itens.remove(index);
    }
    public void imprimirItensCardapio(double precoMinimo, double precoMaximo){
       for(ItemCardapio item : itens){
        if(item.possuiPrecoEntre(precoMinimo, precoMaximo)){
            item.imprimir();
        }
       }
    }
}

public class Refatorado {
    
}
