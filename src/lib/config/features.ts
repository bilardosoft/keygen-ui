/**
 * Feature flags based on Keygen edition (EE vs CE)
 * 
 * Features that are only available in Keygen EE/Cloud but NOT in CE:
 * - Request Logs (Beta) - EE/Cloud only
 * - Event Logs (Beta) - EE/Cloud only
 * 
 * Features available in ALL editions (CE, EE, Cloud):
 * - Environments - Available in all editions
 */

export type KeygenEdition = 'EE' | 'CE' | 'CLOUD' | null

export interface EditionFeatures {
  requestLogs: boolean
  eventLogs: boolean
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
    }
  }

  // EE (Enterprise Edition) and Cloud have all features
  // Default to EE features if edition is unknown (for backward compatibility)
  return {
    requestLogs: true,
    eventLogs: true,
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
