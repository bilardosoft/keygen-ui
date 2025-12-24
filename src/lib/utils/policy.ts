'use client'

import { Policy } from '@/lib/types/keygen'

type PolicyAttributes = Policy['attributes']

const pickAttribute = <T>(
  attrs: Record<string, unknown>,
  camelKey: keyof PolicyAttributes,
  snakeKey: string,
): T | undefined => {
  if (attrs[camelKey as string] !== undefined) {
    return attrs[camelKey as string] as T
  }

  if (attrs[snakeKey] !== undefined) {
    return attrs[snakeKey] as T
  }

  return undefined
}

export const normalizePolicyAttributes = (attrs: PolicyAttributes): PolicyAttributes => {
  const record = attrs as Record<string, unknown>

  return {
    ...attrs,
    maxMachines: pickAttribute<number | undefined>(record, 'maxMachines', 'max_machines'),
    maxProcesses: pickAttribute<number | undefined>(record, 'maxProcesses', 'max_processes'),
    maxCores: pickAttribute<number | undefined>(record, 'maxCores', 'max_cores'),
    maxUses: pickAttribute<number | undefined>(record, 'maxUses', 'max_uses'),
    requireHeartbeat:
      pickAttribute<boolean | undefined>(record, 'requireHeartbeat', 'require_heartbeat') ??
      attrs.requireHeartbeat,
    heartbeatDuration:
      pickAttribute<number | undefined>(record, 'heartbeatDuration', 'heartbeat_duration') ??
      attrs.heartbeatDuration,
    heartbeatCullStrategy:
      pickAttribute<PolicyAttributes['heartbeatCullStrategy'] | undefined>(
        record,
        'heartbeatCullStrategy',
        'heartbeat_cull_strategy',
      ) ?? attrs.heartbeatCullStrategy,
    heartbeatResurrectionStrategy:
      pickAttribute<PolicyAttributes['heartbeatResurrectionStrategy'] | undefined>(
        record,
        'heartbeatResurrectionStrategy',
        'heartbeat_resurrection_strategy',
      ) ?? attrs.heartbeatResurrectionStrategy,
    heartbeatBasis:
      pickAttribute<PolicyAttributes['heartbeatBasis'] | undefined>(
        record,
        'heartbeatBasis',
        'heartbeat_basis',
      ) ?? attrs.heartbeatBasis,
    machineUniquenessStrategy:
      pickAttribute<PolicyAttributes['machineUniquenessStrategy'] | undefined>(
        record,
        'machineUniquenessStrategy',
        'machine_uniqueness_strategy',
      ) ?? attrs.machineUniquenessStrategy,
    machineMatchingStrategy:
      pickAttribute<PolicyAttributes['machineMatchingStrategy'] | undefined>(
        record,
        'machineMatchingStrategy',
        'machine_matching_strategy',
      ) ?? attrs.machineMatchingStrategy,
    expirationStrategy:
      pickAttribute<PolicyAttributes['expirationStrategy'] | undefined>(
        record,
        'expirationStrategy',
        'expiration_strategy',
      ) ?? attrs.expirationStrategy,
    expirationBasis:
      pickAttribute<PolicyAttributes['expirationBasis'] | undefined>(
        record,
        'expirationBasis',
        'expiration_basis',
      ) ?? attrs.expirationBasis,
    renewalBasis:
      pickAttribute<PolicyAttributes['renewalBasis'] | undefined>(
        record,
        'renewalBasis',
        'renewal_basis',
      ) ?? attrs.renewalBasis,
    transferStrategy:
      pickAttribute<PolicyAttributes['transferStrategy'] | undefined>(
        record,
        'transferStrategy',
        'transfer_strategy',
      ) ?? attrs.transferStrategy,
    authenticationStrategy:
      pickAttribute<PolicyAttributes['authenticationStrategy'] | undefined>(
        record,
        'authenticationStrategy',
        'authentication_strategy',
      ) ?? attrs.authenticationStrategy,
    machineLeasingStrategy:
      pickAttribute<PolicyAttributes['machineLeasingStrategy'] | undefined>(
        record,
        'machineLeasingStrategy',
        'machine_leasing_strategy',
      ) ?? attrs.machineLeasingStrategy,
    processLeasingStrategy:
      pickAttribute<PolicyAttributes['processLeasingStrategy'] | undefined>(
        record,
        'processLeasingStrategy',
        'process_leasing_strategy',
      ) ?? attrs.processLeasingStrategy,
    overageStrategy:
      pickAttribute<PolicyAttributes['overageStrategy'] | undefined>(
        record,
        'overageStrategy',
        'overage_strategy',
      ) ?? attrs.overageStrategy,
  }
}
