'use client'

import { useState, useEffect } from 'react'
import { getKeygenApi } from '@/lib/api'
import { Environment, Group } from '@/lib/types/keygen'
import { handleCrudError, handleLoadError } from '@/lib/utils/error-handling'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

interface EditGroupDialogProps {
  group: Group
  open: boolean
  onOpenChange: (open: boolean) => void
  onGroupUpdated: () => void
}

export function EditGroupDialog({
  group,
  open,
  onOpenChange,
  onGroupUpdated
}: EditGroupDialogProps) {
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

  // Initialize form data when group changes
  useEffect(() => {
    if (group) {
      setFormData({
        name: group.attributes.name,
        maxLicenses: group.attributes.maxLicenses?.toString() || '',
        maxMachines: group.attributes.maxMachines?.toString() || '',
        maxUsers: group.attributes.maxUsers?.toString() || '',
        environmentId:
          (group.relationships?.environment?.data &&
            'id' in group.relationships.environment.data &&
            group.relationships.environment.data.id) ||
          '',
        metadata: group.attributes.metadata ? JSON.stringify(group.attributes.metadata, null, 2) : '',
      })
    }
  }, [group])

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

      const updates: {
        name: string;
        maxLicenses?: number;
        maxMachines?: number;
        maxUsers?: number;
        environmentId?: string | null;
        metadata?: Record<string, unknown>;
      } = {
        name: formData.name.trim(),
        environmentId: formData.environmentId || null,
        metadata,
      }

      // Add optional limits - use undefined for unlimited (empty string)
      updates.maxLicenses = formData.maxLicenses && parseInt(formData.maxLicenses) > 0 
        ? parseInt(formData.maxLicenses) 
        : undefined
      updates.maxMachines = formData.maxMachines && parseInt(formData.maxMachines) > 0 
        ? parseInt(formData.maxMachines) 
        : undefined
      updates.maxUsers = formData.maxUsers && parseInt(formData.maxUsers) > 0 
        ? parseInt(formData.maxUsers) 
        : undefined

      await api.groups.update(group.id, updates)
      onGroupUpdated()
    } catch (error: unknown) {
      handleCrudError(error, 'update', 'Group', {
        onNotFound: () => onGroupUpdated()
      })
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
            <DialogTitle>Edit Group</DialogTitle>
            <DialogDescription>
              Update the group configuration and limits.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Group Name *</Label>
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
              {loading ? 'Updating...' : 'Update Group'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
