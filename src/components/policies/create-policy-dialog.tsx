'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { getKeygenApi } from '@/lib/api'
import { Product, Policy } from '@/lib/types/keygen'
import { handleFormError, handleLoadError } from '@/lib/utils/error-handling'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Textarea } from '@/components/ui/textarea'

type PolicyDialogMode = 'create' | 'edit'

type PolicyFormState = {
  name: string
  productId: string
  duration: string
  strict: boolean
  floating: boolean
  concurrent: boolean
  protected: boolean
  requireHeartbeat: boolean
  heartbeatDuration: string
  heartbeatCullStrategy: 'DEACTIVATE_DEAD' | 'KEEP_DEAD'
  heartbeatResurrectionStrategy: 'NO_REVIVE' | 'ALWAYS_REVIVE'
  heartbeatBasis: 'FROM_CREATION' | 'FROM_FIRST_VALIDATION'
  machineUniquenessStrategy:
    | 'UNIQUE_PER_LICENSE'
    | 'UNIQUE_PER_ACCOUNT'
    | 'UNIQUE_PER_PRODUCT'
    | 'UNIQUE_PER_POLICY'
  machineMatchingStrategy: 'MATCH_ANY' | 'MATCH_TWO' | 'MATCH_MOST' | 'MATCH_ALL'
  expirationStrategy: 'RESTRICT_ACCESS' | 'REVOKE_ACCESS' | 'MAINTAIN_ACCESS'
  expirationBasis:
    | 'FROM_CREATION'
    | 'FROM_FIRST_VALIDATION'
    | 'FROM_FIRST_ACTIVATION'
    | 'FROM_FIRST_DOWNLOAD'
    | 'FROM_FIRST_USE'
  renewalBasis: 'FROM_EXPIRY' | 'FROM_NOW'
  transferStrategy: 'RESET_EXPIRY' | 'KEEP_EXPIRY'
  authenticationStrategy: 'TOKEN' | 'LICENSE' | 'MIXED' | 'NONE'
  machineLeasingStrategy: 'PER_LICENSE' | 'PER_USER' | 'ALWAYS_ALLOW'
  processLeasingStrategy: 'PER_MACHINE' | 'PER_LICENSE' | 'PER_USER' | 'ALWAYS_ALLOW'
  overageStrategy:
    | 'NO_OVERAGE'
    | 'ALWAYS_ALLOW_OVERAGE'
    | 'ALLOW_1_25X_OVERAGE'
    | 'ALLOW_1_5X_OVERAGE'
    | 'ALLOW_2X_OVERAGE'
  maxMachines: string
  maxProcesses: string
  maxCores: string
  maxUses: string
  metadata: string
}

const defaultFormState: PolicyFormState = {
  name: '',
  productId: '',
  duration: '',
  strict: false,
  floating: false,
  concurrent: false,
  protected: false,
  requireHeartbeat: false,
  heartbeatDuration: '3600',
  heartbeatCullStrategy: 'DEACTIVATE_DEAD',
  heartbeatResurrectionStrategy: 'NO_REVIVE',
  heartbeatBasis: 'FROM_CREATION',
  machineUniquenessStrategy: 'UNIQUE_PER_LICENSE',
  machineMatchingStrategy: 'MATCH_ANY',
  expirationStrategy: 'RESTRICT_ACCESS',
  expirationBasis: 'FROM_CREATION',
  renewalBasis: 'FROM_EXPIRY',
  transferStrategy: 'RESET_EXPIRY',
  authenticationStrategy: 'TOKEN',
  machineLeasingStrategy: 'PER_LICENSE',
  processLeasingStrategy: 'PER_MACHINE',
  overageStrategy: 'NO_OVERAGE',
  maxMachines: '',
  maxProcesses: '',
  maxCores: '',
  maxUses: '',
  metadata: '',
}

interface CreatePolicyDialogProps {
  mode?: PolicyDialogMode
  policy?: Policy | null
  onPolicySaved?: () => void
  onPolicyCreated?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  hideTrigger?: boolean
  trigger?: React.ReactNode
}

