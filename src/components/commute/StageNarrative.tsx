import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { commuteNarrative } from '../../content/commute'
import { getCommuteStage } from '../../utils/commuteTimeline'
import type { Perspective } from './perspective'

export function StageNarrative({ progress, perspective = 'sender' }: { progress: number; perspective?: Perspective }) {
  const reduceMotion = useReducedMotion()
  const active = getCommuteStage(progress)
  const stages = perspective === 'her' ? commuteNarrative.herStages : commuteNarrative.stages
  const passages = perspective === 'her' ? commuteNarrative.herPassages : commuteNarrative.passages
  const stage = stages.find((item) => item.id === active.id)!
  const passage = [...passages].reverse().find((item) => progress >= item.at) ?? passages[0]
  return <section className="stage-narrative" aria-live="polite">
    <AnimatePresence mode="sync" initial={false}>
      <motion.div className="narrative-copy" key={`${perspective}-${stage.id}-${passage.at}`} initial={{ opacity: reduceMotion ? 1 : .25, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -8 }} transition={{ duration: reduceMotion ? 0 : .32, ease: [0.22, 1, 0.36, 1] }}>
        <p className="scene-eyebrow"><span>{stage.time}</span>{perspective === 'her' ? '从你的这边，重新看一遍' : '如果这一次，我做对了'}</p>
        <h2>{stage.title}</h2>
        <blockquote>“{stage.dialogue}”</blockquote>
        <p className="journey-passage">{passage.copy}</p>
        <p className="reflection">{stage.reflection}</p>
      </motion.div>
    </AnimatePresence>
  </section>
}
