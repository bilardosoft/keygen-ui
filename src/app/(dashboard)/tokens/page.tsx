import { ProtectedRoute } from '@/components/auth/protected-route'
import { TokenManagement } from '@/components/tokens/token-management'

export default function TokensPage() {
  return (
    <ProtectedRoute>
      <TokenManagement />
    </ProtectedRoute>
  )
}
