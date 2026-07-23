import {
  REWIND_TARGET_TIMESTAMP,
  formatShanghaiDate,
  formatShanghaiTime,
  interpolateRewindTimestamp,
} from './timeRewind'

describe('time rewind', () => {
  it('uses 2026-07-21 09:40:00 in Asia/Shanghai as the fixed target', () => {
    expect(REWIND_TARGET_TIMESTAMP).toBe(Date.UTC(2026, 6, 21, 1, 40, 0))
    expect(formatShanghaiDate(REWIND_TARGET_TIMESTAMP)).toBe('2026年7月21日')
    expect(formatShanghaiTime(REWIND_TARGET_TIMESTAMP)).toBe('09:40:00')
  })

  it('interpolates from the captured opening timestamp to the fixed target', () => {
    const opening = Date.UTC(2026, 6, 23, 1, 40, 0)
    expect(interpolateRewindTimestamp(opening, 0)).toBe(opening)
    expect(interpolateRewindTimestamp(opening, 0.5)).toBe(Date.UTC(2026, 6, 22, 1, 40, 0))
    expect(interpolateRewindTimestamp(opening, 1)).toBe(REWIND_TARGET_TIMESTAMP)
  })

  it('clamps progress and settles directly when opening is not after the target', () => {
    expect(interpolateRewindTimestamp(Date.UTC(2027, 0, 1), 2)).toBe(REWIND_TARGET_TIMESTAMP)
    expect(interpolateRewindTimestamp(REWIND_TARGET_TIMESTAMP - 1_000, 0)).toBe(REWIND_TARGET_TIMESTAMP)
  })
})
