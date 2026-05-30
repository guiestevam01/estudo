import * as React from "react";
import { ChartAreaInteractive } from "~/components/chart-area-interactive";
import { OrdersList } from "~/features/orders/orders-list";
import { SectionCards } from "~/components/section-cards";
import { fetchOrdersDashboard } from "~/lib/anymarket";
import type { OrderWithTransmission } from "~/lib/anymarket";

export default function Page() {
  const [orders, setOrders] = React.useState<OrderWithTransmission[]>([]);
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadOrders = async (silent = false) => {
      if (!silent) setIsLoading(true);
      const data = await fetchOrdersDashboard();
      setOrders(data);
      setLastUpdated(new Date());
      if (!silent) setIsLoading(false);
    };

    loadOrders(false);
    const interval = setInterval(() => loadOrders(true), 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="text-muted-foreground text-sm text-center py-12">
        Carregando pedidos...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards orders={orders} />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive orders={orders} />
      </div>
      <OrdersList orders={orders} />
    </div>
  );
}
