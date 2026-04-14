package course;

import java.util.ArrayList;
import java.util.List;

public class BagKunai {
    List<Kunai> kunais;
    int cont = 0;
    public BagKunai() {
        int cont = 0;
        this.kunais = new ArrayList<>();
        cont ++;
        if(cont > 3 ){
            System.err.println("voce so pode adicionar 3 kunais");
        }
    }
    public Kunai addKunai(String name){
         Kunai kunai = new Kunai(name);
         kunais.add(kunai);

         return kunai;
    }

    @Override
    public String toString() {
        return "kunais: " + kunais.toString();
    }

}
