import type { HTMLAttributes, ReactNode } from 'react'
import { render } from '@testing-library/react'
import { vi } from 'vitest'
import { StageNarrative } from './StageNarrative'

type MotionDivProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  initial: { opacity: number; y: number }
  exit: { opacity: number; y: number }
  transition: { duration: number }
}

vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: ReactNode }) => children,
  motion: {
    div: ({ initial, exit, transition, ...props }: MotionDivProps) =>
      <div
        {...props}
        data-initial-y={initial.y}
        data-exit-y={exit.y}
        data-duration={transition.duration}
      />,
  },
  useReducedMotion: () => true,
}))

describe('StageNarrative', () => {
  it('removes perspective transition movement when reduced motion is requested', () => {
    const { container } = render(<StageNarrative progress={0} perspective="her" />)
    const copy = container.querySelector('.narrative-copy')

    expect(copy).toHaveAttribute('data-initial-y', '0')
    expect(copy).toHaveAttribute('data-exit-y', '0')
    expect(copy).toHaveAttribute('data-duration', '0')
  })
})
