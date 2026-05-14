public class MainTeste{
    public static void main(String[] args){
        imprimirUsoMemoria();
        byte[] x = new byte[500 * 1024 * 1024]; 
        System.out.println("############################################");
        imprimirUsoMemoria();
    }
    static void imprimirUsoMemoria(){
        System.out.printf("Memória máxima: %s%n", emMegabytes(Runtime.getRuntime().maxMemory()));
        System.out.printf("Total empenhada: %s%n", emMegabytes(Runtime.getRuntime().totalMemory()));   //total de memoria que a jvm ja reservou
        System.out.printf("Memória disponível do que ja foi reservado: %s%n", emMegabytes(Runtime.getRuntime().freeMemory()));
        long memoriaUsada = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
        System.out.printf("Memória usada(heap): %s%n", emMegabytes(memoriaUsada));
    }
    static String emMegabytes(long bytes){
        return String.format("%.2fMB", bytes / 1024 / 1024d);
    } // tenho 8gb de memoria ram e uso ubuntu então o máximo que ele pega é quase 22%.
}