'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus } from 'lucide-react'
import { getKeygenApi } from '@/lib/api'
import { Group, License, User } from '@/lib/types/keygen'
import { handleFormError, handleLoadError } from '@/lib/utils/error-handling'
import { toast } from 'sonner'

interface ActivateMachineDialogProps {
  onMachineActivated?: () => void
}

export function ActivateMachineDialog({ onMachineActivated }: ActivateMachineDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [licenses, setLicenses] = useState<License[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [formData, setFormData] = useState({
    fingerprint: '',
    licenseId: '',
    name: '',
    platform: '',
    hostname: '',
    cores: '',
    memory: '',
    disk: '',
    ip: '',
    metadata: '',
    userId: 'none',
    groupId: 'none'
  })

  const api = getKeygenApi()

  const loadInitialData = useCallback(async () => {
    try {
      setLoadingData(true)
      // Load active licenses for machine activation
      const licensesResponse = await api.licenses.list({ 
        limit: 100,
        // Only get active licenses
      })
      const [usersResponse, groupsResponse] = await Promise.all([
        api.users.list({ limit: 100 }),
        api.groups.list({ limit: 100 }),
      ])
      setLicenses(licensesResponse.data?.filter(license => 
        license.attributes.status === 'active'
      ) || [])
      setUsers(usersResponse.data || [])
      setGroups(groupsResponse.data || [])
    } catch (error: unknown) {
      handleLoadError(error, 'machine activation data')
    } finally {
      setLoadingData(false)
    }
  }, [api.licenses])

  useEffect(() => {
    if (open) {
      loadInitialData()
    }
  }, [open, loadInitialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.fingerprint.trim()) {
      toast.error('Machine fingerprint is required')
      return
    }
    
    if (!formData.licenseId) {
      toast.error('Please select a license')
      return
    }

    try {
      setLoading(true)
      
      await api.machines.activate({
        fingerprint: formData.fingerprint.trim(),
        licenseId: formData.licenseId,
        name: formData.name.trim() || undefined,
        platform: formData.platform.trim() || undefined,
        hostname: formData.hostname.trim() || undefined,
        cores: formData.cores ? parseInt(formData.cores) : undefined,
        memory: formData.memory ? parseInt(formData.memory) : undefined,
        disk: formData.disk ? parseInt(formData.disk) : undefined,
        ip: formData.ip.trim() || undefined,
        metadata: parseMetadata(formData.metadata),
        userId: formData.userId === 'none' ? undefined : formData.userId,
        groupId: formData.groupId === 'none' ? undefined : formData.groupId,
      })

      toast.success('Machine activated successfully')
      setOpen(false)
        setFormData({
          fingerprint: '',
          licenseId: '',
          name: '',
          platform: '',
          hostname: '',
          cores: '',
          memory: '',
          disk: '',
          ip: '',
          metadata: '',
          userId: 'none',
          groupId: 'none'
        })
      onMachineActivated?.()
    } catch (error: unknown) {
      handleFormError(error, 'Machine')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Activate Machine
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Activate New Machine</DialogTitle>
          <DialogDescription>
            Activate a new machine by assigning it to a license. The machine fingerprint uniquely identifies the device.
          </DialogDescription>
        </DialogHeader>
        {loadingData ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">Loading licenses...</div>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="fingerprint">Machine Fingerprint *</Label>
              <p className="text-xs text-muted-foreground">Hardware-derived identifier used to tie the device to a license.</p>
              <Input
                id="fingerprint"
                placeholder="e.g., 1A2B3C4D5E6F7G8H9I0J"
                value={formData.fingerprint}
                onChange={(e) => setFormData({ ...formData, fingerprint: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">
                Unique identifier for this machine (hardware-based fingerprint)
              </p>
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="license">License *</Label>
              <p className="text-xs text-muted-foreground">Select an active license to bind this machine activation.</p>
              <Select
                value={formData.licenseId}
                onValueChange={(value) => setFormData({ ...formData, licenseId: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a license" />
                </SelectTrigger>
                <SelectContent>
                  {licenses.map((license) => (
                    <SelectItem key={license.id} value={license.id}>
                      {license.attributes.name || license.attributes.key} 
                      {license.attributes.maxUses && (
                        <span className="text-muted-foreground ml-2">
                          ({license.attributes.uses}/{license.attributes.maxUses} uses)
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Machine Name</Label>
              <p className="text-xs text-muted-foreground">Optional friendly label for the device.</p>
              <Input
                id="name"
                placeholder="e.g., John's Workstation"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <p className="text-xs text-muted-foreground">Operating system or runtime the machine is running.</p>
              <Input
                id="platform"
                placeholder="e.g., Windows, macOS, Linux"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hostname">Hostname</Label>
              <p className="text-xs text-muted-foreground">Optional network hostname for troubleshooting.</p>
              <Input
                id="hostname"
                placeholder="e.g., DESKTOP-ABC123"
                value={formData.hostname}
                onChange={(e) => setFormData({ ...formData, hostname: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cores">CPU Cores</Label>
              <p className="text-xs text-muted-foreground">Number of CPU cores to enforce core-based limits.</p>
              <Input
                id="cores"
                type="number"
                placeholder="e.g., 8"
                value={formData.cores}
                onChange={(e) => setFormData({ ...formData, cores: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="memory">Memory (MB)</Label>
              <p className="text-xs text-muted-foreground">Optional memory amount to enforce memory-based limits.</p>
              <Input
                id="memory"
                type="number"
                placeholder="e.g., 16384"
                value={formData.memory}
                onChange={(e) => setFormData({ ...formData, memory: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disk">Disk (MB)</Label>
              <p className="text-xs text-muted-foreground">Optional disk capacity for quota-aware policies.</p>
              <Input
                id="disk"
                type="number"
                placeholder="e.g., 256000"
                value={formData.disk}
                onChange={(e) => setFormData({ ...formData, disk: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ip">IP Address</Label>
            <p className="text-xs text-muted-foreground">Optional last known IP address for audit trails.</p>
            <Input
              id="ip"
              placeholder="e.g., 192.168.1.100"
              value={formData.ip}
              onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Owner (User, optional)</Label>
              <p className="text-xs text-muted-foreground">Assign the machine owner to align with license scopes.</p>
              <Select
                value={formData.userId}
                onValueChange={(value) => setFormData({ ...formData, userId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.attributes.email}
                  </SelectItem>
                ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Group (optional)</Label>
              <p className="text-xs text-muted-foreground">Group association for quotas and reporting.</p>
              <Select
                value={formData.groupId}
                onValueChange={(value) => setFormData({ ...formData, groupId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {groups.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.attributes.name}
                  </SelectItem>
                ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="metadata">Metadata (JSON optional)</Label>
            <p className="text-xs text-muted-foreground">Attach custom key/values (e.g., region, assetId).</p>
            <Input
              id="metadata"
              placeholder='{"region":"us-east-1"}'
              value={formData.metadata}
              onChange={(e) => setFormData({ ...formData, metadata: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Activating...' : 'Activate Machine'}
            </Button>
          </DialogFooter>
        </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

function parseMetadata(value: string) {
  if (!value.trim()) return undefined
  try {
    return JSON.parse(value)
  } catch {
    return { note: value }
  }
}
