'use client'

import { useEffect, useState } from 'react'
import { getKeygenApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { handleFormError, handleLoadError } from '@/lib/utils/error-handling'
import { Environment } from '@/lib/types/keygen'

interface CreateGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGroupCreated: () => void
}

export function CreateGroupDialog({
  open,
  onOpenChange,
  onGroupCreated
}: CreateGroupDialogProps) {
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [environments, setEnvironments] = useState<Environment[]>([])
  const [formData, setFormData] = useState({
    name: '',
    maxLicenses: '',
    maxMachines: '',
    maxUsers: '',
    environmentId: '',
    metadata: ''
  })

  const api = getKeygenApi()

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.environments.list({ limit: 100 })
        setEnvironments(res.data || [])
      } catch (error) {
        handleLoadError(error, 'environments')
      } finally {
        setLoadingData(false)
      }
    }
    load()
  }, [api.environments])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('Group name is required')
      return
    }

    setLoading(true)
    
    try {
      let metadata: Record<string, unknown> | undefined
      if (formData.metadata.trim()) {
        try {
          metadata = JSON.parse(formData.metadata)
        } catch {
          toast.error('Metadata must be valid JSON')
          return
        }
      }

      const groupData: {
        name: string;
        maxLicenses?: number;
        maxMachines?: number;
        maxUsers?: number;
        environmentId?: string;
        metadata?: Record<string, unknown>;
      } = {
        name: formData.name.trim(),
        environmentId: formData.environmentId || undefined,
        metadata,
      }

      // Add optional limits if specified
      if (formData.maxLicenses && parseInt(formData.maxLicenses) > 0) {
        groupData.maxLicenses = parseInt(formData.maxLicenses)
      }
      if (formData.maxMachines && parseInt(formData.maxMachines) > 0) {
        groupData.maxMachines = parseInt(formData.maxMachines)
      }
      if (formData.maxUsers && parseInt(formData.maxUsers) > 0) {
        groupData.maxUsers = parseInt(formData.maxUsers)
      }

      await api.groups.create(groupData)
      
      // Reset form
      setFormData({
        name: '',
        maxLicenses: '',
        maxMachines: '',
        maxUsers: '',
        environmentId: '',
        metadata: ''
      })
      
      onGroupCreated()
    } catch (error: unknown) {
      handleFormError(error, 'Group')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Group</DialogTitle>
            <DialogDescription>
              Create a new group to organize users and licenses.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Group Name *</Label>
              <p className="text-xs text-muted-foreground">Friendly name to identify the group across dashboards.</p>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter group name"
                disabled={loading}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="environment">Environment</Label>
              <p className="text-xs text-muted-foreground">Optional: scope this group to an environment.</p>
              <Select
                value={formData.environmentId}
                onValueChange={(value) => handleInputChange('environmentId', value)}
                disabled={loading || loadingData}
              >
                <SelectTrigger>
                  <SelectValue placeholder="No environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No environment</SelectItem>
                  {environments.map((env) => (
                    <SelectItem key={env.id} value={env.id}>
                      {env.attributes.name} ({env.attributes.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="maxLicenses">Max Licenses</Label>
              <p className="text-xs text-muted-foreground">Optional limit on how many licenses this group can own.</p>
              <Input
                id="maxLicenses"
                type="number"
                min="0"
                value={formData.maxLicenses}
                onChange={(e) => handleInputChange('maxLicenses', e.target.value)}
                placeholder="Leave empty for unlimited"
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="maxMachines">Max Machines</Label>
              <p className="text-xs text-muted-foreground">Optional cap on the number of machines across the group.</p>
              <Input
                id="maxMachines"
                type="number"
                min="0"
                value={formData.maxMachines}
                onChange={(e) => handleInputChange('maxMachines', e.target.value)}
                placeholder="Leave empty for unlimited"
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="maxUsers">Max Users</Label>
              <p className="text-xs text-muted-foreground">Optional limit on members assigned to the group.</p>
              <Input
                id="maxUsers"
                type="number"
                min="0"
                value={formData.maxUsers}
                onChange={(e) => handleInputChange('maxUsers', e.target.value)}
                placeholder="Leave empty for unlimited"
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="metadata">Metadata</Label>
              <p className="text-xs text-muted-foreground">Optional JSON metadata (e.g., {"{"}"tier":"enterprise"{"}"}).</p>
              <Input
                id="metadata"
                value={formData.metadata}
                onChange={(e) => handleInputChange('metadata', e.target.value)}
                placeholder='{"tier":"enterprise"}'
                disabled={loading}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Group'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
