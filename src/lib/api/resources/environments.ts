import { KeygenClient } from '../client'
import { KeygenResponse, Environment, PaginationOptions } from '@/lib/types/keygen'

type EnvironmentFilters = PaginationOptions

export class EnvironmentResource {
  constructor(private client: KeygenClient) {}

  async list(filters: EnvironmentFilters = {}): Promise<KeygenResponse<Environment[]>> {
    const params = {
      ...this.client.buildPaginationParams(filters),
    }
    return this.client.request<Environment[]>('environments', { params })
  }

  async get(id: string): Promise<KeygenResponse<Environment>> {
    return this.client.request<Environment>(`environments/${id}`)
  }

  async create(payload: {
    name: string
    code: string
    isolationStrategy?: string
  }): Promise<KeygenResponse<Environment>> {
    const body = {
      data: {
        type: 'environments',
        attributes: {
          name: payload.name,
          code: payload.code,
          ...(payload.isolationStrategy && { isolationStrategy: payload.isolationStrategy }),
        },
      },
    }

    return this.client.request<Environment>('environments', {
      method: 'POST',
      body,
    })
  }

  async update(id: string, updates: {
    name?: string
    code?: string
    isolationStrategy?: string
  }): Promise<KeygenResponse<Environment>> {
    const body = {
      data: {
        type: 'environments',
        id,
        attributes: updates,
      },
    }

    return this.client.request<Environment>(`environments/${id}`, {
      method: 'PATCH',
      body,
    })
  }

  async delete(id: string): Promise<void> {
    await this.client.request(`environments/${id}`, { method: 'DELETE' })
  }
}
