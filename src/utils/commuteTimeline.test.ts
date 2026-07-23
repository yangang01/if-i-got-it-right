import {
  clampProgress,
  formatCommuteTime,
  getCommuteStage,
  getCommuteTimestamp,
  majorAnchorPoints,
  snapProgress,
  stagePoints,
  timelineBeatPoints,
} from './commuteTimeline'

describe('commute timeline', () => {
  it('clamps progress to the experience boundaries', () => {
    expect(clampProgress(-0.2)).toBe(0)
    expect(clampProgress(0.42)).toBe(0.42)
    expect(clampProgress(1.4)).toBe(1)
  })

  it('uses only the three real event anchors', () => {
    expect(stagePoints).toEqual([0, 3 / 7, 1])
    expect(majorAnchorPoints).toEqual([0, 3 / 7, 1])
    expect(getCommuteStage(0).id).toBe('leave-home')
    expect(getCommuteStage(0.42).id).toBe('leave-home')
    expect(getCommuteStage(3 / 7).id).toBe('station')
    expect(getCommuteStage(0.8).id).toBe('station')
    expect(getCommuteStage(1).id).toBe('arrive')
  })

  it('uses all seven visible timeline positions as snap targets', () => {
    expect(timelineBeatPoints).toEqual([0, 1 / 7, 2 / 7, 3 / 7, 9 / 14, 6 / 7, 1])
    expect(timelineBeatPoints.map(formatCommuteTime)).toEqual([
      '09:40:00',
      '09:50:00',
      '10:00:00',
      '10:10:00',
      '10:25:00',
      '10:40:00',
      '10:50:00',
    ])
    expect(snapProgress(1 / 7)).toBe(1 / 7)
    expect(snapProgress(2 / 7)).toBe(2 / 7)
    expect(snapProgress(9 / 14)).toBe(9 / 14)
    expect(snapProgress(6 / 7)).toBe(6 / 7)
  })

  it('uses drag direction to resolve an exact midpoint', () => {
    const midpoint = (2 / 7 + 3 / 7) / 2
    expect(snapProgress(midpoint, 1)).toBe(3 / 7)
    expect(snapProgress(midpoint, -1)).toBe(2 / 7)
  })

  it('snaps to the closest visible marker', () => {
    expect(snapProgress(0.38)).toBe(3 / 7)
    expect(snapProgress(0.82)).toBe(6 / 7)
  })

  it('maps continuous progress to the real morning clock', () => {
    expect(formatCommuteTime(0)).toBe('09:40:00')
    expect(formatCommuteTime(0.5)).toBe('10:15:00')
    expect(formatCommuteTime(1)).toBe('10:50:00')
    expect(getCommuteTimestamp(0.5)).toBe(Date.UTC(2026, 6, 21, 2, 15, 0))
  })
})
