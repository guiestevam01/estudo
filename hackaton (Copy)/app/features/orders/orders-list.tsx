import * as React from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import type { OrderWithTransmission } from "~/lib/anymarket";
import { analyzeOrder, getSlaHours } from "~/lib/decision-engine";

type SortKey = "sla" | "marketplace" | null;

interface OrdersListProps {
  orders: OrderWithTransmission[];
}

const URGENCY_ORDER = { destructive: 0, warning: 1, success: 2 };

export function OrdersList({ orders }: OrdersListProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortKey, setSortKey] = React.useState<SortKey>("sla");
  const [marketplaceFilter, setMarketplaceFilter] = React.useState<string>("all");
  const [urgencyFilter, setUrgencyFilter] = React.useState<"all" | "critical">("all");

  const marketplaces = React.useMemo(() => {
    const seen = new Set<string>();
    orders.forEach((o) => {
      const mp = o.marketPlace ?? o.marketPlaceUrl;
      if (mp) seen.add(mp);
    });
    return Array.from(seen).sort();
  }, [orders]);

  const filteredOrders = React.useMemo(() => {
    let result = orders;

    if (marketplaceFilter !== "all") {
      result = result.filter(
        (o) => (o.marketPlace ?? o.marketPlaceUrl) === marketplaceFilter,
      );
    }

    if (urgencyFilter === "critical") {
      result = result.filter((o) => analyzeOrder(o).color === "destructive");
    }

    const term = searchTerm.trim().toLowerCase();
    if (term) {
      result = result.filter((o) =>
        [
          o.buyer?.name,
          o.marketPlaceNumber,
          o.marketPlace,
          o.marketPlaceUrl,
          o.status,
          analyzeOrder(o).recommendation,
        ]
          .join(" ")
          .toLowerCase()
          .includes(term),
      );
    }

    if (sortKey === "sla") {
      result = [...result].sort((a, b) => {
        const da = analyzeOrder(a);
        const db = analyzeOrder(b);
        const urgencyDiff = URGENCY_ORDER[da.color] - URGENCY_ORDER[db.color];
        if (urgencyDiff !== 0) return urgencyDiff;
        const tsA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const tsB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return tsA - tsB;
      });
    }

    return result;
  }, [orders, searchTerm, sortKey, marketplaceFilter, urgencyFilter]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, marketplaceFilter, urgencyFilter]);

  const itemsPerPage = 25;
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / itemsPerPage));
  const pageOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="p-6">
      <div className="mb-4 flex flex-wrap gap-3">
        <Input
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por cliente, pedido ou canal"
        />
        <select
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={marketplaceFilter}
          onChange={(e) => setMarketplaceFilter(e.target.value)}
        >
          <option value="all">Todos os canais</option>
          {marketplaces.map((mp) => (
            <option key={mp} value={mp}>{mp}</option>
          ))}
        </select>
        <button
          onClick={() => setUrgencyFilter(urgencyFilter === "critical" ? "all" : "critical")}
          className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
            urgencyFilter === "critical"
              ? "bg-destructive text-destructive-foreground border-destructive"
              : "bg-background text-destructive border-destructive/30 hover:bg-destructive/5"
          }`}
        >
          {urgencyFilter === "critical" ? "✓ Só atrasados" : "⚠️ Ver só atrasados"}
        </button>
        <Button
          variant={sortKey === "sla" ? "default" : "outline"}
          size="sm"
          onClick={() => setSortKey(sortKey === "sla" ? null : "sla")}
        >
          {sortKey === "sla" ? "✓ Mais críticos primeiro" : "Ordenar por urgência"}
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[160px]">Pedido</TableHead>
            <TableHead className="w-[150px]">Canal</TableHead>
            <TableHead className="w-[180px]">Cliente</TableHead>
            <TableHead className="w-[150px]">Data</TableHead>
            <TableHead className="w-[100px]">Valor</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[130px]">SLA</TableHead>
            <TableHead className="w-[170px]">Despachar até</TableHead>
            <TableHead className="w-[170px]">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageOrders.map((order) => {
            const decision = analyzeOrder(order);
            const created = order.createdAt
              ? new Date(order.createdAt).toLocaleString("pt-BR")
              : "—";
            const formattedValue =
              typeof order.value === "number"
                ? new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(order.value)
                : "—";

            const slaHours = getSlaHours(
              order.marketPlace,
              order.orderTypeName,
              Boolean(order.fulfillment),
            );
            const createdTs = order.createdAt
              ? new Date(order.createdAt).getTime()
              : null;
            const hoursElapsed = createdTs
              ? (Date.now() - createdTs) / 3600000
              : 0;
            const hoursRemaining = Math.round(slaHours - hoursElapsed);
            const slaText =
              hoursRemaining < 0
                ? `Atrasado ${Math.abs(hoursRemaining)}h`
                : `${hoursRemaining}h restantes`;

            // Badges minimalistas — só texto colorido sem fundo forte
            const colorClass = {
              destructive: "bg-transparent text-red-600 border border-red-300 hover:bg-red-50",
              warning: "bg-transparent text-yellow-700 border border-yellow-300 hover:bg-yellow-50",
              success: "bg-transparent text-green-700 border border-green-300 hover:bg-green-50",
            }[decision.color];

            // Linha: só uma borda esquerda sutil, sem fundo colorido
            const rowClass = decision.color === "destructive"
              ? "border-l-2 border-l-red-400"
              : decision.color === "warning"
                ? "border-l-2 border-l-yellow-400"
                : "";

            return (
              <TableRow key={order.id} className={rowClass}>
                <TableCell className="font-mono text-sm">
                  {order.marketPlaceNumber ?? order.id}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {order.marketPlace ?? order.marketPlaceUrl ?? "—"}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{order.buyer?.name ?? "—"}</TableCell>
                <TableCell className="text-sm">{created}</TableCell>
                <TableCell className="text-sm">{formattedValue}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{order.status ?? "—"}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={colorClass}>{slaText}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {decision.dispatchDeadline}
                </TableCell>
                <TableCell>
                  <Badge className={colorClass}>{decision.recommendation}</Badge>
                </TableCell>
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
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