const toFormState = (policy?: Policy | null): PolicyFormState => {
  if (!policy) return defaultFormState

  const attrs = policy.attributes
  const relationships = policy.relationships?.product?.data

  return {
    name: attrs.name ?? '',
    productId: typeof relationships === 'object' && 'id' in relationships ? relationships.id : '',
    duration: attrs.duration ? attrs.duration.toString() : '',
    strict: !!attrs.strict,
    floating: !!attrs.floating,
    concurrent: !!attrs.concurrent,
    protected: !!attrs.protected,
    requireHeartbeat: !!attrs.requireHeartbeat,
    heartbeatDuration: attrs.heartbeatDuration
      ? attrs.heartbeatDuration.toString()
      : defaultFormState.heartbeatDuration,
    heartbeatCullStrategy: attrs.heartbeatCullStrategy ?? 'DEACTIVATE_DEAD',
    heartbeatResurrectionStrategy: attrs.heartbeatResurrectionStrategy ?? 'NO_REVIVE',
    heartbeatBasis: attrs.heartbeatBasis ?? 'FROM_CREATION',
    machineUniquenessStrategy: attrs.machineUniquenessStrategy ?? 'UNIQUE_PER_LICENSE',
    machineMatchingStrategy: attrs.machineMatchingStrategy ?? 'MATCH_ANY',
    expirationStrategy: attrs.expirationStrategy ?? 'RESTRICT_ACCESS',
    expirationBasis: attrs.expirationBasis ?? 'FROM_CREATION',
    renewalBasis: attrs.renewalBasis ?? 'FROM_EXPIRY',
    transferStrategy: attrs.transferStrategy ?? 'RESET_EXPIRY',
    authenticationStrategy: attrs.authenticationStrategy ?? 'TOKEN',
    machineLeasingStrategy: attrs.machineLeasingStrategy ?? 'PER_LICENSE',
    processLeasingStrategy: attrs.processLeasingStrategy ?? 'PER_MACHINE',
    overageStrategy: attrs.overageStrategy ?? 'NO_OVERAGE',
    maxMachines: attrs.maxMachines?.toString() ?? '',
    maxProcesses: attrs.maxProcesses?.toString() ?? '',
    maxCores: attrs.maxCores?.toString() ?? '',
    maxUses: attrs.maxUses?.toString() ?? '',
    metadata: attrs.metadata ? JSON.stringify(attrs.metadata, null, 2) : '',
  }
}

