import { render } from '@testing-library/react'
import { CommuteScene } from './CommuteScene'

describe('CommuteScene', () => {
  it('contains only the background journey layers', () => {
    const { container } = render(<CommuteScene progress={0} />)
    const scene = container.querySelector('.commute-scene')
    expect(scene?.firstElementChild).toHaveClass('sender-route-scene')
    expect(container.querySelector('.video-call-window')).not.toBeInTheDocument()
    expect(container.querySelector('.sender-route-scene .route-trees')).toBeInTheDocument()
    expect(container.querySelector('.scene-copy-shade')).toBeInTheDocument()
    expect(container.querySelector('.commute-scene > .morning-sky')).toBeInTheDocument()
  })
})
