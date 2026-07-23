import { render, screen } from '@testing-library/react'
import { TimelineController } from './TimelineController'

const handlers = {
  onPointerDown: () => undefined,
  onPointerMove: () => undefined,
  onPointerUp: () => undefined,
  onSelect: () => undefined,
}

describe('TimelineController', () => {
  it('shows the real clock, three major anchors, and four process beats', () => {
    render(<TimelineController progress={0.5} isDragging={false} {...handlers} />)
    expect(screen.getByText('10:15:00')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /09:40.*出门/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /09:50.*分享早晨/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /10:00.*安静陪伴/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /10:10.*到地铁站/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /10:25.*地铁通话/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /10:40.*快到公司/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /10:50.*到公司/ })).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(7)
    expect(document.querySelectorAll('.is-major')).toHaveLength(3)
    expect(document.querySelectorAll('.is-minor')).toHaveLength(4)
    expect(screen.getByRole('slider', { name: '拖动早晨时间线' })).toHaveValue('500')
    expect(screen.queryByText('/ 01:10:00')).not.toBeInTheDocument()
  })

  it('uses her labels at the same snap points', () => {
    render(<TimelineController progress={9 / 14} perspective="her" isDragging={false} {...handlers} />)

    expect(screen.getByText('10:25:00')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '09:40 接通视频' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '10:00 慢慢起床' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '10:10 换好衣服' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '10:25 悠闲办公' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '10:50 好好说完' })).toBeInTheDocument()
    expect(screen.getByRole('slider', { name: '拖动早晨时间线' })).toHaveValue('643')
  })
})
