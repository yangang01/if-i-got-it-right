import { motion } from 'motion/react'
import type { ClosingChoiceId } from '../content/apology'

type Choice = { id: ClosingChoiceId; label: string; message: string }

export function ClosingChoice({ choices, selectedId, onSelect }: { choices: readonly Choice[]; selectedId: ClosingChoiceId | null; onSelect: (id: ClosingChoiceId) => void }) {
  const selected = choices.find((choice) => choice.id === selectedId)
  return <motion.section className="closing-section" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
    <div className="closing-rule" />
    <p className="closing-lead">你不用现在回复我。</p>
    <p className="closing-subtitle">你可以先照顾好自己的情绪，也不用为了让我好受一点，马上说“没关系”。</p>
    <div className="choice-list">{choices.map((choice) => <button className={selectedId === choice.id ? 'is-selected' : ''} key={choice.id} onClick={() => onSelect(choice.id)}>{choice.label}<span>↗</span></button>)}</div>
    {selected && <p className="choice-message" role="status">{selected.message}</p>}
  </motion.section>
}
