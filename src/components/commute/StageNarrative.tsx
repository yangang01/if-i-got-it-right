import { AnimatePresence, motion } from 'motion/react'
import { commuteNarrative } from '../../content/commute'
import { getCommuteStage } from '../../utils/commuteTimeline'

export function StageNarrative({ progress }: { progress: number }) {
  const active = getCommuteStage(progress)
  const stage = commuteNarrative.stages.find((item) => item.id === active.id)!
  const passage = [...commuteNarrative.passages].reverse().find((item) => progress >= item.at) ?? commuteNarrative.passages[0]
  return <section className="stage-narrative" aria-live="polite">
    <AnimatePresence mode="sync" initial={false}>
      <motion.div className="narrative-copy" key={`${stage.id}-${passage.at}`} initial={{ opacity: .25, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .32, ease: [0.22, 1, 0.36, 1] }}>
        <p className="scene-eyebrow"><span>{stage.time}</span>如果这一次，我做对了</p>
        <h2>{stage.title}</h2>
        <blockquote>“{stage.dialogue}”</blockquote>
        <p className="journey-passage">{passage.copy}</p>
        <p className="reflection">{stage.reflection}</p>
      </motion.div>
    </AnimatePresence>
  </section>
}
