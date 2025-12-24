'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Edit } from 'lucide-react'
import { getKeygenApi } from '@/lib/api'
import type { LicenseAttributesInput } from '@/lib/api/resources/licenses'
import { toast } from 'sonner'
import { License } from '@/lib/types/keygen'
import { handleCrudError } from '@/lib/utils/error-handling'
import { parseOptionalNumber } from './utils'

interface EditLicenseDialogProps {
  license: License
  open: boolean
  onOpenChange: (open: boolean) => void
  onLicenseUpdated: () => void
}

export function EditLicenseDialog({ 
  license, 
  open, 
  onOpenChange, 
  onLicenseUpdated 
}: EditLicenseDialogProps) {
  const getInitialFormData = (current: License) => ({
    name: current.attributes.name || '',
    expiry: current.attributes.expiry ? current.attributes.expiry.split('T')[0] : '',
    maxUses: current.attributes.maxUses?.toString() || '',
    maxMachines: current.attributes.maxMachines?.toString() || '',
    maxCores: current.attributes.maxCores?.toString() || '',
    maxMemory: current.attributes.maxMemory?.toString() || '',
    maxDisk: current.attributes.maxDisk?.toString() || '',
    maxProcesses: current.attributes.maxProcesses?.toString() || '',
    maxUsers: current.attributes.maxUsers?.toString() || '',
    protected: current.attributes.protected ?? false,
    suspended: current.attributes.suspended ?? false,
    metadata: current.attributes.metadata ? JSON.stringify(current.attributes.metadata, null, 2) : ''
  })

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(getInitialFormData(license))
  const api = getKeygenApi()

  // Initialize form data when dialog opens
  useEffect(() => {
    if (open && license) {
      setFormData(getInitialFormData(license))
    }
  }, [open, license])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      
      const updates: LicenseAttributesInput = {}
      const existing = getInitialFormData(license)
      
      // Only include fields that have values or have changed
      if (formData.name.trim() !== existing.name) {
        updates.name = formData.name.trim() || undefined
      }
      
      if (formData.expiry !== existing.expiry) {
        updates.expiry = formData.expiry ? new Date(formData.expiry).toISOString() : undefined
      }
      
      if (formData.maxUses !== existing.maxUses) {
        updates.maxUses = parseOptionalNumber(formData.maxUses)
      }
      
      if (formData.maxMachines !== existing.maxMachines) {
        updates.maxMachines = parseOptionalNumber(formData.maxMachines)
      }

      if (formData.maxCores !== existing.maxCores) {
        updates.maxCores = parseOptionalNumber(formData.maxCores)
      }

      if (formData.maxMemory !== existing.maxMemory) {
        updates.maxMemory = parseOptionalNumber(formData.maxMemory)
      }

      if (formData.maxDisk !== existing.maxDisk) {
        updates.maxDisk = parseOptionalNumber(formData.maxDisk)
      }

      if (formData.maxProcesses !== existing.maxProcesses) {
        updates.maxProcesses = parseOptionalNumber(formData.maxProcesses)
      }

      if (formData.maxUsers !== existing.maxUsers) {
        updates.maxUsers = parseOptionalNumber(formData.maxUsers)
      }

      if (formData.protected !== existing.protected) {
        updates.protected = formData.protected
      }

      if (formData.suspended !== existing.suspended) {
        updates.suspended = formData.suspended
      }

      if (formData.metadata !== existing.metadata) {
        if (formData.metadata.trim()) {
          try {
            updates.metadata = JSON.parse(formData.metadata)
          } catch {
            updates.metadata = { notes: formData.metadata }
          }
        } else {
          updates.metadata = {}
        }
      }
      
      // Only make API call if there are actual updates
      if (Object.keys(updates).length > 0) {
        await api.licenses.update(license.id, updates)
        toast.success('License updated successfully')
      } else {
        toast.info('No changes to save')
      }
      
      onLicenseUpdated()
      onOpenChange(false)
    } catch (error: unknown) {
      handleCrudError(error, 'update', 'License')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit License
          </DialogTitle>
          <DialogDescription>
            Update license details and settings
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* License Key (Read-only) */}
          <div className="space-y-2">
            <Label>License Key</Label>
            <div className="p-2 bg-muted rounded-md font-mono text-sm">
              {license.attributes.key}
            </div>
            <p className="text-xs text-muted-foreground">
              License keys cannot be changed after creation
            </p>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter license name (optional)"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Flags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="protected"
                  checked={formData.protected}
                  onCheckedChange={(v) => setFormData({ ...formData, protected: Boolean(v) })}
                />
                <Label htmlFor="protected">Protected</Label>
              </div>
              <p className="text-xs text-muted-foreground">Prevent further edits to this license.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="suspended"
                  checked={formData.suspended}
                  onCheckedChange={(v) => setFormData({ ...formData, suspended: Boolean(v) })}
                />
                <Label htmlFor="suspended">Suspended</Label>
              </div>
              <p className="text-xs text-muted-foreground">Temporarily disable license usage.</p>
            </div>
          </div>

          {/* Expiry Date */}
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              id="expiry"
              type="date"
              value={formData.expiry}
              onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty for no expiration
            </p>
          </div>

          {/* Max Uses */}
          <div className="space-y-2">
            <Label htmlFor="maxUses">Maximum Uses</Label>
            <Input
              id="maxUses"
              type="number"
              min="0"
              placeholder="Unlimited"
              value={formData.maxUses}
              onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Maximum number of times this license can be used
            </p>
          </div>

          {/* Limits */}
          <div className="space-y-2">
            <Label>Resource Limits</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  id="maxMachines"
                  type="number"
                  min="0"
                  placeholder="Max machines (optional)"
                  value={formData.maxMachines}
                  onChange={(e) => setFormData({ ...formData, maxMachines: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Maximum machines that can attach.</p>
              </div>
              <div className="space-y-2">
                <Input
                  id="maxProcesses"
                  type="number"
                  min="0"
                  placeholder="Max processes (optional)"
                  value={formData.maxProcesses}
                  onChange={(e) => setFormData({ ...formData, maxProcesses: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Maximum processes allowed.</p>
              </div>
              <div className="space-y-2">
                <Input
                  id="maxCores"
                  type="number"
                  min="0"
                  placeholder="Max cores (optional)"
                  value={formData.maxCores}
                  onChange={(e) => setFormData({ ...formData, maxCores: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Limit total CPU cores.</p>
              </div>
              <div className="space-y-2">
                <Input
                  id="maxMemory"
                  type="number"
                  min="0"
                  placeholder="Max memory (optional)"
                  value={formData.maxMemory}
                  onChange={(e) => setFormData({ ...formData, maxMemory: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Limit total memory usage.</p>
              </div>
              <div className="space-y-2">
                <Input
                  id="maxDisk"
                  type="number"
                  min="0"
                  placeholder="Max disk (optional)"
                  value={formData.maxDisk}
                  onChange={(e) => setFormData({ ...formData, maxDisk: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Limit disk allocation.</p>
              </div>
              <div className="space-y-2">
                <Input
                  id="maxUsers"
                  type="number"
                  min="0"
                  placeholder="Max users (optional)"
                  value={formData.maxUsers}
                  onChange={(e) => setFormData({ ...formData, maxUsers: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Maximum associated users.</p>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-2">
            <Label htmlFor="metadata">Metadata (JSON)</Label>
            <Textarea
              id="metadata"
              placeholder='{&quot;key&quot;: &quot;value&quot;}'
              value={formData.metadata}
              onChange={(e) => setFormData({ ...formData, metadata: e.target.value })}
              rows={4}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Optional JSON metadata for custom tracking
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Updating...
                </>
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Update License
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
