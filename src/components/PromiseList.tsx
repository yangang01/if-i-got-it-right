import { motion } from 'motion/react'
import { useState } from 'react'

export function PromiseList({ promises }: { promises: readonly string[] }) {
  const [checked, setChecked] = useState<number[]>([])
  const toggle = (index: number) => setChecked((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])
  return <motion.section className="promise-section" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
    <p className="eyebrow">我准备从这里开始</p>
    <div className="promise-list">{promises.map((promise, index) => <button className={`promise-item ${checked.includes(index) ? 'is-checked' : ''}`} key={promise} onClick={() => toggle(index)} aria-pressed={checked.includes(index)}><span className="promise-check">{checked.includes(index) ? '✓' : ''}</span><span>{promise}</span></button>)}</div>
    <p className="promise-note">这些不是要你现在监督我的任务，只是我应该记住的事。</p>
  </motion.section>
}
