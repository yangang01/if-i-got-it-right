import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useBackgroundMusic } from './useBackgroundMusic'

function createAudioDouble(playResult: () => Promise<void> = () => Promise.resolve()) {
  return {
    currentTime: 0,
    loop: false,
    pause: vi.fn(),
    play: vi.fn(playResult),
    preload: '',
    volume: 1,
  } as unknown as HTMLAudioElement
}

function stubAudioConstructor(audio: HTMLAudioElement) {
  const AudioConstructor = vi.fn(function AudioDouble() {
    return audio
  })
  vi.stubGlobal('Audio', AudioConstructor)
  return AudioConstructor
}

describe('useBackgroundMusic', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('starts the supplied track from a user command and fades to a restrained volume', async () => {
    const audio = createAudioDouble()
    const AudioConstructor = stubAudioConstructor(audio)
    const { result } = renderHook(() => useBackgroundMusic())

    await act(async () => {
      await result.current.play()
    })

    expect(AudioConstructor).toHaveBeenCalledWith('/YaYa.mp3')
    expect(audio.loop).toBe(true)
    expect(audio.preload).toBe('auto')
    expect(audio.play).toHaveBeenCalledOnce()
    expect(result.current.isPlaying).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1600)
    })
    expect(audio.volume).toBeCloseTo(0.14, 2)
  })

  it('keeps the interface off when the browser rejects playback', async () => {
    const audio = createAudioDouble(() => Promise.reject(new DOMException('blocked', 'NotAllowedError')))
    stubAudioConstructor(audio)
    const { result } = renderHook(() => useBackgroundMusic())

    await act(async () => {
      await result.current.play()
    })

    expect(result.current.isPlaying).toBe(false)
    expect(audio.volume).toBe(0)
  })

  it('pauses without resetting and can resume the same audio element', async () => {
    const audio = createAudioDouble()
    const AudioConstructor = stubAudioConstructor(audio)
    const { result } = renderHook(() => useBackgroundMusic())

    await act(async () => {
      await result.current.play()
    })
    act(() => {
      result.current.toggle()
      vi.advanceTimersByTime(1600)
    })

    expect(result.current.isPlaying).toBe(false)
    expect(audio.pause).toHaveBeenCalledOnce()
    expect(audio.currentTime).toBe(0)

    await act(async () => {
      await result.current.toggle()
    })
    expect(AudioConstructor).toHaveBeenCalledOnce()
    expect(audio.play).toHaveBeenCalledTimes(2)
  })
})
