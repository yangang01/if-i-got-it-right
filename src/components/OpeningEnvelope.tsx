import { motion } from 'motion/react'

export function OpeningEnvelope({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.section className="envelope-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="envelope-copy">
        <p className="eyebrow">一封不催你回复的信</p>
        <h1>写给你，<br />也写给那天的十几分钟。</h1>
        <p>这不是一封要求你马上原谅我的信。<br />我只是想把你的话，认真听完一次。</p>
      </div>
      <motion.button className="envelope" onClick={onOpen} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} aria-label="打开道歉信">
        <span className="envelope-flap" />
        <span className="envelope-paper">写给你</span>
        <span className="envelope-seal">✦</span>
      </motion.button>
      <p className="open-hint">轻轻点开</p>
    </motion.section>
  )
}
