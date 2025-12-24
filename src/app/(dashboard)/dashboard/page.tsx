import { ProtectedRoute } from "@/components/auth/protected-route"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { RecentRequests } from "@/components/dashboard/recent-requests"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <div className="px-4 pb-8 lg:px-6">
        <RecentRequests />
      </div>
    </ProtectedRoute>
  )
}
