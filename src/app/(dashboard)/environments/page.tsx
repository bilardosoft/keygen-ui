import { ProtectedRoute } from '@/components/auth/protected-route'
import { EnvironmentManagement } from '@/components/environments/environment-management'

export default function EnvironmentsPage() {
  return (
    <ProtectedRoute>
      <EnvironmentManagement />
    </ProtectedRoute>
  )
}