export function CreatePolicyDialog({
  mode = 'create',
  policy,
  onPolicySaved,
  onPolicyCreated,
  open,
  onOpenChange,
  hideTrigger,
  trigger,
}: CreatePolicyDialogProps) {
  const isEdit = mode === 'edit'
  const api = getKeygenApi()

  const [internalOpen, setInternalOpen] = useState(false)
  const dialogOpen = open ?? internalOpen
  const setDialogOpen = (value: boolean) => {
    onOpenChange?.(value)
    if (open === undefined) {
      setInternalOpen(value)
    }
  }

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [productsLoading, setProductsLoading] = useState(false)
  const [formData, setFormData] = useState<PolicyFormState>(() => toFormState(policy))

  const resetForm = useCallback(() => {
    setFormData(toFormState(policy))
  }, [policy])

  const loadProducts = useCallback(async () => {
    try {
      setProductsLoading(true)
      const response = await api.products.list({ limit: 50 })
      setProducts(response.data || [])
    } catch (error: unknown) {
      handleLoadError(error, 'products')
    } finally {
      setProductsLoading(false)
    }
  }, [api.products])

  useEffect(() => {
    if (dialogOpen) {
      if (products.length === 0) {
        loadProducts()
      }
      resetForm()
    }
  }, [dialogOpen, loadProducts, products.length, resetForm])

  const numberFromInput = useCallback((value: string) => {
    if (!value.trim()) return undefined
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : undefined
  }, [])

  const parsedMetadata = useMemo(() => {
    if (!formData.metadata.trim()) return undefined
    try {
      return JSON.parse(formData.metadata)
    } catch {
      return { notes: formData.metadata.trim() }
    }
  }, [formData.metadata])

  const buildPayload = () => {
    const payload = {
      name: formData.name.trim(),
      productId: formData.productId,
      duration: numberFromInput(formData.duration),
      strict: formData.strict,
      floating: formData.floating,
      concurrent: formData.concurrent,
      protected: formData.protected,
      maxMachines: numberFromInput(formData.maxMachines),
      maxProcesses: numberFromInput(formData.maxProcesses),
      maxCores: numberFromInput(formData.maxCores),
      maxUses: numberFromInput(formData.maxUses),
      requireHeartbeat: formData.requireHeartbeat,
      heartbeatDuration: formData.requireHeartbeat
        ? numberFromInput(formData.heartbeatDuration)
        : undefined,
      heartbeatCullStrategy: formData.requireHeartbeat
        ? formData.heartbeatCullStrategy
        : undefined,
      heartbeatResurrectionStrategy: formData.requireHeartbeat
        ? formData.heartbeatResurrectionStrategy
        : undefined,
      heartbeatBasis: formData.requireHeartbeat ? formData.heartbeatBasis : undefined,
      machineUniquenessStrategy: formData.machineUniquenessStrategy,
      machineMatchingStrategy: formData.machineMatchingStrategy,
      expirationStrategy: formData.expirationStrategy,
      expirationBasis: formData.expirationBasis,
      renewalBasis: formData.renewalBasis,
      transferStrategy: formData.transferStrategy,
      authenticationStrategy: formData.authenticationStrategy,
      machineLeasingStrategy: formData.machineLeasingStrategy,
      processLeasingStrategy: formData.processLeasingStrategy,
      overageStrategy: formData.overageStrategy,
      metadata: parsedMetadata,
    }

    if (!payload.requireHeartbeat) {
      delete (payload as Record<string, unknown>).heartbeatDuration
      delete (payload as Record<string, unknown>).heartbeatCullStrategy
      delete (payload as Record<string, unknown>).heartbeatResurrectionStrategy
      delete (payload as Record<string, unknown>).heartbeatBasis
    }

    return payload
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error('Policy name is required')
      return
    }

    if (!isEdit && !formData.productId) {
      toast.error('Please select a product')
      return
    }

    if (formData.metadata.trim()) {
      try {
        JSON.parse(formData.metadata)
      } catch {
        toast.error('Metadata must be valid JSON')
        return
      }
    }

    const payload = buildPayload()

    try {
      setLoading(true)

      if (isEdit && policy) {
        const { productId: _omitProduct, ...updatePayload } = payload
        await api.policies.update(policy.id, updatePayload)
        toast.success('Policy updated successfully')
      } else {
        await api.policies.create(payload)
        toast.success('Policy created successfully')
        onPolicyCreated?.()
      }

      onPolicySaved?.()
      setDialogOpen(false)
      resetForm()
    } catch (error: unknown) {
      handleFormError(error, 'Policy')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {!hideTrigger && (
        <DialogTrigger asChild>
          {trigger ?? (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Policy
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[720px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Policy' : 'Create New Policy'}</DialogTitle>
          <DialogDescription>
            Configure licensing rules, limits, and protections for your product policies.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Basic Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Policy Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Standard License Policy"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product">Product *</Label>
                <Select
                  value={formData.productId}
                  onValueChange={(value) => setFormData({ ...formData, productId: value })}
                  disabled={isEdit}
                  required
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        productsLoading ? 'Loading products...' : 'Select a product'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.attributes.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Choose which product this policy applies to
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (seconds)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="e.g., 86400 (1 day)"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Leave empty for no expiration</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Policy Type</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="strict"
                  checked={formData.strict}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, strict: !!checked })
                  }
                />
                <Label htmlFor="strict">Strict validation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="floating"
                  checked={formData.floating}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, floating: !!checked })
                  }
                />
                <Label htmlFor="floating">Floating license</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="concurrent"
                  checked={formData.concurrent}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, concurrent: !!checked })
                  }
                />
                <Label htmlFor="concurrent">Allow concurrent usage</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="protected"
                  checked={formData.protected}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, protected: !!checked })
                  }
                />
                <Label htmlFor="protected">Write-protected</Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Heartbeat Settings</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requireHeartbeat"
                  checked={formData.requireHeartbeat}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, requireHeartbeat: !!checked })
                  }
                />
                <Label htmlFor="requireHeartbeat">Require heartbeat</Label>
              </div>

              {formData.requireHeartbeat && (
                <div className="ml-6 grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="heartbeatDuration">Heartbeat Duration (seconds)</Label>
                    <Input
                      id="heartbeatDuration"
                      type="number"
                      value={formData.heartbeatDuration}
                      onChange={(e) =>
                        setFormData({ ...formData, heartbeatDuration: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heartbeatCullStrategy">Cull Strategy</Label>
                    <Select
                      value={formData.heartbeatCullStrategy}
                      onValueChange={(value: 'DEACTIVATE_DEAD' | 'KEEP_DEAD') =>
                        setFormData({ ...formData, heartbeatCullStrategy: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DEACTIVATE_DEAD">Deactivate Dead</SelectItem>
                        <SelectItem value="KEEP_DEAD">Keep Dead</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heartbeatBasis">Heartbeat Basis</Label>
                    <Select
                      value={formData.heartbeatBasis}
                      onValueChange={(value: 'FROM_CREATION' | 'FROM_FIRST_VALIDATION') =>
                        setFormData({ ...formData, heartbeatBasis: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FROM_CREATION">From Creation</SelectItem>
                        <SelectItem value="FROM_FIRST_VALIDATION">
                          From First Validation
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Limits</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxMachines">Max Machines</Label>
                <Input
                  id="maxMachines"
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.maxMachines}
                  onChange={(e) =>
                    setFormData({ ...formData, maxMachines: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxProcesses">Max Processes</Label>
                <Input
                  id="maxProcesses"
                  type="number"
                  placeholder="e.g., 3"
                  value={formData.maxProcesses}
                  onChange={(e) =>
                    setFormData({ ...formData, maxProcesses: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxCores">Max Cores</Label>
                <Input
                  id="maxCores"
                  type="number"
                  placeholder="e.g., 16"
                  value={formData.maxCores}
                  onChange={(e) => setFormData({ ...formData, maxCores: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxUses">Max Uses</Label>
                <Input
                  id="maxUses"
                  type="number"
                  placeholder="e.g., 100"
                  value={formData.maxUses}
                  onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Advanced Settings</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expirationStrategy">Expiration Strategy</Label>
                <Select
                  value={formData.expirationStrategy}
                  onValueChange={(value: PolicyFormState['expirationStrategy']) =>
                    setFormData({ ...formData, expirationStrategy: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RESTRICT_ACCESS">Restrict Access</SelectItem>
                    <SelectItem value="REVOKE_ACCESS">Revoke Access</SelectItem>
                    <SelectItem value="MAINTAIN_ACCESS">Maintain Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="authenticationStrategy">Authentication Strategy</Label>
                <Select
                  value={formData.authenticationStrategy}
                  onValueChange={(value: PolicyFormState['authenticationStrategy']) =>
                    setFormData({ ...formData, authenticationStrategy: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TOKEN">Token</SelectItem>
                    <SelectItem value="LICENSE">License</SelectItem>
                    <SelectItem value="MIXED">Mixed</SelectItem>
                    <SelectItem value="NONE">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="machineUniquenessStrategy">Machine Uniqueness</Label>
                <Select
                  value={formData.machineUniquenessStrategy}
                  onValueChange={(value: PolicyFormState['machineUniquenessStrategy']) =>
                    setFormData({ ...formData, machineUniquenessStrategy: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UNIQUE_PER_LICENSE">Unique per License</SelectItem>
                    <SelectItem value="UNIQUE_PER_ACCOUNT">Unique per Account</SelectItem>
                    <SelectItem value="UNIQUE_PER_PRODUCT">Unique per Product</SelectItem>
                    <SelectItem value="UNIQUE_PER_POLICY">Unique per Policy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="machineMatchingStrategy">Machine Matching</Label>
                <Select
                  value={formData.machineMatchingStrategy}
                  onValueChange={(value: PolicyFormState['machineMatchingStrategy']) =>
                    setFormData({ ...formData, machineMatchingStrategy: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MATCH_ANY">Match Any</SelectItem>
                    <SelectItem value="MATCH_TWO">Match Two</SelectItem>
                    <SelectItem value="MATCH_MOST">Match Most</SelectItem>
                    <SelectItem value="MATCH_ALL">Match All</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="machineLeasingStrategy">Machine Leasing</Label>
                <Select
                  value={formData.machineLeasingStrategy}
                  onValueChange={(value: PolicyFormState['machineLeasingStrategy']) =>
                    setFormData({ ...formData, machineLeasingStrategy: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PER_LICENSE">Per License</SelectItem>
                    <SelectItem value="PER_USER">Per User</SelectItem>
                    <SelectItem value="ALWAYS_ALLOW">Always Allow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="processLeasingStrategy">Process Leasing</Label>
                <Select
                  value={formData.processLeasingStrategy}
                  onValueChange={(value: PolicyFormState['processLeasingStrategy']) =>
                    setFormData({ ...formData, processLeasingStrategy: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PER_MACHINE">Per Machine</SelectItem>
                    <SelectItem value="PER_LICENSE">Per License</SelectItem>
                    <SelectItem value="PER_USER">Per User</SelectItem>
                    <SelectItem value="ALWAYS_ALLOW">Always Allow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="overageStrategy">Overage Strategy</Label>
                <Select
                  value={formData.overageStrategy}
                  onValueChange={(value: PolicyFormState['overageStrategy']) =>
                    setFormData({ ...formData, overageStrategy: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NO_OVERAGE">No Overage</SelectItem>
                    <SelectItem value="ALLOW_1_25X_OVERAGE">Allow 1.25x Overage</SelectItem>
                    <SelectItem value="ALLOW_1_5X_OVERAGE">Allow 1.5x Overage</SelectItem>
                    <SelectItem value="ALLOW_2X_OVERAGE">Allow 2x Overage</SelectItem>
                    <SelectItem value="ALWAYS_ALLOW_OVERAGE">Always Allow Overage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transferStrategy">Transfer Strategy</Label>
                <Select
                  value={formData.transferStrategy}
                  onValueChange={(value: PolicyFormState['transferStrategy']) =>
                    setFormData({ ...formData, transferStrategy: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RESET_EXPIRY">Reset Expiry</SelectItem>
                    <SelectItem value="KEEP_EXPIRY">Keep Expiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expirationBasis">Expiration Basis</Label>
                <Select
                  value={formData.expirationBasis}
                  onValueChange={(value: PolicyFormState['expirationBasis']) =>
                    setFormData({ ...formData, expirationBasis: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FROM_CREATION">From Creation</SelectItem>
                    <SelectItem value="FROM_FIRST_VALIDATION">
                      From First Validation
                    </SelectItem>
                    <SelectItem value="FROM_FIRST_ACTIVATION">
                      From First Activation
                    </SelectItem>
                    <SelectItem value="FROM_FIRST_DOWNLOAD">From First Download</SelectItem>
                    <SelectItem value="FROM_FIRST_USE">From First Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="renewalBasis">Renewal Basis</Label>
                <Select
                  value={formData.renewalBasis}
                  onValueChange={(value: PolicyFormState['renewalBasis']) =>
                    setFormData({ ...formData, renewalBasis: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FROM_EXPIRY">From Expiry</SelectItem>
                    <SelectItem value="FROM_NOW">From Now</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="metadata">Metadata (Optional)</Label>
            <Textarea
            id="metadata"
            placeholder='{"description": "Policy description", "tags": ["enterprise"]}'
            value={formData.metadata}
            onChange={(e) => setFormData({ ...formData, metadata: e.target.value })}
            rows={3}
          />
            <p className="text-xs text-muted-foreground">
              Optional JSON metadata for the policy
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (isEdit ? 'Saving...' : 'Creating...') : isEdit ? 'Save Changes' : 'Create Policy'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
