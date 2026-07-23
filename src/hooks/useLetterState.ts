import { useCallback, useState } from 'react'
import type { ClosingChoiceId } from '../content/apology'

export function useLetterState() {
  const [isOpened, setIsOpened] = useState(false)
  const [expandedReflection, setExpandedReflection] = useState<number | null>(null)
  const [selectedClosingChoice, setSelectedClosingChoice] = useState<ClosingChoiceId | null>(null)
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)

  const toggleReflection = useCallback((id: number) => {
    setExpandedReflection((current) => (current === id ? null : id))
  }, [])

  return {
    isOpened,
    expandedReflection,
    selectedClosingChoice,
    isAudioEnabled,
    openLetter: () => setIsOpened(true),
    toggleReflection,
    selectClosingChoice: setSelectedClosingChoice,
    toggleAudio: () => setIsAudioEnabled((enabled) => !enabled),
  }
}
