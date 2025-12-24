import { ProtectedRoute } from '@/components/auth/protected-route'
import { ComponentManagement } from '@/components/components/component-management'

export default function ComponentsPage() {
  return (
    <ProtectedRoute>
      <ComponentManagement />
    </ProtectedRoute>
  )
}
