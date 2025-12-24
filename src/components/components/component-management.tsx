'use client'

import { useCallback, useEffect, useState } from 'react'
import { getKeygenApi } from '@/lib/api'
import { Component, License, Machine, Product } from '@/lib/types/keygen'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { handleCrudError, handleLoadError } from '@/lib/utils/error-handling'
import { MoreVertical, Plus, Trash2 } from 'lucide-react'

const formatDate = (value?: string) => (value ? new Date(value).toLocaleString() : '—')

export function ComponentManagement() {
  const api = getKeygenApi()
  const [components, setComponents] = useState<Component[]>([])
  const [loading, setLoading] = useState(true)

  const loadComponents = useCallback(async () => {
    try {
      setLoading(true)
      const res = await api.components.list({ limit: 50 })
      setComponents(res.data || [])
    } catch (error: unknown) {
      handleLoadError(error, 'components')
    } finally {
      setLoading(false)
    }
  }, [api.components])

  useEffect(() => {
    loadComponents()
  }, [loadComponents])

  const handleDelete = async (id: string) => {
    try {
      await api.components.delete(id)
      await loadComponents()
      toast.success('Component deleted')
    } catch (error: unknown) {
      handleCrudError(error, 'delete', 'Component')
    }
  }

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Components</h1>
          <p className="text-muted-foreground">
            Track hardware components tied to machines and licenses
          </p>
        </div>
        <CreateComponentDialog onCreated={loadComponents} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Component List</CardTitle>
          <CardDescription>Fingerprint hardware to enforce anti-cloning rules.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading components...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Fingerprint</TableHead>
                  <TableHead>Machine</TableHead>
                  <TableHead>License</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {components.map(component => (
                  <TableRow key={component.id}>
                    <TableCell>{component.attributes.name || '—'}</TableCell>
                    <TableCell className="font-mono text-xs">{component.attributes.fingerprint}</TableCell>
                    <TableCell>
                      {Array.isArray(component.relationships?.machine?.data)
                        ? '—'
                        : component.relationships?.machine?.data?.id || '—'}
                    </TableCell>
                    <TableCell>
                      {Array.isArray(component.relationships?.license?.data)
                        ? '—'
                        : component.relationships?.license?.data?.id || '—'}
                    </TableCell>
                    <TableCell>
                      {Array.isArray(component.relationships?.product?.data)
                        ? '—'
                        : component.relationships?.product?.data?.id || '—'}
                    </TableCell>
                    <TableCell>{formatDate(component.attributes.created)}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleDelete(component.id)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {!loading && components.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-sm text-muted-foreground">
                      No components found
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

function CreateComponentDialog({ onCreated }: { onCreated: () => void }) {
  const api = getKeygenApi()
  const [open, setOpen] = useState(false)
  const [machines, setMachines] = useState<Machine[]>([])
  const [licenses, setLicenses] = useState<License[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [fingerprint, setFingerprint] = useState('')
  const [name, setName] = useState('')
  const [machineId, setMachineId] = useState('none')
  const [licenseId, setLicenseId] = useState('none')
  const [productId, setProductId] = useState('none')
  const [metadata, setMetadata] = useState('')
  const [loading, setLoading] = useState(false)

  const loadRelationships = useCallback(async () => {
    try {
      const [machineRes, licenseRes, productRes] = await Promise.all([
        api.machines.list({ limit: 100 }),
        api.licenses.list({ limit: 100 }),
        api.products.list({ limit: 100 }),
      ])
      setMachines(machineRes.data || [])
      setLicenses(licenseRes.data || [])
      setProducts(productRes.data || [])
    } catch (error: unknown) {
      handleLoadError(error, 'component relationships')
    }
  }, [api.machines, api.licenses, api.products])

  useEffect(() => {
    if (open) loadRelationships()
  }, [open, loadRelationships])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fingerprint) {
      toast.error('Fingerprint is required')
      return
    }
    try {
      setLoading(true)
      await api.components.create({
        fingerprint,
        name: name || undefined,
        machineId: machineId === 'none' ? undefined : machineId,
        licenseId: licenseId === 'none' ? undefined : licenseId,
        productId: productId === 'none' ? undefined : productId,
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
      setFingerprint('')
      setName('')
      setMachineId('none')
      setLicenseId('none')
      setProductId('none')
      setMetadata('')
      toast.success('Component created')
    } catch (error: unknown) {
      handleCrudError(error, 'create', 'Component')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Component
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>New Component</DialogTitle>
          <DialogDescription>Attach hardware fingerprints to machines/licenses to reduce cloning.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fingerprint">Fingerprint</Label>
            <Input
              id="fingerprint"
              value={fingerprint}
              onChange={(e) => setFingerprint(e.target.value)}
              required
              placeholder="Hardware fingerprint"
            />
            <p className="text-xs text-muted-foreground">Hardware identifier (e.g., CPU serial, MAC address hash).</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name (optional)</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="GPU, MOBO, DISK..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Machine (optional)</Label>
              <Select value={machineId} onValueChange={setMachineId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select machine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {machines.map(m => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.attributes.name || m.attributes.fingerprint}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Optional association to a machine for validation.</p>
            </div>
            <div className="space-y-2">
              <Label>License (optional)</Label>
              <Select value={licenseId} onValueChange={setLicenseId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select license" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {licenses.map(l => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.attributes.key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Tie the component to a license to enforce scopes.</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Product (optional)</Label>
            <Select value={productId} onValueChange={setProductId}>
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {products.map(p => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.attributes.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Associate to a product for reporting and scope checks.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="metadata">Metadata (JSON optional)</Label>
            <Textarea
              id="metadata"
              rows={3}
              value={metadata}
              onChange={(e) => setMetadata(e.target.value)}
              placeholder='{"slot":"primary"}'
            />
            <p className="text-xs text-muted-foreground">Attach structured data; parsed as JSON when valid.</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Component'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
