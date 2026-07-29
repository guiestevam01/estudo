//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
void main() throws InterruptedException{
    var t1 = Thread.ofVirtual().unstarted(() -> {
        try {
            Thread.sleep(2000); // espera 2 segundos para executar
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("Hello from virtual thread");
    });
    t1.start();
    //espera thread finalizar todo processamento com join
    t1.join();
}
