import { KeygenClient } from '../client';
import { License, LicenseFilters, KeygenResponse } from '@/lib/types/keygen';

export type LicenseAttributesInput = {
  name?: string;
  key?: string;
  protected?: boolean;
  expiry?: string;
  suspended?: boolean;
  maxMachines?: number;
  maxCores?: number;
  maxMemory?: number;
  maxDisk?: number;
  maxUses?: number;
  maxProcesses?: number;
  maxUsers?: number;
  metadata?: Record<string, unknown>;
  permissions?: string[];
};

const serializeLicenseAttributes = (attributes: LicenseAttributesInput) => {
  const {
    maxMachines,
    maxCores,
    maxMemory,
    maxDisk,
    maxUses,
    maxProcesses,
    maxUsers,
    ...rest
  } = attributes;

  const serialized: Record<string, unknown> = { ...rest };

  const addIfDefined = (key: string, value: unknown) => {
    if (value !== undefined) {
      if (typeof value === 'number' && value < 0) {
        return;
      }
      serialized[key] = value;
    }
  };

  addIfDefined('max_machines', maxMachines);
  addIfDefined('max_cores', maxCores);
  addIfDefined('max_memory', maxMemory);
  addIfDefined('max_disk', maxDisk);
  addIfDefined('max_uses', maxUses);
  addIfDefined('max_processes', maxProcesses);
  addIfDefined('max_users', maxUsers);

  return serialized;
};

export class LicenseResource {
  constructor(private client: KeygenClient) {}

  /**
   * List all licenses
   */
  async list(filters: LicenseFilters = {}): Promise<KeygenResponse<License[]>> {
    const params = {
      ...this.client.buildPaginationParams(filters),
    };

    // Add filter parameters
    if (filters.user) params.user = filters.user;
    if (filters.policy) params.policy = filters.policy;
    if (filters.group) params.group = filters.group;
    if (filters.product) params.product = filters.product;
    if (filters.status) params.status = filters.status;

    return this.client.request<License[]>('licenses', { params });
  }

  /**
   * Get a specific license by ID
   */
  async get(id: string): Promise<KeygenResponse<License>> {
    return this.client.request<License>(`licenses/${id}`);
  }

  /**
   * Create a new license
   */
  async create(
    licenseData: LicenseAttributesInput & {
      policyId: string;
      userId?: string;
      groupId?: string;
      environmentId?: string;
    }
  ): Promise<KeygenResponse<License>> {
    const {
      policyId,
      userId,
      groupId,
      environmentId,
      ...attributes
    } = licenseData;

    const body = {
      data: {
        type: 'licenses',
        attributes: serializeLicenseAttributes(attributes),
        relationships: {
          policy: {
            data: { type: 'policies', id: policyId },
          },
          ...(userId && {
            user: {
              data: { type: 'users', id: userId },
            },
          }),
          ...(groupId && {
            group: {
              data: { type: 'groups', id: groupId },
            },
          }),
          ...(environmentId && {
            environment: {
              data: { type: 'environments', id: environmentId },
            },
          }),
        },
      },
    };

    return this.client.request<License>('licenses', {
      method: 'POST',
      body,
    });
  }

  /**
   * Attach users to license (many-to-many users relationship)
   */
  async attachUsers(id: string, userIds: string[]): Promise<KeygenResponse<unknown>> {
    const body = {
      data: userIds.map(userId => ({
        type: 'users',
        id: userId,
      })),
    };

    return this.client.request(`licenses/${id}/relationships/users`, {
      method: 'POST',
      body,
    });
  }

  /**
   * Detach users from license
   */
  async detachUsers(id: string, userIds: string[]): Promise<void> {
    const body = {
      data: userIds.map(userId => ({
        type: 'users',
        id: userId,
      })),
    };

    await this.client.request(`licenses/${id}/relationships/users`, {
      method: 'DELETE',
      body,
    });
  }

  /**
   * Update a license
   */
  async update(id: string, updates: LicenseAttributesInput): Promise<KeygenResponse<License>> {
    const body = {
      data: {
        type: 'licenses',
        id,
        attributes: serializeLicenseAttributes(updates),
      },
    };

    return this.client.request<License>(`licenses/${id}`, {
      method: 'PATCH',
      body,
    });
  }

