'use client'

import { useCallback, useEffect, useState } from 'react'
import { getKeygenApi } from '@/lib/api'
import { Environment } from '@/lib/types/keygen'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { handleCrudError, handleOptionalFeatureError } from '@/lib/utils/error-handling'
import { Edit, MoreVertical, Plus, Trash2, Lock } from 'lucide-react'

const formatDate = (value?: string) => (value ? new Date(value).toLocaleString() : '—')

export function EnvironmentManagement() {
  const api = getKeygenApi()
  const [environments, setEnvironments] = useState<Environment[]>([])
  const [loading, setLoading] = useState(true)
  const [featureUnavailable, setFeatureUnavailable] = useState(false)
  const [editEnv, setEditEnv] = useState<Environment | null>(null)

  const loadEnvironments = useCallback(async () => {
    try {
      setLoading(true)
      setFeatureUnavailable(false)
      const res = await api.environments.list({ limit: 50 })
      setEnvironments(res.data || [])
    } catch (error: unknown) {
      const isUnavailable = handleOptionalFeatureError(error, "environments", {
        onUnavailable: () => setFeatureUnavailable(true)
      })
      if (!isUnavailable) {
        setEnvironments([])
      }
    } finally {
      setLoading(false)
    }
  }, [api.environments])

  useEffect(() => {
    loadEnvironments()
  }, [loadEnvironments])

  const handleDelete = async (id: string) => {
    try {
      await api.environments.delete(id)
      await loadEnvironments()
      toast.success('Environment deleted')
    } catch (error: unknown) {
      handleCrudError(error, 'delete', 'Environment')
    }
  }

  if (featureUnavailable) {
    return (
      <div className="space-y-6 px-4 lg:px-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Environments</h1>
          <p className="text-muted-foreground">
            Segment resources by environment (sandbox, production)
          </p>
        </div>
        <Card>
          <CardContent className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8">
            <Lock className="h-16 w-16 text-muted-foreground opacity-50" />
            <div className="text-center">
              <h3 className="text-lg font-semibold">Environments Not Available</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                This feature may not be included in your current Keygen plan.
                <br />
                Contact your Keygen administrator to enable environment isolation.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Environments</h1>
          <p className="text-muted-foreground">
            Segment resources by environment (sandbox, production)
          </p>
        </div>
        <CreateEnvironmentDialog onCreated={loadEnvironments} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Environment List</CardTitle>
          <CardDescription>Manage environment isolation and codes used in API headers.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading environments...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Isolation</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {environments.map(env => (
                  <TableRow key={env.id}>
                    <TableCell>{env.attributes.name}</TableCell>
                    <TableCell>{env.attributes.code}</TableCell>
                    <TableCell>{env.attributes.isolationStrategy || 'shared'}</TableCell>
                    <TableCell>{formatDate(env.attributes.created)}</TableCell>
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
                          <DropdownMenuItem onClick={() => setEditEnv(env)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(env.id)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {!loading && environments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-sm text-muted-foreground">
                      No environments found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {editEnv && (
        <EditEnvironmentDialog
          environment={editEnv}
          onClose={() => setEditEnv(null)}
          onUpdated={loadEnvironments}
        />
      )}
    </div>
  )
}

function CreateEnvironmentDialog({ onCreated }: { onCreated: () => void }) {
  const api = getKeygenApi()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [isolationStrategy, setIsolationStrategy] = useState<string>('ISOLATED')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !code) {
      toast.error('Name and code are required')
      return
    }
    try {
      setLoading(true)
      await api.environments.create({ name, code, isolationStrategy })
      await onCreated()
      setOpen(false)
      setName('')
      setCode('')
      setIsolationStrategy('ISOLATED')
      toast.success('Environment created')
    } catch (error: unknown) {
      handleCrudError(error, 'create', 'Environment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Environment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>New Environment</DialogTitle>
          <DialogDescription>Use environments to isolate sandbox vs production resources.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="env-name">Name</Label>
            <Input
              id="env-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Display name for operators.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="env-code">Code</Label>
            <Input
              id="env-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Identifier passed via Keygen-Environment header or query.</p>
          </div>
          <div className="space-y-2">
            <Label>Isolation strategy</Label>
            <Select value={isolationStrategy} onValueChange={setIsolationStrategy}>
              <SelectTrigger>
                <SelectValue placeholder="Select strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ISOLATED">Isolated</SelectItem>
                <SelectItem value="SHARED">Shared</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Isolated environments require dedicated admins; shared reuse global data.</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Environment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditEnvironmentDialog({
  environment,
  onClose,
  onUpdated,
}: {
  environment: Environment
  onClose: () => void
  onUpdated: () => void
}) {
  const api = getKeygenApi()
  const [name, setName] = useState(environment.attributes.name)
  const [code, setCode] = useState(environment.attributes.code)
  const [isolationStrategy, setIsolationStrategy] = useState(environment.attributes.isolationStrategy || 'SHARED')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await api.environments.update(environment.id, {
        name,
        code,
        isolationStrategy,
      })
      await onUpdated()
      onClose()
      toast.success('Environment updated')
    } catch (error: unknown) {
      handleCrudError(error, 'update', 'Environment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit Environment</DialogTitle>
          <DialogDescription>Update environment name, code, or isolation strategy.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Code</Label>
            <Input value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Isolation strategy</Label>
            <Select value={isolationStrategy} onValueChange={setIsolationStrategy}>
              <SelectTrigger>
                <SelectValue placeholder="Select strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ISOLATED">Isolated</SelectItem>
                <SelectItem value="SHARED">Shared</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
