import { act, renderHook } from '@testing-library/react'
import { useLetterState } from './useLetterState'

describe('useLetterState', () => {
  it('starts closed and updates each local interaction', () => {
    const { result } = renderHook(() => useLetterState())

    expect(result.current.isOpened).toBe(false)
    expect(result.current.expandedReflection).toBeNull()

    act(() => result.current.openLetter())
    act(() => result.current.toggleReflection(1))
    act(() => result.current.selectClosingChoice('talk'))

    expect(result.current.isOpened).toBe(true)
    expect(result.current.expandedReflection).toBe(1)
    expect(result.current.selectedClosingChoice).toBe('talk')
  })
})
