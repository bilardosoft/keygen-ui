import { KeygenClient } from '../client'
import { KeygenResponse, Component, PaginationOptions } from '@/lib/types/keygen'

type ComponentFilters = PaginationOptions & {
  machine?: string
  license?: string
  product?: string
}

export class ComponentResource {
  constructor(private client: KeygenClient) {}

  async list(filters: ComponentFilters = {}): Promise<KeygenResponse<Component[]>> {
    const params: Record<string, unknown> = {
      ...this.client.buildPaginationParams(filters),
    }

    if (filters.machine) params.machine = filters.machine
    if (filters.license) params.license = filters.license
    if (filters.product) params.product = filters.product

    return this.client.request<Component[]>('components', { params })
  }

  async get(id: string): Promise<KeygenResponse<Component>> {
    return this.client.request<Component>(`components/${id}`)
  }

  async create(payload: {
    fingerprint: string
    name?: string
    machineId?: string
    licenseId?: string
    productId?: string
    metadata?: Record<string, unknown>
  }): Promise<KeygenResponse<Component>> {
    const body = {
      data: {
        type: 'components',
        attributes: {
          fingerprint: payload.fingerprint,
          ...(payload.name && { name: payload.name }),
          ...(payload.metadata && { metadata: payload.metadata }),
        },
        relationships: {
          ...(payload.machineId && { machine: { data: { type: 'machines', id: payload.machineId } } }),
          ...(payload.licenseId && { license: { data: { type: 'licenses', id: payload.licenseId } } }),
          ...(payload.productId && { product: { data: { type: 'products', id: payload.productId } } }),
        },
      },
    }

    return this.client.request<Component>('components', {
      method: 'POST',
      body,
    })
  }

  async update(id: string, updates: {
    name?: string
    metadata?: Record<string, unknown>
  }): Promise<KeygenResponse<Component>> {
    const body = {
      data: {
        type: 'components',
        id,
        attributes: updates,
      },
    }

    return this.client.request<Component>(`components/${id}`, {
      method: 'PATCH',
      body,
    })
  }

  async delete(id: string): Promise<void> {
    await this.client.request(`components/${id}`, { method: 'DELETE' })
  }
}
