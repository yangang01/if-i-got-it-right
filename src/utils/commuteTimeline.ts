import { REWIND_TARGET_TIMESTAMP, clampUnit, formatShanghaiTime } from './timeRewind'

export const COMMUTE_DURATION_MS = 70 * 60 * 1_000
export const majorAnchorPoints = [0, 3 / 7, 1] as const
export const stagePoints = majorAnchorPoints
export const timelineBeatPoints = [0, 1 / 7, 2 / 7, 3 / 7, 9 / 14, 6 / 7, 1] as const

export const commuteStages = [
  { id: 'leave-home', point: stagePoints[0], minutes: 0 },
  { id: 'station', point: stagePoints[1], minutes: 30 },
  { id: 'arrive', point: stagePoints[2], minutes: 70 },
] as const

export function clampProgress(progress: number) {
  return clampUnit(progress)
}

export function getCommuteTimestamp(progress: number) {
  return Math.round(REWIND_TARGET_TIMESTAMP + clampProgress(progress) * COMMUTE_DURATION_MS)
}

export function formatCommuteTime(progress: number) {
  return formatShanghaiTime(getCommuteTimestamp(progress))
}

export function getCommuteStage(progress: number) {
  const value = clampProgress(progress)
  return [...commuteStages].reverse().find((stage) => value >= stage.point) ?? commuteStages[0]
}

export function snapProgress(progress: number, direction: -1 | 0 | 1 = 0) {
  const value = clampProgress(progress)
  const closestDistance = Math.min(...timelineBeatPoints.map((point) => Math.abs(point - value)))
  const closestPoints = timelineBeatPoints.filter((point) => Math.abs(Math.abs(point - value) - closestDistance) < 1e-10)
  if (closestPoints.length === 1 || direction === 0) return closestPoints[0]
  return direction > 0 ? closestPoints.at(-1)! : closestPoints[0]
}
