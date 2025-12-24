import { KeygenClient } from '../client'
import { KeygenResponse, Process, PaginationOptions } from '@/lib/types/keygen'

type ProcessFilters = PaginationOptions & {
  machine?: string
  license?: string
  owner?: string
  user?: string
  product?: string
}

export class ProcessResource {
  constructor(private client: KeygenClient) {}

  async list(filters: ProcessFilters = {}): Promise<KeygenResponse<Process[]>> {
    const params: Record<string, unknown> = {
      ...this.client.buildPaginationParams(filters),
    }

    if (filters.machine) params.machine = filters.machine
    if (filters.license) params.license = filters.license
    if (filters.owner) params.owner = filters.owner
    if (filters.user) params.user = filters.user
    if (filters.product) params.product = filters.product

    return this.client.request<Process[]>('processes', { params })
  }

  async get(id: string): Promise<KeygenResponse<Process>> {
    return this.client.request<Process>(`processes/${id}`)
  }

  async create(payload: {
    machineId: string
    pid: number
    interval?: number
    metadata?: Record<string, unknown>
  }): Promise<KeygenResponse<Process>> {
    const body = {
      data: {
        type: 'processes',
        attributes: {
          pid: payload.pid,
          ...(payload.interval !== undefined && { interval: payload.interval }),
          ...(payload.metadata && { metadata: payload.metadata }),
        },
        relationships: {
          machine: {
            data: { type: 'machines', id: payload.machineId },
          },
        },
      },
    }

    return this.client.request<Process>('processes', {
      method: 'POST',
      body,
    })
  }

  async update(id: string, updates: {
    metadata?: Record<string, unknown>
    interval?: number
  }): Promise<KeygenResponse<Process>> {
    const body = {
      data: {
        type: 'processes',
        id,
        attributes: updates,
      },
    }

    return this.client.request<Process>(`processes/${id}`, {
      method: 'PATCH',
      body,
    })
  }

  async ping(id: string): Promise<KeygenResponse<Process>> {
    return this.client.request<Process>(`processes/${id}/actions/ping`, {
      method: 'POST',
    })
  }

  async delete(id: string): Promise<void> {
    await this.client.request(`processes/${id}`, { method: 'DELETE' })
  }
}
