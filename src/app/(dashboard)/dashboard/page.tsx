"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { RecentRequests } from "@/components/dashboard/recent-requests"
import { useEdition } from "@/lib/config/edition-context"

export default function DashboardPage() {
  const { isFeatureAvailable } = useEdition()
  const showRequestLogs = isFeatureAvailable('requestLogs')

  return (
    <ProtectedRoute>
      <SectionCards />
      {showRequestLogs && (
        <>
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <div className="px-4 pb-8 lg:px-6">
            <RecentRequests />
          </div>
        </>
      )}
    </ProtectedRoute>
  )
}
