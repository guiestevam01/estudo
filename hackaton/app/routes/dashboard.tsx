import { ChartAreaInteractive } from "~/components/chart-area-interactive";
import { OrdersList } from "~/features/orders/orders-list";
import { SectionCards } from "~/components/section-cards";
import { fetchOrdersDashboard } from "~/lib/anymarket";
import { useLoaderData } from "react-router";

export async function loader() {
  const orders = await fetchOrdersDashboard();
  return { orders };
}

export default function Page() {
  const { orders } = useLoaderData<typeof loader>();

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
