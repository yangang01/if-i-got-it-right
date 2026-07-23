import { act, renderHook } from '@testing-library/react'
import { useCommuteTimeline } from './useCommuteTimeline'

describe('useCommuteTimeline', () => {
  it('follows horizontal drag and snaps on release', () => {
    const { result } = renderHook(() => useCommuteTimeline())
    act(() => {
      result.current.beginDrag(100)
      result.current.updateDrag(300, 400)
    })
    expect(result.current.progress).toBeCloseTo(0.5)
    act(() => result.current.endDrag())
    expect(result.current.progress).toBe(3 / 7)
  })

  it('moves one visible beat at a time from the keyboard API', () => {
    const { result } = renderHook(() => useCommuteTimeline())
    act(() => result.current.step(1))
    expect(result.current.progress).toBe(1 / 7)
    act(() => result.current.step(1))
    expect(result.current.progress).toBe(2 / 7)
    act(() => result.current.step(-1))
    expect(result.current.progress).toBe(1 / 7)
  })

  it('uses forward drag direction when released exactly between two beats', () => {
    const { result } = renderHook(() => useCommuteTimeline())
    act(() => {
      result.current.beginDrag(0)
      result.current.updateDrag(250, 700)
      result.current.endDrag()
    })
    expect(result.current.progress).toBe(3 / 7)
  })
})
