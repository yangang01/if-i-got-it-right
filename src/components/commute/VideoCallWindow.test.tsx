import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { VideoCallWindow } from './VideoCallWindow'

describe('VideoCallWindow', () => {
  it('switches her from bed to the summer outfit at 10:10', () => {
    const { rerender } = render(<VideoCallWindow progress={3 / 7 - .001} />)
    expect(screen.getByAltText('长发女孩躺在床上接视频')).toHaveClass('is-visible')

    rerender(<VideoCallWindow progress={3 / 7} />)
    expect(screen.getByAltText('长发女孩换好夏装继续视频')).toHaveClass('is-visible')
  })

  it('acts as an accessible perspective switch and always shows the other side', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    const { container, rerender } = render(
      <VideoCallWindow progress={2 / 7} perspective="sender" onToggle={onToggle} />,
    )

    const switchButton = screen.getByRole('button', { name: '切换到她的视角' })
    expect(switchButton.querySelector('.home-office-scene')).not.toBeInTheDocument()
    await user.click(switchButton)
    expect(onToggle).toHaveBeenCalledOnce()
    expect(container.querySelector('.home-office-scene')).toBeInTheDocument()

    rerender(<VideoCallWindow progress={2 / 7} perspective="her" onToggle={onToggle} />)
    expect(screen.getByRole('button', { name: '切换回我的视角' })).toBeInTheDocument()
    expect(container.querySelector('.compact-sender-scene .sender-route-scene')).toBeInTheDocument()
    expect(container.querySelector('.home-office-scene')).not.toBeInTheDocument()
  })
})
