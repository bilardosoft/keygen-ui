import { ProtectedRoute } from "@/components/auth/protected-route"
import { RequestLogsPanel } from "@/components/analytics/request-logs-panel"

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6 px-4 lg:px-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            View usage analytics and insights for your licenses and products.
          </p>
        </div>
        <RequestLogsPanel />
      </div>
    </ProtectedRoute>
  )
}
