import { animate, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { commuteNarrative } from '../../content/commute'
import { useCommuteTimeline } from '../../hooks/useCommuteTimeline'
import { useTimeRewind } from '../../hooks/useTimeRewind'
import { CommuteScene } from './CommuteScene'
import { RewindClock } from './RewindClock'
import { StageNarrative } from './StageNarrative'
import { TimelineController } from './TimelineController'
import { VideoCallWindow } from './VideoCallWindow'

type Phase = 'reality' | 'rewind' | 'commute'

export function CommuteExperience({ onStartRewind }: { onStartRewind?: () => void | Promise<void> }) {
  const [phase, setPhase] = useState<Phase>('reality')
  const [rewindProgress, setRewindProgress] = useState(0)
  const timeline = useCommuteTimeline()
  const rewind = useTimeRewind()
  const reduceMotion = useReducedMotion()

  const startRewind = useCallback(() => {
    void onStartRewind?.()
    setPhase('rewind')
    setRewindProgress(rewind.shouldAnimate ? 0 : 1)
    animate(rewind.shouldAnimate ? 0 : 1, 1, {
      duration: reduceMotion ? .25 : rewind.shouldAnimate ? 4.2 : .5,
      ease: reduceMotion ? 'linear' : [0.76, 0, 0.24, 1],
      onUpdate: setRewindProgress,
      onComplete: () => {
        timeline.setProgress(0)
        setPhase('commute')
      },
    })
  }, [onStartRewind, reduceMotion, rewind.shouldAnimate, timeline.setProgress])

  useEffect(() => {
    if (phase !== 'commute') return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); timeline.step(1) }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); timeline.step(-1) }
    }
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 16) return
      timeline.step(event.deltaY > 0 ? 1 : -1)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('wheel', onWheel) }
  }, [phase, timeline.step])

  if (phase === 'reality') return <motion.section className="reality-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <div className="intro-index">00 / 写在现在</div>
    <div className="intro-copy"><p className="scene-eyebrow">{commuteNarrative.reality.eyebrow}</p><h1>{commuteNarrative.reality.title}</h1><p>{commuteNarrative.reality.body}</p><p className="intro-apology">{commuteNarrative.coreApology}</p><button onClick={startRewind}>回到 7 月 21 日 09:40 <span>←</span></button></div>
    <p className="intro-note">这不是为了假装什么都没发生。</p>
  </motion.section>

  if (phase === 'rewind') return <RewindClock timestamp={rewind.getTimestamp(rewindProgress)} progress={rewindProgress} />

  const arrived = timeline.progress >= .999
  return <main className={`commute-experience ${arrived ? 'has-arrived' : ''}`}>
    <CommuteScene progress={timeline.progress} />
    <VideoCallWindow progress={timeline.progress} />
    <div className="experience-top"><span>两个地方 · 同一通视频</span><span>09:40 — 10:50</span></div>
    <div className="commute-body">
      <StageNarrative progress={timeline.progress} />
      {arrived && <motion.section className="present-closing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <p className="scene-eyebrow">回到现在</p><h3>理解了还不够，<br />以后要真的做到。</h3>
        <ul>{commuteNarrative.commitments.map((item) => <li key={item}>{item}</li>)}</ul>
      </motion.section>}
    </div>
    <TimelineController progress={timeline.progress} isDragging={timeline.isDragging} onPointerDown={timeline.beginDrag} onPointerMove={timeline.updateDrag} onPointerUp={timeline.endDrag} onSelect={timeline.setProgress} />
  </main>
}
