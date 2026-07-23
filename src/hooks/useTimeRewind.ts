import { useCallback, useRef } from 'react'
import { REWIND_TARGET_TIMESTAMP, interpolateRewindTimestamp } from '../utils/timeRewind'

export function useTimeRewind(now: () => number = Date.now) {
  const openingTimestamp = useRef<number | null>(null)
  if (openingTimestamp.current === null) openingTimestamp.current = now()

  const capturedTimestamp = openingTimestamp.current
  const getTimestamp = useCallback(
    (progress: number) => interpolateRewindTimestamp(capturedTimestamp, progress),
    [capturedTimestamp],
  )

  return {
    openingTimestamp: capturedTimestamp,
    shouldAnimate: capturedTimestamp > REWIND_TARGET_TIMESTAMP,
    getTimestamp,
  }
}
