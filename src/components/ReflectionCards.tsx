import { AnimatePresence, motion } from 'motion/react'
import type { Reflection } from '../content/apology'

export function ReflectionCards({ reflections, expandedId, onToggle }: { reflections: readonly Reflection[]; expandedId: number | null; onToggle: (id: number) => void }) {
  return (
    <motion.section className="reflection-section" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <p className="eyebrow">我想认真承认的三件事</p>
      <div className="reflection-grid">
        {reflections.map((reflection, index) => {
          const expanded = reflection.id === expandedId
          return <motion.button className={`reflection-card ${expanded ? 'is-expanded' : ''}`} key={reflection.id} onClick={() => onToggle(reflection.id)} whileTap={{ scale: 0.98 }} aria-expanded={expanded}>
            <span className="card-index">0{index + 1}</span>
            <strong>{reflection.label}</strong>
            <span className="card-arrow">{expanded ? '−' : '＋'}</span>
            <AnimatePresence initial={false}>{expanded && <motion.span className="card-response" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{reflection.response}</motion.span>}</AnimatePresence>
          </motion.button>
        })}
      </div>
    </motion.section>
  )
}
