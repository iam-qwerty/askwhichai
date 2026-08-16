// ============================================================
// AskWhichAI — Pricing badge (color-coded label)
// ============================================================
// Shows the pricing model of a tool as a colored badge.
// Each pricing tier has its own semantic color token (defined
// in styles.css for both light and dark mode):
//   - free        → green
//   - open-source → blue
//   - freemium    → amber
//   - paid        → red
//
// Used inside ToolCard, ToolDetails, and the admin sidebar.
// ============================================================

import { Badge } from '@/components/ui/badge'
import type { PricingModel } from '@/lib/types'

// Color map — each pricing tier gets a unique background/text color.
// The badge is not interactive, so there are no hover styles.
const colors: Record<PricingModel, string> = {
  free: 'bg-pricing-free-bg text-pricing-free',
  'open-source': 'bg-pricing-open-source-bg text-pricing-open-source',
  freemium: 'bg-pricing-freemium-bg text-pricing-freemium',
  paid: 'bg-pricing-paid-bg text-pricing-paid',
}

export default function PricingBadge({ model }: { model: PricingModel }) {
  return (
    <Badge variant="secondary" className={`${colors[model] ?? ''} animate-scale-in`}>
      {model}
    </Badge>
  )
}
