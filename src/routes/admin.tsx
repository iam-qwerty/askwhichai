// ============================================================
// AskWhichAI — Admin page (/admin) route
// ============================================================
// Admin panel for adding new AI tools to the database.
// Protected by Cloudflare Basic Auth (not in-app auth).
// The form submits directly to a server function (insertTool).
//
// Layout:
//   Left column (2/3)  — The add-tool form
//   Right column (1/3) — Quick tips / reference guide
// ============================================================

import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AdminToolForm from '@/components/admin-tool-form'
import PricingBadge from '@/components/pricing-badge'

// Note: Admin basic auth is enforced at the Cloudflare Worker level
// or via a server middleware. The ADMIN_USER and ADMIN_PASSWORD env vars
// are used for HTTP Basic Auth on the /admin route.
// For local development, the admin page is accessible without auth.

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})

function AdminPage() {
  return (
    <div className="min-h-screen py-12">
      <main className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-foreground mb-6">Add a new tool</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main form area */}
          <section className="lg:col-span-2">
            <Card className="p-0 overflow-hidden gap-0">
              <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-lg">Tool details</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <AdminToolForm />
              </CardContent>
            </Card>
          </section>

          {/* Sidebar with tips and pricing model reference */}
          <aside>
            <Card className="p-6">
              <CardTitle className="mb-2">Quick tips</CardTitle>
              <p className="text-sm text-muted-foreground mb-4">
                Use descriptive names, include a valid URL, and choose a pricing model.
              </p>

              <div className="space-y-3">
                <div className="text-sm">
                  <strong>Pricing models</strong>
                  {/* Same badge component the public pages use, so colors always match */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    <PricingBadge model="free" />
                    <PricingBadge model="open-source" />
                    <PricingBadge model="freemium" />
                    <PricingBadge model="paid" />
                  </div>
                </div>

                <div>
                  <strong className="text-sm">Publishing</strong>
                  <p className="text-xs text-muted-foreground">
                    New tools appear on the home page immediately after insertion.
                  </p>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
