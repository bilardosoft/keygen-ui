import { KeygenClient } from '../client';
import { Policy, KeygenResponse, ListOptions, KeygenListResponse } from '../../types/keygen';

type PolicyAttributesInput = {
  name?: string;
  duration?: number;
  strict?: boolean;
  floating?: boolean;
  scheme?: string | null;
  protected?: boolean;
  requireProductScope?: boolean;
  requirePolicyScope?: boolean;
  requireMachineScope?: boolean;
  requireFingerprintScope?: boolean;
  requireComponentsScope?: boolean;
  requireUserScope?: boolean;
  requireChecksumScope?: boolean;
  requireVersionScope?: boolean;
  requireCheckIn?: boolean;
  checkInInterval?: 'day' | 'week' | 'month' | 'year';
  checkInIntervalCount?: number;
  usePool?: boolean;
  maxMachines?: number;
  maxProcesses?: number;
  maxCores?: number;
  maxMemory?: number;
  maxDisk?: number;
  maxUsers?: number;
  maxUses?: number;
  requireHeartbeat?: boolean;
  heartbeatDuration?: number;
  heartbeatCullStrategy?: 'DEACTIVATE_DEAD' | 'KEEP_DEAD';
  heartbeatResurrectionStrategy?: 'NO_REVIVE' | 'ALWAYS_REVIVE';
  heartbeatBasis?: 'FROM_CREATION' | 'FROM_FIRST_VALIDATION';
  machineUniquenessStrategy?:
    | 'UNIQUE_PER_LICENSE'
    | 'UNIQUE_PER_ACCOUNT'
    | 'UNIQUE_PER_PRODUCT'
    | 'UNIQUE_PER_POLICY';
  machineMatchingStrategy?: 'MATCH_ANY' | 'MATCH_TWO' | 'MATCH_MOST' | 'MATCH_ALL';
  expirationStrategy?: 'RESTRICT_ACCESS' | 'REVOKE_ACCESS' | 'MAINTAIN_ACCESS';
  expirationBasis?: 'FROM_CREATION' | 'FROM_FIRST_VALIDATION' | 'FROM_FIRST_ACTIVATION' | 'FROM_FIRST_DOWNLOAD' | 'FROM_FIRST_USE';
  renewalBasis?: 'FROM_EXPIRY' | 'FROM_NOW';
  transferStrategy?: 'RESET_EXPIRY' | 'KEEP_EXPIRY';
  authenticationStrategy?: 'TOKEN' | 'LICENSE' | 'MIXED' | 'NONE';
  machineLeasingStrategy?: 'PER_LICENSE' | 'PER_USER' | 'ALWAYS_ALLOW';
  processLeasingStrategy?: 'PER_MACHINE' | 'PER_LICENSE' | 'PER_USER' | 'ALWAYS_ALLOW';
  overageStrategy?: 'NO_OVERAGE' | 'ALWAYS_ALLOW_OVERAGE' | 'ALLOW_1_25X_OVERAGE' | 'ALLOW_1_5X_OVERAGE' | 'ALLOW_2X_OVERAGE';
  metadata?: Record<string, unknown>;
};

type PolicyCreateData = PolicyAttributesInput & {
  name: string;
  productId: string;
};

