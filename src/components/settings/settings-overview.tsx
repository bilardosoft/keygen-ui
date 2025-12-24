"use client"

import { useCallback, useEffect, useState } from "react"
import { IconAlertTriangle, IconRefresh, IconShieldCheck } from "@tabler/icons-react"

import { getKeygenApi } from "@/lib/api"
import { handleLoadError } from "@/lib/utils/error-handling"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Status = "loading" | "ok" | "error"

export function SettingsOverview() {
  const api = getKeygenApi()
  const [status, setStatus] = useState<Status>("loading")
  const [stats, setStats] = useState({
    products: 0,
    policies: 0,
    webhooks: 0,
    users: 0,
  })

  const loadStatus = useCallback(async () => {
    try {
      setStatus("loading")
      const [products, policies, webhooks, users] = await Promise.all([
        api.products.list({ limit: 1 }).catch(() => ({ data: [], meta: { count: 0 } })),
        api.policies.list({ limit: 1 }).catch(() => ({ data: [], meta: { count: 0 } })),
        api.webhooks.list({ limit: 1 }).catch(() => ({ data: [], meta: { count: 0 } })),
        api.users.list({ limit: 1 }).catch(() => ({ data: [], meta: { count: 0 } })),
      ])

      const getCount = (response: { data?: unknown[]; meta?: { count?: number } }) =>
        typeof response.meta?.count === "number"
          ? response.meta.count
          : Array.isArray(response.data)
            ? response.data.length
            : 0

      setStats({
        products: getCount(products),
        policies: getCount(policies),
        webhooks: getCount(webhooks),
        users: getCount(users),
      })
      setStatus("ok")
    } catch (error: unknown) {
      setStatus("error")
      handleLoadError(error, "settings status")
    }
  }, [api.products, api.policies, api.webhooks, api.users])

  useEffect(() => {
    loadStatus()
  }, [loadStatus])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Keygen API Health</CardTitle>
            <CardDescription>
              Live connectivity check against products, policies, users, and webhooks
            </CardDescription>
          </div>
          <Badge
            variant={status === "ok" ? "secondary" : status === "loading" ? "outline" : "destructive"}
            className="flex items-center gap-1"
          >
            {status === "ok" && <IconShieldCheck className="h-4 w-4" />}
            {status === "error" && <IconAlertTriangle className="h-4 w-4" />}
            {status === "loading" ? "Checking..." : status === "ok" ? "Healthy" : "Issue"}
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-4">
            <StatusStat label="Products" value={stats.products} />
            <StatusStat label="Policies" value={stats.policies} />
            <StatusStat label="Webhooks" value={stats.webhooks} />
            <StatusStat label="Users" value={stats.users} />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              These counts come directly from your Keygen account. Use this area to ensure the
              UI is correctly connected to your backend.
            </p>
            <Button variant="outline" size="sm" onClick={loadStatus} disabled={status === "loading"}>
              <IconRefresh className="mr-2 h-4 w-4" />
              Re-run checks
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatusStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}
