import { renderHook } from '@testing-library/react'
import { REWIND_TARGET_TIMESTAMP } from '../utils/timeRewind'
import { useTimeRewind } from './useTimeRewind'

describe('useTimeRewind', () => {
  it('captures the opening timestamp only once', () => {
    let now = REWIND_TARGET_TIMESTAMP + 86_400_000
    const { result, rerender } = renderHook(() => useTimeRewind(() => now))
    const captured = result.current.openingTimestamp
    now += 86_400_000
    rerender()
    expect(result.current.openingTimestamp).toBe(captured)
  })

  it('maps normalized progress to the rewind timestamp and exact target', () => {
    const opening = REWIND_TARGET_TIMESTAMP + 48 * 60 * 60 * 1_000
    const { result } = renderHook(() => useTimeRewind(() => opening))
    expect(result.current.getTimestamp(0)).toBe(opening)
    expect(result.current.getTimestamp(0.5)).toBe(REWIND_TARGET_TIMESTAMP + 24 * 60 * 60 * 1_000)
    expect(result.current.getTimestamp(1)).toBe(REWIND_TARGET_TIMESTAMP)
  })

  it('does not animate backward when opened at or before the target', () => {
    const { result } = renderHook(() => useTimeRewind(() => REWIND_TARGET_TIMESTAMP - 1))
    expect(result.current.shouldAnimate).toBe(false)
    expect(result.current.getTimestamp(0)).toBe(REWIND_TARGET_TIMESTAMP)
  })
})
