"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { IconRefresh, IconLock } from "@tabler/icons-react"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { getKeygenApi } from "@/lib/api"
import { RequestLog } from "@/lib/types/keygen"
import { handleOptionalFeatureError } from "@/lib/utils/error-handling"

export const description = "API request volume from Keygen logs"

const chartConfig = {
  requests: {
    label: "Requests",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const api = getKeygenApi()
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = useState("90d")
  const [logs, setLogs] = useState<RequestLog[]>([])
  const [chartData, setChartData] = useState<Array<{ date: string; requests: number }>>([])
  const [loading, setLoading] = useState(true)
  const [featureUnavailable, setFeatureUnavailable] = useState(false)

  useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setFeatureUnavailable(false)
      const response = await api.requestLogs.list({ limit: 200 })
      const data = (response.data || []).filter((log): log is RequestLog => Boolean(log?.attributes?.created))
      const sortedLogs = [...data].sort(
        (a, b) => new Date(b.attributes.created).getTime() - new Date(a.attributes.created).getTime()
      )
      setLogs(sortedLogs)

      const grouped = new Map<string, number>()
      for (const log of data) {
        const dateKey = new Date(log.attributes.created).toISOString().slice(0, 10)
        grouped.set(dateKey, (grouped.get(dateKey) || 0) + 1)
      }

      const points = Array.from(grouped.entries())
        .map(([date, count]) => ({ date, requests: count }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      setChartData(points)
    } catch (error) {
      const isUnavailable = handleOptionalFeatureError(error, "request logs", {
        onUnavailable: () => setFeatureUnavailable(true)
      })
      if (!isUnavailable) {
        setLogs([])
        setChartData([])
      }
    } finally {
      setLoading(false)
    }
  }, [api.requestLogs])

  useEffect(() => {
    loadData()
  }, [loadData])

  const filteredData = useMemo(() => {
    if (!chartData.length) return []
    const days = timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - (days - 1))

    return chartData.filter((item) => {
      const date = new Date(item.date)
      return date >= startDate
    })
  }, [chartData, timeRange])

  const summary = useMemo(() => {
    const total = filteredData.reduce((sum, point) => sum + point.requests, 0)
    const errors = logs.filter((log) => log.attributes.status >= 400).length
    const latest = logs[0]?.attributes.created
    return { total, errors, latest }
  }, [filteredData, logs])

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>API Request Volume</CardTitle>
        <CardDescription className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {featureUnavailable ? (
            <span>Request logs are not available in your current plan</span>
          ) : (
            <>
              <span>{loading ? "Loading request data…" : `${summary.total} requests in range`}</span>
              <span aria-hidden>•</span>
              <span>{summary.errors} errors</span>
              <span aria-hidden>•</span>
              <span>
                Last request:{" "}
                {summary.latest ? new Date(summary.latest).toLocaleString() : "—"}
              </span>
            </>
          )}
        </CardDescription>
        <CardAction className="flex flex-wrap items-center gap-2">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
            disabled={featureUnavailable}
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange} disabled={featureUnavailable}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={loadData} disabled={loading || featureUnavailable}>
            <IconRefresh className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
            Loading request data...
          </div>
        ) : featureUnavailable ? (
          <div className="flex h-[250px] flex-col items-center justify-center gap-3 text-muted-foreground">
            <IconLock className="h-12 w-12 opacity-50" />
            <div className="text-center">
              <p className="font-medium text-foreground">Request Logs Not Available</p>
              <p className="text-sm">
                This feature may not be included in your current Keygen plan.
              </p>
            </div>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
            No request data for the selected range.
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-requests)"
                    stopOpacity={0.9}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-requests)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="requests"
                type="natural"
                fill="url(#fillRequests)"
                stroke="var(--color-requests)"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
