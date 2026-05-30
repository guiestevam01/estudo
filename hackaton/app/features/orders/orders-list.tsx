import * as React from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import type { OrderWithTransmission } from "~/lib/anymarket";
import { analyzeOrder, getSlaHours } from "~/lib/decision-engine";

interface OrdersListProps {
  orders: OrderWithTransmission[];
}

export function OrdersList({ orders }: OrdersListProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const filteredOrders = React.useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return orders;
    return orders.filter((o) =>
      [o.buyer?.name, o.marketPlaceNumber, o.marketPlace, o.marketPlaceUrl, o.status, analyzeOrder(o).recommendation]
        .join(" ").toLowerCase().includes(term)
    );
  }, [orders, searchTerm]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const itemsPerPage = 25;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const pageOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6">
      <div className="mb-4 max-w-md">
        <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar por cliente, pedido, canal ou ação" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[160px]">Pedido</TableHead>
            <TableHead className="w-[150px]">Canal</TableHead>
            <TableHead className="w-[200px]">Cliente</TableHead>
            <TableHead className="w-[160px]">Data</TableHead>
            <TableHead className="w-[110px]">Valor</TableHead>
            <TableHead className="w-[130px]">Status</TableHead>
            <TableHead className="w-[150px]">SLA</TableHead>
            <TableHead className="w-[200px]">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageOrders.map((order) => {
            const decision = analyzeOrder(order);
            const created = order.createdAt ? new Date(order.createdAt).toLocaleString("pt-BR") : "—";
            const formattedValue = typeof order.value === "number"
              ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(order.value)
              : "—";

            const slaHours = getSlaHours(order.marketPlace, order.orderTypeName, Boolean(order.fulfillment));
            const createdTs = order.createdAt ? new Date(order.createdAt).getTime() : null;
            const hoursElapsed = createdTs ? (Date.now() - createdTs) / 3600000 : 0;
            const hoursRemaining = Math.round(slaHours - hoursElapsed);
            const slaText = hoursRemaining < 0 ? `Atrasado ${Math.abs(hoursRemaining)}h` : `${hoursRemaining}h restantes`;

            const colorClass = {
              destructive: "bg-red-100 text-red-800",
              warning: "bg-yellow-100 text-yellow-800",
              success: "bg-green-100 text-green-800",
            }[decision.color];

            return (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-sm">{order.marketPlaceNumber ?? order.id}</TableCell>
                <TableCell><Badge variant="outline">{order.marketPlace ?? order.marketPlaceUrl ?? "—"}</Badge></TableCell>
                <TableCell className="text-sm">{order.buyer?.name ?? "—"}</TableCell>
                <TableCell className="text-sm">{created}</TableCell>
                <TableCell className="text-sm">{formattedValue}</TableCell>
                <TableCell><Badge variant="secondary">{order.status ?? "—"}</Badge></TableCell>
                <TableCell><Badge className={colorClass}>{slaText}</Badge></TableCell>
                <TableCell><Badge className={colorClass}>{decision.recommendation}</Badge></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Página {currentPage} de {totalPages} — {filteredOrders.length} pedidos
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
