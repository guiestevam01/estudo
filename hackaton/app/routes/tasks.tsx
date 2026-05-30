import * as React from "react";
import { OrdersList } from "~/features/orders/orders-list";
import { fetchOrdersDashboard } from "~/lib/anymarket";
import type { OrderWithTransmission } from "~/lib/anymarket";

export default function OrdersPage() {
  const [orders, setOrders] = React.useState<OrderWithTransmission[]>([]);
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true);
      const data = await fetchOrdersDashboard();
      setOrders(data);
      setLastUpdated(new Date());
      setIsLoading(false);
    };

    loadOrders();
    const interval = setInterval(loadOrders, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const lastUpdatedText = lastUpdated
    ? `Atualizado às ${lastUpdated.toLocaleTimeString("pt-BR")}`
    : "Carregando...";

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Torre de Controlo Logística</h1>
          <p className="text-muted-foreground">Gestão de pedidos da Crocs com análise de reembolsos</p>
          <p className="text-xs text-muted-foreground">{lastUpdatedText}</p>
        </div>
      </div>
      {isLoading ? (
        <div className="text-muted-foreground text-sm text-center py-12">
          Carregando pedidos...
        </div>
      ) : (
        <OrdersList orders={orders} />
      )}
    </div>
  );
}
