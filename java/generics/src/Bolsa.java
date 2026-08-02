import java.util.ArrayList;
import java.util.List;

public class Bolsa<T> {
    private List<T> materiais = new ArrayList<>();

    public void addMateriais(T material) {
        materiais.add(material);
    }

    public List<T> getMateriais(){
        return List.copyOf(materiais);
    }


}
