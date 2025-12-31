'use client'

import { useEffect } from 'react'
import { useEdition } from '@/lib/config/edition-context'
import { getKeygenApi } from '@/lib/api'
import { KeygenEdition } from '@/lib/config/features'

/**
 * Hook to automatically detect and set Keygen edition from API responses
 * Should be used once at the app level (e.g., in layout or auth provider)
 */
export function useEditionDetection() {
  const { setEdition } = useEdition()

  useEffect(() => {
    const api = getKeygenApi()
    
    // Set up callback to capture edition from API response headers
    api.setEditionCallback((edition: string) => {
      // Normalize edition value
      const normalizedEdition = edition.toUpperCase() as KeygenEdition
      if (normalizedEdition && ['EE', 'CE', 'CLOUD'].includes(normalizedEdition)) {
        setEdition(normalizedEdition)
      }
    })
  }, [setEdition])
}
