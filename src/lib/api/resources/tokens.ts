import { KeygenClient } from '../client'
import { KeygenResponse, Token, PaginationOptions } from '@/lib/types/keygen'

type TokenFilters = PaginationOptions

export class TokenResource {
  constructor(private client: KeygenClient) {}

  async list(filters: TokenFilters = {}): Promise<KeygenResponse<Token[]>> {
    const params = {
      ...this.client.buildPaginationParams(filters),
    }
    return this.client.request<Token[]>('tokens', { params })
  }

  async get(id: string): Promise<KeygenResponse<Token>> {
    return this.client.request<Token>(`tokens/${id}`)
  }

  async create(payload: {
    kind?: string
    expiry?: string | null
    permissions?: string[]
    name?: string
  }): Promise<KeygenResponse<Token>> {
    const body = {
      data: {
        type: 'tokens',
        attributes: {
          ...(payload.kind && { kind: payload.kind }),
          ...(payload.expiry !== undefined && { expiry: payload.expiry }),
          ...(payload.permissions && { permissions: payload.permissions }),
          ...(payload.name && { name: payload.name }),
        },
      },
    }

    return this.client.request<Token>('tokens', {
      method: 'POST',
      body,
    })
  }

  async regenerate(id: string): Promise<KeygenResponse<Token>> {
    return this.client.request<Token>(`tokens/${id}`, {
      method: 'PUT',
      body: {
        data: { type: 'tokens', id },
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.client.request(`tokens/${id}`, { method: 'DELETE' })
  }
}
