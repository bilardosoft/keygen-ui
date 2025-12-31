'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { KeygenEdition, isFeatureAvailable, EditionFeatures } from '@/lib/config/features'

interface EditionContextType {
  edition: KeygenEdition
  setEdition: (edition: KeygenEdition) => void
  isFeatureAvailable: (feature: keyof EditionFeatures) => boolean
}

const EditionContext = createContext<EditionContextType | undefined>(undefined)

interface EditionProviderProps {
  children: ReactNode
}

export function EditionProvider({ children }: EditionProviderProps) {
  const [edition, setEditionState] = useState<KeygenEdition>(null)

  // Load edition from localStorage on mount
  useEffect(() => {
    const storedEdition = localStorage.getItem('keygen_edition') as KeygenEdition
    if (storedEdition) {
      setEditionState(storedEdition)
    }
  }, [])

  const setEdition = (newEdition: KeygenEdition) => {
    setEditionState(newEdition)
    if (newEdition) {
      localStorage.setItem('keygen_edition', newEdition)
    } else {
      localStorage.removeItem('keygen_edition')
    }
  }

  const checkFeature = (feature: keyof EditionFeatures) => {
    return isFeatureAvailable(feature, edition)
  }

  return (
    <EditionContext.Provider value={{ edition, setEdition, isFeatureAvailable: checkFeature }}>
      {children}
    </EditionContext.Provider>
  )
}

export function useEdition() {
  const context = useContext(EditionContext)
  if (context === undefined) {
    throw new Error('useEdition must be used within an EditionProvider')
  }
  return context
}
