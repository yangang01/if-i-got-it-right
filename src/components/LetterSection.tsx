import { motion } from 'motion/react'
import type { Chapter } from '../content/apology'

export function LetterSection({ chapter, index }: { chapter: Chapter; index: number }) {
  return (
    <motion.section className={`letter-section section-${index + 1}`} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-15% 0px' }} transition={{ duration: 0.7 }}>
      <p className="eyebrow">{chapter.eyebrow}</p>
      <h2>{chapter.title}</h2>
      {chapter.paragraphs.map((paragraph) => <p className="body-copy" key={paragraph}>{paragraph}</p>)}
    </motion.section>
  )
}
