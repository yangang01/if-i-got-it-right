import type { CSSProperties } from 'react'
import { formatShanghaiDate, formatShanghaiTime } from '../../utils/timeRewind'
import { MorningSky } from './MorningSky'

export function RewindClock({ timestamp, progress }: { timestamp: number; progress: number }) {
  const morningReveal = Math.min(1, Math.max(0, (progress - .85) / .15))
  return <section className="rewind-stage" style={{ '--rewind': progress, '--morning-reveal': morningReveal } as CSSProperties}>
    <MorningSky reveal={morningReveal} />
    <div className="rewind-orbit" aria-hidden="true"><i /><i /><i /></div>
    <div className="rewind-copy" aria-live="polite">
      <p>从你打开这一页的此刻，回到那个早晨</p>
      <time dateTime={new Date(timestamp).toISOString()}>
        <span>{formatShanghaiDate(timestamp)}</span>
        <strong>{formatShanghaiTime(timestamp)}</strong>
      </time>
      <em>时间可以倒退，但你的委屈不会被删除。</em>
    </div>
    <div className="rewind-line" aria-hidden="true"><i style={{ width: `${progress * 100}%` }} /></div>
  </section>
}
