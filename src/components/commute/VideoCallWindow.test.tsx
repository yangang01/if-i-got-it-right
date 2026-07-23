import { render, screen } from '@testing-library/react'
import { VideoCallWindow } from './VideoCallWindow'

describe('VideoCallWindow', () => {
  it('switches her from bed to the summer outfit at 10:10', () => {
    const { rerender } = render(<VideoCallWindow progress={3 / 7 - .001} />)
    expect(screen.getByAltText('长发女孩躺在床上接视频')).toHaveClass('is-visible')

    rerender(<VideoCallWindow progress={3 / 7} />)
    expect(screen.getByAltText('长发女孩换好夏装继续视频')).toHaveClass('is-visible')
  })
})
