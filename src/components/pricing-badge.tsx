import { Badge } from '@/components/ui/badge'
import type { PricingModel } from '@/lib/types'

export default function PricingBadge({ model }: { model: PricingModel }) {
  const colors = {
    free: 'bg-success/40 text-success-foreground hover:bg-success/30',
    'open-source': 'bg-primary/20 text-primary-foreground hover:bg-primary/30',
    freemium: 'bg-chart-4/20 text-chart-4 hover:bg-chart-4/30',
    paid: 'bg-destructive/20 text-secondary-foreground hover:bg-secondary/30',
  }

  return (
    <Badge variant="secondary" className={`${colors[model]} transition-all duration-200 animate-scale-in`}>
      {model}
    </Badge>
  )
}
