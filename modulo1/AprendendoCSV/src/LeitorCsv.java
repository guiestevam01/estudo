import java.io.IOException;
import java.nio.file.*;

public class LeitorCsv {
    public static String convertCsvString(String csvNome) throws IOException {
        Path arquivoCsv = Path.of(csvNome);
        if (!arquivoCsv.toString().endsWith(".csv")){
            throw new IllegalArgumentException("O arquivo fornecido não possui a extensão .csv");
        }
        return Files.readString(arquivoCsv);
    }
    public static String[] splitCsvString(String csvNome) throws IOException {
        String conteudo = convertCsvString(csvNome);
        // Retorna um array onde cada posição é uma linha do CSV
        return conteudo.split("\n");
    }
    public static String[] linhaSplitadad(String csvNome) throws IOException {
        return splitCsvString(csvNome).toString().split(";");

    }

    static void main() throws IOException {
        String[] linhas = splitCsvString("itens-cardapio.csv");
        for(String linha : linhas) {
            String[] colunas = linha.split(";");

            for (String coluna : colunas) {
                IO.println(coluna);
            }
            System.out.println("-----------------");
        }

    }
}
