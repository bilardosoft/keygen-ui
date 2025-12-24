import { ProtectedRoute } from "@/components/auth/protected-route"
import { SettingsOverview } from "@/components/settings/settings-overview"

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6 px-4 lg:px-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings, API keys, and Keygen configuration.
          </p>
        </div>
        <SettingsOverview />
      </div>
    </ProtectedRoute>
  )
}
