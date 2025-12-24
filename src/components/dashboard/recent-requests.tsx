"use client"

import { useCallback, useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"

import { getKeygenApi } from "@/lib/api"
import { RequestLog } from "@/lib/types/keygen"
import { handleLoadError } from "@/lib/utils/error-handling"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { IconRefresh } from "@tabler/icons-react"

export function RecentRequests() {
  const api = getKeygenApi()
  const [logs, setLogs] = useState<RequestLog[]>([])
  const [loading, setLoading] = useState(true)

  const loadLogs = useCallback(async () => {
    try {
      setLoading(true)
      const response = await api.requestLogs.list({ limit: 8 })
      setLogs(response.data || [])
    } catch (error: unknown) {
      handleLoadError(error, "request logs")
    } finally {
      setLoading(false)
    }
  }, [api.requestLogs])

  useEffect(() => {
    loadLogs()
  }, [loadLogs])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Recent API Activity</CardTitle>
          <CardDescription>Latest request logs from your Keygen account</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={loadLogs} disabled={loading}>
          <IconRefresh className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">When</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-16 text-center">
                    Loading activity...
                  </TableCell>
                </TableRow>
              ) : logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-16 text-center">
                    No recent requests found.
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
                    <TableCell className="max-w-[320px] truncate">
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
                      {formatDistanceToNow(new Date(log.attributes.created), {
                        addSuffix: true,
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
