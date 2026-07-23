const SHANGHAI_TIME_ZONE = 'Asia/Shanghai'

export const REWIND_TARGET_TIMESTAMP = Date.UTC(2026, 6, 21, 1, 40, 0)

export function clampUnit(value: number) {
  return Math.min(1, Math.max(0, value))
}

export function interpolateRewindTimestamp(openingTimestamp: number, progress: number) {
  if (openingTimestamp <= REWIND_TARGET_TIMESTAMP) return REWIND_TARGET_TIMESTAMP
  const value = clampUnit(progress)
  return Math.round(openingTimestamp + (REWIND_TARGET_TIMESTAMP - openingTimestamp) * value)
}

function formatParts(timestamp: number) {
  return Object.fromEntries(
    new Intl.DateTimeFormat('zh-CN', {
      timeZone: SHANGHAI_TIME_ZONE,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(timestamp).map(({ type, value }) => [type, value]),
  )
}

export function formatShanghaiDate(timestamp: number) {
  const parts = formatParts(timestamp)
  return `${parts.year}年${Number(parts.month)}月${Number(parts.day)}日`
}

export function formatShanghaiTime(timestamp: number) {
  const parts = formatParts(timestamp)
  return `${parts.hour}:${parts.minute}:${parts.second}`
}
