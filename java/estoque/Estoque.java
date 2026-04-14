package estoque;
import java.util.ArrayList;
import java.util.List;

public class Estoque {
    private List<Item> itens;
    public Estoque(){
        this.itens = new ArrayList<>();
    }
    
    public List<Item> getItens() {
        return itens;
    }
    public void removeByName(String removeName, int qtd){
        for(Item item : itens){
            if(item.getNome().equalsIgnoreCase(removeName)){
                item.setQuantidade(item.getQuantidade() - qtd);
                return;
            } 
        }
        System.out.println("item não encontrado.");
    }

    public void setItens(List<Item> itens) {
        this.itens = itens;
    }

    public void addItem(Item item){
        itens.add(item);
    }
    public void removeItem(Item item){
        itens.remove(item);
    }

    @Override
    public String toString() {
        return "Estoque [itens=" + itens + "]";
    }
    
}
