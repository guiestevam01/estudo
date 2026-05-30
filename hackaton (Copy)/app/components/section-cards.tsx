import { CheckCircle2, PackageX } from "lucide-react"

import { Badge } from "~/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import type { OrderWithTransmission } from "~/lib/anymarket"
import { analyzeOrder } from "~/lib/decision-engine"

interface SectionCardsProps {
  orders: OrderWithTransmission[];
}

export function SectionCards({ orders }: SectionCardsProps) {
  const metrics = orders.reduce(
    (acc, order) => {
      const decision = analyzeOrder(order);
      acc.total += 1;
      if (decision.status === "SAFE_REFUND") {
        acc.safeRefunds += 1;
      }
      if (decision.status === "BLOCKED") {
        acc.blocked += 1;
      }
      if (decision.status === "WARNING") {
        acc.warnings += 1;
      }
      return acc;
    },
    { total: 0, safeRefunds: 0, blocked: 0, warnings: 0 },
  )

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Pedidos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.total}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              Anymarket
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Pedidos em processamento
          </div>
          <div className="text-muted-foreground">
            Do marketplace da Crocs
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Reembolsos Seguros</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-green-600">
            {metrics.safeRefunds}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle2 className="size-3" />
              Imediato
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Prontos para reembolsar <CheckCircle2 className="size-4 text-green-600" />
          </div>
          <div className="text-muted-foreground">
            Sem fatura e com erro de transmissão
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pedidos Bloqueados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-red-600">
            {metrics.blocked}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              <PackageX className="size-3" />
              Não Reembolsar
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Faturados ou despachados <PackageX className="size-4 text-red-600" />
          </div>
          <div className="text-muted-foreground">
            Reembolso não é possível
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
