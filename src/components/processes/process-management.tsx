'use client'

import { useCallback, useEffect, useState } from 'react'
import { getKeygenApi } from '@/lib/api'
import { Machine, Process } from '@/lib/types/keygen'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from 'sonner'
import { handleCrudError, handleLoadError } from '@/lib/utils/error-handling'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MoreVertical, Play, Trash2, Plus, Activity } from 'lucide-react'

const formatDate = (dateString?: string) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleString()
}

export function ProcessManagement() {
  const api = getKeygenApi()
  const [processes, setProcesses] = useState<Process[]>([])
  const [loading, setLoading] = useState(true)

  const loadProcesses = useCallback(async () => {
    try {
      setLoading(true)
      const res = await api.processes.list({ limit: 50 })
      setProcesses(res.data || [])
    } catch (error: unknown) {
      handleLoadError(error, 'processes')
    } finally {
      setLoading(false)
    }
  }, [api.processes])

  useEffect(() => {
    loadProcesses()
  }, [loadProcesses])

  const handlePing = async (id: string) => {
    try {
      await api.processes.ping(id)
      await loadProcesses()
      toast.success('Heartbeat sent')
    } catch (error: unknown) {
      handleCrudError(error, 'update', 'Process', { customMessage: 'Failed to ping process' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await api.processes.delete(id)
      await loadProcesses()
      toast.success('Process deleted')
    } catch (error: unknown) {
      handleCrudError(error, 'delete', 'Process')
    }
  }

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Processes</h1>
          <p className="text-muted-foreground">
            Track per-machine processes and heartbeats
          </p>
        </div>
        <CreateProcessDialog onCreated={loadProcesses} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Process List</CardTitle>
          <CardDescription>Spawn processes against machines and keep them alive with heartbeats.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading processes...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Machine</TableHead>
                  <TableHead>Interval</TableHead>
                  <TableHead>Last heartbeat</TableHead>
                  <TableHead>Next heartbeat</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processes.map(proc => (
                  <TableRow key={proc.id}>
                    <TableCell className="font-mono text-sm">{proc.attributes.pid}</TableCell>
                    <TableCell className="capitalize">{proc.attributes.status || 'unknown'}</TableCell>
                    <TableCell>
                      {Array.isArray(proc.relationships?.machine?.data)
                        ? '—'
                        : proc.relationships?.machine?.data?.id || '—'}
                    </TableCell>
                    <TableCell>{proc.attributes.interval ? `${proc.attributes.interval}s` : '—'}</TableCell>
                    <TableCell>{formatDate(proc.attributes.lastHeartbeat)}</TableCell>
                    <TableCell>{formatDate(proc.attributes.nextHeartbeat)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handlePing(proc.id)}>
                            <Activity className="mr-2 h-4 w-4" />
                            Ping
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(proc.id)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {!loading && processes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-sm text-muted-foreground">
                      No processes found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function CreateProcessDialog({ onCreated }: { onCreated: () => void }) {
  const api = getKeygenApi()
  const [open, setOpen] = useState(false)
  const [machines, setMachines] = useState<Machine[]>([])
  const [machineId, setMachineId] = useState('')
  const [pid, setPid] = useState('')
  const [interval, setInterval] = useState('')
  const [metadata, setMetadata] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingMachines, setLoadingMachines] = useState(false)

  const loadMachines = useCallback(async () => {
    try {
      setLoadingMachines(true)
      const res = await api.machines.list({ limit: 100 })
      setMachines(res.data || [])
    } catch (error: unknown) {
      handleLoadError(error, 'machines')
    } finally {
      setLoadingMachines(false)
    }
  }, [api.machines])

  useEffect(() => {
    if (open) {
      loadMachines()
    }
  }, [open, loadMachines])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!machineId || !pid) {
      toast.error('Machine and PID are required')
      return
    }
    try {
      setLoading(true)
      await api.processes.create({
        machineId,
        pid: Number(pid),
        interval: interval ? Number(interval) : undefined,
        metadata: metadata
          ? (() => {
              try {
                return JSON.parse(metadata)
              } catch {
                return { note: metadata }
              }
            })()
          : undefined,
      })
      await onCreated()
      setOpen(false)
      setMachineId('')
      setPid('')
      setInterval('')
      setMetadata('')
      toast.success('Process created')
    } catch (error: unknown) {
      handleCrudError(error, 'create', 'Process')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Spawn Process
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            New Process
          </DialogTitle>
          <DialogDescription>Create a process under a machine to enforce concurrency limits.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Machine</Label>
            <Select value={machineId} onValueChange={setMachineId} disabled={loadingMachines}>
              <SelectTrigger>
                <SelectValue placeholder="Select machine" />
              </SelectTrigger>
              <SelectContent>
                {machines.map(m => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.attributes.name || m.attributes.fingerprint}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Processes must belong to a machine; heartbeats roll up to licenses.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pid">PID</Label>
            <Input
              id="pid"
              type="number"
              value={pid}
              onChange={(e) => setPid(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Process identifier reported by the client.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="interval">Heartbeat interval (seconds, optional)</Label>
            <Input
              id="interval"
              type="number"
              min="1"
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">How often the process should ping to stay alive.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="metadata">Metadata (JSON optional)</Label>
            <Textarea
              id="metadata"
              rows={3}
              value={metadata}
              onChange={(e) => setMetadata(e.target.value)}
              placeholder='{"hostname":"node-42"}'
            />
            <p className="text-xs text-muted-foreground">Attach extra diagnostics; parsed as JSON when valid.</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Process'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
