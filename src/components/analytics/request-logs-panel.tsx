"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { format } from "date-fns"
import { IconRefresh, IconLock } from "@tabler/icons-react"

import { getKeygenApi } from "@/lib/api"
import { RequestLog } from "@/lib/types/keygen"
import { handleOptionalFeatureError } from "@/lib/utils/error-handling"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type StatusFilter = "all" | "2xx" | "4xx" | "5xx"
type MethodFilter = "all" | "get" | "post" | "put" | "patch" | "delete"

export function RequestLogsPanel() {
  const api = getKeygenApi()
  const [logs, setLogs] = useState<RequestLog[]>([])
  const [loading, setLoading] = useState(true)
  const [featureUnavailable, setFeatureUnavailable] = useState(false)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [methodFilter, setMethodFilter] = useState<MethodFilter>("all")
  const [search, setSearch] = useState("")

  const loadLogs = useCallback(async () => {
    try {
      setLoading(true)
      setFeatureUnavailable(false)
      const response = await api.requestLogs.list({
        limit: 25,
        ...(methodFilter !== "all" && { method: methodFilter.toUpperCase() }),
        ...(search.trim() && { url: search.trim() }),
      })
      const data = (response.data || []).filter((log) => {
        if (statusFilter === "all") return true
        const status = log.attributes.status
        if (statusFilter === "2xx") return status >= 200 && status < 300
        if (statusFilter === "4xx") return status >= 400 && status < 500
        if (statusFilter === "5xx") return status >= 500
        return true
      })
      setLogs(data)
    } catch (error: unknown) {
      const isUnavailable = handleOptionalFeatureError(error, "request logs", {
        onUnavailable: () => setFeatureUnavailable(true)
      })
      if (!isUnavailable) {
        setLogs([])
      }
    } finally {
      setLoading(false)
    }
  }, [api.requestLogs, methodFilter, statusFilter, search])

  useEffect(() => {
    loadLogs()
  }, [loadLogs])

  const summary = useMemo(() => {
    const total = logs.length
    const errors = logs.filter((log) => log.attributes.status >= 400).length
    const latest = logs[0]?.attributes.created
    return { total, errors, latest }
  }, [logs])

  if (featureUnavailable) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8">
        <IconLock className="h-16 w-16 text-muted-foreground opacity-50" />
        <div className="text-center">
          <h3 className="text-lg font-semibold">Request Logs Not Available</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            This feature may not be included in your current Keygen plan.
            <br />
            Contact your Keygen administrator to enable request logging.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Requests (loaded)</CardTitle>
            <CardDescription>Showing recent request logs</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{summary.total}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <CardDescription>Status codes 4xx/5xx</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{summary.errors}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Last Request</CardTitle>
            <CardDescription>Most recent log time</CardDescription>
          </CardHeader>
          <CardContent className="text-lg font-semibold">
            {summary.latest ? format(new Date(summary.latest), "MMM d, yyyy h:mm a") : "—"}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Request Logs</CardTitle>
            <CardDescription>Filter and inspect recent Keygen API activity</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              placeholder="Filter by path"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48"
            />
            <Select value={methodFilter} onValueChange={(value: MethodFilter) => setMethodFilter(value)}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All methods</SelectItem>
                <SelectItem value="get">GET</SelectItem>
                <SelectItem value="post">POST</SelectItem>
                <SelectItem value="put">PUT</SelectItem>
                <SelectItem value="patch">PATCH</SelectItem>
                <SelectItem value="delete">DELETE</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(value: StatusFilter) => setStatusFilter(value)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="2xx">2xx</SelectItem>
                <SelectItem value="4xx">4xx</SelectItem>
                <SelectItem value="5xx">5xx</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={loadLogs} disabled={loading}>
              <IconRefresh className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Method</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-16 text-center">
                      Loading request logs...
                    </TableCell>
                  </TableRow>
                ) : logs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-16 text-center">
                      No matching request logs.
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <Badge variant="outline" className="uppercase">
                          {log.attributes.method}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[360px] truncate">
                        {log.attributes.url}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.attributes.status >= 500
                              ? "destructive"
                              : log.attributes.status >= 400
                                ? "secondary"
                                : "default"
                          }
                        >
                          {log.attributes.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {format(new Date(log.attributes.created), "MMM d, yyyy h:mm a")}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
