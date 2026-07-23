import { useCallback, useEffect, useRef, useState } from 'react'

const TRACK_URL = `${import.meta.env.BASE_URL}YaYa.mp3`
const TARGET_VOLUME = 0.14
const FADE_DURATION_MS = 1600
const FADE_STEP_MS = 50

export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeTimerRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const clearFade = useCallback(() => {
    if (fadeTimerRef.current === null) return
    window.clearInterval(fadeTimerRef.current)
    fadeTimerRef.current = null
  }, [])

  const getAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current
    const audio = new Audio(TRACK_URL)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0
    audioRef.current = audio
    return audio
  }, [])

  const fadeTo = useCallback((audio: HTMLAudioElement, target: number, onComplete?: () => void) => {
    clearFade()
    const totalSteps = FADE_DURATION_MS / FADE_STEP_MS
    const volumeStep = (target - audio.volume) / totalSteps
    let currentStep = 0

    fadeTimerRef.current = window.setInterval(() => {
      currentStep += 1
      audio.volume = Math.max(0, Math.min(1, currentStep >= totalSteps ? target : audio.volume + volumeStep))
      if (currentStep < totalSteps) return
      clearFade()
      onComplete?.()
    }, FADE_STEP_MS)
  }, [clearFade])

  const play = useCallback(async () => {
    const audio = getAudio()
    clearFade()

    try {
      await audio.play()
      setIsPlaying(true)
      fadeTo(audio, TARGET_VOLUME)
    } catch {
      audio.volume = 0
      setIsPlaying(false)
    }
  }, [clearFade, fadeTo, getAudio])

  const pause = useCallback(() => {
    const audio = audioRef.current
    setIsPlaying(false)
    if (!audio) return
    fadeTo(audio, 0, () => audio.pause())
  }, [fadeTo])

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause()
      return
    }
    return play()
  }, [isPlaying, pause, play])

  useEffect(() => () => {
    clearFade()
    audioRef.current?.pause()
  }, [clearFade])

  return { isPlaying, pause, play, toggle }
}