const serializePolicyAttributes = (attributes: PolicyAttributesInput) => {
  const {
    maxMachines,
    maxProcesses,
    maxCores,
    maxMemory,
    maxDisk,
    maxUsers,
    maxUses,
    scheme,
    requireProductScope,
    requirePolicyScope,
    requireMachineScope,
    requireFingerprintScope,
    requireComponentsScope,
    requireUserScope,
    requireChecksumScope,
    requireVersionScope,
    requireCheckIn,
    checkInInterval,
    checkInIntervalCount,
    usePool,
    requireHeartbeat,
    heartbeatDuration,
    heartbeatCullStrategy,
    heartbeatResurrectionStrategy,
    heartbeatBasis,
    machineUniquenessStrategy,
    machineMatchingStrategy,
    expirationStrategy,
    expirationBasis,
    renewalBasis,
    transferStrategy,
    authenticationStrategy,
    machineLeasingStrategy,
    processLeasingStrategy,
    overageStrategy,
    ...rest
  } = attributes;

  const serialized: Record<string, unknown> = { ...rest };

  const addIfDefined = (key: string, value: unknown) => {
    if (value !== undefined) {
      serialized[key] = value;
    }
  };

  addIfDefined('max_machines', maxMachines);
  addIfDefined('max_processes', maxProcesses);
  addIfDefined('max_cores', maxCores);
  addIfDefined('max_memory', maxMemory);
  addIfDefined('max_disk', maxDisk);
  addIfDefined('max_users', maxUsers);
  addIfDefined('max_uses', maxUses);
  addIfDefined('scheme', scheme);
  addIfDefined('require_product_scope', requireProductScope);
  addIfDefined('require_policy_scope', requirePolicyScope);
  addIfDefined('require_machine_scope', requireMachineScope);
  addIfDefined('require_fingerprint_scope', requireFingerprintScope);
  addIfDefined('require_components_scope', requireComponentsScope);
  addIfDefined('require_user_scope', requireUserScope);
  addIfDefined('require_checksum_scope', requireChecksumScope);
  addIfDefined('require_version_scope', requireVersionScope);
  addIfDefined('require_check_in', requireCheckIn);
  addIfDefined('check_in_interval', checkInInterval);
  addIfDefined('check_in_interval_count', checkInIntervalCount);
  addIfDefined('use_pool', usePool);
  addIfDefined('require_heartbeat', requireHeartbeat);
  addIfDefined('heartbeat_duration', heartbeatDuration);
  addIfDefined('heartbeat_cull_strategy', heartbeatCullStrategy);
  addIfDefined('heartbeat_resurrection_strategy', heartbeatResurrectionStrategy);
  addIfDefined('heartbeat_basis', heartbeatBasis);
  addIfDefined('machine_uniqueness_strategy', machineUniquenessStrategy);
  addIfDefined('machine_matching_strategy', machineMatchingStrategy);
  addIfDefined('expiration_strategy', expirationStrategy);
  addIfDefined('expiration_basis', expirationBasis);
  addIfDefined('renewal_basis', renewalBasis);
  addIfDefined('transfer_strategy', transferStrategy);
  addIfDefined('authentication_strategy', authenticationStrategy);
  addIfDefined('machine_leasing_strategy', machineLeasingStrategy);
  addIfDefined('process_leasing_strategy', processLeasingStrategy);
  addIfDefined('overage_strategy', overageStrategy);

  return serialized;
};

export class PolicyResource {
  constructor(private client: KeygenClient) {}

  /**
   * List all policies
   */
  async list(options?: ListOptions): Promise<KeygenListResponse<Policy>> {
    const queryParams = new URLSearchParams();
    
    if (options?.limit) queryParams.set('limit', options.limit.toString());
    if (options?.page) queryParams.set('page', options.page.toString());
    
    const query = queryParams.toString();
    const endpoint = query ? `/policies?${query}` : '/policies';
    
    return this.client.request<Policy[]>(endpoint);
  }

  /**
   * Get a specific policy by ID
   */
  async get(policyId: string): Promise<KeygenResponse<Policy>> {
    return this.client.request<Policy>(`/policies/${policyId}`);
  }

  /**
   * Create a new policy
   */
  async create(data: PolicyCreateData): Promise<KeygenResponse<Policy>> {
    const { productId, ...attributes } = data;
    
    return this.client.request<Policy>('/policies', {
      method: 'POST',
      body: {
        data: {
          type: 'policies',
          attributes: serializePolicyAttributes(attributes),
          relationships: {
            product: {
              data: {
                type: 'products',
                id: productId
              }
            }
          }
        }
      }
    });
  }

  /**
   * Update a policy
   */
  async update(policyId: string, data: PolicyAttributesInput): Promise<KeygenResponse<Policy>> {
    return this.client.request<Policy>(`/policies/${policyId}`, {
      method: 'PATCH',
      body: {
        data: {
          type: 'policies',
          id: policyId,
          attributes: serializePolicyAttributes(data)
        }
      }
    });
  }

  /**
   * Delete a policy
   */
  async delete(policyId: string): Promise<void> {
    await this.client.request<void>(`/policies/${policyId}`, {
      method: 'DELETE'
    });
  }
}