  /**
   * Delete a license
   */
  async delete(id: string): Promise<void> {
    await this.client.request(`licenses/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Suspend a license
   */
  async suspend(id: string): Promise<KeygenResponse<License>> {
    return this.client.request<License>(`licenses/${id}/actions/suspend`, {
      method: 'POST',
    });
  }

  /**
   * Reinstate a license
   */
  async reinstate(id: string): Promise<KeygenResponse<License>> {
    return this.client.request<License>(`licenses/${id}/actions/reinstate`, {
      method: 'POST',
    });
  }

  /**
   * Renew a license
   */
  async renew(id: string): Promise<KeygenResponse<License>> {
    return this.client.request<License>(`licenses/${id}/actions/renew`, {
      method: 'POST',
    });
  }

  /**
   * Decrement license usage
   */
  async decrementUsage(id: string, decrement = 1): Promise<KeygenResponse<License>> {
    const body = {
      meta: { decrement },
    };

    return this.client.request<License>(`licenses/${id}/actions/decrement-usage`, {
      method: 'POST',
      body,
    });
  }

  /**
   * Reset license usage
   */
  async resetUsage(id: string): Promise<KeygenResponse<License>> {
    return this.client.request<License>(`licenses/${id}/actions/reset-usage`, {
      method: 'POST',
    });
  }

  /**
   * Generate activation token for license
   */
  async generateActivationToken(id: string, ttl = 3600): Promise<KeygenResponse<unknown>> {
    const body = {
      data: {
        type: 'tokens',
        attributes: {
          expiry: new Date(Date.now() + ttl * 1000).toISOString(),
        },
      },
    };

    return this.client.request(`licenses/${id}/tokens`, {
      method: 'POST',
      body,
    });
  }

  /**
   * Get license entitlements
   */
  async getEntitlements(id: string): Promise<KeygenResponse<unknown[]>> {
    return this.client.request(`licenses/${id}/entitlements`);
  }

  /**
   * Attach entitlements to license
   */
  async attachEntitlements(id: string, entitlementIds: string[]): Promise<KeygenResponse<unknown>> {
    const body = {
      data: entitlementIds.map(entitlementId => ({
        type: 'entitlements',
        id: entitlementId,
      })),
    };

    return this.client.request(`licenses/${id}/relationships/entitlements`, {
      method: 'POST',
      body,
    });
  }

  /**
   * Detach entitlements from license
   */
  async detachEntitlements(id: string, entitlementIds: string[]): Promise<void> {
    const body = {
      data: entitlementIds.map(entitlementId => ({
        type: 'entitlements',
        id: entitlementId,
      })),
    };

    await this.client.request(`licenses/${id}/relationships/entitlements`, {
      method: 'DELETE',
      body,
    });
  }

  /**
   * Get license machines
   */
  async getMachines(id: string): Promise<KeygenResponse<unknown[]>> {
    return this.client.request(`licenses/${id}/machines`);
  }

  /**
   * Change license policy
   */
  async changePolicy(id: string, policyId: string): Promise<KeygenResponse<License>> {
    const body = {
      data: { type: 'policies', id: policyId },
    };

    return this.client.request<License>(`licenses/${id}/relationships/policy`, {
      method: 'PATCH',
      body,
    });
  }

  /**
   * Change license owner
   */
  async changeOwner(id: string, userId: string): Promise<KeygenResponse<License>> {
    const body = {
      data: { type: 'users', id: userId },
    };

    return this.client.request<License>(`licenses/${id}/relationships/user`, {
      method: 'PATCH',
      body,
    });
  }

  /**
   * Change license group
   */
  async changeGroup(id: string, groupId: string): Promise<KeygenResponse<License>> {
    const body = {
      data: { type: 'groups', id: groupId },
    };

    return this.client.request<License>(`licenses/${id}/relationships/group`, {
      method: 'PATCH',
      body,
    });
  }

  /**
   * Validate a license by ID
   */
  async validate(
    id: string,
    options?: {
      nonce?: number;
      scope?: {
        product?: string;
        policy?: string;
        fingerprints?: string[];
        fingerprint?: string;
        components?: string[];
        machine?: string;
        user?: string;
        entitlements?: string[];
        version?: string;
        checksum?: string;
      };
    }
  ): Promise<KeygenResponse<License>> {
    const body: Record<string, unknown> = {};

    if (options?.nonce !== undefined || options?.scope) {
      body.meta = {};
      if (options.nonce !== undefined) {
        (body.meta as Record<string, unknown>).nonce = options.nonce;
      }
      if (options.scope) {
        (body.meta as Record<string, unknown>).scope = options.scope;
      }
    }

    return this.client.request<License>(`licenses/${id}/actions/validate`, {
      method: 'POST',
      ...(Object.keys(body).length > 0 && { body }),
    });
  }

  /**
   * Validate a license by key
   */
  async validateKey(
    key: string,
    options?: {
      nonce?: number;
      scope?: {
        product?: string;
        policy?: string;
        fingerprints?: string[];
        fingerprint?: string;
        components?: string[];
        machine?: string;
        user?: string;
        entitlements?: string[];
        version?: string;
        checksum?: string;
      };
    }
  ): Promise<KeygenResponse<License>> {
    const body: Record<string, unknown> = {
      meta: {
        key,
      },
    };

    if (options?.nonce !== undefined) {
      (body.meta as Record<string, unknown>).nonce = options.nonce;
    }
    if (options?.scope) {
      (body.meta as Record<string, unknown>).scope = options.scope;
    }

    return this.client.request<License>('licenses/actions/validate-key', {
      method: 'POST',
      body,
    });
  }

  /**
   * Revoke a license permanently
   */
  async revoke(id: string): Promise<KeygenResponse<License>> {
    return this.client.request<License>(`licenses/${id}/actions/revoke`, {
      method: 'POST',
    });
  }

  /**
   * Check out a license for offline use
   */
  async checkOut(
    id: string,
    options?: {
      ttl?: number;
      include?: string[];
      encrypt?: boolean;
    }
  ): Promise<KeygenResponse<License>> {
    const body: Record<string, unknown> = {};

    if (options) {
      body.meta = {};
      if (options.ttl !== undefined) {
        (body.meta as Record<string, unknown>).ttl = options.ttl;
      }
      if (options.include) {
        (body.meta as Record<string, unknown>).include = options.include;
      }
      if (options.encrypt !== undefined) {
        (body.meta as Record<string, unknown>).encrypt = options.encrypt;
      }
    }

    return this.client.request<License>(`licenses/${id}/actions/check-out`, {
      method: 'POST',
      ...(Object.keys(body).length > 0 && { body }),
    });
  }

  /**
   * Check in a previously checked-out license
   */
  async checkIn(id: string): Promise<KeygenResponse<License>> {
    return this.client.request<License>(`licenses/${id}/actions/check-in`, {
      method: 'POST',
    });
  }

  /**
   * Increment license usage counter
   */
  async incrementUsage(id: string, increment = 1): Promise<KeygenResponse<License>> {
    const body = {
      meta: { increment },
    };

    return this.client.request<License>(`licenses/${id}/actions/increment-usage`, {
      method: 'POST',
      body,
    });
  }
}
