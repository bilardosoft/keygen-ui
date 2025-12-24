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
    maxMachines:
      pickAttribute<number | undefined>(record, 'maxMachines', 'max_machines') ??
      attrs.maxMachines,
    maxProcesses:
      pickAttribute<number | undefined>(record, 'maxProcesses', 'max_processes') ??
      attrs.maxProcesses,
    maxCores:
      pickAttribute<number | undefined>(record, 'maxCores', 'max_cores') ??
      attrs.maxCores,
    maxUses:
      pickAttribute<number | undefined>(record, 'maxUses', 'max_uses') ??
      attrs.maxUses,
    maxMemory:
      pickAttribute<number | undefined>(record, 'maxMemory', 'max_memory') ??
      (record['max_memory'] as number | undefined) ??
      attrs.maxMemory,
    maxDisk:
      pickAttribute<number | undefined>(record, 'maxDisk', 'max_disk') ??
      (record['max_disk'] as number | undefined) ??
      attrs.maxDisk,
    maxUsers:
      pickAttribute<number | undefined>(record, 'maxUsers', 'max_users') ??
      (record['max_users'] as number | undefined) ??
      attrs.maxUsers,
    scheme: pickAttribute<string | undefined>(record, 'scheme', 'scheme') ?? attrs.scheme,
    requireProductScope:
      pickAttribute<boolean | undefined>(record, 'requireProductScope', 'require_product_scope') ??
      attrs.requireProductScope,
    requirePolicyScope:
      pickAttribute<boolean | undefined>(record, 'requirePolicyScope', 'require_policy_scope') ??
      attrs.requirePolicyScope,
    requireMachineScope:
      pickAttribute<boolean | undefined>(record, 'requireMachineScope', 'require_machine_scope') ??
      attrs.requireMachineScope,
    requireFingerprintScope:
      pickAttribute<boolean | undefined>(record, 'requireFingerprintScope', 'require_fingerprint_scope') ??
      attrs.requireFingerprintScope,
    requireComponentsScope:
      pickAttribute<boolean | undefined>(record, 'requireComponentsScope', 'require_components_scope') ??
      attrs.requireComponentsScope,
    requireUserScope:
      pickAttribute<boolean | undefined>(record, 'requireUserScope', 'require_user_scope') ??
      attrs.requireUserScope,
    requireChecksumScope:
      pickAttribute<boolean | undefined>(record, 'requireChecksumScope', 'require_checksum_scope') ??
      attrs.requireChecksumScope,
    requireVersionScope:
      pickAttribute<boolean | undefined>(record, 'requireVersionScope', 'require_version_scope') ??
      attrs.requireVersionScope,
    requireCheckIn:
      pickAttribute<boolean | undefined>(record, 'requireCheckIn', 'require_check_in') ??
      attrs.requireCheckIn,
    checkInInterval:
      pickAttribute<PolicyAttributes['checkInInterval'] | undefined>(record, 'checkInInterval', 'check_in_interval') ??
      attrs.checkInInterval,
    checkInIntervalCount:
      pickAttribute<number | undefined>(record, 'checkInIntervalCount', 'check_in_interval_count') ??
      attrs.checkInIntervalCount,
    usePool:
      pickAttribute<boolean | undefined>(record, 'usePool', 'use_pool') ??
      attrs.usePool,
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
