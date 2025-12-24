'use client'

import { useCallback, useEffect, useState } from 'react'
import { getKeygenApi } from '@/lib/api'
import { Token } from '@/lib/types/keygen'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { handleCrudError, handleLoadError } from '@/lib/utils/error-handling'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreVertical, Plus, RefreshCw, Trash2, KeyRound } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const formatDate = (dateString?: string | null) => {
  if (!dateString) return 'Never'
  return new Date(dateString).toLocaleString()
}

export function TokenManagement() {
  const api = getKeygenApi()
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(true)

  const loadTokens = useCallback(async () => {
    try {
      setLoading(true)
      const res = await api.tokens.list({ limit: 50 })
      setTokens(res.data || [])
    } catch (error: unknown) {
      handleLoadError(error, 'tokens')
    } finally {
      setLoading(false)
    }
  }, [api.tokens])

  useEffect(() => {
    loadTokens()
  }, [loadTokens])

  const handleRegenerate = async (id: string) => {
    try {
      const res = await api.tokens.regenerate(id)
      const newToken = res.data?.attributes.token
      await loadTokens()
      if (newToken) {
        navigator.clipboard.writeText(newToken)
        toast.success('Token regenerated and copied to clipboard')
      } else {
        toast.success('Token regenerated')
      }
    } catch (error: unknown) {
      handleCrudError(error, 'update', 'Token', { customMessage: 'Failed to regenerate token' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await api.tokens.delete(id)
      await loadTokens()
      toast.success('Token deleted')
    } catch (error: unknown) {
      handleCrudError(error, 'delete', 'Token')
    }
  }

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tokens</h1>
          <p className="text-muted-foreground">
            Manage API tokens for authentication
          </p>
        </div>
        <CreateTokenDialog onCreated={loadTokens} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Token List</CardTitle>
          <CardDescription>Rotate or revoke tokens. Regenerate copies the new secret to your clipboard.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading tokens...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kind</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokens.map(token => (
                  <TableRow key={token.id}>
                    <TableCell className="font-medium">{token.attributes.kind}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {token.attributes.permissions?.join(', ') || '—'}
                    </TableCell>
                    <TableCell>{formatDate(token.attributes.expiry)}</TableCell>
                    <TableCell>{formatDate(token.attributes.created)}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleRegenerate(token.id)}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Regenerate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(token.id)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {!loading && tokens.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-sm text-muted-foreground">
                      No tokens found
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

function CreateTokenDialog({ onCreated }: { onCreated: () => void }) {
  const api = getKeygenApi()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [kind, setKind] = useState<string>('user-token')
  const [expiry, setExpiry] = useState<string>('')
  const [permissions, setPermissions] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await api.tokens.create({
        kind,
        expiry: expiry ? new Date(expiry).toISOString() : null,
        permissions: permissions
          ? permissions.split(',').map(p => p.trim()).filter(Boolean)
          : undefined,
      })
      const tokenValue = res.data?.attributes.token
      await onCreated()
      setOpen(false)
      if (tokenValue) {
        navigator.clipboard.writeText(tokenValue)
        toast.success('Token created and copied to clipboard')
      } else {
        toast.success('Token created')
      }
      setKind('user-token')
      setExpiry('')
      setPermissions('')
    } catch (error: unknown) {
      handleCrudError(error, 'create', 'Token')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Token
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            New Token
          </DialogTitle>
          <DialogDescription>Generate API tokens for automation and client flows.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Kind</Label>
            <Select value={kind} onValueChange={setKind}>
              <SelectTrigger>
                <SelectValue placeholder="Select kind" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user-token">User token</SelectItem>
                <SelectItem value="license-token">License token</SelectItem>
                <SelectItem value="product-token">Product token</SelectItem>
                <SelectItem value="environment-token">Environment token</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Choose the token type; permissions inherit from the bearer.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry (optional)</Label>
            <Input
              id="expiry"
              type="datetime-local"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Leave empty for non-expiring tokens or set a sunset date.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="permissions">Permissions (optional)</Label>
            <Input
              id="permissions"
              placeholder="comma-separated, e.g. license.read,license.validate"
              value={permissions}
              onChange={(e) => setPermissions(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Override default scopes with explicit permissions.</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Token'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
