import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { CommuteExperience } from './CommuteExperience'

vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('motion/react')>()
  return {
    ...actual,
    animate: (_from: number, _to: number, options: { onUpdate?: (value: number) => void; onComplete?: () => void }) => {
      options.onUpdate?.(1)
      options.onComplete?.()
      return { stop: vi.fn() }
    },
    useReducedMotion: () => true,
  }
})

describe('CommuteExperience', () => {
  it('requests music playback from the rewind gesture', async () => {
    const user = userEvent.setup()
    const onStartRewind = vi.fn()
    render(<CommuteExperience onStartRewind={onStartRewind} />)

    await user.click(screen.getByRole('button', { name: /回到 7 月 21 日 09:40/ }))

    expect(onStartRewind).toHaveBeenCalledOnce()
  })

  it('marks the arrived layout so the closing card can avoid the video window', async () => {
    const user = userEvent.setup()
    render(<CommuteExperience />)

    await user.click(screen.getByRole('button', { name: /回到 7 月 21 日 09:40/ }))
    await user.click(screen.getByRole('button', { name: '10:50 到公司' }))

    const main = screen.getByRole('main')
    expect(main).toHaveClass('has-arrived')
    expect(main.querySelector(':scope > .video-call-window')).toBeInTheDocument()
    expect(main.querySelector('.commute-scene .video-call-window')).not.toBeInTheDocument()
    const closingCard = document.querySelector('.present-closing')
    expect(closingCard).toBeInTheDocument()
    expect(closingCard?.querySelectorAll('li')).toHaveLength(5)
    expect(closingCard?.querySelectorAll(':scope > p')).toHaveLength(1)
    expect(screen.queryByText(/不用现在回复/)).not.toBeInTheDocument()
  })

  it('switches both narratives on one shared timeline without moving the selected time', async () => {
    const user = userEvent.setup()
    render(<CommuteExperience />)

    await user.click(screen.getByRole('button', { name: /回到 7 月 21 日 09:40/ }))
    await user.click(screen.getByRole('button', { name: '10:25 地铁通话' }))
    expect(screen.getByRole('slider', { name: '拖动早晨时间线' })).toHaveValue('643')

    await user.click(screen.getByRole('button', { name: '切换到她的视角' }))
    expect(screen.getByRole('main')).toHaveClass('is-her-perspective')
    expect(screen.getByRole('button', { name: '10:25 悠闲办公' })).toBeInTheDocument()
    expect(screen.getByText(/你在家悠闲办公/)).toBeInTheDocument()
    expect(screen.getByRole('slider', { name: '拖动早晨时间线' })).toHaveValue('643')

    await user.click(screen.getByRole('button', { name: '切换回我的视角' }))
    expect(screen.getByRole('main')).toHaveClass('is-sender-perspective')
    expect(screen.getByRole('button', { name: '10:25 地铁通话' })).toBeInTheDocument()
    expect(screen.getByRole('slider', { name: '拖动早晨时间线' })).toHaveValue('643')
  })
})
