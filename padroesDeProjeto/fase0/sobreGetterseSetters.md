Os setters não deixa claro a intencao da mudanca no contexto do codigo.
setter não experssao o dominio em DDD
NO geral setters explica que o atributo pode ser mudado, mas não edeixa claro o motivo da mudanca.

```
public class Pedido {

    private StatusPedido status;

    public void setStatus(StatusPedido status) {
        this.status = status;
    }
}
```
agora em uma outra parte
```
pedido.setStatus(StatusPedido.CANCELADO);
```
Setamos o status do pedido como cancelado, mas por que? ele não se comunica com o dominio.
uma boa prática com Lombok seria restringir o acesso ao setters mas implementar a lógica deles em algum factory
```
@Setter(AcessLevel.PRIVATE)

public class Delivery {
    ...
    //static factory 
    public static Delivery draft(...){
        Delivery delivery  = new Delivery();
        ...
        delivery.set(...);

    }
}
```
