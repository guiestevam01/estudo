package domain.model;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@NoArgsConstructor(access = AccessLevel.PACKAGE)
public class Delivery {
    private UUID id;
    private UUID courierId;
    private DeliveryStatus status;
    private OffsetDateTime placeAt;
    private OffsetDateTime assignedAt;
    private OffsetDateTime expectedDeliveryAt;
    private OffsetDateTime fulfilledAt;
    private BigDecimal distanceFee;
    private BigDecimal courierPayout;
    private BigDecimal totalCost;
    private Integer totalItems;
    private ContactPoint sender;
    private ContactPoint recipent;
    List<Item> items = new ArrayList<>();
    // criando uma delivery no status de rascunho(draft)
    public static Delivery draft() {
        Delivery delivery = new Delivery();
        delivery.id = UUID.randomUUID();
        delivery.status = DeliveryStatus.DRAFT;
        delivery.totalItems = 0;
        delivery.totalCost = BigDecimal.ZERO;
        delivery.courierPayout = BigDecimal.ZERO;
        delivery.distanceFee = BigDecimal.ZERO;
        return delivery;
    }
}
