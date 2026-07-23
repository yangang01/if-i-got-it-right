import { commuteNarrative } from '../../content/commute'
import { formatCommuteTime, timelineBeatPoints } from '../../utils/commuteTimeline'

type Props = {
  progress: number
  isDragging: boolean
  onPointerDown: (x: number) => void
  onPointerMove: (x: number, width: number) => void
  onPointerUp: () => void
  onSelect: (progress: number) => void
}

export function TimelineController({ progress, isDragging, onPointerDown, onPointerMove, onPointerUp, onSelect }: Props) {
  return <section className={`timeline-shell ${isDragging ? 'is-dragging' : ''}`} aria-label="70 分钟通勤时间线">
    <div className="timeline-time"><span>{formatCommuteTime(progress)}</span><small>2026 · 07 · 21</small></div>
    <div className="timeline-track">
      <span className="timeline-base" />
      <span className="timeline-fill" style={{ width: `${progress * 100}%` }} />
      <span className="timeline-handle" style={{ left: `${progress * 100}%` }}><i>↔</i></span>
      <input
        className="timeline-range"
        type="range"
        min="0"
        max="1000"
        step="1"
        value={Math.round(progress * 1000)}
        aria-label="拖动早晨时间线"
        onChange={(event) => onSelect(Number(event.currentTarget.value) / 1000)}
        onPointerDown={(event) => onPointerDown(event.clientX)}
        onPointerMove={(event) => { if (event.buttons) onPointerMove(event.clientX, event.currentTarget.clientWidth) }}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />
    </div>
    <div className="stage-markers">{commuteNarrative.timeline.map((beat, index) =>
      <button key={beat.id} style={{ left: `${timelineBeatPoints[index] * 100}%` }} className={`${beat.kind === 'major' ? 'is-major' : 'is-minor'} ${index === 0 ? 'is-first' : ''} ${index === commuteNarrative.timeline.length - 1 ? 'is-last' : ''} ${progress >= timelineBeatPoints[index] ? 'is-reached' : ''}`} onClick={() => onSelect(timelineBeatPoints[index])} aria-label={`${beat.time} ${beat.label}`}>
        <i /><span>{beat.label}</span><small>{beat.time}</small>
      </button>
    )}</div>
    <p className="timeline-hint">左右拖动重走这段早晨 · 点击时间也可以抵达</p>
  </section>
}
