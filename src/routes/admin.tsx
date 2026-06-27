import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AdminToolForm from '@/components/admin-tool-form'

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <Card className="p-0 overflow-hidden">
              <CardHeader className="px-6 py-6">
                <CardTitle className="text-2xl">Admin — Add New Tool</CardTitle>
              </CardHeader>
              <CardContent>
                <AdminToolForm />
              </CardContent>
            </Card>
          </section>

          <aside>
            <Card className="p-6">
              <CardTitle className="mb-2">Quick Tips</CardTitle>
              <p className="text-sm text-muted-foreground mb-4">
                Use descriptive names, include a valid URL, and choose a pricing model.
              </p>

              <div className="space-y-3">
                <div className="text-sm">
                  <strong>Pricing models:</strong>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded bg-accent/10 text-accent">free</span>
                    <span className="px-2 py-1 rounded bg-primary/10 text-primary-foreground">open-source</span>
                    <span className="px-2 py-1 rounded bg-chart-4/10 text-chart-4">freemium</span>
                    <span className="px-2 py-1 rounded bg-destructive/10 text-secondary-foreground">paid</span>
                  </div>
                </div>

                <div>
                  <strong className="text-sm">Preview</strong>
                  <p className="text-xs text-muted-foreground">
                    New tools appear immediately after insertion.
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
