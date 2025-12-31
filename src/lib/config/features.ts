/**
 * Feature flags based on Keygen edition (EE vs CE)
 * 
 * Features that are only available in Keygen EE/Cloud but not in CE:
 * - Request Logs (Beta)
 * - Event Logs (Beta)
 * - Environments (depending on configuration)
 */

export type KeygenEdition = 'EE' | 'CE' | 'CLOUD' | null

export interface EditionFeatures {
  requestLogs: boolean
  eventLogs: boolean
  environments: boolean
}

/**
 * Get available features based on Keygen edition
 */
export function getEditionFeatures(edition: KeygenEdition): EditionFeatures {
  // CE (Community Edition) has limited features
  if (edition === 'CE') {
    return {
      requestLogs: false,
      eventLogs: false,
      environments: false, // May be available depending on CE configuration
    }
  }

  // EE (Enterprise Edition) and Cloud have all features
  // Default to EE features if edition is unknown (for backward compatibility)
  return {
    requestLogs: true,
    eventLogs: true,
    environments: true,
  }
}

/**
 * Check if a specific feature is available for the given edition
 */
export function isFeatureAvailable(
  feature: keyof EditionFeatures,
  edition: KeygenEdition
): boolean {
  const features = getEditionFeatures(edition)
  return features[feature]
}
