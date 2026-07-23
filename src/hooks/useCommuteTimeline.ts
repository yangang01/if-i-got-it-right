import { useCallback, useRef, useState } from 'react'
import { clampProgress, snapProgress, timelineBeatPoints } from '../utils/commuteTimeline'

export function useCommuteTimeline() {
  const [progress, setProgressState] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const draggingRef = useRef(false)
  const startX = useRef(0)
  const lastX = useRef(0)
  const dragDirection = useRef<-1 | 0 | 1>(0)
  const startProgress = useRef(0)

  const setProgress = useCallback((value: number) => setProgressState(clampProgress(value)), [])
  const beginDrag = useCallback((clientX: number) => {
    startX.current = clientX
    lastX.current = clientX
    dragDirection.current = 0
    startProgress.current = progress
    draggingRef.current = true
    setIsDragging(true)
  }, [progress])
  const updateDrag = useCallback((clientX: number, width: number) => {
    if (!draggingRef.current) return
    const movement = clientX - lastX.current
    if (movement !== 0) dragDirection.current = movement > 0 ? 1 : -1
    lastX.current = clientX
    setProgressState(clampProgress(startProgress.current + (clientX - startX.current) / Math.max(width, 1)))
  }, [])
  const endDrag = useCallback(() => {
    setProgressState((value) => snapProgress(value, dragDirection.current))
    draggingRef.current = false
    setIsDragging(false)
  }, [])
  const step = useCallback((direction: -1 | 1) => {
    setProgressState((value) => {
      const nearest = timelineBeatPoints.reduce((closest, point) =>
        Math.abs(point - value) < Math.abs(closest - value) ? point : closest,
      )
      const index = timelineBeatPoints.indexOf(nearest)
      return timelineBeatPoints[Math.min(timelineBeatPoints.length - 1, Math.max(0, index + direction))]
    })
  }, [])

  return { progress, isDragging, beginDrag, updateDrag, endDrag, step, setProgress }
}
